const armorHead = [
    {
        name : "",
        set: [],
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
            summon: 0,
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
        
        specialEffect: []
    },
    {
        name : "Adamantite Headgear",
        set: ["Adamantite Magic"],
        defense: 4,
        dmg: {
            magic: 0.12,
        },
        crit: {
            magic: 0.12,
        },
        maxMana:80
    },
    {
        name : "Adamantite Helmet",
        set: ["Adamantite Melee"],
        defense: 22,
        dmg: {
            melee: 0.14,
        },
        crit: {
            melee: 0.07,
        }
    },
    {
        name : "Adamantite Mask",
        set: ["Adamantite Ranged"],
        defense: 8,
        dmg: {
            ranged: 0.14,
        },
        crit: {
            ranged: 0.1,
        }
    }
];
const armorBody = [
    {
        name : "",
        set: [],
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
            summon: 0,
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
        
        specialEffect: []
    },
    {
        name: "Adamantite Breastplate",
        set: ["Adamantite Melee","Adamantite Ranged","Adamantite Magic"],
        defense:16,
        dmg: {all:0.08}
    }
];
const armorLegs = [
    {
        name : "",
        set: ["Magic Hat", "Wizard Hat"],
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
            summon: 0,
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
        
        specialEffect: []
    },
    {
        name: "Adamantite Leggings",
        set: ["Adamantite Melee","Adamantite Ranged","Adamantite Magic", "Magic Hat", "Wizard Hat"],
        defense:12,
        crit: {all:0.07},
        moveSpeed:0.05
    }
];
const armorSet = [
    {
        name : "",
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
            summon: 0,
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
        specialEffect: []
    },
    {
        name: "Adamantite Melee",
        meleeSpeed: 0.2,
        moveSpeed: 0.2
    },
    {
        name: "Adamantite Ranged",
        ammoConsumption: 0.25,
    },
    {
        name: "Adamantite Magic",
        manaConsumption: 0.19,
    }

];

export { armorHead, armorBody, armorLegs, armorSet };