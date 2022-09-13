# Pixi-sollision-system

This is a simple library for creating collisions based on static black and white collision maps and dynamic collisions for sprites.

It is recommended to create static collision maps using **Collision map maker**

# Example

Try this example

# Installation

```npm install pixi-collision-system```

# Description of the concept

The idea is very simple. We have two cards in our scene:
1) **Front map** - a beautiful map that the user sees.
2) **Collision map** - black and white map. It is invisible to the user.

When you move, the **pixi-collision-system** determines whether the pixel in front of the character is white or black. If the pixel is black, the character cannot pass, if the pixel is white, the character can pass.

# Api

```
    import CollisionSystem from 'pixi-collision-system'

    // Create instance of Collision System
    const System = new CollisionSystem({ collision_map, front_map, character }, app, PIXI)

    // Draw collision sprite in collision_map
    System.createCollision(sprite)

    // Hide front map
    System.displayFrontMap(false)

```

