var Actor = function(game, delay, order, wait) {
  this.game = game;
  this.delay = this.game.time.now + this.delay;
  this.walk_time = 2000;
  this.wait = this.delay + this.walk_time + wait;
  this.order = order;
  this.orderReceived = false;
  this.icecream;

  //delay - time to wait before walking out on the screen
  //order - what the actor will ask for
  //wait - how long to wait before leaving

  Phaser.Sprite.call(this, this.game, Game.w+100, Game.h/2+50, 'npcs', 0);
  this.anchor.setTo(0.5);
  this.scale.x = 2;
  this.scale.y = 2;
  this.game.add.existing(this);
  this.walkin();
};

Actor.prototype = Object.create(Phaser.Sprite.prototype);
Actor.prototype.walkin = function() {
  if (this.walking) {return;}
  this.walking = true;

  var t = this.game.add.tween(this)
            .to({x:Game.w/2-50}, this.walk_time, Phaser.Easing.Linear.None)
            .start()
  this.frame = 3;

  t.onComplete.add(function() {
    this.icecream = new Icecream(this.game, Game.w/2-125, Game.h/2-150, this.order,0.5);
    this.walking = false;
    this.frame = 0;
  },this);
};
Actor.prototype.walkout = function() {
  if (this.walking) {return;}
  this.walking = true;
  this.frame = 3;
  var t = this.game.add.tween(this)
            .to({x:-100}, this.walk_time, Phaser.Easing.Linear.None)
            .start()

  t.onComplete.add(function() {
    this.icecream.kill();
    this.walking = false;
  },this);
};

Actor.prototype.constructor = Actor;
