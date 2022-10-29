//---------------------------------------------------------------------------------------------------------
//CLASSES
class Skill {
    constructor(skll) {
        this.skill = skll;
    }
}

class Item {
    constructor(clss, tit, nam, itmValue, bulk, desc) {
        this.class = clss;
        this.title = tit;
        this.name = nam;
        this.itemValue = itmValue;
        this.bulk = bulk;
        this.description = desc;
    }
};

class Weapon extends Item {
    constructor(clss, tit, nam, itmValue, bulk, bnsPhysDmg, bnsMagDmg, resotime, physDmgDice, magDmgDice, bnsToAtk, hands, desc) {
        super(clss, tit, nam, itmValue, bulk, desc);
        this.bonusPhysicalDamage = bnsPhysDmg;
        this.bonusMagicalDamage = bnsMagDmg;
        this.resolveTime = resotime;
        this.physicalDamageDice = physDmgDice;
        this.magicalDamageDice = magDmgDice;
        this.bonusToAttack = bnsToAtk;
        this.hands = hands;
    }
};

class Armor extends Item {
    constructor(clss, tit, nam, itmValue, bulk, defBns, armBns, blkBns, resiBns, desc) {
        super(clss, tit, nam, itmValue, bulk, desc);
        this.defenseBonus = defBns;
        this.armorBonus = armBns;
        this.bulkBonus = blkBns;
        this.resistanceBonus = resiBns;
    }
};

class OffHandItem extends Item {
    constructor(clss, tit, nam, itmValue, bulk, offDefBns, offArmBns, offResiBns, offLiteBns, offMagResoBns, offManaBns, desc) {
        super(clss, tit, nam, itmValue, bulk, desc)
        this.offDefenseBonus = offDefBns;
        this.offArmorBonus = offArmBns;
        this.offResistanceBonus = offResiBns;
        this.offLightBonus = offLiteBns;
        this.offMagicResolveBonus = offMagResoBns;
        this.offManaBonus = offManaBns;
    }
}

//---------------------------------------------------------------------------------------------------------
//SKILL SCORE VALUES
const playerChar =[
    Athletics = new Skill (0),
    Agility = new Skill (0),
    Thievery = new Skill (0),
    Knowledge = new Skill(0),
    Insight = new Skill(0)
];

//HEALTH VALUES
const startHealth = 3;
let dynamicCharhealth = 0;

//MANA VALUES
const STARTMANA = 1;
let dynamicCharMana=0;

//BULK VALUES
const charStartBulkValue = 0;
let charMaxBulkValue = 3;
let playerBulk = 0;
let armorBulkBonus = 0;
let weaponEquipBulkReduction = 0;
let armorEquipBulkReduction = 0;

//INVENTORY & GOLD
const inventory = [];
const equippedWeaponArray = [];
const equippedArmorArray = [];
const equippedOffHandArray = [];
const equippedEquipmentArray = [];
const equippedTreasureSlotOneArray = [];
const equippedTreasureSlotTwoArray = [];
const charStartGold = 10;
let playerGold = charStartGold;

//MOVEMENT VALUES
const startMovement = 2;

//LIGHT VALUES
const startLight = 1;
let lightBonus = 0;
let totalLight = startLight + lightBonus;

//ARMOR VALUES
let armorName = "";
let armorDefenseBonus = 0;
let armorArmorBonus = 0;
let armorCostValue = 0;
let armorBulkValue = 0;
let armorResistanceBonus = 0;

//WEAPON VALUES
let weaponName = "";
let weaponBonusPhysicalDamage = 0;
let weaponBonusMagicalDamage = 0;
let weaponResolveTime = 0;
let weaponPhysicalDamageDice = 0;
let weaponMagicalDamageDie = 0;
let weaponBulkValue = 0;
let weaponCostValue = 0;
let weaponBonusAttackValue = 0;
let itemPrice = 0;

//OFFHAND VALUES
let offHandName = "";
let offHandDefenseBonus = 0;
let offHandArmorBonus = 0;
let offHandResistanceBonus = 0;
let offHandLightBonus = 0;
let offHandMagicResolveBonus = 0;
let offHandManaBonus = 0;

//---------------------------------------------------------------------------------------------------------
//ARMOR AND WEAPON TABLES

