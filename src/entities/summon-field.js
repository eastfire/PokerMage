Crafty.c("SummonField", {
	init:function(){

	},
	_enterFrame:function(){
		var left = this.x + 48 + (5-this.manas.length)*10;
		var top = this.y + 30 + ( this.showingMenu?25:0 );
		var self = this;
		for ( var i = 0; i < this.manas.length ; i++ ) {
			var model = this.manas.at(i);
			this.manaEntities[model.cid].attr({
				x:left,
				y:top,
				z:self.z+i
			});
			left += 20;
		};
		var ret;
		if ( (ret = this.hit('ManaCardActive')) && this.manas.length < 5) {
			var manaCard = ret[0].obj;
			if ( manaCard.owner === this.owner ) {
				if ( Math.abs(this.x+this._origin.x - manaCard.x - manaCard._origin.x)<this.w/2 && Math.abs(this.y+this._origin.y - manaCard.y-manaCard._origin.y)<this.h/2 ) {
					this.showValid();
				} else
					this.showWaiting();
			}
		} else
			this.showWaiting();
	},
	addMana:function(mana){
		this.manas.add(mana);
	},
	showWaiting:function(){
		this.removeComponent("SummonFieldValid").addComponent("SummonFieldEmpty");
	},
	showValid:function(){
		this.addComponent("SummonFieldValid").removeComponent("SummonFieldEmpty");
	},	
	_onClicked:function(event){
		if ( window.isDragging )
			return;
		var spells = playingPlayer[this.owner].book.getValidSpells(this.manas.feature());
		if ( spells.length ) {
			Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SummonMenu")
				.summonMenu({
					spells: spells,
					summonField:this
				});
			this.showingMenu = true;
		}
	},
	summonCreature:function(creatureSpell){
		var len = this.manas.length;
		for ( var i=0; i<len ; i++ )
			this.manas.pop().destroy();
		var creature = new Creature({x:this.x+50,y:this.y,z:2,owner:this.owner,spell:creatureSpell});
		var battleField = window.battleField[this.index][0];
		ChipEntities[creature.cid] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Chip, Creature,"+creatureSpell.get("name"))
				.chip({model: creature}).creature({model: creature, index:this.index});
	},
	castSorcery:function(spell){
		var len = this.manas.length;
		for ( var i=0; i<len ; i++ )
			this.manas.pop().destroy();
		Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Sorcery,"+spell.get("name"))
				.attr({x:this.x+50,y:this.y+40,z:2,owner:this.owner})
				.cast({spell: spell});
	},
	summonField:function(options){
		this.model = options.model;
		this.index = options.index;
		this.manas = new ManaCollection();
		this.manaEntities = {};
		this.addComponent("SummonFieldEmpty","Collision","Mouse");
		this.attr(this.model.toJSON())
			.bind('EnterFrame', this._enterFrame)
			.bind('Click', this._onClicked)
		this.origin(this.w/2, this.h/2);

		this.model.on("destroy",this.onDie,this);
		this.manas.on("add",this._onAddMana,this);
		this.manas.on("remove",this._onRemoveMana,this);
		this.manas.on("reset",this._onResetMana,this);
		
		return this;
	},
		
	_onAddMana:function(model,collection,options){
		this.manaEntities[model.cid] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", ManaCard")
					.manaCard({model: model, fix:true, size:"S"});
	},
	
	_onRemoveMana:function(model,collection,options){
		//handled by mana itsself
	},
	takeDamage:function(amount,attackType,damageType){
		return this.model.takeDamage(amount,attackType,damageType)
	},
	onDie:function(){
		this.destroy();
	}
});

SummonField = Backbone.Model.extend({
	defaults: {
		w:200,
		h:100,
		owner:1,
		enable:true
    },
    initialize: function(){
    },
	takeDamage: function(amount,attackType,damageType){
		playingPlayer[this.get("owner")].takeDamage(amount,attackType,damageType)
	}
});

SummonFieldCollection = Backbone.Collection.extend({
	model:SummonField
});

Crafty.c("SummonMenuItem", {
	init:function(){

	},
	_onClicked:function(event){
		this.menu.onDie();
		if ( this.spell.get("type") == "creature" )	{
			this.summonField.summonCreature(this.spell);
		} else if ( this.spell.get("type") == "sorcery" ){
			this.summonField.castSorcery(this.spell);
		}
	},
	summonMenuItem:function(options){
		this.spell = options.spell;
		this.menu = options.menu;
		this.summonField = options.summonField;
		this.addComponent("Mouse")
			.bind('Click', this._onClicked);

		return this;
	},	
	onDie:function(){
		this.destroy();
	}
});

Crafty.c("SummonMenu", {
	init:function(){

	},
	summonMenu:function(options){
		this.spells = options.spells;
		if ( !this.spells.length )
			return;
		this.summonField = options.summonField;
		this.spellMenuItems = [];

		var left = this.summonField.x + this.summonField.w/2-(this.spells.length/2)*66;
		var top = this.summonField.y + this.summonField.h/2 - 55 ;
		_.each( this.spells, function(spell){
			var item = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", SummonMenuItem, Menu-"+spell.get("name"))
				.summonMenuItem({
					spell:spell,
					menu:this,
					summonField:options.summonField
				})
				.attr({
					x:left,
					y:top,
					z:101
				});
			this.spellMenuItems.push(item);
			left += 66;
		},this);
		globalMask.attr("visible",true);
		var self = this;
		Crafty.bind("global-mask-clicked",function(){
			self.onDie();
		});
		return this;
	},
	
	onDie:function(){
		_.each( this.spellMenuItems,function(item){
			item.onDie();
		});
		this.summonField.showingMenu = false;
		globalMask.attr("visible",false);
		this.destroy();
	}
});