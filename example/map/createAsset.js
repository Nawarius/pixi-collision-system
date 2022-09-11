
function createAsset (texture) {
    const asset = new PIXI.Sprite(texture)

    asset.position.x = app.screen.width / 2 + 100
    asset.position.y = app.screen.height / 2 + 350

    return asset
}