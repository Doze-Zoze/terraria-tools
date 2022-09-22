import { weapon } from './data/weapon.js';
import  { reforgeUniversal, reforgeCommon, reforgeMelee, reforgeRanged, reforgeMagic, reforgeAccessory } from './data/reforge.js';
import {accessory} from './data/accessory.js'
import {armorHead, armorBody, armorLegs, armorSet} from './data/armor.js'

var stat_boosts = {
    defense: 0,
    dmg: {
        inUse: 0,
        all: 0,
        melee: 0,
        ranged: 0,
        arrow: 0,
        bullet: 0,
        rocket: 0,
        magic: 0,
        summon: 0,
    },
    crit: {
        inUse: 0,
        all: 0,
        melee: 0,
        ranged: 0,
        arrow: 0,
        bullet: 0,
        rocket: 0,
        magic: 0,
        summon: 0
    },
    armorPenetration: {
        inUse: 0,
        all: 0,
        melee: 0,
        ranged: 0,
        arrow: 0,
        bullet: 0,
        rocket: 0,
        magic: 0,
        summon: 0
    },
    meleeSpeed: 0,
    moveSpeed: 0,
    ammoConsumption: 0,
    maxMana: 0,
    manaConsumption:0,
    lifeRegen: 0,
    damageReduction: 0,
    aggro: 0,
    minionSlots: 0,
    sentrySlots: 0,
    damageReduction:0,
    inflictDebuff: [],
    specialEffect: []
}
var selectedArmor = {
    head: "",
    body: "",
    legs: "",
    set: ""
}
var weapon_stats = {
    reforgepool : ["universal"],
    damage:0,
    dmgType:"melee",
    knockback:0,
    crit: 0,
    usetime: 0,
    velocity: 0,
    rarity: 8,
    sell: 100000,
    meleeSpeedMult: 1,
    mana: false,
    ammoType: "none",
    projectileDmg: 0,
    projectileUseTime: 0,
    canMelee: true,
    specialEffect: [],
}
var weapon_reforge = {
}
var damage_stats ={
    damage: 0,
    crit: 0,
    usetime: 0,
    meleeSpeedMult: 0,
    dmgType: "",
    dph:0,
    dps:0
}
/*Set functions to run*/
 document.getElementById("weaponName").onchange = getWeaponStats
 document.getElementById("weaponReforge").onchange = reforgeSearch
 document.getElementById("weaponDamageType").onchange = updateCalculations
 for (let i = 1; i <= 7; i++) {
    document.getElementById("accesorySlot"+String(i)).onchange = updateCalculations
    document.getElementById("accesorySlot"+String(i)+"Reforge").onchange = updateCalculations
 }
 document.getElementById("armorHead").onchange = updateCalculations
 document.getElementById("armorChest").onchange = updateCalculations
 document.getElementById("armorLegs").onchange = updateCalculations
 document.getElementById("weaponName").onchange = getWeaponStats
 document.getElementById("DamageCalculate").addEventListener("click", damageCalc);


 /*search for weapon stats */
function earlyWriteToScreen() {
    document.getElementById("weaponDamage").value = weapon_stats.damage;
    document.getElementById("weaponCrit").value = weapon_stats.crit
    document.getElementById("weaponUseTime").value = weapon_stats.usetime
    document.getElementById("weaponMeleeSpeed").value = weapon_stats.meleeSpeedMult
    document.getElementById("weaponDamageType").value = weapon_stats.dmgType
    /*weapon reforge */
    document.getElementById("reforgeDamage").value = weapon_reforge.damage;
    document.getElementById("reforgeCrit").value = weapon_reforge.crit;
    document.getElementById("reforgeSpeed").value = weapon_reforge.speed
}
 
