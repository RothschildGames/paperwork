class App.Views.MonsterParticles extends Phaser.Particles.Arcade.Emitter

  constructor: (game, x, y, color, quantity = 25, lifespan = 1000) ->
    super(game, x, y, quantity)

    @makeParticles('death-particle')
    @lifespan = lifespan
    @forEach((particle) => particle.tint = color)
    @gravity = 1
    @explode(@lifespan, quantity)
    @counter = 0

  update: ->
    @counter += 1
    @forEachAlive((particle) => particle.alpha = (particle.lifespan / @lifespan))
    @kill() if @counter > 100
