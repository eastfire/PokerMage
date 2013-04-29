Crafty.c("Creature", {
	init:function(){
	},
	_enterFrame:function(){
		this.attIconEntity.attr({x:this.x+11,y:this.y+11, z:this.z});
		this.attEntity.text(this.att).attr({x:this.x+15,y:this.y+8, z:this.z});
		this.hpIconEntity.attr({x:this.x+74,y:this.y+11, z:this.z});
		this.hpEntity.text(this.hp).attr({x:this.x+79,y:this.y+8, z:this.z});
		this.faceEntity.attr({x:this.x+20,y:this.y+20, z:this.z});
	},
	_onClicked:function(){
	},
	creature:function(options){
		this.model = options.model;
		this.attr(this.model.toJSON())
			.bind('EnterFrame', this._enterFrame)
			.bind('Click', this._onClicked)
		this.origin(this.w/2, this.h/2);
		this.model.on("destroy",this.onDie,this);

		this.addComponent("S-chip-"+this.owner);
		this.attr(options).bind('EnterFrame', this._enterFrame).bind('Click', this._onClicked);
		
		this.attIconEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Att-icon")
			.attr({w: 18, h: 18, x: this.x + 11, y: this.y + 11, z: this.z})
		this.attEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
			.attr({w: 18, h: 18, x: this.x + 5, y: this.y + 0, z: this.z})
					.text(this.att)
					.textColor('#000000')
					.textFont({'size' : "15px", 'family': 'Arial', "weight": 'bold'});
		this.hpIconEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Hp-icon")
			.attr({w: 18, h: 18, x: this.x + 76, y: this.y, z: this.z})
		this.hpEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Text")
			.attr({w: 18, h: 18, x: this.x + 75, y: this.y + 0, z: this.z})
					.text(this.hp)
					.textColor('#000000')
					.textFont({'size' : "15px", 'family': 'Arial', "weight": 'bold'});
		this.faceEntity = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", S-"+this.model.get("spell").get("name"))
			.attr({w: 60, h: 60, x: this.x + 20, y: this.y + 20, z: this.z});

		return this;
	},
	attack:function(){

	},
	takeDamage:function(amount, color){

	},
	onDie:function(){

		this.destroy();

	}
});

Creature = Backbone.Model.extend({
	defaults: {
		x : 0,
		y : 0,
		owner: 1,
        hp : 6,
		att : 1,
		speed: 1,
		spell: null,
		w:100,
		h:100
    },
    initialize: function(){
    }
});

CreatureCollection = Backbone.Collection.extend({
	model:Creature
})