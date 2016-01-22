var Actor = function(game, delay, order, wait) {
  this.game = game;
  this.delay = this.game.time.now;
  this.order = order;

  //delay - time to wait before walking out on the screen
  //order - what the actor will ask for
  //wait - how long to wait before leaving

  Phaser.Sprite.call(this, this.game, Game.w+100, Game.h/2+50, 'npcs', 0);
  this.anchor.setTo(0.5);
  this.scale.x = 2;
  this.scale.y = 2;
  this.game.add.existing(this);
};

Actor.prototype = Object.create(Phaser.Sprite.prototype);
Actor.prototype.walk = function() {
  if (this.walking) {return;}
  this.walking = true;

  var t = this.game.add.tween(this)
            .to({x:Game.w/2-50}, 2000, Phaser.Easing.Linear.None)
            .start()
  this.frame = 3;

  t.onComplete.add(function() {
    var icecream = new Icecream(this.game, Game.w/2-50, Game.h/2-50, this.order,0.5);
    this.walking = false;
    this.frame = 0;
  },this);
};
Actor.prototype.constructor = Actor;
