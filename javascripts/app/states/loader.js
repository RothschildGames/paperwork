(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App.Loader = (function() {
    function Loader() {
      this.startGame = bind(this.startGame, this);
      this.onReady = bind(this.onReady, this);
      this.addSignature = bind(this.addSignature, this);
    }

    Loader.prototype.ready = false;

    Loader.prototype.preload = function() {
      this._createLoadingUI();
      return this._loadGameAssets();
    };

    Loader.prototype._createLoadingUI = function() {
      var text;
      game.stage.backgroundColor = 0xDDDDDD;
      this.page = new App.Views.Page(game, 0, 0, {
        signatures: 0
      });
      this.page.text.visible = false;
      text = game.add.text(180, 240, 'Paper\nWork');
      text.align = 'center';
      text.wordWrapWidth = 3000;
      text.wordWrap = true;
      text.font = 'Courier';
      text.fontSize = 120;
      text.fontWeight = 800;
      text.fill = '#333333';
      text = game.add.text(220, 540, 'by @yonbergman');
      text.align = 'center';
      text.font = 'Courier';
      text.fontSize = 33;
      text.fontWeight = 200;
      text.fill = '#333333';
      text = game.add.text(180, 740, 'Loading Documents...');
      text.align = 'center';
      text.font = 'Courier';
      text.fontSize = 33;
      text.fontWeight = 200;
      text.fill = '#333333';
      this.loadingText = text;
      text = game.add.text(180, 740, 'Sign here to start:');
      text.align = 'center';
      text.font = 'Courier';
      text.fontSize = 33;
      text.fontWeight = 200;
      text.fill = '#333333';
      text.visible = false;
      this.signToStart = text;
      return this.load.onLoadComplete.add(this.onReady);
    };

    Loader.prototype.addSignature = function() {
      this.signature = new App.Views.Signature(game, 400, 800, this.page.color);
      return this.signature.on("signed", (function(_this) {
        return function() {
          var started;
          return started = _this.startGame();
        };
      })(this));
    };

    Loader.prototype.onReady = function() {
      App.sfx.start();
      this.loadingText.visible = false;
      this.signToStart.visible = true;
      this.addSignature();
      return this.ready = true;
    };

    Loader.prototype.startGame = function() {
      if (this.ready) {
        return this.state.start('help');
      }
    };

    Loader.prototype._loadGameAssets = function() {
      return App.sfx = new App.Sfx(this);
    };

    Loader.prototype.update = function() {
      var ref;
      return (ref = this.signature) != null ? ref.update() : void 0;
    };

    return Loader;

  })();

}).call(this);
