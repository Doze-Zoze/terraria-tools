import { weapon } from './data/weapon.js';
import  { reforgeUniversal, reforgeCommon, reforgeMelee, reforgeRanged, reforgeMagic, reforgeAccessory } from './data/reforge.js';
import {accessory} from './data/accessory.js'

 document.getElementById("weaponName").onchange = search
 document.getElementById("weaponReforge").onchange = reforgeSearch
 document.getElementById("DamageCalculate").addEventListener("click", damageCalc);
 document.getElementById("BoostCalculate").addEventListener("click", boostCalc);
 /*document.getElementById("accesorySlotCount").onchange = accessoryShow*/
 document.getElementById("equipmentToggle").addEventListener("click", equipBoostHide);
 document.getElementById("equipCalculate").addEventListener("click", equipCalc);

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
    var crit2 = crit + parseFloat(document.getElementById("reforgeCrit").value);
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
    boosts.defense += input.defense;
    let keysDmg = Object.keys(input.dmg)
    console.log(keysDmg)
    keysDmg.forEach((key) => {
   boosts.dmg[key] += input.dmg[key]
    })
    let keysCrit = Object.keys(input.crit)
    keysCrit.forEach((key) => {
   boosts.crit[key] += input.crit[key]
    })
    boosts.meleeSpeed += input.meleeSpeed;
    if (input.inflictDebuff.length > 0){
        for (var i2=0; i2 < input.inflictDebuff.length; i2++) {
            boosts.inflictDebuff.push(input.inflictDebuff[i2]);}}
    boosts.armorPenetration += input.armorPenetration;
    boosts.minionSlots += input.minionSlots;
}
function equipCalc(){
    var boosts = {
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
    for (let i = 1; i <= 7; i++) {
        var select = document.getElementById("accesorySlot"+String(i))
        var value = select.options[select.selectedIndex].value
        boostConc(boosts, accessory[value])
    }
    console.log(boosts.dmg)
    if (document.getElementById("weaponDamageType").value == "melee") {
        document.getElementById("acessory_dmg").text = boosts.dmg.all + boosts.dmg.melee;
    } else {
        if (document.getElementById("weaponDamageType").value == "ranged") {
            document.getElementById("acessory_dmg").text = boosts.dmg.all + boosts.dmg.ranged;
        } else {
            if (document.getElementById("weaponDamageType").value == "magic") {
                document.getElementById("acessory_dmg").text = boosts.dmg.all + boosts.dmg.magic;
            } else {
                if (document.getElementById("weaponDamageType").value == "summon") {
                    document.getElementById("acessory_dmg").text = boosts.dmg.all + bossts.dmg.summon;
                } else{
                    document.getElementById("acessory_dmg").text = boosts.dmg.all;
                }
            }
        }
    }
    
    document.getElementById("acessory_meleeSpeed").text = boosts.meleeSpeed;
    document.getElementById("acessory_crit").text = boosts.crit.all;
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
    document.getElementById("acessory_inflictDebuff").text = debuffText;
    document.getElementById("acessory_armorPenetration").text = boosts.armorPenetration;
    document.getElementById("acessory_minionSlot").text = boosts.minionSlots;
    return boosts;

    
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
search();
reforgeSearch();