const itemList = [
    //WEAPONS
    fists = new Weapon ("Weapon", "fists", "Fists", 0, 0, 0, 0, 6, 1, 0, 0, 1, "Hands that have been roughened and gnarled from a lifetime of poverty"),
    armingSword = new Weapon ("Weapon", "armingSword", "Arming Sword", 2, 1, 0, 0, 7, 1, 0, 1, 1, "A sturdy blade of steel no more than 3 feet in length."),
    mace = new Weapon ("Weapon", "mace", "Mace", 3, 1, 1, 0, 8, 1, 0, 0, 1, "A sturdy rod of wood capped with a ugly ring of iron metal"),
    choppingAxe = new Weapon ("Weapon", "choppingAxe", "Chopping Axe", 4, 2, 0, 0, 8, 2, 0, 0, 2, 0, "This axe was once used to fell trees and split logs."),
    staff = new Weapon ("Weapon", "staff", "Staff", 3, 1, 0, 1, 8, 1, 0, 0, 2, "A faint enchantment still bolsters attacks made by this old staff."),
    //ARMORS
    garments = new Armor ("Armor", "garments", "Garments", 0, 0, 0, 0, 0, 0, "Clothes made to stave off the rain and chill, though they're too torn and sodden even for that."),
    robes = new Armor ("Armor", "robes", "Robes", 2, 1, 0, 0, 0, 1, 0, "This robe repels magic in a limited capacity. Perhaps it was once owned by an apprentice?"),
    largeCoat = new Armor ("Armor", "largeCoat", "Large Coat", 2, 1, 0, 0, 1, 0, "A large coat with pockets both hidden and deep. Useful for theives and pickpockets."),
    fittedVest = new Armor ("Armor", "fittedVest", "Fitted Vest", 3, 1, 1, 0, 0, 0, "A coat that has been fitted for your body. It allows you to move freely while still giving limited protection."),
    hauberk = new Armor ("Armor", "hauberk", "Hauberk", 3, 1, 0, 1, 0, 0, "This rusting chain shirt is misssing many rings, but it still offers considerable protection"),
    //OFFHANDITEMS 
    shield = new OffHandItem ("OffHandItem", "shield", "Shield", 3, 2, 1, 1, 0, 0, 0, 0, "Thick wooden planks held together by iron banding"),
    wand = new OffHandItem ("OffHandItem", "wand", "Wand", 2, 1, 0, 0, 0, 0, 1, 0, "A thin rod of metal useful for channeling spells"),
    torch = new OffHandItem ("OffHandItem", "torch", "Torch", 1, 1, 0, 0, 0, 2, 0, 0, "A bright, if fleeting, source of light"),
    talisman = new OffHandItem ("OffHandItem", "talisman", "Talisman", 2, 1, 0, 0, 1, 0, 0, 0, "When held in the hand, this ward bolsters the holder against spells"),
    focusOrb = new OffHandItem ("OffHandItem", "focusOrb", "Focus Orb", 3, 1, 0, 0, 0, 0, 0, 1, "This glass orb reflects inner strength"),
];
// const masterEquipmentTable = [
//     {illuminationBonus: 1, itemBulk: 1, itemCost: 3, itemName: "Lantern"},
//     {bulkBonus: 2, itemCost: 3, itemName: "Backpack"},
//     {itemBulk: 2, itemCost: 3, itemName: "Digging Tools"},
//     {itemBulk: 1, itemCost: 3, itemName: "Crowbar"}
// ];

//---------------------------------------------------------------------------------------------------------
//FUNCTIONS

//FUNCTIONS THAT MANIPULATE SKILL SCORES
function increaseSkillScore (obj) {
    ++obj.skill;
    updateCharValues();
    skillScoreCapTracker(obj);
} 

function reduceSkillScore (obj) {
    --obj.skill;
    updateCharValues();
    skillScoreCapTracker(obj);
}

let skillScoreCap = 2;

