
const app = new PIXI.Application({
    view: document.getElementById("container"),
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 'black',
    width: window.innerWidth,
    height: window.innerHeight,
    sortableChildren: true
})

app.loader.onError.add((e) => console.log(e))
app.loader
    .add("character", 'https://dl.dropbox.com/s/xmendnr2a8e7lzs/character.png')
    .add("front_map", 'https://dl.dropbox.com/s/qmagmozys7gia7h/front_map.png')
    .add("collision_map", 'https://dl.dropbox.com/s/wao3715aia3r4cg/collision_map.png')
    .load(() => setup(app))

function setup () {

    const front_map = createMap(app.loader.resources.front_map.texture)
    front_map.visible = false
    const collision_map = createMap(app.loader.resources.collision_map.texture)

    const characterSheet = createAnimations(app.loader.resources.character.url)
    const character = createCharacter(characterSheet)

    app.stage.addChild(collision_map)
    app.stage.addChild(front_map)
    app.stage.addChild(character)

    character.x = app.screen.width / 2 + 300
    character.y = app.screen.height / 2

    const System = new CollisionSystem({ collision_map, front_map, character }, app)
    System.initCollisionMap()

    const keyboardKeys = {
        65: false, 87: false, 68: false, 83: false, // WASD
        37: false, 38: false, 39: false, 40: false // Arrows
    }

    let already_move = false

    window.addEventListener('keydown', e => {
        press_key(e.keyCode, true)

        if (!already_move) {
            already_move = true
            app.ticker.add(move_loop, 'move_loop')
        }
    })

    window.addEventListener('keyup', e => {
        press_key(e.keyCode, false)
        stop_animation()

        const no_keys = no_keys_pressed()
        
        if (no_keys) {
            already_move = false
            app.ticker.remove(move_loop, 'move_loop')
        }
    })

    function move_loop () {
        const direction = getDirection(keyboardKeys)

        System.move_with_collision(direction)

        play_animation(direction)
        camera_follow_character()
    }

    function press_key (keyCode, bool) {
        const keyExist = keyboardKeys.hasOwnProperty(keyCode)
        if (keyExist) keyboardKeys[keyCode] = bool
    } 

    function no_keys_pressed () {
        for (let key in keyboardKeys) if (keyboardKeys[key] === true) return false
        return true
    }

    function play_animation (direction) {
        if (!character.playing) {
            character.textures = characterSheet[direction]
            character.play()
        }
    }

    function stop_animation () {
        character.stop()
        character.textures = characterSheet.idleS
    }

    function camera_follow_character () {
        app.stage.pivot.x = character.position.x
        app.stage.pivot.y = character.position.y
        app.stage.position.x = app.renderer.width / 2
        app.stage.position.y = app.renderer.height / 2
    }
}