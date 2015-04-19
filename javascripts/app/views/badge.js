(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  App.Views.Badge = (function(superClass) {
    extend(Badge, superClass);

    Badge.prototype.color = 0xff0000;

    function Badge(game, x, y, number) {
      Badge.__super__.constructor.call(this, game, x, y);
      this.beginFill(this.color, 1);
      this.drawCircle(0, 0, 44);
      game.add.existing(this);
      this.text = this.game.add.text(0, 0, number);
      this.text.anchor.setTo(.5);
      this.text.font = 'Helvetica Neue';
      this.text.fontSize = 23;
      this.text.fontWeight = 200;
      this.text.fill = '#FFFFFF';
      this.addChild(this.text);
    }

    return Badge;

  })(Phaser.Graphics);

}).call(this);
