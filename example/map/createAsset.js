
function createAsset (texture) {
    const asset = new PIXI.Sprite(texture)

    asset.position.x = app.screen.width / 2 + 400
    asset.position.y = app.screen.height / 2 + 550

    asset.anchor.set(0.5, 0.75)

    return asset
}