class App.Game

  DEFAULT_LIVES = 4
  DEFAULT_CAMERA_SPEED = 3
  NUMBER_OF_PAGES = 3
  ZERO_PADDING =  8
  HEART = "♥"

  HIT_MODIFIER: +150

  create: ->
    App.sfx.start()
    ga('send', 'event', 'game', 'start');

    @_createScoreText()
    @_createHealthText()

    @pages = []
    _.times NUMBER_OF_PAGES, (idx) =>
      @pages.push new App.Views.Page(game, game.width * (idx+1), 0)

    game.stage.backgroundColor = 0xDDDDDD
    @pagesSigned = 0
    @score = 0
    @lives = DEFAULT_LIVES
    @cameraSpeed = DEFAULT_CAMERA_SPEED

  update: ->
    for page in @pages
      page.update()
      page.el.x -= @cameraSpeed

    firstPage = _.first(@pages)
    if firstPage.el.x < -game.width
      @scorePage(firstPage)
      firstPage.destroy()
      newPage = new App.Views.Page(game,  firstPage.el.x + game.width * NUMBER_OF_PAGES, 0)
      @pages.shift(1)
      @pages.push(newPage)

    @text.text = @zeroPad(@score)
    @healthText.text = @hearts(@lives)


  scorePage: (page) ->
    @pagesSigned += 1
    expected = page.expectedSignatures
    hits = page.signedSignatures
    misses = expected - hits
    @lives -= misses
    @score = Math.max(0, @score + @HIT_MODIFIER * hits)
    @cameraSpeed = DEFAULT_CAMERA_SPEED + (@pagesSigned / 4)
    if @lives <= 0
      @endGame()

  endGame: ->
    console.log("Game Over")

  _createScoreText: ->
    @text = game.add.text(10, 10, @zeroPad(0))
    @text.font = 'Courier'
    @text.fontSize = 23
    @text.fontWeight = 200
    @text.fill = '#333333'


  _createHealthText: ->
    @healthText = game.add.text(game.width - 10, 10, "")
    @healthText.anchor.setTo(1,0)
    @healthText.font = 'Courier'
    @healthText.fontSize = 23
    @healthText.fontWeight = 200
    @healthText.fill = '#333333'

  zeroPad: (num) ->
    zero = ZERO_PADDING - num.toString().length + 1
    Array(+(zero > 0 && zero)).join("0") + num

  hearts: (count) ->
    Array(1+count).join(HEART)
