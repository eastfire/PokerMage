BattleStatus = Backbone.Model.extend({
	defaults: function(){
		return {
			turn: 1,
			phase: "start",//start, attack, mana, magic, end
			timing: "begin",//begin, ing, end

	    };
	},
	initialize:function(){
		this.on("change",this.onChange,this);		
	},
	onChange:function(model){
		if ( model.get("turn") != model.previous("turn") ){
			this.trigger("new-turn",this);
		}
		if ( model.get("phase") != model.previous("phase") || model.get("timing") != model.previous("timing") ){
			this.trigger(model.get("phase")+"-"+model.get("timing"),this);
		}
	},
});
