class App.Views.Signature
  signatureSpeed: 5
  images: ['sig1', 'sig2']
  isAnimating: false
  doneAnimating: false
  doneReset: false

  @signature_height: 30
  @signature_width: 140
  @signature_padding: 20
  signature_line_height: 3

  constructor: (@game, @x, @y, @color) ->

    signatureContainer = @_createContainer()
    signatureContainer.addChild @_createX()
    signatureContainer.addChild @_createSignature()
    @el = signatureContainer

    _.extend(@, Backbone.Events);

  _createContainer: =>
    signatureContainer = @game.add.graphics(@x, @y)
    signatureContainer.beginFill(@color, 1);
    signatureContainer.drawRect(0, 0, App.Views.Signature.signature_width + App.Views.Signature.signature_padding * 2, App.Views.Signature.signature_height + App.Views.Signature.signature_padding * 2)

    signatureContainer.beginFill(0x333333, 1);
    signatureContainer.drawRect(App.Views.Signature.signature_padding, App.Views.Signature.signature_padding + App.Views.Signature.signature_height - 5, App.Views.Signature.signature_width, @signature_line_height)
    #    signatureContainer.hitArea = new Phaser.Rectangle(- App.Views.Signature.signature_padding, - App.Views.Signature.signature_padding,
    #        signatureContainer.width + App.Views.Signature.signature_padding * 2, signatureContainer.height + App.Views.Signature.signature_padding * 2)

    signatureContainer.inputEnabled = true
    signatureContainer.events.onInputDown.add =>
      @startAnimating()
    signatureContainer.events.onInputUp.add =>
      @stopAnimating()

    signatureContainer

  _createX: =>
    @xText = @game.add.text(App.Views.Signature.signature_padding, App.Views.Signature.signature_padding, "X")
    @xText.font = 'Courier'
    @xText.fontSize = 23
    @xText.fontWeight = 400
    @xText.fill = '#333333'
    @xText

  _createSignature: =>
    @signature = @game.add.image(App.Views.Signature.signature_padding, 0, _.sample(@images));

    @originalWidth = @signature.width
    @originalHeight = @signature.height
    @signature.height = App.Views.Signature.signature_width * @signature.height / @signature.width
    @signature.width = App.Views.Signature.signature_width

    @signature.anchor.setTo(0, 0)
    @signature.crop(new Phaser.Rectangle(0, 0, 0, @originalHeight))
    @signature


  startAnimating: =>
    unless @isAnimating
      @isAnimating = true
      @currentSound = App.sfx.play("signature")

  stopAnimating: =>
    @isAnimating = false
    @doneReset = false
    @currentSound.stop()

  didComplete: =>
    @doneAnimating = true
    @isAnimating = false
    @trigger("signed")

  didReset: =>
    @doneReset = true

  hide: =>
    @el.visible = false
    @xText.visible = false

  show: =>
    @el.visible = true

  update: =>

    if @isAnimating
      if @signature.cropRect.width <= @originalWidth
        @signature.cropRect.width += @signatureSpeed
        @signature.updateCrop()
      else
        @didComplete()

    else if !@doneAnimating && !@doneReset
      if @signature.cropRect.width > 0
        @signature.cropRect.width -= @signatureSpeed
        @signature.updateCrop() if @signature.alive
      else
        @didReset()




