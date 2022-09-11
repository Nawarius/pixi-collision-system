
function createCharacter (characterSheet) {
    const character = new PIXI.AnimatedSprite(characterSheet.idleS)
    character.anchor.set(0.5)
    character.animationSpeed = 0.3

    character.position.x = app.screen.width / 2 
    character.position.y = app.screen.height / 2 + 400
    
    return character
}