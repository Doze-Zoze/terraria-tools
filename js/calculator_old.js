import { weapon } from './data/weapon.js';
import  { reforgeUniversal, reforgeCommon, reforgeMelee, reforgeRanged, reforgeMagic, reforgeAccessory } from './data/reforge.js';
import {accessory} from './data/accessory.js'
import {armorHead, armorBody, armorLegs, armorSet} from './data/armor.js'

 document.getElementById("weaponName").onchange = search
 document.getElementById("weaponReforge").onchange = reforgeSearch
 for (let i = 1; i <= 7; i++) {
    document.getElementById("accesorySlot"+String(i)).onchange = updateCalculations
    document.getElementById("accesorySlot"+String(i)+"Reforge").onchange = updateCalculations
 }
 document.getElementById("armorHead").onchange = updateCalculations
 document.getElementById("armorChest").onchange = updateCalculations
 document.getElementById("armorLegs").onchange = updateCalculations
 document.getElementById("weaponName").onchange = search
 document.getElementById("DamageCalculate").addEventListener("click", damageCalc);
 /*document.getElementById("accesorySlotCount").onchange = accessoryShow*/

function search() {
    var weaponName = document.getElementById("weaponName").value;
    var index = weapon.findIndex(r => r.name === weaponName);
    document.getElementById("weaponDamage").value = weapon[index].damage;
    document.getElementById("weaponCrit").value = weapon[index].crit;
    document.getElementById("weaponUseTime").value = weapon[index].usetime;
    document.getElementById("weaponMeleeSpeed").value = weapon[index].meleeSpeed;
    document.getElementById("weaponDamageType").value = weapon[index].dmgType;
    var select = document.getElementById('weaponReforge');
    while (select.firstChild) {
        select.removeChild(select.firstChild);
    }
    if (weapon[index].reforgepool.includes("universal")) {
        for (var i = 0; i < reforgeUniversal.length; i++){
            var opt = document.createElement('option');
            opt.value = reforgeUniversal[i].name;
            opt.innerHTML = reforgeUniversal[i].name;
            select.appendChild(opt);
        }
    }
    if (weapon[index].reforgepool.includes("common")) {
        for (var i = 0; i < reforgeCommon.length; i++){
            var opt = document.createElement('option');
            opt.value = reforgeCommon[i].name;
            opt.innerHTML = reforgeCommon[i].name;
            select.appendChild(opt);
        }
    }
    if (weapon[index].reforgepool.includes("melee")) {
        for (var i = 0; i < reforgeMelee.length; i++){
            var opt = document.createElement('option');
            opt.value = reforgeMelee[i].name;
            opt.innerHTML = reforgeMelee[i].name;
            select.appendChild(opt);
        }
    }
    if (weapon[index].reforgepool.includes("ranged")) {
        for (var i = 0; i < reforgeRanged.length; i++){
            var opt = document.createElement('option');
            opt.value = reforgeRanged[i].name;
            opt.innerHTML = reforgeRanged[i].name;
            select.appendChild(opt);
        }
    }
    if (weapon[index].reforgepool.includes("magic")) {
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
    var damage = parseFloat(document.getElementById("boostDamage").text);
    var crit = parseFloat(document.getElementById("boostCrit").text);
    var usetime = parseFloat(document.getElementById("boostUseTime").text);
    var defense = parseFloat(document.getElementById("enemyDefense").value);
    var dph = (damage-(defense/2))+(crit)*(damage-(defense/2));
    var dps = dph*(60/usetime);
    document.getElementById("damageOut").innerHTML = Math.round(100*dph)/100;
    document.getElementById("DPSOut").innerHTML = Math.round(100*dps)/100;
}

function reforgeSearch() {
    var reforgeName = document.getElementById("weaponReforge").value;
    var index = reforgeUniversal.findIndex(r => r.name === reforgeName);
    if (index != -1) {
    document.getElementById("reforgeDamage").value = reforgeUniversal[index].damage;
    document.getElementById("reforgeCrit").value = reforgeUniversal[index].crit;
    document.getElementById("reforgeSpeed").value = reforgeUniversal[index].speed;
    } else {
        index = reforgeMelee.findIndex(r => r.name === reforgeName);
        if (index != -1) {
            document.getElementById("reforgeDamage").value = reforgeMelee[index].damage;
            document.getElementById("reforgeCrit").value = reforgeMelee[index].crit;
            document.getElementById("reforgeSpeed").value = reforgeMelee[index].speed;
        } else {
            index = reforgeRanged.findIndex(r => r.name === reforgeName);
            if (index != -1) {
                document.getElementById("reforgeDamage").value = reforgeRanged[index].damage;
                document.getElementById("reforgeCrit").value = reforgeRanged[index].crit;
                document.getElementById("reforgeSpeed").value = reforgeRanged[index].speed;
            } else {
                index = reforgeMagic.findIndex(r => r.name === reforgeName);
                if(index != -1) {
                    document.getElementById("reforgeDamage").value = reforgeMagic[index].damage;
                    document.getElementById("reforgeCrit").value = reforgeMagic[index].crit;
                    document.getElementById("reforgeSpeed").value = reforgeMagic[index].speed;
                } else {
                    index = reforgeCommon.findIndex(r => r.name === reforgeName);
                    document.getElementById("reforgeDamage").value = reforgeCommon[index].damage;
                    document.getElementById("reforgeCrit").value = reforgeCommon[index].crit;
                    document.getElementById("reforgeSpeed").value = reforgeCommon[index].speed;
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
    var boosts = equipCalc()
    var damage = parseFloat(document.getElementById("weaponDamage").value);
    var damage2 = Math.round(damage * (1+parseFloat(document.getElementById("reforgeDamage").value)));
    var crit = parseFloat(document.getElementById("weaponCrit").value);
    var crit2 = crit + parseFloat(document.getElementById("reforgeCrit").value) + boosts.crit.all;
    var dmgBoost = boosts.dmg.all;
    if (document.getElementById("weaponDamageType").value == "melee") {
        dmgBoost += boosts.dmg.melee;
        crit2 += boosts.crit.melee;
    }
    if (document.getElementById("weaponDamageType").value == "ranged") {
        dmgBoost += boosts.dmg.ranged;
        crit2 += boosts.crit.ranged;
    }
    if (document.getElementById("weaponDamageType").value == "magic") {
        dmgBoost += boosts.dmg.magic;
        crit2 += boosts.crit.magic;
    }
    if (document.getElementById("weaponDamageType").value == "summon") {
        dmgBoost += boosts.dmg.summon;
        crit2 += boosts.crit.summon;
    }
    damage2 = damage2 * (1 +dmgBoost);
    var damageBoost = damage2/damage
    var usetime = parseFloat(document.getElementById("weaponUseTime").value);

    var usetimeBoost = (1-parseFloat(document.getElementById("reforgeSpeed").value))

    var usetime2 = Math.round(usetime*usetimeBoost);
    document.getElementById("boostDamage").innerHTML = damage2;
    document.getElementById("boostCrit").innerHTML = Math.round(crit2*10000)/10000;
    document.getElementById("boostUseTime").innerHTML = usetime2;
    document.getElementById("boostDamageMult").value = Math.round(100*(damageBoost))/100;
    document.getElementById("boostCritMult").value = Math.round(10000*(crit2-crit))/10000;
    document.getElementById("boostUseTimeMult").value = Math.round(100*(usetimeBoost))/100;
    damageCalc()
}
function boostConc(boosts, input) {
    let keys = Object.keys(boosts)
    keys.forEach((key) => {
        if (input.hasOwnProperty(key)) { 
            if (key == "dmg") {
                let keysDmg = Object.keys(input.dmg)
                keysDmg.forEach((key2) => {
                    if (input.dmg.hasOwnProperty(key2)) {
                    boosts.dmg[key2] += input.dmg[key2];
                    }
                })
            } else {
                if (key == "crit") {
                    let keysCrit = Object.keys(input.crit)
                    keysCrit.forEach((key2) => {
                   boosts.crit[key2] += input.crit[key2]
                    })
                } else {
                    if (key == "inflictDebuff") {
                        if (input.inflictDebuff.length > 0){
                            for (var i2=0; i2 < input.inflictDebuff.length; i2++) {
                                boosts.inflictDebuff.push(input.inflictDebuff[i2]);}}
                    } else {
                        boosts[key] += input[key];
                    }
                }
            }
        }
    })
}
function equipCalc(){
    var boosts = {
        defense: 0,
        dmg: {
            all: 0,
            melee: 0,
            ranged: 0,
            arrow: 0,
            bullet: 0,
            rocket: 0,
            magic: 0,
            summon: 0
        },
        crit: {
            all: 0,
            melee: 0,
            ranged: 0,
            arrow: 0,
            bullet: 0,
            rocket: 0,
            magic: 0,
        },
        armorPenetration: [],
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
        inflictDebuff: [],
        specialEffect: []
    }
    /*Adding accessory slot boosts*/
    for (let i = 1; i <= 7; i++) { 
        var select = document.getElementById("accesorySlot"+String(i))
        var value = select.options[select.selectedIndex].value
        boostConc(boosts, accessory[value])
    }
    /*Adding accessory reforge boosts*/
    for (let i = 1; i <= 7; i++) { 
        var select = document.getElementById("accesorySlot"+String(i)+"Reforge")
        var value = select.options[select.selectedIndex].value;
        boosts.dmg.all += reforgeAccessory[value].damage;
        boosts.defense += reforgeAccessory[value].defense;
        boosts.crit.all += reforgeAccessory[value].crit;
        boosts.meleeSpeed += reforgeAccessory[value].meleeSpeed;
        boosts.maxMana += reforgeAccessory[value].mana;
        boosts.moveSpeed += reforgeAccessory[value].moveSpeed;
        
    }
    /*Adding armor slot boosts*/
    boostConc(boosts, armorHead[document.getElementById("armorHead").options[document.getElementById("armorHead").selectedIndex].value])
    boostConc(boosts, armorBody[document.getElementById("armorChest").options[document.getElementById("armorChest").selectedIndex].value])
    boostConc(boosts, armorLegs[document.getElementById("armorLegs").options[document.getElementById("armorLegs").selectedIndex].value])
    /*Adding armor set bonus*/
    var setBonusList = [
        armorHead[document.getElementById("armorHead").options[document.getElementById("armorHead").selectedIndex].value].set,
        armorBody[document.getElementById("armorChest").options[document.getElementById("armorChest").selectedIndex].value].set,
        armorLegs[document.getElementById("armorLegs").options[document.getElementById("armorLegs").selectedIndex].value].set
    ]
    var setBonusResult = setBonusList.shift().filter(function(v) {
        return setBonusList.every(function(a) {
            return a.indexOf(v) !== -1;
        });
    });
    let obj = armorSet.find(o => o.name == setBonusResult[0]);
    if (obj != undefined) {
        boostConc(boosts,obj)
    }
    /*class-specifc damage bonuses*/
    if (document.getElementById("weaponDamageType").value == "melee") {
        document.getElementById("equipment_dmg").text = Math.round(10000*(boosts.dmg.all + boosts.dmg.melee))/10000;
    } else {
        if (document.getElementById("weaponDamageType").value == "ranged") {
            document.getElementById("equipment_dmg").text = Math.round(10000*(boosts.dmg.all + boosts.dmg.ranged))/1000;
        } else {
            if (document.getElementById("weaponDamageType").value == "magic") {
                document.getElementById("equipment_dmg").text = Math.round(1000*(boosts.dmg.all + boosts.dmg.magic))/10000;
            } else {
                if (document.getElementById("weaponDamageType").value == "summon") {
                    document.getElementById("equipment_dmg").text = Math.round(1000*(boosts.dmg.all + boosts.dmg.summon))/10000;
                } else{
                    document.getElementById("equipment_dmg").text = Math.round(10000*boosts.dmg.all)/10000;
                }
            }
        }
    }
    /*class-specifc crit bonuses*/
    if (document.getElementById("weaponDamageType").value == "melee") {
        document.getElementById("equipment_crit").text = Math.round(10000*(boosts.crit.all + boosts.crit.melee))/10000;
    } else {
        if (document.getElementById("weaponDamageType").value == "ranged") {
            document.getElementById("equipment_crit").text = Math.round(10000*(boosts.crit.all + boosts.crit.ranged))/1000;
        } else {
            if (document.getElementById("weaponDamageType").value == "magic") {
                document.getElementById("equipment_crit").text = Math.round(1000*(boosts.crit.all + boosts.crit.magic))/10000;
            } else {
                if (document.getElementById("weaponDamageType").value == "summon") {
                    document.getElementById("equipment_crit").text = Math.round(1000*(boosts.crit.all + boosts.crit.summon))/10000;
                } else{
                    document.getElementById("equipment_crit").text = Math.round(10000*boosts.crit.all)/10000;
                }
            }
        }
    }
    document.getElementById("equipment_meleeSpeed").text = Math.round(boosts.meleeSpeed*1000)/1000;
    var debuffText = "";
    if (boosts.inflictDebuff.length > 0) {
        for (var i=0; i < boosts.inflictDebuff.length; i++) {
            debuffText = debuffText + boosts.inflictDebuff[i].name;
            if (i+1 < boosts.inflictDebuff.length) {
                debuffText = debuffText + ", ";
            }}
    }else {
        debuffText = "none";
    }
    document.getElementById("equipment_inflictDebuff").text = debuffText;
    document.getElementById("equipment_armorPenetration").text = boosts.armorPenetration;
    document.getElementById("equipment_minionSlot").text = boosts.minionSlots;
    return boosts;    
}
function updateCalculations(){
    equipCalc()
    boostCalc()
}
    
function equipBoostHide() {
    const toHide = document.querySelectorAll('.accessoryHide');
    toHide.forEach(element => {
        if (element.style.display == "none") {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
        
    });
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
search();
reforgeSearch();