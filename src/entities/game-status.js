BattleStatus = Backbone.Model.extend({
	defaults: function(){
		return {
			turn: 1,
			phase: "start",//start, attack, mana, magic, end
			timing: "begin",//begin, ing, end

	    };
	}
});
