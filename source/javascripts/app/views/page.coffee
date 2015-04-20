class App.Views.Page
  signature_count: 2
  color: 0xF5F3E3
  page_height_ratio: 14/8.5
  page_margin: 50
  page_padding: 20

  constructor: (@game, @x, @y, @options = {signatures: @signature_count}) ->
    @_createPage()
    @_createText()

    if @options.signatures > 0
      @sigs = []
      _.times(game.rnd.between(1, @signature_count), =>
        @sigs.push @createSignature()
      )
      @expectedSignatures = @sigs.length
      @signedSignatures = 0

    @el = @page

  _createPage: =>
    @page = @game.add.graphics(@x, @y);
    @page.anchor = new Phaser.Point(0,0)

    @paper_width = @game.width - (@page_margin * 2)
    @page_height = @paper_width * @page_height_ratio

    @page.beginFill(0, 0.3);
    @page.drawRect(@page_margin + 10, @page_margin + 10, @paper_width , @page_height)

    @page.beginFill(@color, 1);
    @page.drawRect(@page_margin, @page_margin, @paper_width, @page_height)

  _createText: =>
    @text = @game.add.text(@page_margin + @page_padding, @page_margin + @page_padding, Legal.generate(2))
    @text.wordWrapWidth = @paper_width - (@page_padding * 2)
    @text.wordWrap = true
    @text.font = 'Courier'
    @text.fontSize = 23
    @text.fontWeight = 200
    @text.fill = '#333333'
    @text.cacheAsBitmap = true
    @page.addChild(@text)

  destroy: =>
    @el.destroy(true)

  createSignature: =>
    x = game.rnd.between(@text.left, @text.right - App.Views.Signature.signature_width - App.Views.Signature.signature_padding)
    y = game.rnd.between(@text.top, @page_height - App.Views.Signature.signature_height - App.Views.Signature.signature_padding)
    signature = new App.Views.Signature(game, x, y, @color)
    signature.on("signed", =>
      @signedSignatures += 1
    )
    @page.addChild(signature.el)
    signature

  update: =>
    for sig in @sigs
      sig.update()