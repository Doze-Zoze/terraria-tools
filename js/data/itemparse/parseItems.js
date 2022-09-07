import { items } from "./items.js";
import { equipdata } from "./equipdata.js";

var accessory1 = []
var accessory2 = []
var accessoryList = []

accessory1.push(items.filter(e => 
    {if (e.type.includes('accessory')) {
        return e;
    }
}));
accessory1 = accessory1[0]

function ifNotNull(variable) {
    if( variable!=null)
        {return variable} 
    else 
        {return 0};
}
function ammoCost(variable, rate) {
    if (variable == 1) {
        return rate
    }
}

equipdata.filter(e => 
    {
        accessory1.filter(i => 
            {
                if (e.itemid == i.itemid) 
                    {
                        accessoryList.push(
                            {
                                name: ifNotNull(i.name),
                                defense: ifNotNull(i.defense),
                                dmg: {
                                    melee: ifNotNull(e.meleeDamage),
                                    ranged: ifNotNull(e.rangedDamage),
                                    arrow: ifNotNull(e.arrowDamage),
                                    bullet: ifNotNull(e.bulletDamage),
                                    rocket: ifNotNull(e.rocketDamage),
                                    magic: ifNotNull(e.magicDamage),
                                    summon: ifNotNull(e.minionDamage) + (0.1*ifNotNull(e.dd2Accessory)),
                                },
                                crit: {
                                    melee: ifNotNull(e.meleeCrit),
                                    ranged: ifNotNull(e.rangedCrit),
                                    magic: ifNotNull(e.magicCrit)
                                },
                                armorPenetration: {
                                    all: ifNotNull(e.armorPenetration),
                                },
                                meleeSpeed: ifNotNull(e.meleeSpeed),
                                moveSpeed: ifNotNull(e.moveSpeed),
                                ammoConsumption:  (0+ammoCost(e.chloroAmmoCost80,0.2)+ammoCost(e.AmmoCost80,0.2)+ammoCost(e.ammoCost75,0.25)+ammoCost(e.huntressAmmoCost90,0.1)),
                                maxMana: ifNotNull(e.statManaMax2),
                                manaConsumption:(ifNotNull(e.manaCost)*-1),
                                lifeRegen: ifNotNull(e.lifeRegen),
                                damageReduction: ifNotNull(e.endurance),
                                aggro: ifNotNull(e.aggro),
                                minionSlots: ifNotNull(e.maxMinions),
                                sentrySlots: ifNotNull(e.dd2Accessory),
                                specialEffect: [],
                                equipData:[e]
                            }
                        )
                        if (e.magmaStone == 1 ){
                            accessoryList[accessoryList.length-1].specialEffect.push({
                                name:"HellfireMelee",
                                value: [2,2,2,4,4,4,8,8]
                            })
                        }
                        
                    }
            }
        );
    }
);
var a = JSON.stringify(accessoryList)
console.log(accessoryList);

(function () {
    var textFile = null,
      makeTextFile = function (text) {
        var data = new Blob([text], {type: 'text/plain'});
    
        // If we are replacing a previously generated file we need to
        // manually revoke the object URL to avoid memory leaks.
        if (textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }
    
        textFile = window.URL.createObjectURL(data);
    
        return textFile;
      };
    
    
      var create = document.getElementById('create'),
        textbox = document.getElementById('textbox');
    
      create.addEventListener('click', function () {
        var link = document.getElementById('downloadlink');
        link.href = makeTextFile(a);
        link.style.display = 'block';
      }, false);
    })();