function writeToScreen() {
    /*weapon base stats*/

    /*weapon stats */
    document.getElementById("boostDamage").innerHTML = damage_stats.damage;
    document.getElementById("boostCrit").innerHTML = Math.round(damage_stats.crit*10000)/10000;
    document.getElementById("boostUseTime").innerHTML = damage_stats.usetime;
    document.getElementById("boostDamageMult").value = Math.round(100*(stat_boosts.dmg.inUse))/100;
    document.getElementById("boostCritMult").value = Math.round(10000*(stat_boosts.crit.inUse))/10000;
    document.getElementById("boostUseTimeMult").value = Math.round(100*(weapon_reforge.speed))/100;
    /*DPS */
    document.getElementById("damageOut").innerHTML = Math.round(100*damage_stats.dph)/100;
    document.getElementById("DPSOut").innerHTML = Math.round(100*damage_stats.dps)/100;
    /*player stats */
    document.getElementById("equipment_defense").text = stat_boosts.defense;
    document.getElementById("equipment_damageResist").text = stat_boosts.damageReduction;
    document.getElementById("equipment_dmg").text = stat_boosts.dmg.inUse;
    document.getElementById("equipment_crit").text = stat_boosts.crit.inUse;
    document.getElementById("equipment_meleeSpeed").text = Math.round(stat_boosts.meleeSpeed*1000)/1000;
    document.getElementById("equipment_armorPenetration").text = stat_boosts.armorPenetration.inUse;
    document.getElementById("equipment_minionSlot").text = stat_boosts.minionSlots;
    document.getElementById("equipment_inflictDebuff").text = stat_boosts.inflictDebuff.toString();
    /** Debuffs and Armor Penetration */
      
}
function getWeaponStats() {
    var weaponName = document.getElementById("weaponName").value;
    var index = weapon.findIndex(r => r.name === weaponName);
    weapon_stats = weapon[index]
    updateReforgePool()
    earlyWriteToScreen()
}

function updateReforgePool() {
    var select = document.getElementById('weaponReforge');
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    if (weapon_stats.reforgepool.includes("universal")) {
        for (var i = 0; i < reforgeUniversal.length; i++){
            var opt = document.createElement('option');
            opt.value = reforgeUniversal[i].name;
            opt.innerHTML = reforgeUniversal[i].name;
            select.appendChild(opt);
        }
    }
    if (weapon_stats.reforgepool.includes("common")) {
        for (var i = 0; i < reforgeCommon.length; i++){
            var opt = document.createElement('option');
            opt.value = reforgeCommon[i].name;
            opt.innerHTML = reforgeCommon[i].name;
            select.appendChild(opt);
        }
    }
    if (weapon_stats.reforgepool.includes("melee")) {
        for (var i = 0; i < reforgeMelee.length; i++){
            var opt = document.createElement('option');
            opt.value = reforgeMelee[i].name;
            opt.innerHTML = reforgeMelee[i].name;
            select.appendChild(opt);
        }
    }
    if (weapon_stats.reforgepool.includes("ranged")) {
        for (var i = 0; i < reforgeRanged.length; i++){
            var opt = document.createElement('option');
            opt.value = reforgeRanged[i].name;
            opt.innerHTML = reforgeRanged[i].name;
            select.appendChild(opt);
        }
    }
    if (weapon_stats.reforgepool.includes("magic")) {
        for (var i = 0; i < reforgeMagic.length; i++){
            var opt = document.createElement('option');
            opt.value = reforgeMagic[i].name;
            opt.innerHTML = reforgeMagic[i].name;
            select.appendChild(opt);
        }
    }
    boostCalc()
}

function damageCalc() {
    var defense = parseFloat(document.getElementById("enemyDefense").value);
    damage_stats.dph = (damage_stats.damage-(defense/2))+(damage_stats.crit)*(damage_stats.damage-(defense/2));
    damage_stats.dps = damage_stats.dph*(60/damage_stats.usetime);
    writeToScreen()
}

