Crafty.scene("battle", function() {
	var elements = [
		"src/entities/mana.js",
		"src/entities/summon-field.js"
	];	

	var self =this;
	
	//when everything is loaded, run the main scene
	require(elements, function() {
		var mana1 = new ManaCard({x:200,y:100,z:2,number:2,size:"L"});
		var c = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", ManaCard, Tween")
					.manaCard({model: mana1});
		var mana2 = new ManaCard({x:400,y:100,z:2,number:11,size:"M"});
		var c1 = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", ManaCard, Tween")
					.manaCard({model: mana2});
		var mana3 = new ManaCard({x:500,y:100,z:2,size:"S"});
		var c2 = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", ManaCard, Tween")
					.manaCard({model: mana3});
		var summon = new SummonField({x:100,y:100,z:1});
		var s = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SummonField, Tween")
					.summonField({model: summon});
//		c.tween({x:500,y:500},10);
	});

});
