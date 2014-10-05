function init_main(){ Game.init(); }

var Game = {
    display: null,
    map: [],
		actors: [],
    engine: null,
    player: null,
		topology: "4",

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
						this.map[x][y] = new Tile('#',false);
					}
				}
		},

    _generateMap: function() {
        var digger = new ROT.Map.Digger();
        var freeCells = [];

        var digCallback = function(x, y, value) {
            if (value) { return; }

            var key = {'x':x,'y':y};
            this.map[x][y].set('.',true);
            freeCells.push(key);
        }
        digger.create(digCallback.bind(this));

				for (var i=0;i<10;i++)
						this._createQuest(freeCells);
						// this._createActor(freeCells,10);

        this.player = this._createBeing(Player, freeCells);

        this._drawWholeMap();
    },

		_createQuest: function(freeCells,trials) {
				var actor = this._createActor(freeCells,10);
				if (actor != null){
						this.actors.push(actor);
						return actor;
				}
				return null;
		},

		_createActor: function(freeCells,trials) {
				for (var t=0;t<trials;t++){
		    		var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        		var key = freeCells.splice(index, 1)[0];
						if (this._testActorPosition(key.x,key.y)){
								return new Actor(key.x,key.y);
						}else{
								// DEBUG
				    		// Game.display.draw(key.x, key.y, "@", "#f00");
						}
				}
				return null;
		},

		/* 
				_testActorPosition( x , y )
				Check if the actor position does not block the player
		 */
		_testActorPosition: function(x,y){
				/* find the first free slot around */
				var startPos = null;
				for (var i=0;i<ROT.DIRS[this.topology].length;i++){
						var d = ROT.DIRS[this.topology][i];
    				if (Game.map[x+d[0]][y+d[1]].isPassable()){
								startPos = {'x':x+d[0] , 'y':y+d[1]};
								break;
						}
				}
				/* A null value means actor not reachable in any direction (weird) */
				if (startPos == null) return false;
				/* Check that any other free slot is reachable from the first one */
				Game.map[x][y].setPassable(false);
				/* input callback informs about map structure */
				var passableCallback = function(_x, _y) {
				    return ( Game.map[_x][_y].isPassable() );
				}
				/* prepare path to given coords */
				var dijkstra = new ROT.Path.Dijkstra(startPos.x,startPos.y, passableCallback,{'topology':this.topology});
				for (var i=0;i<ROT.DIRS[this.topology].length;i++){
						var d = ROT.DIRS[this.topology][i];
    				if (Game.map[x+d[0]][y+d[1]].isPassable()){
								var reachable = false;
								var checkPath = function(x,y){
										reachable = true;
										// DEBUG
								    // Game.display.draw(x, y, Game.map[x][y].getSymbol(), "", "#808");
								};
								/* compute from given coords #1 */
								dijkstra.compute(x+d[0],y+d[1], checkPath);
								if (reachable == false) {
								  /* 
											for some kind of reason 
											placing an actor here will prevent some areas to be
											rached by the player.
									 */
									Game.map[x][y].setPassable(true);
									return false;
								}
						}
				}
				return true;
		},

    _createBeing: function(what, freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        return new what(key.x, key.y);
    },

    _drawWholeMap: function() {
        for (var x = 0 ; x < this.map.length ; x++) {
        	for (var y = 0 ; y < this.map[x].length ; y++) {
            this.map[x][y].draw(x,y);
					}
        }
    }
};

