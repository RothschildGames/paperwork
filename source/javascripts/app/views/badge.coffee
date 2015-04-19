class App.Views.Badge extends Phaser.Graphics
  color: 0xff0000

  constructor: (game, x, y, number) ->
    super(game, x, y)
    @beginFill(@color, 1)
    @drawCircle(0,0, 44)
    game.add.existing(@)

    @text = @game.add.text(0, 0, number)
    @text.anchor.setTo(.5)
    @text.font = 'Helvetica Neue'
    @text.fontSize = 23
    @text.fontWeight = 200
    @text.fill = '#FFFFFF'
    @addChild(@text)
