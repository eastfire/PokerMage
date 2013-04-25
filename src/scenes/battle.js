Crafty.scene("battle", function() {
	var elements = [
		"src/entities/mana.js",
		"src/entities/summon-field.js"
	];	

	var self =this;
	
	//when everything is loaded, run the main scene
	require(elements, function() {
		var mana = new ManaCard({x:200,y:100,z:2});
		var c = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Mana, Tween")
					.mana({model: mana});
		var summon = new SummonField({x:100,y:100,z:1});
		var s = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SummonField, Tween")
					.summonField({model: summon});
		c.tween({x:500,y:500},10);
	});

});
