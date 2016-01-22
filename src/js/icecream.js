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
        this.mycone.add(this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, this.makeCone(50, '#F0E68C')));
        break;
      case 'waffle_cone': 
        this.mycone.add(this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, this.makeCone(50, '#F0E68C')));
        break;
      case 'vanilla':
        this.mycone.add(this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, this.makeCircle(50,'#FFF')));
        break;
      case 'strawberry':
        this.mycone.add(this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, this.makeCircle(50,'#FDD7E4')));
        break;
      case 'chocolate':
        this.mycone.add(this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, this.makeCircle(50,'#8B4513')));
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
        console.log(topping_name + this.toppings.length);
        return;
    }

    if ((this.toppings.length > 0) && (topping_name === 'cone' || topping_name === 'waffle_cone')) {
      return;
    }

    if (this.toppings.length == 1) {
        this.toppingHeight += 15*this.scale;
        console.log('load');
    }
    switch (topping_name) {
      case 'cone': 
        topping = this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, this.makeCone(50, '#F0E68C'))
        break;
      case 'waffle_cone': 
        topping = this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, this.makeCone(50, '#8B4513'))
        break;
      case 'vanilla':
        topping = this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, this.makeCircle(50,'#FFF'))
        break;
      case 'strawberry':
        topping = this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, this.makeCircle(50,'#FDD7E4'))
        break;
      case 'chocolate':
        topping = this.game.add.sprite(this.xpos, this.ypos+200-this.toppingHeight, this.makeCircle(50,'#8B4513'))
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
Icecream.prototype.makeCone = function(size, color) {
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
};
Icecream.prototype.makeCircle = function(circSize, color) {
  var bmd = this.game.add.bitmapData(circSize, circSize);
  bmd.circle(circSize/2,circSize/2,circSize/2, color);
  return bmd;
};
Icecream.prototype.constructor = Icecream;
