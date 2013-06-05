randomRow = function(){
	return Math.floor(Math.random()*5);
}

ScenarioModel = Backbone.Model.extend({
	defaults:{
		name: "",
		waves:null,
		status:"stopped"
	},
	initialize:function(){
		this.set("waves", new WaveCollection());

	},
	start:function(){
		this.set("status","started");
		this.nextWave();
	},
	stop:function(){
		this.set("status","stopped");
	},
	getWave:function(){
		return this.get("waves").shift();
	},
	nextWave:function() {
		if ( this.get("status") === "stopped" )
			return;
		var currentWave = this.getWave();
		if ( !currentWave )
			return;
		var self = this;
		(function(wave){
			timer.delay(function() {
				var enemies = wave.get("enemies");
				if ( typeof enemies === "function"){
					enemies = enemies.call(wave);
				}
				for ( var i = 0; i < enemies.length ; i++){
					var enemy = enemies[i];
					var row = (enemy.row === "random") ? randomRow() : enemy.row;
					var creature = new Creature({x:1280,y:row*105,z:1,owner:2,spell:player[2].get("book").get(enemy.name) });
					ChipEntities[creature.cid] = Crafty.e("2D, "+gameContainer.conf.get('renderType')+", Chip, Creature")
							.chip({model: creature}).creature({model: creature});
				}
				self.nextWave();
			}, wave.get("delay"));
		})(currentWave);
	}
});

scenario1 = new ScenarioModel();
scenario1.get("waves").reset([{
		delay:2000,
		enemies:[
			{
				row : 0,
				name: "human-warrior"
			},
			{
				row : "random",
				name: "human-warrior"
			}
		]
	},{
		delay:10000,
		enemies:[
			{
				row : 1,
				name: "human-warrior"
			},
			{
				row : "random",
				name: "human-warrior"
			}
		]
	},{
		delay:10000,
		enemies:[
			{
				row : 1,
				name: "human-warrior"
			},
			{
				row : "random",
				name: "human-warrior"
			}
		]
	},{
		delay:10000,
		enemies:[
			{
				row : 1,
				name: "human-warrior"
			},
			{
				row : "random",
				name: "human-warrior"
			}
		]
	}]);