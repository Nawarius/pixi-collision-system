# Pixi-sollision-system

This is a simple library for creating collisions based on static black and white collision maps and dynamic collisions for sprites.

It is recommended to create static collision maps using [**Collision map maker**](https://nawarius.github.io/collision-map-maker/)
You can read about how to use the **Collision map maker** in this [**article**](https://medium.com/@nawarius1993/collision-map-maker-js-2d-drawing-94d1a31eec6f).

# Example

Try this example

# Installation

```npm install pixi-collision-system```

# Description of the concept

The idea is very simple. We have two maps in our scene:
1) **Front map** - a beautiful map that the user sees.
2) **Collision map** - black and white map. It is invisible to the user.

When you move, the **pixi-collision-system** determines whether the pixel in front of the character is white or black. If the pixel is black, the character cannot pass, if the pixel is white, the character can pass.

# Usage

```
    import CollisionSystem from 'pixi-collision-system'

    // Create instance of Collision System
    const System = new CollisionSystem({ collision_map, front_map, character }, app, PIXI)

    // Draw collision sprite in collision_map
    System.createCollision(sprite)

    // Hide front map
    System.displayFrontMap(false)

```
# Api

## Collision_options

Options shown with default values

```
options = {
    shape: 'ellipse', // The geometric shape of the collision
    scaleX: 0, // Scale by x coord
    scaleY: 0, // Scale by y coord
    rotation: 0, // Rotation
}
```

`shape` can be 'ellipse' or 'rect'

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

See **Collision_options** at the top for a better understanding of what options the method accepts.

`options` is not required

---

## Update Collision

`System.updateCollision(sprite, options)`

Use this function to change the collision *(its size, rotation, shape)*

See **Collision_options** at the top for a better understanding of what options the method accepts.

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

Returns `collision_options` for the current collision

See **Collision_options** at the top for a better understanding of what options the method returns.

---

## Get collision by sprite
`System.getCollisionBySprite(sprite)`

If you need the collision itself (`PIXI.Graphics`), you can get it with this method

---

## Display front map

`System.displayFrontMap(bool)`

Sometimes it is useful to hide the front_map. This method will help hide/show front_map