function skillScoreCapTracker () {
    if ((Athletics.skill + Agility.skill + Thievery.skill + Knowledge.skill + Insight.skill) >= skillScoreCap ) {
        document.getElementById("increaseAthleticsButton").disabled=true;
        document.getElementById("increaseAgilityButton").disabled=true;
        document.getElementById("increaseThieveryButton").disabled=true;
        document.getElementById("increaseKnowledgeButton").disabled=true;
        document.getElementById("increaseInsightButton").disabled=true;
    } else {
        document.getElementById("increaseAthleticsButton").disabled=false;
        document.getElementById("increaseAgilityButton").disabled=false;
        document.getElementById("increaseThieveryButton").disabled=false;
        document.getElementById("increaseKnowledgeButton").disabled=false;
        document.getElementById("increaseInsightButton").disabled=false;
    }
    if((Athletics.skill) <= 0) {
        document.getElementById("reduceAthleticsButton").disabled = true;
    } else {
        document.getElementById("reduceAthleticsButton").disabled = false;
    }
    if((Agility.skill) <= 0) {
        document.getElementById("reduceAgilityButton").disabled = true;
    } else {
        document.getElementById("reduceAgilityButton").disabled = false;
    }
    if((Thievery.skill) <= 0) {
        document.getElementById("reduceThieveryButton").disabled = true;
    } else {
        document.getElementById("reduceThieveryButton").disabled = false;
    }
    if((Knowledge.skill) <= 0) {
        document.getElementById("reduceKnowledgeButton").disabled = true;
    } else {
        document.getElementById("reduceKnowledgeButton").disabled = false;
    }
    if((Insight.skill) <= 0) {
        document.getElementById("reduceInsightButton").disabled = true;
    } else {
        document.getElementById("reduceInsightButton").disabled = false;
    }
} skillScoreCapTracker();

function buyItem (obj) { //THIS FUNCTION PLACES AN ITEM IN THE PLAYERS INVENTORY AND ADJUSTS THEIR GOLD AND BULK AS NEEDED.
    if (obj.itemValue > playerGold) {
        console.log("you don't have enough money");
    // } else if (playerBulk + obj.bulk > charMaxBulkValue + armorBulkBonus) {
    //     console.log("You're inventory is too full!");
    } else {
        inventory.push(obj);
        playerGold -= obj.itemValue;
        playerBulk += obj.bulk;
        updateInventoryDisplay(inventory);
        updateCharValues();
    };  
}

function returnItem(obj) { //THIS FUNCTION REMOVES AN ITEM FROM YOUR INVENTORY AND REFUNDS ITS TOTAL GOLD COST TO THE PLAYER.
    for(let i=0; i<inventory.length; i++) {
            inventory.splice(i, 1);
        }
        playerGold +=obj.itemValue;
        playerBulk -=obj.bulk;
        updateInventoryDisplay(inventory);
        updateCharValues();
    }


