
// Init PIXI App
const app = new PIXI.Application({
    view: document.getElementById("container"),
    resolution: window.devicePixelRatio || 1,
    autoDensity: true,
    backgroundColor: 'black',
    width: window.innerWidth,
    height: window.innerHeight,
    sortableChildren: true
})

// Loading the required img resources
app.loader
    .add("character", 'https://dl.dropbox.com/s/xmendnr2a8e7lzs/character.png')
    .add("front_map", 'https://dl.dropbox.com/s/qmagmozys7gia7h/front_map.png')
    .add("collision_map", 'https://dl.dropbox.com/s/wao3715aia3r4cg/collision_map.png')
    .add("earth", 'https://dl.dropbox.com/s/gb44qrncu8032vv/earth.png')
    .load(() => setup())

// Need to be global for html buttons controls
let earth = null, System = null

function setup () {
    // Add Front map (Color beautiful map)
    const front_map = createMap(app.loader.resources.front_map.texture)
    // Add Collision map (Black and White map)
    const collision_map = createMap(app.loader.resources.collision_map.texture)

    // Get animation sheet (idle, walk) from current character img
    const characterSheet = createAnimations(app.loader.resources.character.data)
    // Create character Sprite using animation sheet
    const character = createCharacter(characterSheet)

    // Add asset (Earth img)
    earth = createAsset(app.loader.resources.earth.texture)

    // Add all sprites to scene (maps, character, earth)
    app.stage.addChild(collision_map, front_map, earth, character)

    // Center stage on character 
    camera_follow_character()
    
    // Create instance of Collision System (Initialization of collision map canvas)
    System = new CollisionSystem({ collision_map, front_map }, app, PIXI)

    // Draw collision for earth sprite in collision_map
    System.createCollision(earth)
    // Hide front map
    System.displayFrontMap(false)

    // This will control which keys are pressed
    const keyboardKeys = {
        65: false, 87: false, 68: false, 83: false, // WASD
        37: false, 38: false, 39: false, 40: false // Arrows
    }

    let already_move = false

    // When the character starts to move, run the ticker
    window.addEventListener('keydown', e => {
        press_key(e.keyCode, true)

        if (!already_move) {
            already_move = true
            app.ticker.add(move_loop, 'move_loop')
        }
    })

    // When the character has stopped, remove the ticker
    window.addEventListener('keyup', e => {
        press_key(e.keyCode, false)
        stop_animation()

        const no_keys = no_keys_pressed()
        
        if (no_keys) {
            already_move = false
            app.ticker.remove(move_loop, 'move_loop')
        }
    })

    // On each tick, check the current direction. After that, the character moves in the indicated direction, checking all collisions
    function move_loop () {
        const direction = getDirection(keyboardKeys)
        System.moveWithCollisions(character, direction)

        play_animation(direction)
        camera_follow_character()
    }

    // Down/up keyboard key  
    function press_key (keyCode, bool) {
        const keyExist = keyboardKeys.hasOwnProperty(keyCode)
        if (keyExist) keyboardKeys[keyCode] = bool
    } 

    // No key on the keyboard is pressed (Only WASD and arrows are checked)
    function no_keys_pressed () {
        for (let key in keyboardKeys) if (keyboardKeys[key] === true) return false
        return true
    }

    // Playing of current character animation
    function play_animation (direction) {
        if (!character.playing && characterSheet[direction]) {
            character.textures = characterSheet[direction]
            character.play()
        }
    }

    // Stop character animation (Here stop it's always return to the idle south)
    function stop_animation () {
        character.stop()
        character.textures = characterSheet.idleS
    }

    // When the character moves, it is necessary that he is always in the center of the stage
    function camera_follow_character () {
        app.stage.pivot.x = character.position.x
        app.stage.pivot.y = character.position.y
        app.stage.position.x = app.renderer.width / 2
        app.stage.position.y = app.renderer.height / 2
    }
}