function reforgeSearch() {
    var reforgeName = document.getElementById("weaponReforge").value;
    var index = reforgeUniversal.findIndex(r => r.name === reforgeName);
    if (index != -1) {
        weapon_reforge = reforgeUniversal[index];
    } else {
        index = reforgeMelee.findIndex(r => r.name === reforgeName);
        if (index != -1) {
            weapon_reforge = reforgeMelee[index];
        } else {
            index = reforgeRanged.findIndex(r => r.name === reforgeName);
            if (index != -1) {
                weapon_reforge = reforgeRanged[index];
            } else {
                index = reforgeMagic.findIndex(r => r.name === reforgeName);
                if(index != -1) {
                    weapon_reforge = reforgeMagic[index];
                } else {
                    index = reforgeCommon.findIndex(r => r.name === reforgeName);
                    weapon_reforge = reforgeCommon[index];
                }
            } 
        }  
    }
    var box = document.getElementById("weaponReforge")
    if (box.options[box.selectedIndex].text == "None") {
        document.getElementById("reforgeDamage").parentElement.style.display = 'none';
        document.getElementById("reforgeCrit").parentElement.style.display = 'none';
        document.getElementById("reforgeSpeed").parentElement.style.display = 'none';
    } else {
        document.getElementById("reforgeDamage").parentElement.style.display = 'flex';
        document.getElementById("reforgeCrit").parentElement.style.display = 'flex';
        document.getElementById("reforgeSpeed").parentElement.style.display = 'flex';
    }
    boostCalc()
}

