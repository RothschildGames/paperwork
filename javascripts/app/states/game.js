(function() {
  App.Game = (function() {
    var DEFAULT_CAMERA_SPEED, DEFAULT_LIVES, HEART, NUMBER_OF_PAGES, ZERO_PADDING;

    function Game() {}

    DEFAULT_LIVES = 4;

    DEFAULT_CAMERA_SPEED = 3;

    NUMBER_OF_PAGES = 3;

    ZERO_PADDING = 8;

    HEART = "♥";

    Game.prototype.HIT_MODIFIER = +150;

    Game.prototype.create = function() {
      App.sfx.start();
      ga('send', 'event', 'game', 'start');
      this._createScoreText();
      this._createHealthText();
      this.pages = [];
      _.times(NUMBER_OF_PAGES, (function(_this) {
        return function(idx) {
          return _this.pages.push(new App.Views.Page(game, game.width * (idx + 1), 0));
        };
      })(this));
      game.stage.backgroundColor = 0xDDDDDD;
      this.pagesSigned = 0;
      this.score = 0;
      this.lives = DEFAULT_LIVES;
      return this.cameraSpeed = DEFAULT_CAMERA_SPEED;
    };

    Game.prototype.update = function() {
      var firstPage, i, len, newPage, page, ref;
      ref = this.pages;
      for (i = 0, len = ref.length; i < len; i++) {
        page = ref[i];
        page.update();
        page.el.x -= this.cameraSpeed;
      }
      firstPage = _.first(this.pages);
      if (firstPage.el.x < -game.width) {
        this.scorePage(firstPage);
        firstPage.destroy();
        newPage = new App.Views.Page(game, firstPage.el.x + game.width * NUMBER_OF_PAGES, 0);
        this.pages.shift(1);
        this.pages.push(newPage);
      }
      this.text.text = this.zeroPad(this.score);
      return this.healthText.text = this.hearts(this.lives);
    };

    Game.prototype.scorePage = function(page) {
      var expected, hits, misses;
      this.pagesSigned += 1;
      expected = page.expectedSignatures;
      hits = page.signedSignatures;
      misses = expected - hits;
      this.lives -= misses;
      this.score = Math.max(0, this.score + this.HIT_MODIFIER * hits);
      this.cameraSpeed = DEFAULT_CAMERA_SPEED + (this.pagesSigned / 4);
      if (this.lives <= 0) {
        return this.endGame();
      }
    };

    Game.prototype.endGame = function() {
      return console.log("Game Over");
    };

    Game.prototype._createScoreText = function() {
      this.text = game.add.text(10, 10, this.zeroPad(0));
      this.text.font = 'Courier';
      this.text.fontSize = 23;
      this.text.fontWeight = 200;
      return this.text.fill = '#333333';
    };

    Game.prototype._createHealthText = function() {
      this.healthText = game.add.text(game.width - 10, 10, "");
      this.healthText.anchor.setTo(1, 0);
      this.healthText.font = 'Courier';
      this.healthText.fontSize = 23;
      this.healthText.fontWeight = 200;
      return this.healthText.fill = '#333333';
    };

    Game.prototype.zeroPad = function(num) {
      var zero;
      zero = ZERO_PADDING - num.toString().length + 1;
      return Array(+(zero > 0 && zero)).join("0") + num;
    };

    Game.prototype.hearts = function(count) {
      return Array(1 + count).join(HEART);
    };

    return Game;

  })();

}).call(this);
