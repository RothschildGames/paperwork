(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Views.PenParticles = (function(superClass) {
    extend(PenParticles, superClass);

    PenParticles.load = function(game) {
      var bmd, radgrad;
      bmd = game.add.bitmapData(24, 24);
      bmd.ctx.create;
      radgrad = bmd.ctx.createRadialGradient(12, 12, 4, 12, 12, 12);
      radgrad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      radgrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      bmd.context.fillStyle = radgrad;
      bmd.context.fillRect(0, 0, 24, 24);
      return game.cache.addBitmapData('particle', bmd);
    };

    function PenParticles(game, x, y, quantity, lifespan) {
      if (quantity == null) {
        quantity = 20;
      }
      if (lifespan == null) {
        lifespan = 600;
      }
      PenParticles.__super__.constructor.call(this, game, x, y, quantity);
      this.makeParticles(game.cache.getBitmapData('particle'));
      this.lifespan = lifespan;
      this.gravity = 0;
      this.explode(this.lifespan, quantity);
      this.counter = 0;
    }

    PenParticles.prototype.update = function() {
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

    return PenParticles;

  })(Phaser.Particles.Arcade.Emitter);

}).call(this);
