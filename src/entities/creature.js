Crafty.c("Creature", {
	init:function(){
	},
	_enterFrame:function(){
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

		this.attr(options).bind('EnterFrame', this._enterFrame).bind('Click', this._onClicked);
		
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

Creature = BaseEntity.extend({
	defaults: {
		x : 0,
		y : 0,
		owner: 1,
        hp : 1,
		att : 1,
		speed: 1
    },
    initialize: function(){
    }
});

CreatureCollection = Backbone.Collection.extend({
	model:Creature
})