var Actor = function(x, y) {
    this._x = x;
    this._y = y;
		Game.map[x][y].setActor(this);
};

Actor.prototype.draw = function(x,y) {
		if (typeof x !== 'undefined' && typeof y !== 'undefined')
    		Game.display.draw(x,y, "@", "#0ff");
    Game.display.draw(this._x, this._y, "@", "#0ff");
};


