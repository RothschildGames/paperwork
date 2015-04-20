(function() {
  App.Game = (function() {
    var DEFAULT_CAMERA_SPEED, DEFAULT_LIVES, HEART, INITIAL_DELAY, MID_DELAY, NUMBER_OF_PAGES, ZERO_PADDING;

    function Game() {}

    DEFAULT_LIVES = 4;

    DEFAULT_CAMERA_SPEED = 3;

    NUMBER_OF_PAGES = 2;

    ZERO_PADDING = 8;

    HEART = "♥";

    INITIAL_DELAY = 800;

    MID_DELAY = 300;

    Game.prototype.HIT_MODIFIER = +150;

    Game.prototype.create = function() {
      App.sfx.start();
      ga('send', 'event', 'game', 'start');
      game.stage.backgroundColor = 0xDDDDDD;
      this.pagesSigned = 0;
      this.score = 0;
      this.lives = DEFAULT_LIVES;
      this.cameraSpeed = DEFAULT_CAMERA_SPEED;
      this.zIndex = NUMBER_OF_PAGES * 1000;
      this.start = false;
      this.delay = MID_DELAY;
      this._createScoreText();
      this._createHealthText();
      this.pages = [];
      _.times(NUMBER_OF_PAGES, (function(_this) {
        return function(idx) {
          return _this.createPage();
        };
      })(this));
      return this.delayBy(INITIAL_DELAY);
    };

    Game.prototype.delayBy = function(byMilis) {
      var timer;
      this.start = false;
      timer = game.time.create(true);
      timer.add(byMilis, (function(_this) {
        return function() {
          return _this.start = true;
        };
      })(this));
      return timer.start();
    };

    Game.prototype.createPage = function() {
      var page;
      page = new App.Views.Page(game, 0, 0);
      game.world.sendToBack(page.el);
      this.pages.push(page);
      return page;
    };

    Game.prototype.update = function() {
      var firstPage, i, len, newPage, page, ref;
      ref = this.pages;
      for (i = 0, len = ref.length; i < len; i++) {
        page = ref[i];
        page.update();
      }
      if (!this.start) {
        return;
      }
      firstPage = _.first(this.pages);
      firstPage.el.x -= this.cameraSpeed;
      window.first = firstPage;
      if (firstPage.el.x < -game.width) {
        this.scorePage(firstPage);
        firstPage.destroy();
        newPage = this.createPage();
        this.pages.shift(1);
        return this.pages.push(newPage);
      }
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
      this.delay = Math.max(100, MID_DELAY - (this.pagesSigned * 10));
      this.text.text = this.zeroPad(this.score);
      this.healthText.text = this.hearts(this.lives);
      if (misses > 0) {
        new App.Views.PenParticles(game, this.healthText.left, 15);
      }
      if (this.lives <= 0) {
        return this.endGame();
      } else {
        return this.delayBy(this.delay);
      }
    };

    Game.prototype.endGame = function() {
      return this.state.start('gameOver', true, false, this.score);
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
      this.healthText.fill = '#333333';
      return this.healthText.text = this.hearts(this.lives);
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
