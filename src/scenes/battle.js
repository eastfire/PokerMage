Crafty.scene("battle", function() {
	var elements = [
		"src/entities/game-status.js",
		"src/entities/mana.js",
		"src/entities/summon-field.js",
		"src/entities/battle-field.js",
		"src/entities/chip.js",
		"src/entities/creature.js",
		"src/entities/spell.js",
		"src/entities/player.js",
		"src/entities/treasure-hoard.js",
		"src/entities/unlockable.js",
		"src/entities/global-mask.js",
	];	

	var self =this;
	
	randomNumber = function(){
		return Math.floor(Math.random()*13)+2;
	};
	randomSuit = function(){
		return Math.floor(Math.random()*4)+1;
	}
	//when everything is loaded, run the main scene
	require(elements, function() {
		battleStatus = new BattleStatus();
		//init
		player = [];
		playingPlayer = [];
		player[1] = new Player({
			"name":"player1"
		});
		player[2] = new Player({
			"name":"AIPlayer"
		});
		player[1].get("book").add([{
			cost: "pair",
			amount:"1",
			name:"skeleton-warrior",
			label:"骷髅战士",
			type:"creature",
			owner:1
		}]);
		player[2].get("book").add([{
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
		playingPlayer[2] = new PlayingPlayer({
			player:player[2],
			type:"ai"
		});	

		globalMask = Crafty.e("GlobalMask").globalMask().attr("visible",false);
		
		playingPlayer[1].hand = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", PlayerHand")
					.playerHand({player:playingPlayer[1]}).attr({x:100,y:620,z:2});

		for ( var i=1; i<=2; i++)
		{
			for ( var j=0; j<playingPlayer[i].get("manaIncome"); j++) {
				playingPlayer[i].manas.add(new ManaCard({x:500,y:500,z:2,number:randomNumber(),suit:randomSuit()}));
			}
		}

		for ( var i = 0; i < 5 ; i++){
			playingPlayer[1].summonField[i] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SummonField, Tween")
				.summonField({model: new SummonField({x:140+200*i,y:500,z:1,owner:1})});
			playingPlayer[1].battleField[i] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", BattleField, Tween")
				.battleField({model: new SummonField({x:140+200*i,y:360,z:1,owner:1})}).addComponent("BattleField1"+i);

			playingPlayer[2].summonField[i] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SummonField, Tween")
				.summonField({model: new SummonField({x:140+200*i,y:0,z:1,owner:2})});
			playingPlayer[2].summonField[i] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", BattleField, Tween")
				.battleField({model: new SummonField({x:140+200*i,y:100,z:1,owner:2})}).addComponent("BattleField2"+i);

			Crafty.e("2D, "+gameContainer.conf.get('renderType')+", TreasureHoard, Tween")
				.treasureHoard({model: new TreasureHoard({money:10,x:140+200*i+20+40,y:270})}).attr({z:1,w:80,h:55});
		}
	});

});
