(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App.Help = (function() {
    function Help() {
      this.startGame = bind(this.startGame, this);
      this.onReady = bind(this.onReady, this);
      this.addSignature = bind(this.addSignature, this);
    }

    Help.prototype.didSeeOnce = false;

    Help.prototype.preload = function() {
      game.stage.backgroundColor = 0xDDDDDD;
      this.page = new App.Views.Page(game, 0, 0, {
        signatures: 0
      });
      this.page.text.text = "\nGAME AGREEMENT\n\nTHIS GAME AGREEMENT (this “game”) made and entered into and made effective this ____ day of _____________, 2015, by and between Rothschild Games., a game company (hereinafter referred to as “Owner”) and PLAYER, L.L.C., a limited liability company, (hereinafter referred to as “Tenant”).\nWHEREAS, Owner and Tenant desire to enter into a GAME Agreement and memorialize the terms of the lease between Owner and Tenant.\n\nGAME RULES\n\nIn PAPERWORK (this \"game\") your job as decribed by appendix A/13 is to KEEP SIGNING DOCUMENTS as they pass your screen.\n\nThe amount of papers you sign will directly influence your score compensation based on the common formula in section 7 of the Ludum Law\n\n\nSign here to start:\n";
      return this.addSignature();
    };

    Help.prototype.addSignature = function() {
      this.signature = new App.Views.Signature(game, 400, 860, this.page.color);
      return this.signature.on("signed", (function(_this) {
        return function() {
          var started;
          return started = _this.startGame();
        };
      })(this));
    };

    Help.prototype.onReady = function() {
      return this.addSignature();
    };

    Help.prototype.startGame = function() {
      return this.state.start('game');
    };

    Help.prototype.update = function() {
      var ref;
      return (ref = this.signature) != null ? ref.update() : void 0;
    };

    return Help;

  })();

}).call(this);
