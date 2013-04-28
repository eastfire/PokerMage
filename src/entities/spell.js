Spell = Backbone.Model.extend({
	defaults: {
		cost: "pair",
		amount:"1",
		name:"",
		label:"",
		type:"creature",
		owner:1
    },
    initialize: function(){
    }
});

SpellBook = Backbone.Collection.extend({
	model:Spell,
	
	getValidSpells:function(feature){
		var array = [];
		this.each(function(spell){
			if ( feature[spell.get("cost")] == spell.get("amount") ){
				array.push(spell);
			}
		});
		return array;
	}
})

