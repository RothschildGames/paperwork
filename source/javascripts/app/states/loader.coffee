class App.Loader
  ready: false

  preload: ->
    @_createLoadingUI()
    @_loadGameAssets()

  _createLoadingUI: ->
    game.stage.backgroundColor = 0xDDDDDD
    page = new App.Views.Page(game, 0, 0, {signatures: 0})
    page.text.visible = false


    text = game.add.text(180, 240, 'Paper\nWork')
    text.align = 'center'
    text.wordWrapWidth = 3000
    text.wordWrap = true
    text.font = 'Courier'
    text.fontSize = 120
    text.fontWeight = 800
    text.fill = '#333333'

    text = game.add.text(220, 540, 'by @yonbergman')
    text.align = 'center'
    text.font = 'Courier'
    text.fontSize = 33
    text.fontWeight = 200
    text.fill = '#333333'


    text = game.add.text(220, 740, 'Loading...')
    text.align = 'center'
    text.font = 'Courier'
    text.fontSize = 33
    text.fontWeight = 200
    text.fill = '#333333'
    @loadingText = text

    text = game.add.text(180, 740, 'Sign here to start:')
    text.align = 'center'
    text.font = 'Courier'
    text.fontSize = 33
    text.fontWeight = 200
    text.fill = '#333333'
    text.visible = false
    @signToStart = text

    @signature = new App.Views.Signature(game, 400, 800, page.color)
    @signature.el.visible = false
    @signature.on "signed", =>
      started = @startGame()

    page.page.inputEnabled = true
    page.page.events.onInputDown.add @startGame

    @load.onLoadComplete.add =>
      App.sfx.start()
      @loadingText.visible = false
      @signToStart.visible = true
      @signature.el.visible = true
      @ready = true

  startGame: =>
    @state.start('game') if @ready

  _loadGameAssets: ->
    App.sfx = new App.Sfx(@)


  update: ->
    @signature.update()
