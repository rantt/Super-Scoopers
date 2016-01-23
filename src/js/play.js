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
var level = 1;
var customers=money=0;
var delay;
var scoopmax;
var strikes = 0;

var levelNames = ["First Day",
                  "Doing Pretty Good",
                  "Scoop Pro",
                  "Super Scooper!",
                  "Scooptacular",
                  "Wrists of Steel",
                  ];

Game.Play = function(game) {
  this.game = game;
};

Game.Play.prototype = {
  create: function() {
    this.game.world.setBounds(0, 0 ,Game.w ,Game.h);
		this.game.stage.backgroundColor = '#63E1FF';

    this.highestScore = parseInt(JSON.parse(localStorage.getItem('atSuperScoopersHighestScore')));
    // this.order_timer = this.game.time.now;

    // Music
    this.music = this.game.add.sound('music');
    this.music.play('',0,0.5,true);

    //Setup WASD and extra keys
    wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
    aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    // muteKey = game.input.keyboard.addKey(Phaser.Keyboard.M);

    //Actors
    this.actor = new Actor(this.game, ['waffle_cone','strawberry'], 6000,10);
    this.actor.walkin();

    //Table
    // var table = this.game.add.sprite(Game.w/2, Game.h-150, this.makeBox(600,300));
    var table = this.game.add.sprite(Game.w/2, Game.h-150, 'cart');
    table.anchor.setTo(0.5);
    // table.tint = 0x808080;

    
    this.placedOrder = new Icecream(this.game, Game.w/2, Game.h/2);

    this.chocolate_button = this.game.add.button(40,Game.h-260, 'scoops', function() {
      this.placedOrder.add('chocolate');
    }, this);
    this.chocolate_button.frame = 2;

    this.strawberry_button = this.game.add.button(115,Game.h-260, 'scoops', function() {
      this.placedOrder.add('strawberry');
    }, this);
    this.strawberry_button.frame = 1;

    this.vanilla_button = this.game.add.button(190,Game.h-260, 'scoops', function() {
      this.placedOrder.add('vanilla');
    },this);
    this.vanilla_button.frame = 0;

    this.cone_button = this.game.add.button(Game.w-110,Game.h-275, 'cones', function() {
      this.placedOrder.add('cone');
    }, this);
    this.cone_button.frame = 2;

    this.waffle_cone_button = this.game.add.button(Game.w-110,Game.h-210, 'cones', function() {
      this.placedOrder.add('waffle_cone');
    }, this);
    this.waffle_cone_button.frame = 3;
    
    this.lvlText = this.game.add.bitmapText(24, 24, 'minecraftia', 'Lvl: '+ levelNames[0], 24); 

    this.moneyText = this.game.add.bitmapText(Game.w-150, 24, 'minecraftia', '$'+money, 24); 
    // this.moneyText.anchor.setTo(0.5, 0.5);
    this.moneyText.tint = 0x00ff00;



    this.strike1 = this.game.add.sprite(24, 64, 'strike');
    this.strike1.visible = false;
    this.strike2 = this.game.add.sprite(74, 64, 'strike');
    this.strike2.visible = false;
    this.strike3 = this.game.add.sprite(124, 64, 'strike');
    this.strike3.visible = false;

    //Create Twitter button as invisible, show during win condition to post highscore
    this.twitterButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + 200,'twitter', this.twitter, this);
    this.twitterButton.anchor.set(0.5);
    this.twitterButton.visible = false;

  },
  update: function() {
    if (strikes >= 3) {
      if (money > this.highestScore) {
        this.highestScore = money;
        localStorage.setItem('atSuperScoopersHighestScore', money);
      }

      this.game.state.start('Menu');
    }

    if (this.actor.active === true && this.game.time.now > this.actor.wait && this.actor.alive === true) {

      money = money - this.placedOrder.toppings.length;
      this.moneyText.setText('$' + money);
      if (money < 0) {
        this.moneyText.tint = 0xff0000;
      }

      this.actor.walkout();
      this.placedOrder.kill();
      this.placedOrder = new Icecream(this.game, Game.w/2, Game.h/2);
      
    }

    // console.log(JSON.stringify(this.actor.order)+' '+ JSON.stringify(this.placedOrder.toppings));
    if (JSON.stringify(this.actor.order) === JSON.stringify(this.placedOrder.toppings) && this.actor.alive === true) {
      
      if (strikes < 1) {this.strike1.visible = false;}
      if (strikes < 2) {this.strike2.visible = false;}
      if (strikes < 3) {this.strike3.visible = false;}


      money += this.placedOrder.toppings.length*2;
      this.moneyText.setText('$' + money);
      if (money > 0) {
        this.moneyText.tint = 0x00ff00;
      }
      customers++;


      this.actor.orderReceived = true;
      this.actor.walkout();

      this.placedOrder.mycone.forEach(function(s) {
        var t = this.game.add.tween(s).to({alpha: 0}, 1000, Phaser.Easing.Linear.None).start();

        t.onComplete.add(function() {
          s.kill();

        },this);

      },this);
      this.placedOrder = new Icecream(this.game, Game.w/2, Game.h/2);
    }
    if (this.actor.alive === false) {
      if (this.actor.orderReceived === false) {
        strikes++;
      }

      if (strikes > 0) {this.strike1.visible = true;}
      if (strikes > 1) {this.strike2.visible = true;}
      if (strikes > 2) {this.strike3.visible = true;}

      if (customers < 5) {
        delay = 6000;   
        scoopmax = 1;
      }else if (customers < 10) {
        delay = 6000;   
        scoopmax = 2;
        this.lvlText.setText('Lvl: '+levelNames[1]);
      }else if (customers < 15) {
        delay = 6000;   
        scoopmax = 3;
        this.lvlText.setText('Lvl: '+levelNames[2]);
      }else if (customers < 20) {
        delay = 6000;   
        scoopmax = 4;
        this.lvlText.setText('Lvl: '+levelNames[3]);
      }else if (customers < 25) {
        delay = 6000;   
        scoopmax = 5;
        this.lvlText.setText('Lvl: '+levelNames[4]);
      }else {
        if (customers % 5 === 0) {
          scoopmax = customers/5;
          delay = scoopmax*1000;
          this.lvlText.setText('Lvl: '+levelNames[5]);
        } 
      } 
     
      var user_frames = [0,5,10,15];

      this.actor.reset(this.rndOrder(rand(1,scoopmax)), delay,user_frames[rand(0,3)]);
      this.actor.walkin();
    }

    // // Toggle Music
    // muteKey.onDown.add(this.toggleMute, this);

  },
  rndOrder: function(quantity) {
    var cones = ['cone', 'waffle_cone'];
    var flavours = ['vanilla', 'chocolate', 'strawberry'];
    var order = [];
    order.push(cones[rand(0,1)]);
    for(var i = 0;i < quantity;i++) {
      order.push(flavours[rand(0,2)]);
    }
    return order;
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
