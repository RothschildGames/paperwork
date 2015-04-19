(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Views.MonsterParticles = (function(superClass) {
    extend(MonsterParticles, superClass);

    function MonsterParticles(game, x, y, color, quantity, lifespan) {
      if (quantity == null) {
        quantity = 25;
      }
      if (lifespan == null) {
        lifespan = 1000;
      }
      MonsterParticles.__super__.constructor.call(this, game, x, y, quantity);
      this.makeParticles('death-particle');
      this.lifespan = lifespan;
      this.forEach((function(_this) {
        return function(particle) {
          return particle.tint = color;
        };
      })(this));
      this.gravity = 1;
      this.explode(this.lifespan, quantity);
      this.counter = 0;
    }

    MonsterParticles.prototype.update = function() {
      this.counter += 1;
      this.forEachAlive((function(_this) {
        return function(particle) {
          return particle.alpha = particle.lifespan / _this.lifespan;
        };
      })(this));
      if (this.counter > 100) {
        return this.kill();
      }
    };

    return MonsterParticles;

  })(Phaser.Particles.Arcade.Emitter);

}).call(this);
