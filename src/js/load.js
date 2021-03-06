// var Game = {
//   w: 800,
//   h: 600
// };
var Game = {
  w: 600,
  h: 800
};


if (localStorage.getItem('atSuperScoopersHighestScore') === null) {
  localStorage.setItem('atSuperScoopersHighestScore', 0);
}

// var w = 800;
// var h = 600;

Game.Boot = function(game) {
  this.game = game;
};

Game.Boot.prototype = {
  preload: function() {
    // console.log('blah'+Game.w);
		this.game.load.image('loading', 'assets/images/loading.png');
		this.game.load.image('title', 'assets/images/title.png');
		this.game.load.image('instructions', 'assets/images/instructions.png');
    this.game.load.bitmapFont('minecraftia', 'assets/fonts/font.png', 'assets/fonts/font.xml'); //load default font


    //Scale Image to Fit Window
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.maxHeight = window.innerHeight;
    this.game.scale.maxWidth = window.innerHeight*(Game.w/Game.h);

  },
  create: function() {
   this.game.state.start('Load');
  }
};

Game.Load = function(game) {
  this.game = game;
};

Game.Load.prototype = {
  preload: function() {
    
    //Debug Plugin
    // this.game.add.plugin(Phaser.Plugin.Debug);

    //Loading Screen Message/bar
    var loadingText = this.game.add.text(Game.w, Game.h, 'Loading...', { font: '30px Helvetica', fill: '#000' });
  	loadingText.anchor.setTo(0.5, 0.5);
  	var preloading = this.game.add.sprite(Game.w/2-64, Game.h/2+50, 'loading');
  	this.game.load.setPreloadSprite(preloading);

    //Load button for twitter
    this.game.load.image('twitter','assets/images/twitter.png');
    this.game.load.spritesheet('npcs', 'assets/images/npcs.png', 256, 256, 25);

    this.game.load.image('cart','assets/images/cart.png');
    this.game.load.spritesheet('speech', 'assets/images/speech.png', 50, 50, 3);

    this.game.load.spritesheet('cones', 'assets/images/cones.png', 64, 64, 4);
    this.game.load.spritesheet('scoops', 'assets/images/scoops-sheet.png', 64, 64, 3);
    this.game.load.image('strike','assets/images/strike.png');

    // Music Track
    this.game.load.audio('music','assets/audio/music_box_monster.mp3');

  },
  create: function() {
    this.game.state.start('Menu');
  }
};