function boostCalc() {
    /*damage_stats is for the output number, stat_boosts is for the equipment bonuses ONLY */
    equipCalc()
    damage_stats.damage = Math.round(weapon_stats.damage * (1+weapon_reforge.damage));
    damage_stats.crit = weapon_stats.crit + weapon_reforge.crit;
    stat_boosts.crit.inUse = stat_boosts.crit.all;
    stat_boosts.dmg.inUse = stat_boosts.dmg.all;
    if (document.getElementById("weaponDamageType").value == "melee") {
        stat_boosts.dmg.inUse += stat_boosts.dmg.melee;
        stat_boosts.crit.inUse += stat_boosts.crit.melee;
    }
    if (document.getElementById("weaponDamageType").value == "ranged") {
        stat_boosts.dmg.inUse += stat_boosts.dmg.ranged;
        stat_boosts.crit.inUse += stat_boosts.crit.ranged;
    }
    if (document.getElementById("weaponDamageType").value == "magic") {
        stat_boosts.dmg.inUse += stat_boosts.dmg.magic;
        stat_boosts.crit.inUse += stat_boosts.crit.magic;
    }
    if (document.getElementById("weaponDamageType").value == "summon") {
        stat_boosts.dmg.inUse += stat_boosts.dmg.summon;
        stat_boosts.crit.inUse += stat_boosts.crit.summon;
    }
    console.log(stat_boosts.dmg.inUse)
    damage_stats.damage = damage_stats.damage * (1 +stat_boosts.dmg.inUse);
    damage_stats.crit = damage_stats.crit + stat_boosts.crit.inUse;
    damage_stats.usetime = Math.round(weapon_stats.usetime * (1-weapon_reforge.speed));
    damage_stats.usetime = Math.round(damage_stats.usetime*(1/(1+(stat_boosts.meleeSpeed*weapon_stats.meleeSpeedMult))))
    damageCalc()
}
function boostCombine(input_boosts, input_item) {
    let keys = Object.keys(input_boosts)
    keys.forEach((key) => {
        if (input_item.hasOwnProperty(key)) { 
            if (key == "dmg") {
                let keysDmg = Object.keys(input_item.dmg)
                keysDmg.forEach((key2) => {
                    if (input_item.dmg.hasOwnProperty(key2)) {
                    input_boosts.dmg[key2] += input_item.dmg[key2];
                    }
                })
            } else {
                if (key == "crit") {
                    let keysCrit = Object.keys(input_item.crit)
                    keysCrit.forEach((key2) => {
                   input_boosts.crit[key2] += input_item.crit[key2]
                    })
                } else {
                    if (key == "specialEffect") {
                        if (input_item.specialEffect.length > 0){
                            for (var i2=0; i2 < input_item.specialEffect.length; i2++) {
                                input_boosts.specialEffect.push(input_item.specialEffect[i2]);}}
                    } else {
                        if (key == "armorPenetration") {
                            let keysPene = Object.keys(input_item.crit)
                            keysPene.forEach((key2) => {
                           input_boosts.armorPenetration[key2] += input_item.armorPenetration[key2]
                            })
                        } else {
                            input_boosts[key] += input_item[key];
                        }
                    }
                }
            }
        }
    })
}
function equipCalc(){
    stat_boosts = {
        defense: 0,
        dmg: {
            inUse: 0,
            all: 0,
            melee: 0,
            ranged: 0,
            arrow: 0,
            bullet: 0,
            rocket: 0,
            magic: 0,
            summon: 0,
        },
        crit: {
            inUse: 0,
            all: 0,
            melee: 0,
            ranged: 0,
            arrow: 0,
            bullet: 0,
            rocket: 0,
            magic: 0,
            summon: 0
        },
        armorPenetration: {
            inUse: 0,
            all: 0,
            melee: 0,
            ranged: 0,
            arrow: 0,
            bullet: 0,
            rocket: 0,
            magic: 0,
            summon: 0
        },
        meleeSpeed: 0,
        moveSpeed: 0,
        ammoConsumption: 0,
        maxMana: 0,
        manaConsumption:0,
        lifeRegen: 0,
        damageReduction: 0,
        aggro: 0,
        minionSlots: 0,
        sentrySlots: 0,
        damageReduction:0,
        inflictDebuff: [],
        specialEffect: []
    };
    /*Adding accessory slot boosts*/
    for (let i = 1; i <= 7; i++) { 
        var select = document.getElementById("accesorySlot"+String(i))
        var value = select.options[select.selectedIndex].value
        boostCombine(stat_boosts,accessory[value])
    }
    /*Adding accessory reforge stat_boosts*/
    for (let i = 1; i <= 7; i++) { 
        var select = document.getElementById("accesorySlot"+String(i)+"Reforge")
        var value = select.options[select.selectedIndex].value;
        stat_boosts.dmg.all += reforgeAccessory[value].damage;
        stat_boosts.defense += reforgeAccessory[value].defense;
        stat_boosts.crit.all += reforgeAccessory[value].crit;
        stat_boosts.meleeSpeed += reforgeAccessory[value].meleeSpeed;
        stat_boosts.maxMana += reforgeAccessory[value].mana;
        stat_boosts.moveSpeed += reforgeAccessory[value].moveSpeed;
        
    }
    /*Adding armor slot boosts*/
    selectedArmor = {
        head: armorHead[document.getElementById("armorHead").options[document.getElementById("armorHead").selectedIndex].value],
        body: armorBody[document.getElementById("armorChest").options[document.getElementById("armorChest").selectedIndex].value],
        legs: armorLegs[document.getElementById("armorLegs").options[document.getElementById("armorLegs").selectedIndex].value],
        set: ""
    }
    boostCombine(stat_boosts, selectedArmor.head)
    boostCombine(stat_boosts, selectedArmor.body)
    boostCombine(stat_boosts, selectedArmor.legs)
    /*Adding armor set bonus*/
    for (var len in armorSet) {
        if ((armorSet[len].armor.head == undefined) || (armorSet[len].armor.head.includes(selectedArmor.head.name))) {
            if((armorSet[len].armor.body == undefined) || (armorSet[len].armor.body.includes(selectedArmor.body.name))) {
                if ((armorSet[len].armor.legs == undefined) || (armorSet[len].armor.legs.includes(selectedArmor.legs.name))) {
                    selectedArmor.set = armorSet[len]
                    boostCombine(stat_boosts, selectedArmor.set)
                }
            }
        }
    }
    
    /*class-specifc damage bonuses*/
    if (document.getElementById("weaponDamageType").value == "melee") {
        stat_boosts.dmg.inUse = Math.round(10000*(stat_boosts.dmg.all + stat_boosts.dmg.melee))/10000;
    } else {
        if (document.getElementById("weaponDamageType").value == "ranged") {
            stat_boosts.dmg.inUse = Math.round(10000*(stat_boosts.dmg.all + stat_boosts.dmg.ranged))/1000;
        } else {
            if (document.getElementById("weaponDamageType").value == "magic") {
                stat_boosts.dmg.inUse = Math.round(1000*(stat_boosts.dmg.all + stat_boosts.dmg.magic))/10000;
            } else {
                if (document.getElementById("weaponDamageType").value == "summon") {
                    stat_boosts.dmg.inUse = Math.round(1000*(stat_boosts.dmg.all + stat_boosts.dmg.summon))/10000;
                } else{
                    stat_boosts.dmg.inUse = Math.round(10000*stat_boosts.dmg.all)/10000;
                }
            }
        }
    }
    /*class-specifc crit bonuses*/
    if (document.getElementById("weaponDamageType").value == "melee") {
        stat_boosts.crit.inUse = Math.round(10000*(stat_boosts.crit.all + stat_boosts.crit.melee))/10000;
    } else {
        if (document.getElementById("weaponDamageType").value == "ranged") {
            stat_boosts.crit.inUse = Math.round(10000*(stat_boosts.crit.all + stat_boosts.crit.ranged))/1000;
        } else {
            if (document.getElementById("weaponDamageType").value == "magic") {
                stat_boosts.crit.inUse = Math.round(1000*(stat_boosts.crit.all + stat_boosts.crit.magic))/10000;
            } else {
                if (document.getElementById("weaponDamageType").value == "summon") {
                    stat_boosts.crit.inUse = Math.round(1000*(stat_boosts.crit.all + stat_boosts.crit.summon))/10000;
                } else{
                    stat_boosts.crit.inUse = Math.round(10000*stat_boosts.crit.all)/10000;
                }
            }
        }
    }
    /*Armor Peircing */
    if (document.getElementById("weaponDamageType").value == "melee") {
        stat_boosts.armorPenetration.inUse = Math.round(10000*(stat_boosts.armorPenetration.all + stat_boosts.armorPenetration.melee))/10000;
    } else {
        if (document.getElementById("weaponDamageType").value == "ranged") {
            stat_boosts.armorPenetration.inUse = Math.round(10000*(stat_boosts.armorPenetration.all + stat_boosts.armorPenetration.ranged))/1000;
        } else {
            if (document.getElementById("weaponDamageType").value == "magic") {
                stat_boosts.armorPenetration.inUse = Math.round(1000*(stat_boosts.armorPenetration.all + stat_boosts.armorPenetration.magic))/10000;
            } else {
                if (document.getElementById("weaponDamageType").value == "summon") {
                    stat_boosts.armorPenetration.inUse = Math.round(1000*(stat_boosts.armorPenetration.all + stat_boosts.armorPenetration.summon))/10000;
                } else{
                    stat_boosts.armorPenetration.inUse = Math.round(10000*stat_boosts.armorPenetration.all)/10000;
                }
            }
        }
    }
    /* special effects */
    if (stat_boosts.specialEffect.some(e => e.name == 'HellfireMelee')) {
        stat_boosts.inflictDebuff.push("Hellfire");
      }
}
function updateCalculations(){
    equipCalc()
    boostCalc()
}

