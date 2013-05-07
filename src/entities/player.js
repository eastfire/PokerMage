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
		manaIncome:5
    },
    initialize: function(){
		this.book = this.get("player").get("book").clone();
		this.summonField = [];
		this.battleField = [];
		this.manas = new ManaCollection();
    }
});

Crafty.c("PlayerHand", {
	init:function(){

	},
	_enterFrame:function(){
		var left = this.x;
		var top = this.y;
		var self = this;
		for ( var i = 0; i < this.manas.length ; i++ ) {
			var model = this.manas.at(i);
			if ( !this.manaEntities[model.cid].isDragging ){
				this.manaEntities[model.cid].attr({
					x:left,
					y:top,
					z:self.z+i
				});
			}
			left += 50;
		};
	},
	playerHand:function(options){
		this.player = options.player;
		this.manas = this.player.manas;
		this.manaEntities = {};

		this.bind('EnterFrame', this._enterFrame)

		this.player.on("destroy",this.onDie,this);
		this.manas.on("add",this._onAddMana,this);
		this.manas.on("remove",this._onRemoveMana,this);
		this.manas.on("reset",this._onResetMana,this);
		
		return this;
	},
		
	_onAddMana:function(model,collection,options){
		this.manaEntities[model.cid] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", ManaCard")
					.manaCard({model: model, size:"M"});
	},
	
	_onRemoveMana:function(model,collection,options){
		//handled by mana itsself
	},
	
	onDie:function(){
		this.destroy();
	}
});