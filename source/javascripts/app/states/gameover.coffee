class App.GameOver

  init: (@score) ->
    ga('send', 'event', 'game', 'over', @score);

  preload: ->
    game.stage.backgroundColor = 0xDDDDDD
    @page = new App.Views.Page(game, 0, 0, {signatures: 0})
    @page.text.text = """

      GAME OVER

      THIS GAME AGREEMENT (this “game”) has come to and end.

      You scored: #{@score}



















      Sign here to try again:

      """
    @addSignature()

  addSignature: =>
    @signature = new App.Views.Signature(game, 400, 860, @page.color)
    @signature.on "signed", =>
      started = @startGame()

  startGame: =>
    @state.start('game')

  update: ->
    @signature?.update()
