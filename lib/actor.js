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

var Actor = function (x, y) {
    this._x = x;
    this._y = y;
    this._hp = 100;
    this._name = NameGen.generate();
    Game.map[x][y].setActor(this);
};

Actor.prototype.isAlive = function () {
    return this._hp > 0;
}
Actor.prototype.getName = function () {
    return this._name;
}

Actor.prototype.draw = function (x, y) {
    if (typeof x !== 'undefined' && typeof y !== 'undefined')
        Game.display.draw(x, y, "@", "#0ff");
    Game.display.draw(this._x, this._y, "@", "#0ff");
};

Actor.prototype.kill = function () {
    Game.log("AAAAARGH!!!, How dare you kill " + this._name);
    /* Useless at this stage of the game and probably the 
     HP will never be used in BoredLike*/
    this._hp = 0
    Game.map[this._x][this._y].setPassable(true);
    Game.map[this._x][this._y].setActor(null);
    Game.map[this._x][this._y].setObj(new Corpse(this));
    Game.map[this._x][this._y].draw(this._x, this._y);
};

Actor.prototype.action = function () {
    /* Open a dialog with the options available */
    DiagMenu.choose([
        new DiagMenuItem("talk", function () {
            Game.log("Hello!!!, I'm " + this._name);
        }.bind(this)),
        new DiagMenuItem("kill", this.kill.bind(this)),
        /*
         new DiagMenuItem("rekill",        function(){}),
         new DiagMenuItem("killall",       function(){}),
         new DiagMenuItem("killone",       function(){}),
         new DiagMenuItem("killill",       function(){}),
         new DiagMenuItem("skill",         function(){}),
         new DiagMenuItem("sokill",        function(){}),
         new DiagMenuItem("killlaKill",    function(){}),
         new DiagMenuItem("killbill",      function(){}),
         new DiagMenuItem("killimangiaro", function(){}),
         new DiagMenuItem("killer",        function(){}),
         new DiagMenuItem("skills",        function(){}), 
         */
        new DiagMenuItem("exit", function () {
        })
    ]);
    return;
};

var Corpse = function (body) {
    this._body = body;
}

Corpse.prototype.draw = function (x, y) {
    if (typeof x !== 'undefined' && typeof y !== 'undefined')
        Game.display.draw(x, y, "%", "#f00");
    Game.display.draw(this._body._x, this._body._y, "%", "#f00");
};

