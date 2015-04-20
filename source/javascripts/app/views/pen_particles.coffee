class App.Views.PenParticles extends Phaser.Particles.Arcade.Emitter


  @load: (game) ->
    bmd = game.add.bitmapData(24, 24);
    bmd.ctx.create

    radgrad = bmd.ctx.createRadialGradient(12, 12, 4, 12, 12, 12);

    radgrad.addColorStop(0, 'rgba(0, 0, 0, 1)')
    radgrad.addColorStop(1, 'rgba(0, 0, 0, 0)')

    bmd.context.fillStyle = radgrad
    bmd.context.fillRect(0, 0, 24, 24)

    game.cache.addBitmapData('particle', bmd);

  constructor: (game, x, y, quantity = 20, lifespan = 600) ->
    super(game, x, y, quantity)

    @makeParticles(game.cache.getBitmapData('particle'))
#    @scale.setTo(0.25, 0.25)
    @lifespan = lifespan
#    @forEach((particle) => particle.tint = color)
    @gravity = 0
    @explode(@lifespan, quantity)
    @counter = 0

  update: ->
    @counter += 1
    @forEachAlive((particle) => particle.alpha = (particle.lifespan / @lifespan))
    @kill() if @counter > 100