function equipItem (obj) { //THIS FUNCTION EQUIPS SELECTED ITEMS FROM THE INVENTORY.
    for(let i=0; i<inventory.length; i++) { //THIS FOR LOOP FINDS AND REMOVES THE SELECTED ITEM FROM THE INVENTORY ARRAY. CURRENTLY REMOVED ITEMS ARE POPPED INTO THE VOID, BUT IF NEEDED THEY COULD BE STORED SOMEWHERE.
        if ( inventory[i].name == obj.name) {
            inventory.splice(i, 1);
        }
    }
    if (obj.class == "Weapon") { //THIS IF / ELSE IF LOOP CHECKS WHAT CLASS THE ITEM IS, AND USES THAT INFORMATION TO DECIDE WHERE TO EQUIP THE SELECTED ITEM FROM THE INVENTORY.
        if (equippedWeaponArray[0] == undefined) { //THIS IF / ELSE LOOP CHECKS TO SEE IF AN ITEM IS ALREADY EQUIPPED. IF THERE IS NO ITEM, THE ITEM IS APPLIED. IF THERE IS AN ITEM, THAT ITEM IS BROUGHT BACK TO THE INVENTORY BEFORE APPLYING THE NEW ITEM.
            updateInventoryDisplay(inventory);
            equippedWeaponArray.push(obj);
            // if (obj.hands == 2) {
            //     unEquipItem(equippedOffHandArray[0]);
            // }
            weaponName = equippedWeaponArray[0].name;
            weaponEquipBulkReduction = equippedWeaponArray[0].bulk;
            weaponBonusPhysicalDamage = equippedWeaponArray[0].bonusPhysicalDamage;
            weaponBonusMagicalDamage = equippedWeaponArray[0].bonusMagicalDamage;
            weaponResolveTime = equippedWeaponArray[0].resolveTime;
            weaponPhysicalDamageDice = equippedWeaponArray[0].physicalDamageDice;
            // weaponMagicalDamageDice = obj.magicalDamageDice;
            weaponBonusAttackValue = equippedWeaponArray[0].bonusToAttack;
            weaponDescription = equippedWeaponArray[0].description;
        } else {
            unEquipItem(equippedWeaponArray[0]);
            updateInventoryDisplay(inventory);
            equippedWeaponArray.push(obj);
            weaponName = equippedWeaponArray[0].name;
            weaponEquipBulkReduction = equippedWeaponArray[0].bulk;
            weaponBonusPhysicalDamage = equippedWeaponArray[0].bonusPhysicalDamage;
            weaponBonusMagicalDamage = equippedWeaponArray[0].bonusMagicalDamage;
            weaponResolveTime = equippedWeaponArray[0].resolveTime;
            weaponPhysicalDamageDice = equippedWeaponArray[0].physicalDamageDice;
            // weaponMagicalDamageDice = obj.magicalDamageDice;
            weaponBonusAttackValue = equippedWeaponArray[0].bonusToAttack;
            weaponDescription = equippedWeaponArray[0].description;
        }
    } else if (obj.class == "Armor") {
        if (equippedArmorArray[0] == undefined) {
            updateInventoryDisplay(inventory);
            equippedArmorArray.push(obj);
            armorName = equippedArmorArray[0].name;
            armorEquipBulkReduction = equippedArmorArray[0].bulk;
            armorDefenseBonus = equippedArmorArray[0].defenseBonus;
            armorArmorBonus = equippedArmorArray[0].armorBonus;
            armorBulkBonus = equippedArmorArray[0].bulkBonus;
            armorResistanceBonus = equippedArmorArray[0].resistanceBonus;
            armorBulkBonus = equippedArmorArray[0].bulkBonus;
        } else {
            unEquipItem(equippedArmorArray[0]);
            updateInventoryDisplay(inventory);
            equippedArmorArray.push(obj);
            armorName = equippedArmorArray[0].name;
            armorEquipBulkReduction = equippedArmorArray[0].bulk;
            armorDefenseBonus = equippedArmorArray[0].defenseBonus;
            armorArmorBonus = equippedArmorArray[0].armorBonus;
            armorBulkBonus = equippedArmorArray[0].bulkBonus;
            armorResistanceBonus = equippedArmorArray[0].resistanceBonus;
            armorBulkBonus = equippedArmorArray[0].bulkBonus;
        }
    } else if (obj.class == "OffHandItem") {
        if (equippedOffHandArray[0] == undefined) {
            updateInventoryDisplay(inventory);
            equippedOffHandArray.push(obj);
            offHandName =  equippedOffHandArray[0].name;
            offHandDefenseBonus = equippedOffHandArray[0].offDefenseBonus;
            offHandArmorBonus = equippedOffHandArray[0].offArmorBonus;
            offHandResistanceBonus = equippedOffHandArray[0].offResistanceBonus;
            offHandLightBonus = equippedOffHandArray[0].offLightBonus;
            offHandMagicResolveBonus = equippedOffHandArray[0].offMagicResolveBonus;
            offHandManaBonus = equippedOffHandArray[0].offManaBonus;
        } else {
            unEquipItem(equippedOffHandArray[0]);
            updateInventoryDisplay(inventory);
            equippedOffHandArray.push(obj);
            offHandName =  equippedOffHandArray[0].name;
            offHandDefenseBonus = equippedOffHandArray[0].offDefenseBonus;
            offHandArmorBonus = equippedOffHandArray[0].offArmorBonus;
            offHandResistanceBonus = equippedOffHandArray[0].offResistanceBonus;
            offHandLightBonus = equippedOffHandArray[0].offLightBonus;
            offHandMagicResolveBonus = equippedOffHandArray[0].offMagicResolveBonus;
            offHandManaBonus = equippedOffHandArray[0].offManaBonus;
        }
    }
    updateCharValues(); //CALLING THIS FUNCTION UPDATES ALL CHARACTER VALUES.
}

