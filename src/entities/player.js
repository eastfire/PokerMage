Player = Backbone.Model.extend({
	defaults: {
		name:"",
		portrait:"",
		book:null
    },
    initialize: function(){
		this.set("book",new SpellBook());
    }
});

PlayerCollection = Backbone.Collection.extend({
	model:Player
})

PlayingPlayer = Backbone.Model.extend({
	defaults: {
		player:"",
		type:"",
		vp:0,
		hp:20,
		manaIncome:1,
		handLimit:17
    },
    initialize: function(){
		this.book = this.get("player").get("book").clone();
		this.summonField = [];
		this.battleField = [];
		this.manas = new ManaCollection();
    },
	changeVP:function(amount){
		this.set("vp",Math.max(0,this.get("vp")+amount) );
	}
});

Crafty.c("PlayerHand", {
	init:function(){

	},
	_enterFrame:function(){
		
	},
	playerHand:function(options){
		this.player = options.player;
		this.manas = this.player.manas;
		this.manaEntities = {};

		//this.bind('EnterFrame', this._enterFrame)

		this.player.on("destroy",this.onDie,this);
		this.manas.on("add",this._onAddMana,this);
		this.manas.on("remove",this._onRemoveMana,this);
		this.manas.on("reset",this._onResetMana,this);
		
		return this;
	},
	_refreshCardPosition:function(){
		var left = this.x;
		var top = this.y;
		var self = this;
		for ( var i = 0; i < this.manas.length ; i++ ) {
			var model = this.manas.at(i);
			if ( !this.manaEntities[model.cid].isDragging ){
				this.manaEntities[model.cid].x = left;
				this.manaEntities[model.cid].y = top;
			}
			left += 50;
		};
	},
	_onAddMana:function(model,collection,options){
		this.manaEntities[model.cid] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", ManaCard")
					.attr({x:0,y:0})
					.manaCard({model: model, size:"M"});
		this._refreshCardPosition();
	},
	
	_onRemoveMana:function(model,collection,options){
		//handled by mana itsself
		this._refreshCardPosition();
	},
	_onResetMana:function(collection,options){
		collection.each(this._onAddMana, this);
	},
	onDie:function(){
		this.destroy();
	}
});

Crafty.c("PlayerAvatar", {
	init:function(){

	},
	_enterFrame:function(){
		//this.portraitEntity.attr({x: this.attr("x"), y: this.attr("y"), z: this.z});
		/*this.manaIncomeIconEntity.attr({x: this.attr("x") + 14, y: this.attr("y")+110, z: this.z});
		this.manaIncomeEntity.text(this.player.get("manaIncome")).attr({x: this.attr("x") + 32, y: this.attr("y")+100, z: this.z});
		this.handLimitIconEntity.attr({x: this.attr("x") + 54, y: this.attr("y")+110, z: this.z});
		this.handLimitEntity.text(this.player.get("handLimit")).attr({x: this.attr("x") + 72, y: this.attr("y")+100, z: this.z});*/
		this.manaIncomeEntity.text(this.player.get("manaIncome"));
		this.handLimitEntity.text(this.player.get("handLimit"));
	},
	playerAvatar:function(options){
		this.player = options.player;
		this.origin(this.w/2, this.h/2);
		this.player.on("destroy",this.onDie,this);

		this.bind('EnterFrame', this._enterFrame);
		
		this.portraitEntity = Crafty.e("2D, DOM, Image")
			.image(this.player.get("player").get("portrait"))
			.attr({w: 100, h: 100, x: this.x, y: this.y, z: this.z})

		this.hpIconEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Hp-icon")
			.attr({w: 36, h: 36, x: this.x - 6, y: this.y + 110, z: this.z})
		this.hpEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
			.attr({w: 36, h: 36, x: this.x + 12, y: this.y + 100, z: this.z})
					.text(this.player.get("hp"))
					.textColor('#000000')
					.textFont({'size' : "25px", 'family': 'Arial', "weight": 'bold'})
					.textAlign("center");

		this.manaIncomeIconEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", mana-income-icon")
			.attr({w: 36, h: 36, x: this.x + 34, y: this.y + 110, z: this.z})
		this.manaIncomeEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
			.attr({w: 36, h: 36, x: this.x + 52, y: this.y + 100, z: this.z})
					.text(this.player.get("manaIncome"))
					.textColor('#ffffff')
					.textFont({'size' : "25px", 'family': 'Arial', "weight": 'bold'})
					.textAlign("center");

		this.handLimitIconEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", hand-limit-icon")
			.attr({w: 36, h: 36, x: this.x + 74, y: this.y + 110, z: this.z})
		this.handLimitEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
			.attr({w: 36, h: 36, x: this.x + 92, y: this.y + 100, z: this.z})
					.text(this.player.get("handLimit"))
					.textColor('#ffffff')
					.textFont({'size' : "25px", 'family': 'Arial', "weight": 'bold'})
					.textAlign("center");
		return this;
	}
});