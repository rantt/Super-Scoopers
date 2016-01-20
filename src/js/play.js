/*global Game*/

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */

// // Choose Random integer in a range
// function rand (min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

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

    // this.strawberry = this.game.add.sprite(100,100, this.makeBox(40, 40));
    // this.strawberry.tint = 0xff0000;

    this.placedOrder = [];

    // this.chocolate_button = this.game.add.sprite(50,Game.h-200, this.makeCircle(50, '#8B4513'));
    this.chocolate_button = this.game.add.button(50,Game.h-200, this.makeCircle(50, '#8B4513'), this.addScoop, this);
    // this.strawberry_button = this.game.add.sprite(125,Game.h-200, this.makeCircle(50, '#FDD7E4'));
    this.strawberry_button = this.game.add.button(125,Game.h-200, this.makeCircle(50, '#FDD7E4'), this.addScoop, this);
    this.vanilla_button = this.game.add.button(200,Game.h-200, this.makeCircle(50, '#FFFFFF'), this.addScoop, this);

    this.cone_button = this.game.add.button(Game.w-175,Game.h-200, this.makeCone(50,'#F0E68C'), this.placeCone, this);
    this.waffle_cone_button = this.game.add.button(Game.w-100,Game.h-200, this.makeCone(50,'#8B4513'), this.placeCone, this);


    //Create Twitter button as invisible, show during win condition to post highscore
    this.twitterButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200,'twitter', this.twitter, this);
    this.twitterButton.anchor.set(0.5);
    this.twitterButton.visible = false;

  },
  addScoop: function(button) {
    var scoop = this.game.add.sprite(Game.w/2, -50, this.makeCircle(50,'#FFF'));
    toppingHeight += 15;
    this.placedOrder.push('icecream');

    // if (this.vanilla_button === button) {
      // var scoop = this.game.add.sprite(Game.w/2, -50, this.makeCircle(50,'#FFF'));
      // this.placedOrder.push(scoop);
    // }
    if (this.chocolate_button === button) {
      scoop.tint = 0x8B4513;
    }else if (this.strawberry_button === button) {
      scoop.tint = 0xFDD7E4;
    }
    var t = this.game.add.tween(scoop).to({y: Game.h/2+200-toppingHeight}, 300, Phaser.Easing.Quadratic.InOut).start();
  },
  placeCone: function(button) {
    if (toppingHeight > 0) 
      return

    if (this.cone_button === button) {
      console.log('reg cone');
      var cone = this.game.add.sprite(Game.w/2, -50, this.makeCone(50,'#F0E68C'));
      toppingHeight += 50;
      this.placedOrder.push('cone');
      // this.placedOrder.push(cone);
      var t = this.game.add.tween(cone).to({y: Game.h/2+200-toppingHeight}, 300, Phaser.Easing.Quadratic.InOut).start();
      toppingHeight += 15;
    }else if (this.waffle_cone_button === button) {
      toppingHeight += 50;
      // this.placedOrder.push('waffle_cone');
      console.log('waffle cone');
      var waffle_cone = this.game.add.sprite(Game.w/2, -50, this.makeCone(50,'#8B4513'));
      // this.placedOrder.push(waffle_cone);
      this.placedOrder.push('cone');
      this.placedOrder.push(waffle_cone);
      var t = this.game.add.tween(waffle_cone).to({y: Game.h/2+200-toppingHeight}, 300, Phaser.Easing.Quadratic.InOut).start();
      toppingHeight += 15;
      // console.log(this.placedOrder);
    }
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
  // render: function() {
  //   game.debug.text('Health: ' + tri.health, 32, 96);
  // }

};
