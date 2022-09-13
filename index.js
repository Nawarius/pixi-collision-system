
class CollisionSystem {

    constructor ({collision_map, front_map}, app, PIXI) {

        this.collision_map = collision_map
        this.front_map = front_map
        this.app = app
        this.PIXI = PIXI

        this.collision_canvas = null
        this.collision_canvas_ctx = null
        this.collision_shapes = ['ellipse', 'rect']

        this.directions = ['walkN', 'walkNE', 'walkNW', 'walkS', 'walkSE', 'walkSW', 'walkE', 'walkW']

        this.initCollisionMap()
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

    moveWithCollisions (character, direction = '', options = {}) {
        const direction_exist = this.directions.find(d => d === direction)
        if (!direction_exist) return

        const colStepNY = typeof options.colStepNY === 'number' ? options.colStepNY : 30
        const colStepSY = typeof options.colStepSY === 'number' ? options.colStepSY : 10
        const colStepX = typeof options.colStepX === 'number' ? options.colStepX : 30

        const speed = typeof options.speed === 'number' ? options.speed : 5
        const stepXY = typeof options.stepXY === 'number' ? options.stepXY : speed * app.ticker.deltaTime
        const stepD = typeof options.stepD === 'number' ? options.stepD :  stepXY * 0.707
        
        switch (direction) {
            case 'walkNE': {
                if (this.collisionDetector(character.position.x + colStepNY, character.position.y - colStepNY)) {
                    character.position.y -= stepD
                    character.position.x += stepXY
                }
                break
            }
            case 'walkNW': {
                if (this.collisionDetector(character.position.x - colStepNY, character.position.y - colStepNY)) {
                    character.position.x -= stepXY
                    character.position.y -= stepD
                }
                break
            }
            case 'walkN': {
                if (this.collisionDetector(character.position.x, character.position.y - colStepNY)){
                    character.position.y -= stepXY
                }
                break
            }
            case 'walkSE': {
                if (this.collisionDetector(character.position.x + colStepSY, character.position.y + colStepSY)) {
                    character.position.x += stepXY
                    character.position.y += stepD
                }
                break
            }
            case 'walkSW': {
                if (this.collisionDetector(character.position.x - colStepSY, character.position.y + colStepSY)) {
                    character.position.y += stepD
                    character.position.x -= stepXY
                }
                break
            }
            case 'walkS': {
                if (this.collisionDetector(character.position.x, character.position.y + colStepSY)) {
                    character.position.y += stepXY
                }
                break
            }
            case 'walkE': {
                if (this.collisionDetector(character.position.x + colStepX, character.position.y)) {
                    character.position.x += stepXY
                }
                break
            }
            case 'walkW': {
                if (this.collisionDetector(character.position.x - colStepX, character.position.y)) {
                    character.position.x -= stepXY
                }
                break
            }
            default:
                break
        } 
    }

    createCollision (sprite, options = {scaleX: 0, scaleY: 0, rotation: 0, shape: 'ellipse'}) {

        const shape_exist = this.collision_shapes.find(s => options.shape === s)

        const params = {
            scaleX: options.scaleX || 0,
            scaleY: options.scaleY || 0,
            rotation: options.rotation || 0,
            shape: (options.shape && shape_exist) ? options.shape : 'ellipse'
        }
        
        let collision = this.getCollisionBySprite(sprite)
        
        if (!collision) {
            collision = new this.PIXI.Graphics()

            this.collision_map.addChild(collision)
            sprite.on('removed', () => this.removeCollision(sprite))

            collision.collision_system_params = { sprite, ...params }
            this.updateCollision(sprite, params)
        }
        
    }

    updateCollision (sprite, options) {
        let collision = this.getCollisionBySprite(sprite)
        if (!collision) return

        const shape_exist = this.collision_shapes.find(s => options.shape === s)

        collision.collision_system_params.shape = (options.shape && shape_exist) ? options.shape : collision.collision_system_params.shape
        collision.collision_system_params.scaleX += options.scaleX || 0
        collision.collision_system_params.scaleY += options.scaleY || 0
        collision.collision_system_params.rotation += options.rotation || 0

        const {scaleX, scaleY, rotation, shape} = collision.collision_system_params

        const radX = sprite.width / 2
        const radY = radX / 2

        collision.clear()
        collision.beginFill('black')

        if (shape === 'rect') {
            collision.drawRect(
                sprite.position.x - (sprite.width + scaleX) / 2,
                sprite.position.y - (sprite.height + scaleY) / 2,
                sprite.width + scaleX,
                sprite.height + scaleY
            )
        } else {
            collision.drawEllipse(
                sprite.position.x,
                sprite.position.y,
                radX + scaleX,
                radY + scaleY
            )
        }

        collision.pivot.set(sprite.position.x, sprite.position.y)
        collision.position.set(sprite.position.x, sprite.position.y)
        collision.rotation = rotation

        collision.endFill()
    }

    removeCollision (sprite) {
        let collision = this.getCollisionBySprite(sprite)
        if (collision) {
            this.collision_map.removeChild(collision)
            collision.destroy(true)
        }
    }

    getCollisionOptions (sprite) {
        const collision = this.getCollisionBySprite(sprite)
        if (collision) return collision.collision_system_params

        return null
    }

    getCollisionBySprite (sprite) {
        return this.collision_map.children.find(c => c.collision_system_params.sprite === sprite)
    }

    displayFrontMap (bool) {
        this.front_map.visible = bool
    }
}

//export default CollisionSystem


