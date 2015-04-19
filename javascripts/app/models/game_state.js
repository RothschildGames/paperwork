(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Models.GameState = (function(superClass) {
    extend(GameState, superClass);

    function GameState() {
      return GameState.__super__.constructor.apply(this, arguments);
    }

    GameState.prototype.defaults = {
      wave: 1,
      health: 100,
      gold: 10,
      lowHealth: false,
      gameOver: false
    };

    GameState.prototype.initialize = function() {
      this.listenTo(App, 'lost-life', this._lostLife);
      this.listenTo(App, 'monster-killed', this._gotLoot);
      return this.listenTo(App, 'installed-tower', this._installedTower);
    };

    GameState.prototype.waveUp = function() {
      return this.set('wave', this.get('wave') + 1);
    };

    GameState.prototype._lostLife = function(damage) {
      this.set('health', this.get('health') - damage);
      if (this.get('health') <= 20) {
        this.set('lowHealth', true);
      }
      if (this.get('health') <= 0) {
        return this.set('gameOver', true);
      }
    };

    GameState.prototype._gotLoot = function(loot) {
      return this.set('gold', this.get('gold') + loot);
    };

    GameState.prototype._installedTower = function(tower) {
      return this.set('gold', this.get('gold') - tower.get('price'));
    };

    return GameState;

  })(Backbone.Model);

}).call(this);
