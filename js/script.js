import { weapons } from './weapon.js';

 document.getElementById("NameSearch").addEventListener("click", search);

function search() {
    var weaponName = document.getElementById("weaponName").value;
    var index = weapons.findIndex(r => r.name === weaponName);
    document.getElementById("weaponDamage").value = weapons[index].damage;
    document.getElementById("weaponCrit").value = weapons[index].crit;
    document.getElementById("weaponUseTime").value = weapons[index].usetime;
    document.getElementById("weaponMeleeSpeed").value = weapons[index].meleespeed;

}

var select = document.getElementById('weaponName');
for (var i = 0; i < weapons.length; i++){
    console.log(i)
    var opt = document.createElement('option');
    opt.value = weapons[i].name;
    opt.innerHTML = weapons[i].name;
    select.appendChild(opt);
}
