Crafty.scene("battle", function() {
	var elements = [
		"src/entities/game-status.js",
		"src/entities/mana.js",
		"src/entities/chip.js",
		"src/entities/summon-field.js",
		"src/entities/battle-field.js",
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
		var self = this;

		timer = Crafty.e("Delay");
		battleStatus = new BattleStatus();

		battleStatus.on("start-begin",function(){
			gameTurn.text("第"+battleStatus.get("turn")+"回合");
			timer.delay(function() {
					battleStatus.set({"timing":"ing"});
			}, 100)
		},this).on("start-ing",function(){
			timer.delay(function() {
					battleStatus.set({"timing":"end"});
			}, 100)
		},this).on("start-end",function(){
			timer.delay(function() {
					battleStatus.set({"phase":"attack","timing":"begin"});
			}, 100)
		},this).on("attack-begin",function(){
			timer.delay(function() {
					battleStatus.set({"timing":"ing"});
			}, 100)
		},this).on("attack-ing",function(){
			for ( var i = 0; i < 5 ; i++ ){
				for ( var j=1; j<=2; j++)
				{
					var chip = playingPlayer[j].battleField[i].model.chips.at(0);
					if ( chip )	{
						var chipEntity = ChipEntities[chip.cid];
						if ( chipEntity.has("Creature") ){
							chipEntity.attack();
						}
					}
				}
			}
			timer.delay(function() {
					battleStatus.set({"timing":"end"});
			}, 1000)
		},this).on("attack-end",function(){
			timer.delay(function() {
					battleStatus.set({"phase":"mana","timing":"begin"});
			}, 100)
		},this).on("mana-begin",function(){
			for ( var i=1; i<=2; i++)
			{
				for ( var j=0; j<playingPlayer[i].get("manaIncome"); j++) {
					playingPlayer[i].manas.add(new ManaCard({number:randomNumber(),suit:randomSuit()}));
				}
			}
			timer.delay(function() {
					battleStatus.set({"timing":"ing"});
			}, 100)
		},this).on("mana-ing",function(){
			timer.delay(function() {
					battleStatus.set({"timing":"end"});
			}, 10000)
		},this).on("mana-end",function(){
			timer.delay(function() {
					battleStatus.set({"phase":"magic","timing":"begin"});
			}, 100)
		},this).on("magic-begin",function(){
			timer.delay(function() {
					battleStatus.set({"timing":"ing"});
			}, 100)
		},this).on("magic-ing",function(){
			timer.delay(function() {
					battleStatus.set({"timing":"end"});
			}, 100)
		},this).on("magic-end",function(){
			timer.delay(function() {
					battleStatus.set({"phase":"end","timing":"begin"});
			}, 100)
		},this).on("end-begin",function(){
			for ( var i=1; i<=2; i++)
			{
				var toDel = [];
				playingPlayer[i].manas.each(function(model){
					toDel.push(model);
				});
				for ( var j=0; j<toDel.length;j++ )	{
					toDel[j].destroy();
				}
			}
			timer.delay(function() {
					battleStatus.set({"timing":"ing"});
			}, 100)
		},this).on("end-ing",function(){
			timer.delay(function() {
					battleStatus.set({"timing":"end"});
			}, 100)
		},this).on("end-end",function(){
			timer.delay(function() {
					battleStatus.set({"turn":battleStatus.get("turn")+1,"phase":"start","timing":"begin"});
			}, 100)
		},this)

		var gameTurn = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
			.attr({x:10,y:10,z:1,w:200,h:40})
			.textColor('#ffffff')
			.textFont({'size' : "24px", 'family': 'Arial', "weight": 'bold'});
		
		//init
		ChipEntities = {};
		player = [];
		playingPlayer = [];
		playerAvatar = [];
		player[1] = new Player({
			"name":"player1",
			"portrait":"./web/images/player-portrait.png"
		});
		player[2] = new Player({
			"name":"AIPlayer",
			"portrait":"./web/images/ai-portrait.png"
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
		treasureHoard = [];

		globalMask = Crafty.e("GlobalMask").globalMask().attr("visible",false);
		
		playingPlayer[1].hand = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", PlayerHand")
					.playerHand({player:playingPlayer[1]}).attr({x:150,y:620,z:2});

		playerAvatar[1] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", PlayerAvatar")
			.playerAvatar({player:playingPlayer[1]}).attr({x:10,y:500});
		
		for ( var i = 0; i < 5 ; i++){			
			playingPlayer[1].battleField[i] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", BattleField, Tween")
				.battleField({model: new BattleField({x:140+200*i,y:360,z:1,owner:1}),index:i}).addComponent("BattleField1"+i);
			playingPlayer[1].summonField[i] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SummonField, Tween")
				.summonField({model: new SummonField({x:140+200*i,y:500,z:1,owner:1}),index:i});

			playingPlayer[2].battleField[i] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", BattleField, Tween")
				.battleField({model: new BattleField({x:140+200*i,y:100,z:1,owner:2}),index:i}).addComponent("BattleField2"+i);
			playingPlayer[2].summonField[i] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SummonField, Tween")
				.summonField({model: new SummonField({x:140+200*i,y:0,z:1,owner:2}),index:i});		

			treasureHoard[i] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", TreasureHoard, Tween")
				.treasureHoard({model: new TreasureHoard({money:10})}).attr({z:1,w:80,h:55,x:140+200*i+20+40,y:270});
		}

		battleStatus.trigger("start-begin",battleStatus);
	});

});