function selectInputName(elementID, variable) {
    var select = document.getElementById(elementID);
    for (var i = 0; i < variable.length; i++){
        var opt = document.createElement('option');
        opt.value = variable[i].name;
        opt.innerHTML = variable[i].name;
        select.appendChild(opt);
}
}
function selectInput(elementID, variable) {
    var select = document.getElementById(elementID);
    for (var i = 0; i < variable.length; i++){
        var opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = variable[i].name;
        select.appendChild(opt);
}
}
selectInputName('weaponName', weapon);
selectInput('accesorySlot1', accessory);
selectInput('accesorySlot2', accessory);
selectInput('accesorySlot3', accessory);
selectInput('accesorySlot4', accessory);
selectInput('accesorySlot5', accessory);
selectInput('accesorySlot6', accessory);
selectInput('accesorySlot7', accessory);
selectInput('accesorySlot1Reforge', reforgeAccessory);
selectInput('accesorySlot2Reforge', reforgeAccessory);
selectInput('accesorySlot3Reforge', reforgeAccessory);
selectInput('accesorySlot4Reforge', reforgeAccessory);
selectInput('accesorySlot5Reforge', reforgeAccessory);
selectInput('accesorySlot6Reforge', reforgeAccessory);
selectInput('accesorySlot7Reforge', reforgeAccessory);
selectInput('armorHead', armorHead);
selectInput('armorChest', armorBody);
selectInput('armorLegs', armorLegs);
getWeaponStats();
reforgeSearch();