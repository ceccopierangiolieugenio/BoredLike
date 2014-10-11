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
