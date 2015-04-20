class App.Sfx

  playingMusic: false
  music: ['sfx/ScruffHouse.ogg', 'sfx/ScruffHouse.mp3', 'sfx/ScruffHouse.m4a']

  soundsSources:
    signature: ['sig1', 'sig2', 'sig3', 'sig4', 'sig5', 'sig6', 'sig7']
  sounds: {}

  constructor: (@game) ->
    @playingMusic = false
    for key, values of @soundsSources
      soundObjects = []
      for file, idx in values
        soundKey = "#{key}#{idx}"
        game.load.audio(soundKey, "sfx/#{file}.wav")
        soundObjects.push soundKey
      @sounds[key] = soundObjects

    game.load.audio('bgmusic', @music)

  start: ->
    @game.add.audio('bgmusic', 0.25, true).play() unless @playingMusic
    @playingMusic = true

  play: (key) ->
    soundKey = _.sample(@sounds[key])
    @game.add.audio(soundKey, 6).play()
