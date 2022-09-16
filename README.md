# pixi-collision-system

This is a simple library for creating collisions based on static black and white collision maps and dynamic collisions for sprites.

It is recommended to create static collision maps using [**Collision map maker**](https://nawarius.github.io/collision-map-maker/).
You can read about how to use the [**Collision map maker**](https://nawarius.github.io/collision-map-maker/) in this [**article**](https://medium.com/@nawarius1993/collision-map-maker-js-2d-drawing-94d1a31eec6f).

# Example

Try [this example](https://nawarius.github.io/pixi-collision-system/)

# Installation

```npm install pixi-collision-system```

# Description of the concept

The idea is very simple. We have two maps in our scene:
1) **Front map** - a beautiful map that the user sees.
2) **Collision map** - black and white map. It is invisible to the user.

When you move your sprite, the **pixi-collision-system** determines if the sprite can move further or not.

If there is a dynamic collision ahead (another sprite) or a black pixel in a static collision map, our sprite will not be able to move forward.

# Usage

For a complete picture of what is happening, I recommend looking at the [example code](https://github.com/Nawarius/pixi-collision-system/blob/main/example/main.js)

```
    import * as PIXI from 'pixi.js'
    import CollisionSystem from 'pixi-collision-system'

    // Init PIXI app
    const app = new PIXI.Application(options)

    // Use some function for creating maps
    const front_map = createFrontMap()
    const collision_map = createCollisionMap()

    // Use some function for creating sprites
    const character = createSprite()
    const sprite = createSprite()

    // Create instance of Collision System
    const System = new CollisionSystem({ collision_map, front_map }, app, PIXI)

    // Draw collision sprite in collision_map
    System.createCollision(sprite)

    // Get actual collision options
    const options = System.getCollisionOptions(sprite)

    // Increase collision scaleX += 0.1 and change shape to 'rect'
    System.updateCollision(sprite, { scaleX: options.scaleX + 0.1, shape: 'rect' })

    // Check if there is a collision at coordinates north of the character
    const bool = System.isCollision(character.position.x, character.position.y + 50)

    // Try moving the character to the west
    System.moveWithCollisions(character, 'walkW')

    // Get PIXI.Graphics collision
    System.getCollisionBySprite(sprite)

    // Remove the collision (сollision is removed automatically when the sprite is removed)
    System.removeCollision(sprite)

    // Hide/show front map
    System.displayFrontMap(false)

```
# Api

## Collision options

Options shown with default values

```
options = {
    shape: 'ellipse', // The geometric shape of the collision (can be 'ellipse' or 'rect')
    scaleX: 0, // Scale by x coord
    scaleY: 0, // Scale by y coord
    rotation: 0, // Rotation
}
```

---

## Constructor

`const System = new CollisionSystem({front_map, collision_map}, app, PIXI)`

Initializes everything necessary for the operation of the CollisionSystem 

1) `front_map` and `collision_map` are PIXI Sprites. In the [example](https://github.com/Nawarius/pixi-collision-system/blob/main/example/main.js), TilingSprites are used

2) `app` is PIXI.Application

3) `PIXI` is PIXI himself

---

## Create Collision

`System.createCollision(sprite, options)`

Creates a collision for the sprite. 

See **Collision options** at the top for a better understanding of what options the method accepts.

`options` is not required

---

## Update Collision

`System.updateCollision(sprite, options)`

Use this function to change the collision *(its size, rotation, shape)*

See **Collision options** at the top for a better understanding of what options the method accepts.

`options` is not required

---

## Remove Collision

`System.removeCollision(sprite)`

You can manually remove the collision if you need to. The collision will also be removed automatically if you delete the sprite to which it is attached.

---

## Is Collision

`System.isCollision(x, y)`

Checks x, y coordinates. If these coordinates contain a black pixel of a static `collision_map` or a dynamic sprite collision created by `createCollision` return `true`.

*(Converts coordinates to local collision_map coordinates. Don't worry if your front_map and collision_map are the same size)*

---

## Move with collisions

`System.moveWithCollisions(sprite, direction, options)`

Allows you to move the sprite in one of the available directions using collisions. 

Available directions

```
'walkNE', 'walkNW', 'walkN', 'walkSE', 'walkSW', 'walkS', 'walkE', 'walkW'
```

Available options (Default values)

```
options = {
    marginTop: 30,
    marginBottom: 10,
    marginRight: 30,
    marginLeft: 30,
    speed: 5,
    stepXY: speed * app.ticker.deltaTime,
    stepD: stepXY * 0.707
}
```

`marginTop, marginBottom, marginRight, marginLeft` - It's like margin from css. If you want to increase or decrease the distance between the character and collisions, you can change these values. The default values ​​are fine if your sprite's `anchor` is at the feet `sprite.anchor.set(0.5, 1)`

`speed` - The speed at which the sprite will move. 

`stepXY` - Most of the time it doesn't need to be changed. This is the character's step in x and y

`stepD` - Most of the time it doesn't need to be changed. This is the character's diagonal step.

`options` is not required

---

## Get collision options

`System.getCollisionOptions(sprite)`

Returns **Collision options** for the current collision

See **Collision options** at the top for a better understanding of what options the method returns.

---

## Get collision by sprite
`System.getCollisionBySprite(sprite)`

If you need the collision itself (`PIXI.Graphics`), you can get it with this method

---

## Display front map

`System.displayFrontMap(bool)`

Sometimes it is useful to hide the front_map. This method will help hide/show front_map


