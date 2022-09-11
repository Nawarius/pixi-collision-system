
class CollisionSystem {

    constructor ({collision_map, front_map, character}, app) {

        this.collision_map = collision_map
        this.front_map = front_map
        this.character = character
        this.app = app

        this.collision_canvas = null
        this.collision_canvas_ctx = null
    }

    initCollisionMap () {
        const extractor = this.app.renderer.plugins.extract
        this.collision_canvas = extractor.canvas(this.collision_map)
        
        this.collision_canvas_ctx = this.collision_canvas.getContext('2d')
    }

    collisionDetector (x, y) {
        const localCoords = this.collision_map.toGlobal({x, y})

        let collisionExist = false

        for (let collision of this.collision_map.children) {
            if (collision.containsPoint({x: localCoords.x, y: localCoords.y})) {
                collisionExist = true
                break
            }
        }

        const pixelColor = this.collision_canvas_ctx.getImageData(x, y, 1, 1).data[0]
        return (pixelColor && !collisionExist) ? true : false
    }

}