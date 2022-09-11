
function createCharacter (characterSheet) {
    const character = new PIXI.AnimatedSprite(characterSheet.idleS)
    character.anchor.set(0.5)
    
    return character
}