function unEquipItem(obj) { //THIS FUNCTION WILL UNEQUIP AN EQUIPED ITEM.
    if (obj.class == "Weapon") { //THIS IF STATEMENT CHECKS THE CLASS OF THE ITEM SO IT CAN APPLY VALUES TO THE CORRECT ARRAYS.
        inventory.push(obj);
        equippedWeaponArray.pop();
        updateInventoryDisplay(inventory);
        weaponName = fists.name;
        weaponPhysicalDamageDice = fists.damagedie;
        weaponBonusAttackValue = fists.bonusToAttack;
        weaponBonusPhysicalDamage = fists.bonusPhysicalDamage;
        weaponBonusMagicalDamage = fists.bonusMagicalDamage;
        weaponResolveTime = fists.resolveTime;
    } else if (obj.class == "Armor") {
        inventory.push(obj);
        equippedArmorArray.pop();
        updateInventoryDisplay(inventory);
        armorName = garments.name;
        armorDefenseBonus = garments.defenseBonus;
        armorArmorBonus = garments.armorBonus;
        armorResistanceBonus = garments.resistanceBonus;
    } else if (obj.class == "OffHandItem") {
        inventory.push(obj);
        equippedOffHandArray.pop();
        updateInventoryDisplay(inventory);
        offHandName = "Nothing";
        offHandDefenseBonus = 0;
        offHandArmorBonus = 0;
        offHandResistanceBonus = 0;
        offHandLightBonus = 0;
        offHandMagicResolveBonus = 0;
        offHandManaBonus = 0;
    }
    updateCharValues();
}

function updateCharValues() {
    //CHARACTER SKILL SCORES
    document.getElementById("athleticsSkill").innerHTML = Athletics.skill;
    document.getElementById("agilitySkill").innerHTML = Agility.skill;
    document.getElementById("thieverySkill").innerHTML = Thievery.skill;
    document.getElementById("knowledgeSkill").innerHTML = Knowledge.skill;
    document.getElementById("insightSkill").innerHTML = Insight.skill;
    //HEALTH VALUES
    document.getElementById("totalCharhealth").innerHTML=startHealth+Athletics.skill;
    document.getElementById("dynamicCharhealth").innerHTML = (startHealth+Athletics.skill)-dynamicCharhealth;
    //MANA VALUES
    // document.getElementById("totalCharMana").innerHTML=STARTMANA+Knowledge.skill;
    document.getElementById("dynamicCharMana").innerHTML = (STARTMANA+Knowledge.skill)-dynamicCharMana;
    //BULK VALUES
    document.getElementById("dynamicCharBulkValue").innerHTML = playerBulk - weaponEquipBulkReduction - armorEquipBulkReduction;
    document.getElementById("totalCharBulkValue").innerHTML = charMaxBulkValue + armorBulkBonus;
    //INVENTORY DISPLAY
    document.getElementById("currentGold").innerHTML = playerGold;
    //LIGHT VALUES
    //ATTACK, DEFENSE, AND MOVEMENT
    if (equippedWeaponArray[0] == undefined) {
        document.getElementById("charEquippedWeapon").innerHTML = fists.name;
        document.getElementById("charAttackDamage").innerHTML = fists.physicalDamageDice;
        document.getElementById("charAttackBonus").innerHTML = Insight.skill + weaponBonusAttackValue;
        document.getElementById("charDamageBonus").innerHTML = weaponBonusPhysicalDamage;
        document.getElementById("charDamageBonusMagical").innerHTML = weaponBonusMagicalDamage;
        document.getElementById("charAttackResolveTime").innerHTML = weaponResolveTime;
    } else {
        document.getElementById("charEquippedWeapon").innerHTML = `${weaponName}_______<button type="button" onclick="unEquipItem(${equippedWeaponArray[0].title})">Unequip Item</button>`;
        document.getElementById("charAttackDamage").innerHTML = weaponPhysicalDamageDice;
        document.getElementById("charAttackBonus").innerHTML = Insight.skill + weaponBonusAttackValue;
        document.getElementById("charDamageBonus").innerHTML = weaponBonusPhysicalDamage;
        document.getElementById("charDamageBonusMagical").innerHTML = weaponBonusMagicalDamage;
        document.getElementById("charAttackResolveTime").innerHTML = weaponResolveTime;
    }
    if (equippedArmorArray[0] == undefined) {
        document.getElementById("charEquippedArmor").innerHTML = garments.name;
        document.getElementById("charDefense").innerHTML = Agility.skill  + armorDefenseBonus + offHandDefenseBonus;
        document.getElementById("charArmorScore").innerHTML = armorArmorBonus;
        document.getElementById("charResistanceScore").innerHTML = armorResistanceBonus + offHandResistanceBonus;
    } else {
        document.getElementById("charEquippedArmor").innerHTML = `${armorName}_______<button type="button" onclick="unEquipItem(${equippedArmorArray[0].title})">Unequip Item</button>`;
        document.getElementById("charDefense").innerHTML = Agility.skill  + armorDefenseBonus;
        document.getElementById("charArmorScore").innerHTML = armorArmorBonus;
        document.getElementById("charResistanceScore").innerHTML = armorResistanceBonus;
    }
    if (equippedOffHandArray[0] == undefined) {
        document.getElementById("charEquippedOffHandItem").innerHTML = "Nothing";
        document.getElementById("charLight").innerHTML = totalLight;
        document.getElementById("totalCharMana").innerHTML = STARTMANA + Knowledge.skill;
        document.getElementById("charArmorScore").innerHTML = armorArmorBonus;
    } else {
        document.getElementById("charEquippedOffHandItem").innerHTML = `${offHandName}_______<button type="button" onclick="unEquipItem(${equippedOffHandArray[0].title})">Unequip Item</button>`;;
        document.getElementById("charLight").innerHTML = totalLight + offHandLightBonus;
        document.getElementById("totalCharMana").innerHTML = STARTMANA + Knowledge.skill + offHandManaBonus;
        document.getElementById("charArmorScore").innerHTML = armorArmorBonus + offHandArmorBonus;
    }

    document.getElementById("charMovement").innerHTML = startMovement + Thievery.skill;
} updateCharValues();

