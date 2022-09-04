import weapons from './weapon.js';

function search() {
    var weaponName = document.getElementById("weaponName").value;
    index = weapons.findIndex(r => r.name === weaponName);
    document.getElementById("weaponDamage").value = weapons[index].damage;
    document.getElementById("weaponCrit").value = weapons[index].crit;

}

var select = document.getElementById('weaponName');
for (var i = 0; i<=weapons.length; i++){
    var opt = document.createElement('option');
    opt.value = weapons[i].name;
    opt.innerHTML = weapons[i].name;
    select.appendChild(opt);
}