function init_main(){ Game.init(); }

var Game = {
    display: null,
    map: [],
    engine: null,
    player: null,
    ananas: null,

    init: function() {
        this.display = new ROT.Display();
        document.body.appendChild(this.display.getContainer());

				this._init_map();
        this._generateMap();

        var scheduler = new ROT.Scheduler.Simple();
        scheduler.add(this.player, true);

        this.engine = new ROT.Engine(scheduler);
        this.engine.start();
    },

		_init_map: function() {
				this.map.width  = ROT.DEFAULT_WIDTH;
				this.map.height = ROT.DEFAULT_WIDTH;
				for ( var x = 0 ; x < this.map.width ; x++ ){
					this.map[x] = [];
					for ( var y = 0 ; y < this.map.height ; y++ ){
						this.map[x][y] = '#';
					}
				}
		},

    _generateMap: function() {
        var digger = new ROT.Map.Digger();
        var freeCells = [];

        var digCallback = function(x, y, value) {
            if (value) { return; }

            var key = {'x':x,'y':y};
            this.map[x][y] = ".";
            freeCells.push(key);
        }
        digger.create(digCallback.bind(this));

        this._drawWholeMap();

        this.player = this._createBeing(Player, freeCells);
    },

    _createBeing: function(what, freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        return new what(key.x, key.y);
    },

    _drawWholeMap: function() {
        for (var x = 0 ; x < this.map.length ; x++) {
        	for (var y = 0 ; y < this.map[x].length ; y++) {
            this.display.draw(x, y, this.map[x][y]);
					}
        }
    }
};

var Player = function(x, y) {
    this._x = x;
    this._y = y;
    this._draw();
}

Player.prototype.getSpeed = function() { return 100; }
Player.prototype.getX = function() { return this._x; }
Player.prototype.getY = function() { return this._y; }

Player.prototype.act = function() {
    Game.engine.lock();
    window.addEventListener("keydown", this);
}

Player.prototype.handleEvent = function(e) {
    var code = e.keyCode;
    if (code == 13 || code == 32) {
        return;
    }

    var keyMap = {};
    keyMap[38] = 0;
    keyMap[33] = 1;
    keyMap[39] = 2;
    keyMap[34] = 3;
    keyMap[40] = 4;
    keyMap[35] = 5;
    keyMap[37] = 6;
    keyMap[36] = 7;

    /* one of numpad directions? */
    if (!(code in keyMap)) { return; }

    /* is there a free space? */
    var dir = ROT.DIRS[8][keyMap[code]];
    var newX = this._x + dir[0];
    var newY = this._y + dir[1];
    if (Game.map[newX][newY] == '#') { return; }

    Game.display.draw(this._x, this._y, Game.map[this._x][this._y]);
    this._x = newX;
    this._y = newY;
    this._draw();
    window.removeEventListener("keydown", this);
    Game.engine.unlock();
}

Player.prototype._draw = function() {
    Game.display.draw(this._x, this._y, "@", "#ff0");
}

