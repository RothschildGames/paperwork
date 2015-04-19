(function() {
  App.Boot = (function() {
    function Boot() {}

    Boot.prototype.init = function() {
      this.input.maxPointers = 1;
      return this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    };

    Boot.prototype.preload = function() {
      this.load.image('sig1', 'images/sig1.png');
      return this.load.image('sig2', 'images/sig2.png');
    };

    Boot.prototype.create = function() {
      return this.state.start('loader');
    };

    return Boot;

  })();

}).call(this);
