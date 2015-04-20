(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App.GameOver = (function() {
    function GameOver() {
      this.startGame = bind(this.startGame, this);
      this.addSignature = bind(this.addSignature, this);
    }

    GameOver.prototype.init = function(score) {
      this.score = score;
      return ga('send', 'event', 'game', 'over', this.score);
    };

    GameOver.prototype.preload = function() {
      game.stage.backgroundColor = 0xDDDDDD;
      this.page = new App.Views.Page(game, 0, 0, {
        signatures: 0
      });
      this.page.text.text = "\nGAME OVER\n\nTHIS GAME AGREEMENT (this “game”) has come to and end.\n\nYou scored: " + this.score + "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nSign here to try again:\n";
      return this.addSignature();
    };

    GameOver.prototype.addSignature = function() {
      this.signature = new App.Views.Signature(game, 400, 860, this.page.color);
      return this.signature.on("signed", (function(_this) {
        return function() {
          var started;
          return started = _this.startGame();
        };
      })(this));
    };

    GameOver.prototype.startGame = function() {
      return this.state.start('game');
    };

    GameOver.prototype.update = function() {
      var ref;
      return (ref = this.signature) != null ? ref.update() : void 0;
    };

    return GameOver;

  })();

}).call(this);
