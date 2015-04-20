class App.Boot
  init: ->
    ga('send', 'event', 'game', 'init');
    @input.maxPointers = 1;
    @scale.scaleMode = Phaser.ScaleManager.EXACT_FIT

  preload: ->
    @load.image('sig1', 'images/sig1.png')
    @load.image('sig2', 'images/sig2.png')

  create: ->
    @state.start('loader')
