
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
    const collision_map = createMap(app.loader.resources.collision_map.texture)

    const characterSheet = createAnimations(app.loader.resources.character.url)
    const character = createCharacter(characterSheet)

    app.stage.addChild(collision_map)
    app.stage.addChild(front_map)
    app.stage.addChild(character)

    character.x = app.screen.width / 2
    character.y = app.screen.height / 2

    const System = new CollisionSystem({ collision_map, front_map, character}, app)
    System.initCollisionMap()
    // app.ticker.add(() => {
    //     app.stage.pivot.x = character.position.x
    //     app.stage.pivot.y = character.position.y
    //     app.stage.position.x = app.renderer.width/2
    //     app.stage.position.y = app.renderer.height/2
    // }) 
}