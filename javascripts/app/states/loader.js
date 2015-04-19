(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App.Loader = (function() {
    function Loader() {
      this.startGame = bind(this.startGame, this);
    }

    Loader.prototype.ready = false;

    Loader.prototype.preload = function() {
      this._createLoadingUI();
      return this._loadGameAssets();
    };

    Loader.prototype._createLoadingUI = function() {
      var page, text;
      game.stage.backgroundColor = 0xDDDDDD;
      page = new App.Views.Page(game, 0, 0, {
        signatures: 0
      });
      page.text.visible = false;
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
      text = game.add.text(220, 740, 'Loading...');
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
      this.signature = new App.Views.Signature(game, 400, 800, page.color);
      this.signature.el.visible = false;
      this.signature.on("signed", (function(_this) {
        return function() {
          var started;
          return started = _this.startGame();
        };
      })(this));
      page.page.inputEnabled = true;
      page.page.events.onInputDown.add(this.startGame);
      return this.load.onLoadComplete.add((function(_this) {
        return function() {
          App.sfx.start();
          _this.loadingText.visible = false;
          _this.signToStart.visible = true;
          _this.signature.el.visible = true;
          return _this.ready = true;
        };
      })(this));
    };

    Loader.prototype.startGame = function() {
      if (this.ready) {
        return this.state.start('game');
      }
    };

    Loader.prototype._loadGameAssets = function() {
      return App.sfx = new App.Sfx(this);
    };

    Loader.prototype.update = function() {
      return this.signature.update();
    };

    return Loader;

  })();

}).call(this);
