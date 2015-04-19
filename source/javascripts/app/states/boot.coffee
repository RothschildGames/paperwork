class App.Boot
  init: ->
    @input.maxPointers = 1;
    @scale.scaleMode = Phaser.ScaleManager.EXACT_FIT

  preload: ->
    # @load.image('loading-background', 'images/loading-background.png')

  create: ->
    @state.start('game')
