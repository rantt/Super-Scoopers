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

    // this.order_timer = this.game.time.now;

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
    
    //Actors
    this.actor = new Actor(this.game, 500, ['cone','vanilla','chocolate','strawberry'], 1000);
    //Table
    // var table = this.game.add.sprite(Game.w/2, Game.h-150, this.makeBox(600,300));
    var table = this.game.add.sprite(Game.w/2, Game.h-150, 'cart');
    table.anchor.setTo(0.5);
    // table.tint = 0x808080;

    
    this.placedOrder = new Icecream(this.game, Game.w/2, Game.h/2);

    this.chocolate_button = this.game.add.button(40,Game.h-260, this.makeCircle(50, '#8B4513'), function() {
      this.placedOrder.add('chocolate');
    }, this);

    this.strawberry_button = this.game.add.button(115,Game.h-260, this.makeCircle(50, '#FDD7E4'), function() {
      this.placedOrder.add('strawberry');
    }, this);
    this.vanilla_button = this.game.add.button(190,Game.h-260, this.makeCircle(50, '#FFFFFF'), function() {
      this.placedOrder.add('vanilla');
    },this);
    
    this.cone_button = this.game.add.button(Game.w-100,Game.h-265, this.makeCone(50,'#F0E68C'), function() {
      this.placedOrder.add('cone');
    }, this);
    this.waffle_cone_button = this.game.add.button(Game.w-100,Game.h-200, this.makeCone(50,'#8B4513'), function() {
      this.placedOrder.add('waffle_cone');
    }, this);
    


    //Create Twitter button as invisible, show during win condition to post highscore
    this.twitterButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200,'twitter', this.twitter, this);
    this.twitterButton.anchor.set(0.5);
    this.twitterButton.visible = false;

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

    if (JSON.stringify(this.actor.order) === JSON.stringify(this.placedOrder.toppings)) {
      this.actor.orderReceived = true;
      this.actor.walkout();

      console.log('the same');
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
