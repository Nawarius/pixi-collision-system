
class CollisionSystem {

    constructor ({collision_map, front_map, character}, app) {

        this.collision_map = collision_map
        this.front_map = front_map
        this.character = character
        this.app = app

        this.collision_canvas = null
        this.collision_canvas_ctx = null

        this.directions = ['walkN', 'walkNE', 'walkNW', 'walkS', 'walkSE', 'walkSW', 'walkE', 'walkW']
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

    move_with_collision (direction = '', options = {}) {
        const direction_exist = this.directions.find(d => d === direction)
        if (!direction_exist) throw new Error(`Current direction: ${direction} not exist`)
        
        const colStepN = options.colisionStepN || 50
        const colStepS = options.colisionStepS || 50
        const speed = options.speed || 5

        const step = speed * app.ticker.deltaTime, stepY = step * 0.707
        
        switch (direction) {
            case 'walkNE': {
                if (this.collisionDetector(this.character.position.x + colStepN, this.character.position.y - colStepN)) {
                    this.character.position.y -= stepY
                    this.character.position.x += step
                }
                break
            }
            case 'walkNW': {
                if (this.collisionDetector(this.character.position.x - colStepN, this.character.position.y - colStepN)) {
                    this.character.position.x -= step
                    this.character.position.y -= stepY
                }
                break
            }
            case 'walkN': {
                if (this.collisionDetector(this.character.position.x, this.character.position.y - colStepN)){
                    this.character.position.y -= step
                }
                break
            }
            case 'walkSE': {
                if (this.collisionDetector(this.character.position.x + colStepS, this.character.position.y + colStepS)) {
                    this.character.position.x += step
                    this.character.position.y += stepY
                }
                break
            }
            case 'walkSW': {
                if (this.collisionDetector(this.character.position.x - colStepS, this.character.position.y + colStepS)) {
                    this.character.position.y += stepY
                    this.character.position.x -= step
                }
                break
            }
            case 'walkS': {
                if (this.collisionDetector(this.character.position.x, this.character.position.y + colStepS)) {
                    this.character.position.y += step
                }
                break
            }
            case 'walkE': {
                if (this.collisionDetector(this.character.position.x + colStepN, this.character.position.y)) {
                    this.character.position.x += step
                }
                break
            }
            case 'walkW': {
                if (this.collisionDetector(this.character.position.x - colStepN, this.character.position.y)) {
                    this.character.position.x -= step
                }
                break
            }
            default:
                break
        } 
    }

}