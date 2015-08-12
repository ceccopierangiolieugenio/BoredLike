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

var NameGen = {};

NameGen.init = function() {
    this.sg = new ROT.StringGenerator();
    for (var i=0;i<this.names.length;i++){
        this.sg.observe(this.names[i]); 
    }
};

NameGen.generate = function(){
    return this.sg.generate();
};

NameGen.names = [
    "Onita Steinhauer",
    "Concha Rutkowski",
    "Lorean Rabun",
    "Michal Needles",
    "Joeann Mckeon",
    "Genevie Robison",
    "Cristobal Weymouth",
    "Alfredo Geibel",
    "Kimberly Forde",
    "Long Middendorf",
    "Horace Oritz",
    "Jamal Prichett",
    "Tandy Winborne",
    "Neomi Heyman",
    "Mozell Southwell",
    "Lynell Dolin",
    "Dagmar Markovich",
    "Blake Steiner",
    "Myrna Pieper",
    "Marylynn Hodnett",
    "Petronila Hendrix",
    "Dwight Kai",
    "Suzan Jahns",
    "Madalene Lay",
    "Danae Purcell",
    "Lashell Moline",
    "Milton Hillyer",
    "Emely Testani",
    "Marchelle Doody",
    "Arlean Kraker",
    "Alton Bruen",
    "Lacie Chilson",
    "Helen Lorence",
    "Jaunita Hollon",
    "Renata Kinsella",
    "Na Carswell",
    "Neda Stilwell",
    "Daisey Depaz",
    "Isaias Shipley",
    "Thelma Hallum",
    "Tomeka Erdman",
    "Marva Smelcer",
    "Latrice Lauzon",
    "Dolores Roseboro",
    "Mickie Lynde",
    "Virgie Hanscom",
    "Khadijah Gilbert",
    "Laree Culley",
    "Nena Ruano",
    "Ashton Prisbrey"
];

NameGen.init();
