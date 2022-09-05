var weapon = [
    {
        name: "",
        id: "",
        reforgepool : ["universal","common","melee", "magic", "ranged"],
        damage:0,
        dmgType:"melee",
        knockback:"0",
        crit: "0",
        usetime: "0",
        velocity: "0",
        rarity: "0",
        sell: "0",
        meleeSpeedMult: "0",
        mana: false,
        ammo: false,
        projectileDmg: 0,
        projectileUseTime: 0,
        canMelee: true,
        specialEffect: []
    },
    {
        name: "Fetid Baghnakhs",
        id: 675,
        reforgepool : ["universal","common","melee"],
        damage:60,
        dmgType:"melee",
        knockback:6,
        crit: 0.04,
        usetime: 8,
        velocity: 0,
        rarity: 8,
        sell: 100000,
        meleeSpeedMult: 0.25,
        mana: false,
        ammoType: "none",
        projectileDmg: 0,
        projectileUseTime: 0,
        canMelee: true,
        specialEffect: []
    },
    {
        name: "SDMG",
        id: 1553 ,
        reforgepool : ["universal","common","ranged"],
        damage:85,
        dmgType:"ranged",
        knockback:2.5,
        crit: 0.14,
        usetime: 5,
        velocity: 12,
        rarity: 10,
        sell: 150000,
        meleeSpeedMult: 0,
        mana: false,
        ammoType: "bullet",
        projectileDmg: 1,
        projectileUseTime:5,
        canMelee: false,
        specialEffect: []
    },
    {
        name: "Terra Blade",
        id: 757,
        reforgepool : ["universal","common","melee"],
        damage:115,
        dmgType:"melee",
        knockback:6.5,
        crit: 0.04,
        usetime: 14,
        velocity: 12,
        rarity: 8,
        sell: 200000,
        meleeSpeedMult: 1,
        mana: false,
        ammoType: "none",
        projectileDmg: 1.5,
        projectileUseTime: 14,
        canMelee: true,
        specialEffect: []
    },
    {
        name: "True Night's Edge",
        id: 675,
        reforgepool : ["universal","common","melee"],
        damage:105,
        dmgType:"melee",
        knockback:4.75,
        crit: 0.04,
        usetime: 26,
        velocity: 10,
        rarity: 8,
        sell: 100000,
        meleeSpeedMult: 1,
        mana: false,
        ammoType: "none",
        projectileDmg: 1,
        projectileUseTime:0,
        canMelee: true,
        specialEffect: []
        
    }
];

var bullet = [
    {
        name: "Musket Ball",
        damage: 7,
        specialEffect: [],
    }
]
export { weapon };
