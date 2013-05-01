Effect = Backbone.Model.extend({
	defaults: function() {
		return {
			label: "",
			owner:1,
			condition : null,
			func : null
		};
	},
});

EffectCollection = Backbone.Collection.extend({
	model : Effect
});