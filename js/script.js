import { weapons } from './weapon.js';

 document.getElementById("NameSearch").addEventListener("click", search);
 document.getElementById("DamageCalculate").addEventListener("click", damageCalc);


function search() {
    var weaponName = document.getElementById("weaponName").value;
    var index = weapons.findIndex(r => r.name === weaponName);
    document.getElementById("weaponDamage").value = weapons[index].damage;
    document.getElementById("weaponCrit").value = weapons[index].crit;
    document.getElementById("weaponUseTime").value = weapons[index].usetime;
    document.getElementById("weaponMeleeSpeed").value = weapons[index].meleespeed;

}

function damageCalc() {
    var damage = document.getElementById("weaponDamage").value;
    var crit = document.getElementById("weaponCrit").value;
    var usetime = document.getElementById("weaponUseTime").value;
    var defense = document.getElementById("enemyDefense").value;
    var dph = (damage-defense)+crit(damage-defense);
    var dps = dph*(60/usetime);
    document.getElementById("damageOut").value = dph;
    document.getElementById("DPSOut").value = dps;
}
var select = document.getElementById('weaponName');
for (var i = 0; i < weapons.length; i++){
    console.log(i)
    var opt = document.createElement('option');
    opt.value = weapons[i].name;
    opt.innerHTML = weapons[i].name;
    select.appendChild(opt);
}
