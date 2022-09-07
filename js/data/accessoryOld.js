var accessory = [
    {
        name : "",
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
        specialEffect: []
    },
    {
        name: "Avenger Emblem",
        dmg: {
            all: 0.12
        }
    },
    {
        name: "Destroyer Emblem",
        dmg: {
            all: 0.1,
        },
        crit: {
            all: 0.08,
        }
    },
    {
        name: "Fire Gauntlet",
        dmg: {
            melee: 0.12,
        },
        meleeSpeed: 0.12,
        specialEffect: [
                {
                name:"HellfireMelee",
                value: [2,2,2,4,4,4,8,8]
            },
            {
                name:"knockbackMultiplyMelee",
                value: 2
            }
        ]
    },
    {
        name: "Ranger Emblem",
        dmg: {
            ranged: 0.15,
        },
    },
    {
        name: "Warrior Emblem",
        dmg: {
            melee: 0.15,
        }
    }
];
export { accessory };