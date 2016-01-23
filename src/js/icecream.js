var Icecream = function(game, x, y, toppings, scale) {
  this.game = game;
  this.toppings = toppings || [];
  this.toppingHeight = 0;
  this.scale = scale || 1;
  this.mycone = this.game.add.group();
  this.xpos = x;
  this.ypos = y;

  for(var i=0;i < this.toppings.length;i++) {
    if (i === 1) {
        this.toppingHeight += 15*this.scale;
    }
    switch (this.toppings[i]) {
      case 'cone': 
        this.mycone.add(this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, 'cones',2 ));
        break;
      case 'waffle_cone': 
        this.mycone.add(this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, 'cones',3)); break;
      case 'vanilla':
        this.mycone.add(this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, 'scoops',0));
        break;
      case 'strawberry':
        this.mycone.add(this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, 'scoops', 1));
        break;
      case 'chocolate':
        this.mycone.add(this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, 'scoops',2 ));
        break;
    }
    this.toppingHeight += 15*this.scale;
  }
  this.mycone.forEach(function(topping) {
    topping.anchor.setTo(0.5);
    topping.scale.x = this.scale;
    topping.scale.y = this.scale;
  },this);

};

Icecream.prototype = Object.create(Phaser.Sprite.prototype);
Icecream.prototype.add = function(topping_name) {
    var topping;

    if ((this.toppings.length === 0) && (topping_name !== 'cone' && topping_name !== 'waffle_cone')) {
        return;
    }

    if ((this.toppings.length > 0) && (topping_name === 'cone' || topping_name === 'waffle_cone')) {
      return;
    }

    if (this.toppings.length == 1) {
        this.toppingHeight += 15*this.scale;
    }
    switch (topping_name) {
      case 'cone': 
        topping = this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, 'cones',2 );
        break;
      case 'waffle_cone': 
        topping = this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, 'cones',3); break;
      case 'vanilla':
        topping = this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, 'scoops',0);
        break;
      case 'strawberry':
        topping = this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, 'scoops', 1);
        break;
      case 'chocolate':
        topping = this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, 'scoops',2 );
        break;
    }
    this.toppingHeight += 15*this.scale;
    topping.anchor.setTo(0.5);
    topping.scale.x = this.scale;
    topping.scale.y = this.scale;

    this.toppings.push(topping_name);
    this.mycone.add(topping);
    var t = this.game.add.tween(topping).to({y: Game.h/2+200-this.toppingHeight}, 300, Phaser.Easing.Quadratic.InOut).start();
};
Icecream.prototype.kill = function() {
  this.mycone.forEach(function(topping) {
    topping.kill();
  },this);
};
Icecream.prototype.constructor = Icecream;
