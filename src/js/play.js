/*global Game*/

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */

// Choose Random integer in a range
function rand (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// var musicOn = true;


var wKey;
var aKey;
var sKey;
var dKey;
var score = 0;
var toppingHeight = 0;

Game.Play = function(game) {
  this.game = game;
};

Game.Play.prototype = {
  create: function() {
    this.game.world.setBounds(0, 0 ,Game.w ,Game.h);
		this.game.stage.backgroundColor = '#fffacd';

    this.order_timer = this.game.time.now;

    // // Music
    // this.music = this.game.add.sound('music');
    // this.music.volume = 0.5;
    // this.music.play('',0,1,true);

    //Setup WASD and extra keys
    wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    // muteKey = game.input.keyboard.addKey(Phaser.Keyboard.M);

    // this.placedOrder = [];
    // this.placedOrderGroup = this.game.add.group(); 
    // this.currentOrder;

    this.chocolate_button = this.game.add.button(50,Game.h-200, this.makeCircle(50, '#8B4513'), this.addScoop, this);
    this.strawberry_button = this.game.add.button(125,Game.h-200, this.makeCircle(50, '#FDD7E4'), this.addScoop, this);
    this.vanilla_button = this.game.add.button(200,Game.h-200, this.makeCircle(50, '#FFFFFF'), this.addScoop, this);

    this.cone_button = this.game.add.button(Game.w-175,Game.h-200, this.makeCone(50,'#F0E68C'), this.placeCone, this);
    this.waffle_cone_button = this.game.add.button(Game.w-100,Game.h-200, this.makeCone(50,'#8B4513'), this.placeCone, this);


    //Actors
    this.actor = new Actor(this.game, 500, ['cone','vanilla'], 1000);
    this.actor.walk();

    this.icecream = new Icecream(this.game, Game.w/2, Game.h/2-100, ['cone', 'vanilla', 'strawberry', 'chocolate'],0.5);

    //Create Twitter button as invisible, show during win condition to post highscore
    this.twitterButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200,'twitter', this.twitter, this);
    this.twitterButton.anchor.set(0.5);
    this.twitterButton.visible = false;

  },
  makeOrder: function(size) {
    
    var order = [];
    this.order_timer = this.game.time.now + 10000;
    var cone = rand(0,1); 
    switch (cone) {
      case 0:
        order.push('cone');
        break;
      case 1:
        order.push('waffle_cone');
        break;
    }

    var scoop;
    for(var i=0;i<size;i++) {
      scoop = rand(0,2);
      switch (scoop) {
        case 1:
          order.push('chocolate');
          break;
        case 2:
          order.push('strawberry');
          break;
        default:
          order.push('vanilla');
      } 
    }
    return order;
  },
  addScoop: function(button) {
    if (toppingHeight === 0)
      return;

    var scoop = this.game.add.sprite(Game.w/2, -50, this.makeCircle(50,'#FFF'));
    toppingHeight += 15;

    if (this.vanilla_button === button) {
      this.placedOrder.push('vanilla');
    } else if (this.chocolate_button === button) {
      scoop.tint = 0x8B4513;
      this.placedOrder.push('chocolate');
    }else if (this.strawberry_button === button) {
      scoop.tint = 0xFDD7E4;
      this.placedOrder.push('strawberry');
    }

    this.placedOrderGroup.add(scoop);
    var t = this.game.add.tween(scoop).to({y: Game.h/2+200-toppingHeight}, 300, Phaser.Easing.Quadratic.InOut).start();
    console.log(this.placedOrder);
  },
  placeCone: function(button) {
    if (toppingHeight > 0) 
      return;

    var cone = this.game.add.sprite(Game.w/2, -50, this.makeCone(50,'#FFF'));

    if (this.cone_button === button) {
      cone.tint = 0xF0E68C;
      toppingHeight += 50;
      this.placedOrder.push('cone');
      var t = this.game.add.tween(cone).to({y: Game.h/2+200-toppingHeight}, 300, Phaser.Easing.Quadratic.InOut).start();
      toppingHeight += 15;
    }else if (this.waffle_cone_button === button) {
      cone.tint = 0x8B4513;
      toppingHeight += 50;
      this.placedOrder.push('waffle_cone');
      var t = this.game.add.tween(cone).to({y: Game.h/2+200-toppingHeight}, 300, Phaser.Easing.Quadratic.InOut).start();
      toppingHeight += 15;
    }

    this.placedOrderGroup.add(cone);
    console.log(this.placedOrder);
  },
  makeCone: function(size, color) {
    var bmd = this.game.add.bitmapData(size, size);
    bmd.ctx.clearRect(0,0,size,size);
    bmd.ctx.strokeStyle = '#FFF';
    bmd.ctx.fillStyle = color;
    bmd.ctx.lineWidth = 2;
    bmd.ctx.beginPath();
    bmd.ctx.moveTo(0, 0);
    bmd.ctx.lineTo(size/2, size);
    bmd.ctx.lineTo(size, 0);
    bmd.ctx.fill();
    return bmd;
  },
  makeCircle: function(circSize, color) {
    var bmd = this.game.add.bitmapData(circSize, circSize);
    bmd.circle(circSize/2,circSize/2,circSize/2, color);
    return bmd;
  },
  makeBox: function(x,y) {
    var bmd = this.game.add.bitmapData(x, y);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, x, y);
    bmd.ctx.fillStyle = '#fff';
    bmd.ctx.fill();
    return bmd;
  },
  update: function() {


    if (this.game.time.now > this.order_timer) {
      this.currentOrder = this.makeOrder(3);
      console.log(this.currentOrder);
    }

    if (JSON.stringify(this.currentOrder) === JSON.stringify(this.placedOrder)) {
      console.log('order up');
      this.placedOrderGroup.forEach(function(s) {
        s.kill();
      },this);
      toppingHeight = 0;
      this.order_timer = this.game.time.now + 10000;
      this.placedOrder = [];
      this.currentOrder = this.makeOrder(3);
      console.log(this.currentOrder);
    }


    // // Toggle Music
    // muteKey.onDown.add(this.toggleMute, this);

  },
  twitter: function() {
    //Popup twitter window to post highscore
    var game_url = 'http://www.divideby5.com/games/GAMETITLE/'; 
    var twitter_name = 'rantt_';
    var tags = ['1GAM'];

    window.open('http://twitter.com/share?text=My+best+score+is+'+score+'+playing+GAME+TITLE+See+if+you+can+beat+it.+at&via='+twitter_name+'&url='+game_url+'&hashtags='+tags.join(','), '_blank');
  },

  // toggleMute: function() {
  //   if (musicOn == true) {
  //     musicOn = false;
  //     this.music.volume = 0;
  //   }else {
  //     musicOn = true;
  //     this.music.volume = 0.5;
  //   }
  // },
  render: function() {
    // this.game.debug.text('Health: ' + tri.health, 32, 96);
    this.game.debug.body(this.actor); 
  }

};
