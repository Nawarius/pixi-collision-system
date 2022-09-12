
class CollisionSystem {

    constructor ({collision_map, front_map, character}, app, PIXI) {

        this.collision_map = collision_map
        this.front_map = front_map
        this.character = character
        this.app = app
        this.PIXI = PIXI

        this.collision_canvas = null
        this.collision_canvas_ctx = null

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

    moveWithCollisions (direction = '', options = {}) {
        const direction_exist = this.directions.find(d => d === direction)
        if (!direction_exist) return
        
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

    createCollision (sprite, options = {scaleX: 0, scaleY: 0, rotation: 0, form: 'ellipse'}) {
        
        const params = {
            scaleX: options.scaleX || 0,
            scaleY: options.scaleY || 0,
            rotation: options.rotation || 0,
            form: options.form || 'ellipse',
        }
        
        let collision = this.getCollisionBySprite(sprite)
        
        if (!collision) {
            collision = new this.PIXI.Graphics()

            collision.collision_system_params = { sprite, ...params }

            this.collision_map.addChild(collision)
            sprite.on('removed', () => this.removeCollision(sprite))

            this.updateCollision(sprite, params)
        }
        
    }

    updateCollision (sprite, options) {

        let collision = this.getCollisionBySprite(sprite)
        if (!collision) return

        collision.collision_system_params.form = options.form || collision.collision_system_params.form
        collision.collision_system_params.scaleX += options.scaleX || 0
        collision.collision_system_params.scaleY += options.scaleY || 0
        collision.collision_system_params.rotation += options.rotation || 0

        const {scaleX, scaleY, rotation, form} = collision.collision_system_params

        const radX = sprite.width / 2
        const radY = radX / 2

        collision.clear()
        collision.beginFill('black')

        if (form === 'rect') {
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