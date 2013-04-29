Crafty.scene("battle", function() {
	var elements = [
		"src/entities/mana.js",
		"src/entities/summon-field.js",
		"src/entities/creature.js",
		"src/entities/spell.js",
		"src/entities/player.js",
		"src/entities/global-mask.js",
	];	

	var self =this;
	
	//when everything is loaded, run the main scene
	require(elements, function() {
		//init
		player = [];
		playingPlayer = [];
		player[1] = new Player({
			"name":"player1"
		});
		player[1].get("book").add([{
			cost: "pair",
			amount:"1",
			name:"skeleton-warrior",
			label:"骷髅战士",
			type:"creature",
			owner:1
		}]);

		playingPlayer[1] = new PlayingPlayer({
			player:player[1],
			type:"local-human"
		});	

		globalMask = Crafty.e("GlobalMask").globalMask().attr("visible",false);
		
		var mana1 = new ManaCard({x:200,y:500,z:2,number:2});
		var c = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", ManaCard, Tween")
					.manaCard({model: mana1,size:"M"});
		var mana2 = new ManaCard({x:300,y:500,z:2,number:11,suit:2});
		var c1 = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", ManaCard, Tween")
					.manaCard({model: mana2,size:"M"});
		var mana3 = new ManaCard({x:400,y:500,z:2,number:2,suit:3});
		var c2 = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", ManaCard, Tween")
					.manaCard({model: mana3,size:"M"});
		var mana3 = new ManaCard({x:500,y:500,z:2,number:11,suit:4});
		var c2 = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", ManaCard, Tween")
					.manaCard({model: mana3,size:"M"});

		for ( var i = 0; i < 5 ; i++){
			var model = new SummonField({x:100,y:40+120*i,z:1,owner:1});
			playingPlayer[1].summonField[i] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SummonField, Tween")
				.summonField({model: model});
		}

		var summon = new SummonField({x:1000,y:100,z:1,owner:2});
		var s = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SummonField, Tween")
					.summonField({model: summon});
//		c.tween({x:500,y:500},10);
	});

});
