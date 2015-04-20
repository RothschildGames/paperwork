(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App.Views.Page = (function() {
    Page.prototype.signature_count = 2;

    Page.prototype.color = 0xF5F3E3;

    Page.prototype.page_height_ratio = 14 / 8.5;

    Page.prototype.page_margin = 50;

    Page.prototype.page_padding = 20;

    function Page(game1, x1, y1, options) {
      this.game = game1;
      this.x = x1;
      this.y = y1;
      this.options = options != null ? options : {
        signatures: this.signature_count
      };
      this.update = bind(this.update, this);
      this.createSignature = bind(this.createSignature, this);
      this.destroy = bind(this.destroy, this);
      this._createText = bind(this._createText, this);
      this._createPage = bind(this._createPage, this);
      this._createPage();
      this._createText();
      if (this.options.signatures > 0) {
        this.sigs = [];
        _.times(game.rnd.between(1, this.signature_count), (function(_this) {
          return function() {
            return _this.sigs.push(_this.createSignature());
          };
        })(this));
        this.expectedSignatures = this.sigs.length;
        this.signedSignatures = 0;
      }
      this.el = this.page;
    }

    Page.prototype._createPage = function() {
      this.page = this.game.add.graphics(this.x, this.y);
      this.page.anchor = new Phaser.Point(0, 0);
      this.paper_width = this.game.width - (this.page_margin * 2);
      this.page_height = this.paper_width * this.page_height_ratio;
      this.page.beginFill(0, 0.3);
      this.page.drawRect(this.page_margin + 10, this.page_margin + 10, this.paper_width, this.page_height);
      this.page.beginFill(this.color, 1);
      return this.page.drawRect(this.page_margin, this.page_margin, this.paper_width, this.page_height);
    };

    Page.prototype._createText = function() {
      var results;
      this.text = this.game.add.text(this.page_margin + this.page_padding, this.page_margin + this.page_padding, Legal.generate(2));
      this.text.wordWrapWidth = this.paper_width - (this.page_padding * 2);
      this.text.wordWrap = true;
      this.text.font = 'Courier';
      this.text.fontSize = 23;
      this.text.fontWeight = 200;
      this.text.fill = '#333333';
      this.text.cacheAsBitmap = true;
      this.page.addChild(this.text);
      if (this.text.text.length > 0) {
        if (this.text.height > (this.page_height - this.page_padding) * 1.3) {
          this.text.text = this.text.text.substring(this.text.text.length / 2);
        }
        results = [];
        while (this.text.height > (this.page_height - this.page_padding)) {
          results.push(this.text.text = this.text.text.replace(/\s*\S$/, ''));
        }
        return results;
      }
    };

    Page.prototype.destroy = function() {
      return this.el.destroy(true);
    };

    Page.prototype.createSignature = function() {
      var signature, x, y;
      x = game.rnd.between(this.text.left, this.text.right - App.Views.Signature.signature_width - App.Views.Signature.signature_padding);
      y = game.rnd.between(this.text.top, this.page_height - App.Views.Signature.signature_height - App.Views.Signature.signature_padding);
      signature = new App.Views.Signature(game, x, y, this.color);
      signature.on("signed", (function(_this) {
        return function() {
          return _this.signedSignatures += 1;
        };
      })(this));
      this.page.addChild(signature.el);
      return signature;
    };

    Page.prototype.update = function() {
      var i, len, ref, results, sig;
      ref = this.sigs;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        sig = ref[i];
        results.push(sig.update());
      }
      return results;
    };

    return Page;

  })();

}).call(this);
