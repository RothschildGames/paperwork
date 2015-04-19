class App.Models.GameState extends Backbone.Model
  defaults:
    wave: 1
    health: 100
    gold: 10
    lowHealth: false
    gameOver: false

  initialize: ->
    @listenTo(App, 'lost-life', @_lostLife)
    @listenTo(App, 'monster-killed', @_gotLoot)
    @listenTo(App, 'installed-tower', @_installedTower)

  waveUp: ->
    @set('wave', @get('wave') + 1)

  _lostLife: (damage) ->
    @set('health', @get('health') - damage)
    @set('lowHealth', true) if @get('health') <= 20
    @set('gameOver', true) if @get('health') <= 0

  _gotLoot: (loot) ->
    @set('gold', @get('gold') + loot)

  _installedTower: (tower) ->
    @set('gold', @get('gold') - tower.get('price'))
