(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App.Views.Signature = (function() {
    Signature.prototype.signatureSpeed = 4;

    Signature.prototype.images = ['sig1', 'sig2'];

    Signature.prototype.isAnimating = false;

    Signature.prototype.doneAnimating = false;

    Signature.prototype.doneReset = false;

    Signature.signature_height = 30;

    Signature.signature_width = 140;

    Signature.signature_padding = 20;

    Signature.prototype.signature_line_height = 3;

    function Signature(game, x, y, color) {
      var signatureContainer, xText;
      this.game = game;
      this.x = x;
      this.y = y;
      this.color = color;
      this.update = bind(this.update, this);
      this.didReset = bind(this.didReset, this);
      this.didComplete = bind(this.didComplete, this);
      this.stopAnimating = bind(this.stopAnimating, this);
      this.startAnimating = bind(this.startAnimating, this);
      signatureContainer = this.game.add.graphics(this.x, this.y);
      signatureContainer.beginFill(this.color, 1);
      signatureContainer.drawRect(0, 0, App.Views.Signature.signature_width + App.Views.Signature.signature_padding * 2, App.Views.Signature.signature_height + App.Views.Signature.signature_padding * 2);
      signatureContainer.beginFill(0x333333, 1);
      signatureContainer.drawRect(App.Views.Signature.signature_padding, App.Views.Signature.signature_padding + App.Views.Signature.signature_height - 5, App.Views.Signature.signature_width, this.signature_line_height);
      signatureContainer.inputEnabled = true;
      signatureContainer.events.onInputDown.add((function(_this) {
        return function() {
          return _this.startAnimating();
        };
      })(this));
      signatureContainer.events.onInputUp.add((function(_this) {
        return function() {
          return _this.stopAnimating();
        };
      })(this));
      this.el = signatureContainer;
      xText = this.game.add.text(App.Views.Signature.signature_padding, App.Views.Signature.signature_padding, "X");
      xText.font = 'Courier';
      xText.fontSize = 23;
      xText.fontWeight = 400;
      xText.fill = '#333333';
      signatureContainer.addChild(xText);
      this.signature = this.game.add.image(App.Views.Signature.signature_padding, 0, _.sample(this.images));
      signatureContainer.addChild(this.signature);
      this.originalWidth = this.signature.width;
      this.originalHeight = this.signature.height;
      this.signature.height = App.Views.Signature.signature_width * this.signature.height / this.signature.width;
      this.signature.width = App.Views.Signature.signature_width;
      this.signature.anchor.setTo(0, 0);
      this.signature.crop(new Phaser.Rectangle(0, 0, 0, this.originalHeight));
      _.extend(this, Backbone.Events);
    }

    Signature.prototype.startAnimating = function() {
      if (!this.isAnimating) {
        this.isAnimating = true;
        return this.currentSound = App.sfx.play("signature");
      }
    };

    Signature.prototype.stopAnimating = function() {
      this.isAnimating = false;
      this.doneReset = false;
      return this.currentSound.stop();
    };

    Signature.prototype.didComplete = function() {
      this.doneAnimating = true;
      this.isAnimating = false;
      return this.trigger("signed");
    };

    Signature.prototype.didReset = function() {
      return this.doneReset = true;
    };

    Signature.prototype.update = function() {
      if (this.isAnimating) {
        if (this.signature.cropRect.width <= this.originalWidth) {
          this.signature.cropRect.width += this.signatureSpeed;
          return this.signature.updateCrop();
        } else {
          return this.didComplete();
        }
      } else if (!this.doneAnimating && !this.doneReset) {
        if (this.signature.cropRect.width > 0) {
          this.signature.cropRect.width -= this.signatureSpeed;
          return this.signature.updateCrop();
        } else {
          return this.didReset();
        }
      }
    };

    return Signature;

  })();

}).call(this);
