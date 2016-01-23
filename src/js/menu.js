/*global Game*/
var strikes = 0;
Game.Menu = function(game){
  this.game = game;
};

Game.Menu.prototype =  {
    create: function() {

      var table = this.game.add.sprite(Game.w/2, Game.h-150, 'cart');
      table.anchor.setTo(0.5);

        this.game.stage.backgroundColor = '#63E1FF';
        // this.title = this.game.add.sprite(Game.w/2,Game.h/2-100,'title');
        // this.title.anchor.setTo(0.5,0.5);

        // this.instructions = this.game.add.sprite(Game.w/2+200,200,'instructions');
        // this.instructions.scale.x = 0.5;
        // this.instructions.scale.y = 0.5;

        // Start Message
        
        var title = this.game.add.bitmapText(Game.w/2, 100, 'minecraftia', 'Super Scoopers', 42); 
        title.anchor.setTo(0.5);
        
        var cone = this.game.add.sprite(Game.w/2,Game.h/2-50,'cones',2);
        cone.anchor.setTo(0.5);
        cone.scale.x = 2;
        cone.scale.y = 2;
       
        var scoop = this.game.add.sprite(Game.w/2,100,'scoops',0);
        scoop.anchor.setTo(0.5);
        scoop.scale.x = 2;
        scoop.scale.y = 2;

        var s = this.game.add.tween(scoop).to({y: Game.h/2-125},500, 'Linear').start();

        var clickText = this.game.add.bitmapText(Game.w/2, Game.h/2+50, 'minecraftia', '~click to start~', 24); 
        clickText.anchor.setTo(0.5);

    },
    update: function() {
      //Click to Start
      if (this.game.input.activePointer.isDown){
        strikes = 0;
        this.game.state.start('Play');
      }
    }
};
