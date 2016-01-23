var Actor = function(game, order, wait, frame) {
  this.game = game;
  this.walk_time = 1000;
  this.active = false;
  this.wait = wait;
  this.order = order;
  this.orderReceived = false;
  this.icecream;
  this.facing_frame = frame; 
  this.walking_frame = frame+3;

  //order - what the actor will ask for
  //wait - how long to wait before leaving

  Phaser.Sprite.call(this, this.game, Game.w-100, Game.h/2, 'npcs', this.facing_frame);
  this.anchor.setTo(0.5);
  this.scale.x = 1;
  this.scale.y = 1;
  this.game.add.existing(this);
};

Actor.prototype = Object.create(Phaser.Sprite.prototype);
Actor.prototype.reset = function(order, wait, frame) {
  this.walk_time = 1000;
  this.active = false;
  this.wait = wait;
  this.order = order;
  this.orderReceived = false;
  this.icecream;
  this.facing_frame = frame; 
  this.walking_frame = frame+3;
  this.frame = frame;
  this.alive = true;

  Phaser.Sprite.call(this, this.game, Game.w-100, Game.h/2, 'npcs', this.facing_frame);
  this.anchor.setTo(0.5);
  this.scale.x = 1;
  this.scale.y = 1;
};
Actor.prototype.walkin = function() {
  if (this.walking) {return;}
  this.walking = true;

  var t = this.game.add.tween(this)
            .to({x:Game.w/2-50}, this.walk_time, Phaser.Easing.Linear.None)
            .start();
  this.frame = this.walking_frame;

  t.onComplete.add(function() {
    this.active = true;
    this.wait = this.game.time.now + this.wait;
    this.speech = this.game.add.group();

    var limit = 2;
    for (var j = 0; j < limit; j++) {
      var frame = j;
      if (limit == 2) {
        if (j === 1) {
          frame = 2;
        }
      }
      var speech = this.game.add.sprite(Game.w/2-200, Game.h/2-100-100*j, 'speech',frame);
      speech.anchor.setTo(0.5);
      speech.scale.x = 2;
      speech.scale.y = 2;
      speech.tint = 0xdcdcdc;
      this.speech.add(speech);
    }

    this.icecream = new Icecream(this.game, Game.w/2-200, Game.h/2-300, this.order,0.75);
    this.walking = false;
    this.frame = this.facing_frame;
  },this);
};
Actor.prototype.walkout = function() {
  if (this.walking) {return;}

  this.speech.forEach(function(s) {
    s.kill();
  },this);

  if (this.orderReceived === false) {  
    this.icecream.kill();
  }else {
    this.icecream.mycone.forEach(function(s) {
      this.game.add.tween(s)
            .to({x:-100, y: s.y+200}, this.walk_time+200, Phaser.Easing.Linear.None)
            .start();
    },this);
  }

  this.walking = true;
  this.frame = this.walking_frame;
  var t = this.game.add.tween(this)
            .to({x:-100}, this.walk_time, Phaser.Easing.Linear.None)
            .start();

  t.onComplete.add(function() {
    this.kill();
    this.icecream.kill();
    this.walking = false;
  },this);
};

Actor.prototype.constructor = Actor;
