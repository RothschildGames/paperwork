class App.Game

  DEFAULT_LIVES = 4
  DEFAULT_CAMERA_SPEED = 3
  NUMBER_OF_PAGES = 2
  ZERO_PADDING =  8
  HEART = "♥"
  INITIAL_DELAY = 800
  MID_DELAY = 300



  HIT_MODIFIER: +150

  create: ->
    App.sfx.start()
    ga('send', 'event', 'game', 'start');

    @_createScoreText()
    @_createHealthText()

#      @pages.push new App.Views.Page(game, game.width * (idx+1), 0)

    game.stage.backgroundColor = 0xDDDDDD
    @pagesSigned = 0
    @score = 0
    @lives = DEFAULT_LIVES
    @cameraSpeed = DEFAULT_CAMERA_SPEED
    @zIndex = NUMBER_OF_PAGES * 1000
    @start = false
    @delay = MID_DELAY

    @pages = []
    _.times NUMBER_OF_PAGES, (idx) =>
      @createPage()

    @delayBy(INITIAL_DELAY)

  delayBy: (byMilis) ->
    @start = false
    timer = game.time.create(true)
    timer.add(byMilis, =>
      @start = true
    )
    timer.start()

  createPage: ->
    page = new App.Views.Page(game, 0, 0)
    game.world.sendToBack(page.el)
    @pages.push page
    page

  update: ->
    for page in @pages
      page.update()
    return unless @start

    firstPage = _.first(@pages)
    firstPage.el.x -= @cameraSpeed
    if firstPage.el.x < -game.width * 1.2
      @scorePage(firstPage)
      firstPage.destroy()
      newPage = @createPage()
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
    @delay = Math.max(100, MID_DELAY - (@pagesSigned * 10))
    if @lives <= 0
      @endGame()
    else
      @delayBy(@delay)

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
