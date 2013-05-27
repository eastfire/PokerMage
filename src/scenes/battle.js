Crafty.scene("battle", function() {
	var elements = [
		"src/entities/game-status.js",
		"src/entities/mana.js",
		"src/entities/chip.js",
		"src/entities/summon-field.js",
		"src/entities/battle-field.js",
		"src/entities/creature.js",
		"src/entities/spell.js",
		"src/entities/spell-lib.js",
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
		var row = 0;
		timer = Crafty.e("Delay");
		battleStatus = new BattleStatus();

		battleStatus.on("start-begin",function(){
			timer.delay(function() {
					battleStatus.set({"timing":"ing"});
			}, 100)
		},this).on("start-ing",function(){
			if ( Math.random() > 0.9 ){
				var creature = new Creature({x:1280,y:row*105,z:1,owner:2,spell:player[2].get("book").at(0) });
				ChipEntities[creature.cid] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Chip, Creature")
						.chip({model: creature}).creature({model: creature});
				row++;
				if ( row >= 5)
					row = 0;
			}
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
			for ( var cid in ChipEntities )	{
				var chip = ChipEntities[cid];
			}
			timer.delay(function() {
					battleStatus.set({"timing":"end"});
			}, 100)
		},this).on("attack-end",function(){
			timer.delay(function() {
					battleStatus.set({"phase":"mana","timing":"begin"});
			}, 100)
		},this).on("mana-begin",function(){
			var income = Math.min( playingPlayer[1].get("manaIncome"), playingPlayer[1].get("handLimit") - playingPlayer[1].manas.length );
			for ( var i = 0 ; i < income ; i++ )
				playingPlayer[1].manas.add(new ManaCard({number:randomNumber(),suit:randomSuit()}));
			timer.delay(function() {
					battleStatus.set({"timing":"ing"});
			}, 100)
		},this).on("mana-ing",function(){
			timer.delay(function() {
					battleStatus.set({"timing":"end"});
			}, 100)
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

		//init
		ChipEntities = {};
		player = [];
		playingPlayer = [];
		playerAvatar = [];
		battleField = [];

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
			hp:3,
			att:1,
			def:0,
			damageType:"physical",
			attackType:"melee",
			owner:1
		},{
			cost: "pair",
			amount:"2",
			name:"skeleton-archor",
			label:"骷髅弓箭手",
			type:"creature",
			hp:2,
			att:1,
			def:0,
			damageType:"physical",
			attackType:"range",
			coolDown:150,
			owner:1
		},{
			cost: "pair",
			amount:"1",
			name:"fireball",
			label:"火球术",
			type:"sorcery",
			damageType:"fire",
			att:3,
			owner:1
		}]);
		player[2].get("book").add([{
			cost: "pair",
			amount:"1",
			name:"human-warrior",
			label:"战士",
			type:"creature",
			owner:2,
			hp:5,
			att:1,
			def:0,
			damageType:"physical",
			attackType:"melee",
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
			.attr({x:10,y:570})
			.playerAvatar({player:playingPlayer[1]});
		
		for ( var i = 0; i < 5 ; i++){
			battleField[i] = [];

			for ( var j = 0; j < 9; j++ ){
				battleField[i][j] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", BattleField, Tween")
					.battleField({model: new BattleField({x:j,y:i,z:0}) }).addComponent("BattleField1"+i);
			}
			playingPlayer[1].summonField[i] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SummonField, Tween")
				.summonField({model: new SummonField({x:10,y:105*i,z:1,owner:1}),index:i});

		}
		for ( var i = 0 ; i < 5 ; i++ )
				playingPlayer[1].manas.add(new ManaCard({number:randomNumber(),suit:randomSuit()}));

		battleStatus.trigger("start-begin",battleStatus);
	});

});
