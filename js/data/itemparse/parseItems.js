import { items } from "./items.js";
import { equipdata } from "./equipdata.js";

var accessory = []
var accessoryList = []
var armorHead = []
var armorHeadList = []
var armorBody = []
var armorBodyList = []
var armorLegs = []
var armorLegsList = []
var blacklistedItems = ['Music Box (Overworld Day)',
'Music Box (Eerie)',
'Music Box (Night)',
'Music Box (Title)',
'Music Box (Underground)',
'Music Box (Boss 1)',
'Music Box (Jungle)',
'Music Box (Corruption)',
'Music Box (Underground Corruption)',
'Music Box (The Hallow)',
'Music Box (Boss 2)',
'Music Box (Underground Hallow)',
'Music Box (Boss 3)',
'Music Box (Snow)',
'Music Box (Space Night)',
'Music Box (Crimson)',
'Music Box (Boss 4)',
'Music Box (Alt Overworld Day)',
'Music Box (Rain)',
'Music Box (Ice)',
'Music Box (Desert)',
'Music Box (Ocean Day)',
'Music Box (Dungeon)',
'Music Box (Plantera)',
'Music Box (Boss 5)',
'Music Box (Temple)',
'Music Box (Eclipse)',
'Music Box (Mushrooms)',
'Music Box (Pumpkin Moon)',
'Music Box (Alt Underground)',
'Music Box (Frost Moon)',
'Music Box (Underground Crimson)',
'Music Box (Lunar Boss)',
'Music Box (Martian Madness)',
'Music Box (Pirate Invasion)',
'Music Box (Hell)',
'Music Box (The Towers)',
'Music Box (Goblin Invasion)',
'Music Box (Sandstorm)',
"Music Box (Old One's Army)",
'Music Box (Ocean Night)',
'Music Box (Slime Rain)',
'Music Box (Space Day)',
'Music Box (Town Day)',
'Music Box (Town Night)',
'Music Box (Windy Day)',
'Music Box (Day Remix)',
"Music Box (Journey's Beginning)",
'Music Box (Storm)',
'Music Box (Graveyard)',
'Music Box (Underground Jungle)',
'Music Box (Jungle Night)',
'Music Box (Queen Slime)',
'Music Box (Empress Of Light)',
'Music Box (Duke Fishron)',
'Music Box (Morning Rain)',
'Music Box (Alt Title)',
'Music Box (Underground Desert)',
'Otherworldly Music Box (Rain)',
'Otherworldly Music Box (Overworld Day)',
'Otherworldly Music Box (Night)',
'Otherworldly Music Box (Underground)',
'Otherworldly Music Box (Desert)',
'Otherworldly Music Box (Ocean)',
'Otherworldly Music Box (Mushrooms)',
'Otherworldly Music Box (Dungeon)',
'Otherworldly Music Box (Space)',
'Otherworldly Music Box (Underworld)',
'Otherworldly Music Box (Snow)',
'Otherworldly Music Box (Corruption)',
'Otherworldly Music Box (Underground Corruption)',
'Otherworldly Music Box (Crimson)',
'Otherworldly Music Box (Underground Crimson)',
'Otherworldly Music Box (Ice)',
'Otherworldly Music Box (Underground Hallow)',
'Otherworldly Music Box (Eerie)',
'Otherworldly Music Box (Boss 2)',
'Otherworldly Music Box (Boss 1)',
'Otherworldly Music Box (Invasion)',
'Otherworldly Music Box (The Towers)',
'Otherworldly Music Box (Lunar Boss)',
'Otherworldly Music Box (Plantera)',
'Otherworldly Music Box (Jungle)',
'Otherworldly Music Box (Wall of Flesh)',
'Otherworldly Music Box (Hallow)',
'Music Box (Deerclops)']

function accessoryPush() {
    accessory.push(items.filter(e => 
        {if (e.type.includes('accessory')) {
            return e;
        }
    }));
    accessory = accessory[0]
}

function armorPush(armorType) {
    var list = [];
    list.push(items.filter(e => 
        {if (e.type.includes('armor')) {
            if (e.bodyslot == armorType) {
                return e;
            }
        }}
    ));
    return list[0];

}


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
function defenseCheck(variable) {
    var def = ifNotNull(variable);
    if(typeof def == 'string'){
        return parseInt(def)
    } else {
        return def
    }
}
function listify(inVar,outVar) {
    equipdata.filter(e => 
        {
            inVar.filter(i => 
                {
                    if (e.itemid == i.itemid) 
                        {
                            outVar.push(
                                {
                                    name: ifNotNull(i.name),
                                    id: e.itemid,
                                    defense: defenseCheck(i.defense),
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
                                    specialEffect: []
                                }
                            )
                            if (e.magmaStone == 1 ){
                                outVar[outVar.length-1].specialEffect.push({
                                    name:"HellfireMelee",
                                    value: [2,2,2,4,4,4,8,8]
                                })
                            }
                            
                        }
                }
            );
        }
    );
    inVar.filter(i => {
        if (outVar.some(e => e.name == i.name) == false) {
            if (blacklistedItems.includes(i.name) == false){
                if (i.name == "FoodBarbarian's Tattered Dragon Wings") {
                    outVar.push({
                        name: "FoodBarbarian's Dragon Wings",
                        id: i.itemid,
                        defense: ifNotNull(i.defense),
                    });
                } else {
                    outVar.push({
                        name: i.name,
                        id: i.itemid,
                        defense: defenseCheck(i.defense),
                    });
                }
            }
        }
    });
    outVar.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    
}

function exportJson(inObj,elementID) {
    var a = JSON.stringify(inObj)
    var textFile = null,
      makeTextFile = function (text) {
        var data = new Blob([text], {type: 'text/plain'});
        if (textFile !== null) {
          window.URL.revokeObjectURL(textFile);
        }
    
        textFile = window.URL.createObjectURL(data);
        return textFile;
      };

        var link = document.getElementById(elementID);
        link.href = makeTextFile(a);
        link.style.display = 'block';
};

accessoryPush();
armorHead = armorPush("helmet");
armorBody = armorPush("shirt");
armorLegs = armorPush("pants");
listify(accessory, accessoryList);
exportJson(accessoryList, "accessory");

listify(armorHead, armorHeadList);
exportJson(armorHeadList, "armorHead");

listify(armorBody,armorBodyList);
exportJson(armorBodyList, "armorBody");

listify(armorLegs,armorLegsList);
exportJson(armorLegsList, "armorLegs");