//PHYSICAL DAMAGE ROLL FUNCTION
document.getElementById("charAttackDamageValue").innerHTML = 0;
function rollPhysicalDamageAttack() {
    //this function produces a damage value after making an attack.
    const damageRolls = [];
    let totalPhysicalDamage = 0;
    //this for loop produces a die roll from 1 to 3 a number of times equal to the physical damage die value, and places those rolls into the damageRolls array.
    for (let i = 0, damagedie = weaponPhysicalDamageDice; i < damagedie; i++) { 
        damageRolls.push(Math.floor(Math.random() * (3 - 1 + 1) + 1));
    }
    //This for loop adds together all rolls in the damageRolls array into one value.
    for (const value of damageRolls) {
        (totalPhysicalDamage += value);
    }
    document.getElementById("charAttackDamageValue").innerHTML = totalPhysicalDamage+weaponBonusPhysicalDamage;
    return totalPhysicalDamage+weaponBonusPhysicalDamage;
}

//MAGICAL DAMAGE ROLL FUNCTION
document.getElementById("charMagicalAttackDamageValue").innerHTML = 0;
function rollMagicalDamageAttack() {
    //this function produces a damage value after making an attack.
    const damageRolls = [];
    let totalMagicalDamage = 0;
    //this for loop produces a die roll from 1 to 3 a number of times equal to the physical damage die value, and places those rolls into the damageRolls array.
    for (let i = 0, damagedie = weaponMagicalDamageDie; i < damagedie; i++) { 
        damageRolls.push(Math.floor(Math.random() * (3 - 1 + 1) + 1));
    }
    //This for loop adds together all rolls in the damageRolls array into one value.
    for (const value of damageRolls) {
        (totalMagicalDamage += value);
    }
    document.getElementById("charMagicalAttackDamageValue").innerHTML = totalMagicalDamage+weaponBonusMagicalDamage;
    return totalMagicalDamage+weaponBonusMagicalDamage;
}

//BUTTONS
function createChar(){
    let charName=prompt("what is your Name?");
    document.getElementById("charName").innerHTML=charName;
    document.getElementById("charStats").style.display="block";
    document.getElementById("selectStats").style.display="block";
}

function chooseEquipment() {
    document.getElementById("charEquip").style.display="block";
    // document.getElementById("entrance").style.display="block";
}

// THIS FUNCTION DISPLAYS ALL INVENTORY ITEMS IN AN ORDERED LIST.
function updateInventoryDisplay(arg) {
    let items = [];
    for(let i=0; i < arg.length; i++) {
        items += `<li><button type="button" onclick="returnItem(${arg[i].title})">Return</button>__${arg[i].name}_____<button type="button" onclick="equipItem(${arg[i].title})">Equip Item</button></li>`;
        
    }
         document.querySelector(".inventory").innerHTML = `<ol>${items}</ol>`;
    return items;
}
