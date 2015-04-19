(function() {
  App.Game = (function() {
    var NUMBER_OF_PAGES, create_page;

    function Game() {}

    Game.prototype.camera_speed = 3;

    NUMBER_OF_PAGES = 20;

    create_page = function() {
      var page;
      page = game.add.graphics(0, 0);
      page.beginFill(0xFFFFFF, 1);
      page.drawRect(margin, margin, game.width - (margin * 2), game.height - (margin * 2));
      return page;
    };

    Game.prototype.preload = function() {};

    Game.prototype.create = function() {
      App.sfx.start();
      ga('send', 'event', 'game', 'start');
      game.world.setBounds(0, 0, game.width * NUMBER_OF_PAGES, game.height);
      this.pages = [];
      _.times(NUMBER_OF_PAGES, (function(_this) {
        return function(idx) {
          return _this.pages.push(new App.Views.Page(game, game.width * (idx + 1), 0));
        };
      })(this));
      return game.stage.backgroundColor = 0xDDDDDD;
    };

    Game.prototype.update = function() {
      var i, len, page, ref;
      ref = this.pages;
      for (i = 0, len = ref.length; i < len; i++) {
        page = ref[i];
        page.update();
      }
      return game.camera.x += this.camera_speed;
    };

    return Game;

  })();

}).call(this);
