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
		type:""
    },
    initialize: function(){
		this.book = this.get("player").get("book").clone();
		this.summonField = [];
    }
});