
function createMap (texture) {
    const tiling = new PIXI.TilingSprite(texture, texture.orig.width, texture.orig.height)
    tiling.position.set(0, 0)
    return tiling
}
