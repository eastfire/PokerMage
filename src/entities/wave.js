WaveModel = Backbone.Model.extend({
	defaults:{
		delay: 0,
		enemies:[] //array or function
	},
});

WaveCollection = Backbone.Collection.extend({
	model : WaveModel
});