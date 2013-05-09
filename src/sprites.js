/**
    examples:             
    'sprites_name' : {
         'file' : 'path/to/file',
         'tile' : width,
         'tileh' : height,
         'elements': {
             'sprite_name' : [0, 0]
         }
    },
*/

Sprites = Backbone.Model.extend({
    defaults: {
        images:{
			'manaCardL' : {
				'file' : 'web/images/mana-card-l.png',
				'tile' : 100,
				'tileh' : 160,
				'elements': {
					'L-suit1' : [0, 0],
					'L-suit2' : [1, 0],
					'L-suit3' : [2, 0],
					'L-suit4' : [3, 0],
				}
			},
			'manaCardM' : {
				'file' : 'web/images/mana-card-m.png',
				'tile' : 50,
				'tileh' : 80,
				'elements': {
					'M-suit1' : [0, 0],
					'M-suit2' : [1, 0],
					'M-suit3' : [2, 0],
					'M-suit4' : [3, 0],
				}
			},
			'manaCardS' : {
				'file' : 'web/images/mana-card-s.png',
				'tile' : 25,
				'tileh' : 40,
				'elements': {
					'S-suit1' : [0, 0],
					'S-suit2' : [1, 0],
					'S-suit3' : [2, 0],
					'S-suit4' : [3, 0],
				}
			},
			'summonField' : {
				'file' : 'web/images/summon-field.png',
				'tile' : 200,
				'tileh' : 100,
				'elements': {
					'SummonFieldEmpty' : [0, 0],
					'SummonFieldValid' : [0, 1]
				}
			},
			'battleField' : {
				'file' : 'web/images/brick.jpg',
				'tile' : 200,
				'tileh' : 140,
				'elements': {
					'BattleField10' : [0, 0],
					'BattleField11' : [1, 0],
					'BattleField12' : [2, 0],
					'BattleField13' : [3, 0],
					'BattleField14' : [4, 0],
					'BattleField20' : [0, 1],
					'BattleField21' : [1, 1],
					'BattleField22' : [2, 1],
					'BattleField23' : [3, 1],
					'BattleField24' : [4, 1],
				}
			},
			'chipL' : {
				'file' : 'web/images/chip-l.png',
				'tile' : 500,
				'tileh' : 500,
				'elements': {
					'L-chip-1' : [0, 0],
					'L-chip-2' : [1, 0],
					'L-chip-v' : [2, 0],
					'L-chip-creature' : [0, 0],
					'L-chip-sorcery' : [1, 0],
					'L-chip-creature-enchantment' : [2, 0],
					'L-chip-battle-field-enchantment' : [2, 0],
					'L-chip-summon-field-enchantment' : [2, 0],
				}
			},
			'chipS' : {
				'file' : 'web/images/chip-s.png',
				'tile' : 100,
				'tileh' : 100,
				'elements': {
					'S-chip-1' : [0, 0],
					'S-chip-2' : [1, 0],
					'S-chip-v' : [2, 0],
					'S-chip-creature' : [0, 0],
					'S-chip-sorcery' : [1, 0],
					'S-chip-creature-enchantment' : [2, 0],
					'S-chip-battle-field-enchantment' : [2, 0],
					'S-chip-summon-field-enchantment' : [2, 0],
				}
			},
			'skeletonWarriorS' : {
				'file' : 'web/images/skeleton-warrior-s.png',
				'tile' : 60,
				'tileh' : 60,
				'elements': {
					'S-skeleton-warrior' : [0, 0]
				}
			},
			'skeletonWarriorMenu' : {
				'file' : 'web/images/skeleton-warrior-menu.png',
				'tile' : 60,
				'tileh' : 60,
				'elements': {
					'Menu-skeleton-warrior' : [0, 0]
				}
			},
			'skeletonWarriorL' : {
				'file' : 'web/images/skeleton-warrior-l.png',
				'tile' : 300,
				'tileh' : 300,
				'elements': {
					'L-skeleton-warrior' : [0, 0]
				}
			},
			"hpIcon":{
				'file' : 'web/images/hp-icon.png',
				'tile' : 24,
				'tileh' : 24,
				'elements': {
					'Hp-icon' : [0, 0]
				}
			},
			"attIcon":{
				'file' : 'web/images/attack-icon.png',
				'tile' : 24,
				'tileh' : 24,
				'elements': {
					'Att-icon' : [0, 0]
				}
			},
			"vpIcon":{
				'file' : 'web/images/coin-icon.png',
				'tile' : 24,
				'tileh' : 24,
				'elements': {
					'Vp-icon' : [0, 0]
				}
			},
			"manaSourceIcon":{
				'file' : 'web/images/mana-source-icon.png',
				'tile' : 36,
				'tileh' : 36,
				'elements': {
					'Mana-source-icon' : [0, 0]
				}
			},
			"treasureHoard":{
				'file' : 'web/images/treasure-hoard.png',
				'tile' : 160,
				'tileh' : 110,
				'elements': {
					'TreasureHoardOk' : [0, 0],
					'TreasureHoardForbiden' : [1, 0]
				}
			}
        }
    },
    initialize: function(){
        
    },
    /**
     * Create Crafty sprites from images object
     * Pass key if You want create only one choosen sprite.
     * 
     * @param  string key - sprite definition key
     */
    create: function(key){
        if(key != undefined){
            element = this.get('images')[key];
            if(element['tileh'] == undefined)
                Crafty.sprite(element['tile'], element['file'], element['elements']);
            else
                Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);
    		
            return true;
        };

        _.each(this.get('images'), function(element, k){ 
            if(element['tileh'] == undefined)
                Crafty.sprite(element['tile'], element['file'], element['elements']);
            else
                Crafty.sprite(element['tile'], element['tileh'], element['file'], element['elements']);
        });

    },
    /**
     * Get path for sprites files - for loading
     * 
     * @return array array of files paths
     */
    getPaths: function(){
        var array = [], i=0;
        _.each(this.get('images'), function(element, key){ 
            array[i] = element['file']
            i++;
        });

        return array;
    }
});