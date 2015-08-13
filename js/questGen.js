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

var QuestGen = {
    createKillQuest: function (actor) {
        return new Quest(
                "Kill " + actor.getName(),
                {'actor': actor},
                function (obj) { Game.log("Main Quest: You need to kill " + obj.actor.getName()); },
                function (obj) { return !obj.actor.isAlive(); },
                function (obj) { Game.log("Quest Completed, You successfully killed " + obj.actor.getName()); },
                function (obj) { return [new DiagMenuItem("kill", obj.actor.kill.bind(obj.actor))]; }
        );
    },
    createRandomQuest: function (freeCells, actor) {
        var rnd = Math.floor(ROT.RNG.getUniform() * 100);
        /* 20% quests */
        if (rnd < 20)   return this._getAppleQuest(freeCells,actor);
        return undefined;
    },
    _getAppleQuest: function (freeCells, actor) {
        var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
        var key = freeCells.splice(index, 1)[0];
        var apple = new Item(key.x, key.y, "apple", "a");
        var quest = new Quest(
                "Give apple to" + actor.getName(),
                {'actor': actor},
                function (obj) { Game.log(obj.actor.getName() + " would like to have an apple"); },
                function (obj) { return obj.actor.getInventory().searchByName("apple") !== undefined; },
                function (obj) { Game.log("Quest Completed, You gave an Apple to " + obj.actor.getName()); },
                function (obj) {
                    return [new DiagMenuItem("Give Apple",
                                function () {
                                    var item = Game.player.getInventory().searchByName("apple");
                                    if (item === undefined) {
                                        Game.log(obj.actor.getName.call(obj.actor) + ": You don't have an apple");
                                    } else {
                                        Game.log(obj.actor.getName.call(obj.actor) + ": Thanks for this Apple");
                                        Game.player.getInventory().removeItem(item);
                                        obj.actor.getInventory.call(obj.actor).addItem(item);
                                    }
                                })];
                }
        );
        return quest;
    }
};

