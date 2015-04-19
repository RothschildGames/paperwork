class App.Views.HUD

  constructor: (@game, @gameState) ->

  create: ->
    @waveShapes = []
    for i in [0..4]
      shape = @game.add.graphics(17 + 15*i, 26)
      @waveShapes.push(shape)

    @scoreText = @game.add.text(93, 12, "400 G")
    @scoreText.font = 'Helvetica Neue'
    @scoreText.fontSize = 24
    @scoreText.fontWeight = 200
    @scoreText.fill = '#FFFFFF'

    @titleText = @game.add.text(game.world.centerX, 12, "APPATK")
    @titleText.anchor.setTo(.5, 0)
    @titleText.font = 'Helvetica Neue'
    @titleText.fontSize = 25
    @titleText.fontWeight = 500
    @titleText.fill = '#FFFFFF'

    @healthText = @game.add.text(680, 12, "100%")
    @healthText.anchor.setTo(1, 0)
    @healthText.font = 'Helvetica Neue'
    window.foo = @healthText
    @healthText.fontSize = 24
    @healthText.fontWeight = 200
    @healthText.fill = '#FFFFFF'

    battery = @game.add.sprite(738, 17, 'battery')
    battery.anchor.setTo(1, 0)

    @batteryFill = @game.add.graphics(691, 19)
    @batteryFill.beginFill(0xFFFFFF, 1)
    @batteryFill.drawRect(0,0, 40, 14)

    @renderHealth()
    @renderWave()
    @renderScore()
    @gameState.on('change:health', @renderHealth)
    @gameState.on('change:gold', @renderScore)
    @gameState.on('change:wave', @renderWave)

  renderScore: =>
    @scoreText.text = "#{@gameState.get('gold')} G"

  renderHealth: =>
    percent = Math.min(Math.max(0,parseInt(@gameState.get('health'))),100)
    @healthText.text = "#{percent}%"
    @batteryFill.scale.x = percent/100
    if @gameState.get('lowHealth')
      @batteryFill.tint = 0xff3b30
    else
      @batteryFill.tint = 0xffffff
    @batteryFill.dirty = true

  renderWave: =>
    wave = Math.min(Math.max(0,parseInt(@gameState.get('wave'))),5)
    for shape, idx in @waveShapes
      shape.clear()
      shape.lineStyle(1, 0xFFFFFF, 1)
      if idx < wave
        shape.beginFill(0xFFFFFF, 1)
      shape.drawCircle(0, 0, 11)
