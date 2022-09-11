
function createAnimations (url) {
    const playerSheet = {}

    let sheet = new PIXI.BaseTexture.from(url)

    let w = 95.16
    let h = 158

    playerSheet["idleS"] = [
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h))
    ]

    playerSheet["idleW"] = [
        new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 1 * h, w, h))
    ]

    playerSheet["idleN"] = [
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 3 * h, w, h))
    ]

    playerSheet["idleE"] = [
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 2 * h, w, h))
    ]

    playerSheet["walkS"] = [
      new PIXI.Texture(sheet, new PIXI.Rectangle(0 * w, 0, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 0, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 0, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 0, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 0, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 0, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 0, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 0, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(8 * w, 0, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(9 * w, 0, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(10 * w, 0, w, h))
    ]

    playerSheet["walkN"] = [
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 3 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 3 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 3 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 3 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 3 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 3 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 3 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(8 * w, 3 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(9 * w, 3 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(10 * w, 3 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(11 * w, 3 * h, w, h))
    ]

    playerSheet["walkW"] = [
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 1 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 1 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 1 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 1 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 1 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 1 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 1 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(8 * w, 1 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(9 * w, 1 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(10 * w, 1 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(11 * w, 1 * h, w, h))
    ]

    playerSheet["walkE"] = [
      new PIXI.Texture(sheet, new PIXI.Rectangle(1 * w, 2 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(2 * w, 2 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(3 * w, 2 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(4 * w, 2 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(5 * w, 2 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(6 * w, 2 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(7 * w, 2 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(8 * w, 2 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(9 * w, 2 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(10 * w, 2 * h, w, h)),
      new PIXI.Texture(sheet, new PIXI.Rectangle(11 * w, 2 * h, w, h))
    ]

    return playerSheet
}