class App.Sfx

  music: ['sfx/RinbackTone.ogg', 'sfx/RinbackTone.mp3', 'sfx/RinbackTone.m4a']

  soundsSources:
    killMonster: ['coin-01', 'coin-02', 'coin-03', 'coin-04']
    damageMonster: ['monster-hit-1', 'monster-hit-2', 'monster-hit-3']
    loseHealth: ['lose-1', 'lose-2', 'lose-3']
    install: ['install-01', 'install-02', 'install-03']
    Splashy: ['splashy']
    Shooty: ['shooty']
    Slowey: ['slowy']
    Snipey: ['snipey']
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

    AppAtk.on('monster-hit', (monster) => @play('damageMonster') )
    AppAtk.on('monster-killed', (monster) => @play('killMonster') )
    AppAtk.on('lost-life', => @play('loseHealth') )
    AppAtk.on('installed-tower', => @play('install') )
    AppAtk.on('tower-fired', (tower) => @play(tower.get('name')) )

  start: ->
    @game.add.audio('bgmusic', 0.25, true).play() unless @playingMusic
    @playingMusic = true

  play: (key) ->
    soundKey = _.sample(@sounds[key])
    @game.add.audio(soundKey).play()
