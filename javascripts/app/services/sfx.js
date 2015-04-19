(function() {
  App.Sfx = (function() {
    Sfx.prototype.music = ['sfx/ScruffHouse.ogg', 'sfx/ScruffHouse.mp3', 'sfx/ScruffHouse.m4a'];

    Sfx.prototype.soundsSources = {
      signature: ['sig1', 'sig2', 'sig3', 'sig4', 'sig5', 'sig6', 'sig7']
    };

    Sfx.prototype.sounds = {};

    function Sfx(game1) {
      var file, i, idx, key, len, ref, soundKey, soundObjects, values;
      this.game = game1;
      this.playingMusic = false;
      ref = this.soundsSources;
      for (key in ref) {
        values = ref[key];
        soundObjects = [];
        for (idx = i = 0, len = values.length; i < len; idx = ++i) {
          file = values[idx];
          soundKey = "" + key + idx;
          game.load.audio(soundKey, "sfx/" + file + ".wav");
          soundObjects.push(soundKey);
        }
        this.sounds[key] = soundObjects;
      }
      game.load.audio('bgmusic', this.music);
    }

    Sfx.prototype.start = function() {
      if (!this.playingMusic) {
        this.game.add.audio('bgmusic', 0.25, true).play();
      }
      return this.playingMusic = true;
    };

    Sfx.prototype.play = function(key) {
      var soundKey;
      soundKey = _.sample(this.sounds[key]);
      return this.game.add.audio(soundKey, 6).play();
    };

    return Sfx;

  })();

}).call(this);
