var Tile = function (s, p) {
    this.set(s, p);
    this.obj = null;
    this.actor = null;
};

Tile.prototype.isPassable    = function(){  return  this.passable; };
Tile.prototype.isNotPassable = function(){  return !this.passable; };
Tile.prototype.isEmpty       = function(){  return  this.passable && this.obj == null && this.actor == null; };

Tile.prototype.getSymbol     = function(){  return this.symbol;    };
Tile.prototype.setPassable   = function(p){ this.passable = p;     };
Tile.prototype.setActor      = function(a){ this.actor    = a;     };
Tile.prototype.setObj        = function(o){ this.obj      = o;     };

Tile.prototype.set           = function(s,p){
    this.passable = typeof p !== undefined ? p : true;
    this.symbol   = typeof s !== undefined ? s : '';
};

Tile.prototype.draw          = function(x,y) {
    if (this.actor != null) return this.actor.draw(x, y);
    if (this.obj != null)   return this.obj.draw(x, y);
    Game.display.draw(x, y, this.symbol);
};
