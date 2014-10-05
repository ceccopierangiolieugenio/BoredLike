var Diag = function(){};

Diag.prototype.choose = function(opt,exitFunc){
		this.options = opt;
		this.draw();
		window.addEventListener("keydown", this);
};

Diag.prototype.handleEvent = function(e){
		console.log("Diag KC: " + e.keyCode);
		this.draw();
		if (e.keyCode == ROT.VK_RETURN || e.keyCode == ROT.VK_SPACE){
				window.removeEventListener("keydown", this);
				Game._drawWholeMap();
				Game.engine.unlock();
		}
};

Diag.prototype.draw = function(){
		Game.display.drawText(10, 10, "TEST DIAG TEST" , 38);
};
