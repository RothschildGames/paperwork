class App.Views.Page
  color: 0xF5F3E3
  page_height_ratio: 14/8.5
  page_margin: 50
  page_padding: 20
  signature_height: 30
  signature_width: 120
  signature_line_height: 3

  constructor: (@game, @x, @y) ->
    @page = @game.add.graphics(@x, @y);
    @page.beginFill(@color, 1);
    @paper_width = @game.width - (@page_margin * 2)
    @page_height = @paper_width * @page_height_ratio
    @page.drawRect(@page_margin, @page_margin, @paper_width, @page_height)
    @page.endFill()

    @text = @game.add.text(@page_margin + @page_padding, @page_margin + @page_padding, Legal.generate(2))
    @text.wordWrapWidth = @paper_width - (@page_padding * 2)
    @text.wordWrap = true
    @text.font = 'Courier'
    @text.fontSize = 23
    @text.fontWeight = 200
    @text.fill = '#333333'
    @page.addChild(@text)


    _.times(game.rnd.between(1, 3), =>
      @createSignature()
    )




  createSignature: =>
    x = game.rnd.between(@text.left, @text.right - @signature_width)
    y = game.rnd.between(@text.top, @page_height - @signature_height)
    signatureThingie = @game.add.graphics(x, y)
    signatureThingie.beginFill(@color, 1);
    signatureThingie.drawRect(0, 0, @signature_width, @signature_height)
    signatureThingie.endFill()

    signatureThingie.beginFill(0x333333, 1);
    signatureThingie.drawRect(5, @signature_height - 5, @signature_width - 10, @signature_line_height)
    signatureThingie.inputEnabled = true
    signatureThingie.events.onInputDown.add ->
      console.log("START")
    signatureThingie.events.onInputUp.add ->
      console.log("STOP")
    @page.addChild(signatureThingie)

    xText = @game.add.text(x + 5, y + 2, "X")
    xText.font = 'Courier'
    xText.fontSize = 23
    xText.fontWeight = 400
    xText.fill = '#333333'
    @page.addChild(xText)