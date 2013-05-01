Spell = Backbone.Model.extend({
	idAttribute:"name",
	defaults: {
		cost: "pair",
		amount:"1",
		name:"",
		label:"",
		type:"creature",//creature-enchantment, player-enchantment, battle-field-enchantment, summon-field-enchantment, sorcery
		effect:null
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

