Unlockable = Backbone.Model.extend({
	idAttribute:"name",
	defaults: function() {
		return {
			name : "",
			label: "",
			icon:"",
			locked : true,
			preRequires : null,
			condition : "",
			conditionLabel : "",
			oneTimeEffect : null,
			permanentEffect : null
		};
	},
});

UnlockCollection = Backbone.Collection.extend({
	model : Unlockable
});