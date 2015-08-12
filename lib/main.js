/* 
 * Copyright 2015 Eugenio Parodi <ceccopierangiolieugenio at googlemail>.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

function init_main() {
    Game.init();
}

var Game = {
    display: null,
    map: [],
    actors: [],
    quests: [],
    scheduler: undefined,
    engine: undefined,
    player: undefined,
    topology: "4",
    init: function () {
        this.display = new ROT.Display({spacing:1.1});
        document.body.appendChild(this.display.getContainer());
        this.logWin = document.createElement("div");
        this.logWin.style.resize = "vertical";
        this.logWin.style.height = "200px";
        this.logWin.style.width = "720px";
        this.logWin.style.overflowY = "scroll";
        document.body.appendChild(this.logWin);

        this.scheduler = new ROT.Scheduler.Simple();

        this._init_map();
        this._generateMap();
        
        this.scheduler.add(this, true);
        this.scheduler.add(this.player, true);

        this.engine = new ROT.Engine(this.scheduler);
        this.engine.start();
    },
    log: function (msg) {
        this.logWin.innerHTML += msg + "<br>";
        this.logWin.scrollTop = this.logWin.scrollHeight;
    },
    _init_map: function () {
        this.map.width = ROT.DEFAULT_WIDTH;
        this.map.height = ROT.DEFAULT_WIDTH;
        for (var x = 0; x < this.map.width; x++) {
            this.map[x] = [];
            for (var y = 0; y < this.map.height; y++) {
                this.map[x][y] = new Tile('#', false);
            }
        }
    },
    _generateMap: function () {
        var digger = new ROT.Map.Digger();
        var freeCells = [];

        var digCallback = function (x, y, value) {
            if (value) {
                return;
            }

            var key = {'x': x, 'y': y};
            this.map[x][y].set('.', true);
            freeCells.push(key);
        }
        digger.create(digCallback.bind(this));

        for (var i = 0; i < 10; i++)
            this._createQuest(freeCells);
        // this._createActor(freeCells,10);

        this.player = this._createBeing(Player, freeCells);

        this._drawWholeMap();
    },
    _createQuest: function (freeCells, trials) {        
        var actor = this._createActor(freeCells, 10);
        if (actor != null) {
            this.actors.push(actor);
            var quest = new Quest(
                    {'actor':actor},
                    function (obj) { Game.log("Quest: You need to kill " + obj.actor.getName()); },
                    function (obj) { return !obj.actor.isAlive(); },
                    function (obj) { Game.log("Quest Completed, You successfully killed " + obj.actor.getName()); }
            );
            quest.start();
            this.scheduler.add(quest, true);
            this.quests.push(quest);
            return actor;
        }
        return null;
    },
    _createActor: function (freeCells, trials) {
        for (var t = 0; t < trials; t++) {
            var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
            var key = freeCells.splice(index, 1)[0];
            if (this._testActorPosition(key.x, key.y)) {
                return new Actor(key.x, key.y);
            } else {
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
    _testActorPosition: function (x, y) {
        /* find the first free slot around */
        var startPos = null;
        for (var i = 0; i < ROT.DIRS[this.topology].length; i++) {
            var d = ROT.DIRS[this.topology][i];
            if (Game.map[x + d[0]][y + d[1]].isPassable()) {
                startPos = {'x': x + d[0], 'y': y + d[1]};
                break;
            }
        }
        /* A null value means actor not reachable in any direction (weird) */
        if (startPos == null)
            return false;
        /* Check that any other free slot is reachable from the first one */
        Game.map[x][y].setPassable(false);
        /* input callback informs about map structure */
        var passableCallback = function (_x, _y) {
            return (Game.map[_x][_y].isPassable());
        }
        /* prepare path to given coords */
        var dijkstra = new ROT.Path.Dijkstra(startPos.x, startPos.y, passableCallback, {'topology': this.topology});
        for (var i = 0; i < ROT.DIRS[this.topology].length; i++) {
            var d = ROT.DIRS[this.topology][i];
            if (Game.map[x + d[0]][y + d[1]].isPassable()) {
                var reachable = false;
                var checkPath = function (x, y) {
                    reachable = true;
                    // DEBUG
                    // Game.display.draw(x, y, Game.map[x][y].getSymbol(), "", "#808");
                };
                /* compute from given coords #1 */
                dijkstra.compute(x + d[0], y + d[1], checkPath);
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
    _createBeing: function (what, freeCells) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        return new what(key.x, key.y);
    },
    _drawWholeMap: function () {
        for (var x = 0; x < this.map.length; x++) {
            for (var y = 0; y < this.map[x].length; y++) {
                this.map[x][y].draw(x, y);
            }
        }
    },
    draw: function (x, y, w, h) {
        for (var ix = 0; ix < w; ix++) {
            for (var iy = 0; iy < h; iy++) {
                this.map[x + ix][y + iy].draw(x + ix, y + iy);
            }
        }
    },
    act: function () {
        for (var i = 0; i < this.actors.length; i++)
            if (this.actors[i].isAlive())
                return;
        Game.log("END, You happily get Bored to Death alone in this dungeon.");
        Game.engine.lock();
    }
};

