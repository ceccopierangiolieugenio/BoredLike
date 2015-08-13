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

function Item(x, y, name, symbol){
    this._x = x;
    this._y = y;
    this._name = name;
    this._symbol = symbol;
    Game.map[x][y].setObj(this);
}

Item.prototype.getName = function () { return this._name; };
Item.prototype.draw = function (x, y) { Game.display.draw(x, y, this._symbol , "#fff"); };
