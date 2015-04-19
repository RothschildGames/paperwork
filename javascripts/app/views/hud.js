(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App.Views.HUD = (function() {
    function HUD(game1, gameState) {
      this.game = game1;
      this.gameState = gameState;
      this.renderWave = bind(this.renderWave, this);
      this.renderHealth = bind(this.renderHealth, this);
      this.renderScore = bind(this.renderScore, this);
    }

    HUD.prototype.create = function() {
      var battery, i, j, shape;
      this.waveShapes = [];
      for (i = j = 0; j <= 4; i = ++j) {
        shape = this.game.add.graphics(17 + 15 * i, 26);
        this.waveShapes.push(shape);
      }
      this.scoreText = this.game.add.text(93, 12, "400 G");
      this.scoreText.font = 'Helvetica Neue';
      this.scoreText.fontSize = 24;
      this.scoreText.fontWeight = 200;
      this.scoreText.fill = '#FFFFFF';
      this.titleText = this.game.add.text(game.world.centerX, 12, "APPATK");
      this.titleText.anchor.setTo(.5, 0);
      this.titleText.font = 'Helvetica Neue';
      this.titleText.fontSize = 25;
      this.titleText.fontWeight = 500;
      this.titleText.fill = '#FFFFFF';
      this.healthText = this.game.add.text(680, 12, "100%");
      this.healthText.anchor.setTo(1, 0);
      this.healthText.font = 'Helvetica Neue';
      window.foo = this.healthText;
      this.healthText.fontSize = 24;
      this.healthText.fontWeight = 200;
      this.healthText.fill = '#FFFFFF';
      battery = this.game.add.el(738, 17, 'battery');
      battery.anchor.setTo(1, 0);
      this.batteryFill = this.game.add.graphics(691, 19);
      this.batteryFill.beginFill(0xFFFFFF, 1);
      this.batteryFill.drawRect(0, 0, 40, 14);
      this.renderHealth();
      this.renderWave();
      this.renderScore();
      this.gameState.on('change:health', this.renderHealth);
      this.gameState.on('change:gold', this.renderScore);
      return this.gameState.on('change:wave', this.renderWave);
    };

    HUD.prototype.renderScore = function() {
      return this.scoreText.text = (this.gameState.get('gold')) + " G";
    };

    HUD.prototype.renderHealth = function() {
      var percent;
      percent = Math.min(Math.max(0, parseInt(this.gameState.get('health'))), 100);
      this.healthText.text = percent + "%";
      this.batteryFill.scale.x = percent / 100;
      if (this.gameState.get('lowHealth')) {
        this.batteryFill.tint = 0xff3b30;
      } else {
        this.batteryFill.tint = 0xffffff;
      }
      return this.batteryFill.dirty = true;
    };

    HUD.prototype.renderWave = function() {
      var idx, j, len, ref, results, shape, wave;
      wave = Math.min(Math.max(0, parseInt(this.gameState.get('wave'))), 5);
      ref = this.waveShapes;
      results = [];
      for (idx = j = 0, len = ref.length; j < len; idx = ++j) {
        shape = ref[idx];
        shape.clear();
        shape.lineStyle(1, 0xFFFFFF, 1);
        if (idx < wave) {
          shape.beginFill(0xFFFFFF, 1);
        }
        results.push(shape.drawCircle(0, 0, 11));
      }
      return results;
    };

    return HUD;

  })();

}).call(this);
