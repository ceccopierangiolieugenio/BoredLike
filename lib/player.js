var Player = function(x, y) {
    this._x = x;
    this._y = y;
		Game.map[x][y].setActor(this);
};

Player.prototype.getSpeed = function() { return 100; }
Player.prototype.getX = function() { return this._x; }
Player.prototype.getY = function() { return this._y; }

Player.prototype.act = function() {
    Game.engine.lock();
    window.addEventListener("keydown", this);
};

Player.prototype.handleEvent = function(e) {
    var code = e.keyCode;

		var dir = [];
    switch (code){
			case ROT.VK_UP:
				dir = ROT.DIRS[4][0];
				break;
			case ROT.VK_DOWN:
				dir = ROT.DIRS[4][2];
				break;
			case ROT.VK_LEFT:
				dir = ROT.DIRS[4][3];
				break;
			case ROT.VK_RIGHT:
				dir = ROT.DIRS[4][1];
				break;
			default:
			return;
		}

    /* is there a free space? */
    var newX = this._x + dir[0];
    var newY = this._y + dir[1];
    if (Game.map[newX][newY].isNotPassable()) { 
				/* Something does not allow us in */
				if (Game.map[newX][newY].actor != null){
						/* a NPC is there */
						console.log("NPC there!!!");
    				window.removeEventListener("keydown", this);
						/* Open a dialog with the options available */
						var diag = new Diag();
						diag.choose(["talk","kill","exit"],Game.engine.unlock);
						console.log("NPC there!!! + 1");
						return;
				}
				return; 
		}

    Game.display.draw(this._x, this._y, Game.map[this._x][this._y].getSymbol());
		Game.map[this._x][this._y].actor = null;
		Game.map[newX][newY].actor = this;
    this._x = newX;
    this._y = newY;
    this.draw();
    window.removeEventListener("keydown", this);
    Game.engine.unlock();
};

Player.prototype.draw = function(x,y) {
		if (typeof x !== 'undefined' && typeof y !== 'undefined')
    		Game.display.draw(x,y, "@", "#ff0");
    Game.display.draw(this._x, this._y, "@", "#ff0");
};

