//---------------------------------------------------------------------------------------------------------
//SKILL SCORE VALUES
let charAthletics = 0;
let charAgility = 0;
let charThievery = 0;
let charKnowledge = 0;
let charInsight = 0;

//HEALTH VALUES
const startHealth = 3;
let dynamicCharhealth = 0;

//MANA VALUES
const STARTMANA = 1;
let dynamicCharMana=0;

//BULK VALUES
const charStartBulkValue = 0;
let charMaxBulkValue = 3;

//GOLD VALUES
const charStartGold = 10;

//MOVEMENT VALUES
const startMovement = 2;

//ARMOR VALUES
let armorDefenseValue = 0;
let armorArmorValue = 0;
let armorCostValue = 0;
let armorBulkValue = 0;
let armorResistanceValue = 0;

//WEAPON VALUES
let weaponBonusPhysicalDamage = 0;
let weaponBonusMagicalDamage = 0;
let weaponResolveTime = 0;
let weaponAttackDamage = 0;
let weaponMagicalDamageDie = 0;
let weaponBulkValue = 0;
let weaponCostValue = 0;
let weaponBonusAttackValue = 0;

//---------------------------------------------------------------------------------------------------------
//ARMOR AND WEAPON TABLES

const masterArmorTable = [
    {defenseScore:0, armorScore: 0, armorCost: 0, armorBulk: 0, bulkBonus: 0, resistanceScore: 0, armorName: "No Armor"},
    {defenseScore:0, armorScore: 0, armorCost: 2, armorBulk: 1, bulkBonus: 0, resistanceScore: 2, armorName: "Robes"},
    {defenseScore:0, armorScore: 0, armorCost: 2, armorBulk: 0, bulkBonus: 1, resistanceScore: 0, armorName: "Large Coat"},
    {defenseScore:1, armorScore: 0, armorCost: 3, armorBulk: 1, bulkBonus: 0, resistanceScore: 0, armorName: "Fitted Vest"},
    {defenseScore:0, armorScore: 1, armorCost: 3, armorBulk: 1, bulkBonus: 0, resistanceScore: 0, armorName: "Hauberk"}
];

const masterWeaponTable = [
    {bonusphysicaldamage: 0, bonusmagicaldamage: 0, resolvetime: 6, physicaldamagedie: 1, magicaldamagedie: 0, bulk: 0, price: 0, bonustoattack: 0, hands: 2, weaponname: "Fists"},
    {bonusphysicaldamage: 0, bonusmagicaldamage: 0, resolvetime: 7, physicaldamagedie: 1, magicaldamagedie: 0, bulk: 1, price: 2, bonustoattack: 1, hands: 1, weaponname: "Arming Sword"},
    {bonusphysicaldamage: 1, bonusmagicaldamage: 0, resolvetime: 8, physicaldamagedie: 1, magicaldamagedie: 0, bulk: 1, price: 3, bonustoattack: 0, hands: 1, weaponname: "Mace"},
    {bonusphysicaldamage: 0, bonusmagicaldamage: 0, resolvetime: 9, physicaldamagedie: 2, magicaldamagedie: 0, bulk: 2, price: 0, bonustoattack: 0, hands: 2, weaponname: "BattleAxe"},
    {bonusphysicaldamage: 0, bonusmagicaldamage: 0, resolvetime: 8, physicaldamagedie: 0, magicaldamagedie: 1, bulk: 1, price: 0, bonustoattack: 0, hands: 2, weaponname: "Staff"},
];

//---------------------------------------------------------------------------------------------------------
//HTML ELEMENT DECLERATIONS

//SKILL SCORE VALUES
document.getElementById("increaseAthletics").innerHTML = charAthletics;
document.getElementById("increaseAgility").innerHTML = charAgility;
document.getElementById("increaseThievery").innerHTML = charThievery;
document.getElementById("increaseKnowledge").innerHTML = charKnowledge;
document.getElementById("increaseInsight").innerHTML = charInsight;

//HEALTH VALUES
document.getElementById("totalCharhealth").innerHTML=startHealth+charAthletics;
document.getElementById("dynamicCharhealth").innerHTML = (startHealth+charAthletics)-dynamicCharhealth;

//MANA VALUES
document.getElementById("totalCharMana").innerHTML=STARTMANA+charKnowledge;
document.getElementById("dynamicCharMana").innerHTML = (STARTMANA+charKnowledge)-dynamicCharMana;

//BULK VALUES
document.getElementById("dynamicCharBulkValue").innerHTML = charStartBulkValue;
document.getElementById("totalCharBulkValue").innerHTML = charMaxBulkValue;

//ATTACK, DEFENSE, AND MOVEMENT
document.getElementById("charAttackDamage").innerHTML = weaponAttackDamage;
document.getElementById("charAttackBonus").innerHTML = charInsight + weaponBonusAttackValue;
document.getElementById("charDamageBonus").innerHTML = weaponBonusPhysicalDamage;
document.getElementById("charDefense").innerHTML = charAgility + armorDefenseValue;
document.getElementById("charMovement").innerHTML = startMovement + charThievery;

//---------------------------------------------------------------------------------------------------------
//FUNCTIONS

//FUNCTIONS THAT MANIPULATE SKILL SCORES
function increaseAthletics() {
    //this function is used to add points to a characters athletics score, and increase their total health pool
    document.getElementById("increaseAthletics").value = ++charAthletics;
    document.getElementById("increaseAthletics").innerHTML = charAthletics;
    document.getElementById("totalCharhealth").innerHTML=startHealth+charAthletics;
    document.getElementById("dynamicCharhealth").innerHTML = (startHealth+charAthletics)-dynamicCharhealth;
    skillScorecaptracker();
}
function reduceAthletics() {
    //this function is used to reduce a characters base Athletics score.
    document.getElementById("increaseAthletics").value = --charAthletics;
    document.getElementById("increaseAthletics").innerHTML = charAthletics;
    document.getElementById("totalCharhealth").innerHTML=startHealth+charAthletics;
    document.getElementById("dynamicCharhealth").innerHTML = (startHealth+charAthletics)-dynamicCharhealth;
    skillScorecaptracker();
}

function increaseAgility() {
    //this function is used to add points to a characters agility score, and increase their defense score.
    document.getElementById("increaseAgility").value = ++charAgility;
    document.getElementById("increaseAgility").innerHTML = charAgility;
    document.getElementById("charDefense").innerHTML = charAgility+armorDefenseValue;/* add defense scores from other items here later*/;
    skillScorecaptracker();
} 
function reduceAgility() {
    document.getElementById("increaseAgility").value = --charAgility;
    document.getElementById("increaseAgility").innerHTML = charAgility;
    document.getElementById("charDefense").innerHTML = charAgility+armorDefenseValue;/* add defense scores from other items here later*/;
    skillScorecaptracker();
} 

function increaseThievery() {
    //this function increases thievery and movements scores.
    document.getElementById("increaseThievery").value = ++charThievery;
    document.getElementById("increaseThievery").innerHTML = charThievery;
    document.getElementById("charMovement").innerHTML = startMovement + charThievery /* add movement bonuses from items here later*/;
    skillScorecaptracker();
}
function reduceThievery() {
    document.getElementById("increaseThievery").value = --charThievery;
    document.getElementById("increaseThievery").innerHTML = charThievery;
    document.getElementById("charMovement").innerHTML = startMovement + charThievery /* add movement bonuses from items here later*/;
    skillScorecaptracker();
}

function increaseKnowledge() {
    //this function is used to add points to a characters knowledge score, and increase their total mana pool
    document.getElementById("increaseKnowledge").value = ++charKnowledge;
    document.getElementById("increaseKnowledge").innerHTML = charKnowledge;
    document.getElementById("totalCharMana").innerHTML=STARTMANA+charKnowledge;
    document.getElementById("dynamicCharMana").innerHTML = (STARTMANA+charKnowledge)-dynamicCharMana;
    skillScorecaptracker();
}
function reduceKnowledge() {
    //this function is used to reduce a characters base knowledge score.
    document.getElementById("increaseKnowledge").value = --charKnowledge;
    document.getElementById("increaseKnowledge").innerHTML = charKnowledge;
    document.getElementById("totalCharMana").innerHTML=STARTMANA+charKnowledge;
    document.getElementById("dynamicCharMana").innerHTML = (STARTMANA+charKnowledge)-dynamicCharMana;
    skillScorecaptracker();
}

function increaseInsight() {
    //this function is used to add points to a characters agility score, and increase their defense score.
    document.getElementById("increaseInsight").value = ++charInsight;
    document.getElementById("increaseInsight").innerHTML = charInsight;
    document.getElementById("charAttackBonus").innerHTML = charInsight/* add defense scores from other items here later*/;
    skillScorecaptracker();
} 
function reduceInsight() {
    document.getElementById("increaseInsight").value = --charInsight;
    document.getElementById("increaseInsight").innerHTML = charInsight;
    document.getElementById("charAttackBonus").innerHTML = charInsight/* add defense scores from other items here later*/;
    skillScorecaptracker();
} 
//THIS FUNCTION ENSURES PLAYERS CAN SPEND A SET LIMIT TO UPGRADE SKILL SCORES. IT IS CALLED EVERYTIME A SKILL SCORE IS CHANGED.
function skillScorecaptracker() {
    //This function is used to cap skill scores assigned to a new character. It prevents any score from exceeding 2, and prevents any score from going below 0.
    const skillScorecap = 2;
    const skillScoreLowerCap = 0;
    if((charAthletics+charAgility+charThievery+charKnowledge+charInsight) >= skillScorecap) {
        document.getElementById("skillIncreaseAthletics").disabled=true;
        document.getElementById("skillIncreaseAgility").disabled=true;
        document.getElementById("skillIncreaseThievery").disabled=true;
        document.getElementById("skillIncreaseKnowledge").disabled=true;
        document.getElementById("skillIncreaseInsight").disabled=true;
    }
    else {
        document.getElementById("skillIncreaseAthletics").disabled=false;
        document.getElementById("skillIncreaseAgility").disabled=false;
        document.getElementById("skillIncreaseThievery").disabled=false;
        document.getElementById("skillIncreaseKnowledge").disabled=false;
        document.getElementById("skillIncreaseInsight").disabled=false;
    }
    //These if statements prevent individual scores from going below zero, while still allowing the manipulation of other scores.
    if((charAthletics) <= skillScoreLowerCap) {
        document.getElementById("reduceAthleticsButton").disabled = true;
    }
    else {
        document.getElementById("reduceAthleticsButton").disabled = false;
    }
    if((charAgility) <= skillScoreLowerCap) {
        document.getElementById("reduceAgilityButton").disabled = true;
    }
    else {
        document.getElementById("reduceAgilityButton").disabled = false;
    }
    if((charThievery) <= skillScoreLowerCap) {
        document.getElementById("reduceThieveryButton").disabled = true;
    }
    else {
        document.getElementById("reduceThieveryButton").disabled = false;
    }
    if((charKnowledge) <= skillScoreLowerCap) {
        document.getElementById("reduceKnowledgeButton").disabled = true;
    }
    else {
        document.getElementById("reduceKnowledgeButton").disabled = false;
    }
    if((charInsight) <= skillScoreLowerCap) {
        document.getElementById("reduceInsightButton").disabled = true;
    }
    else {
        document.getElementById("reduceInsightButton").disabled = false;
    }
} skillScorecaptracker()

//FUNCTIONS THAT EQUIP ARMOR  --  THESE FUNCTIONS APPLY VALUES FROM SELECTED ARMORS. "NONEARMOR" IS CALLED BY DEFAULT. REFER TO MASTER ARMOR ARRAY TO SEE ARMOR STATS.
function equipNoneArmor() {
    let equippedArmor = Object.values(masterArmorTable[0]);
    armorDefenseValue = equippedArmor[0];
    armorArmorValue = equippedArmor[1];
    armorCostValue = equippedArmor[2];
    armorBulkValue = equippedArmor[3];
    armorBulkBonus = equippedArmor[4];
    armorResistanceValue = equippedArmor[5];
    updateCharValues();
} equipNoneArmor();
function equipRobes() {
    let equippedArmor = Object.values(masterArmorTable[1]);
    armorDefenseValue = equippedArmor[0];
    armorArmorValue = equippedArmor[1];
    armorCostValue = equippedArmor[2];
    armorBulkValue = equippedArmor[3];
    armorBulkBonus = equippedArmor[4];
    armorResistanceValue = equippedArmor[5];
    updateCharValues();
}
function equipLargeCoat() {
    let equippedArmor = Object.values(masterArmorTable[2]);
    armorDefenseValue = equippedArmor[0];
    armorArmorValue = equippedArmor[1];
    armorCostValue = equippedArmor[2];
    armorBulkValue = equippedArmor[3];
    armorBulkBonus = equippedArmor[4];
    armorResistanceValue = equippedArmor[5];
    updateCharValues();
}
function buyFittedVest() {
    let equippedArmor = Object.values(masterArmorTable[3]);
    armorDefenseValue = equippedArmor[0];
    armorArmorValue = equippedArmor[1];
    armorCostValue = equippedArmor[2];
    armorBulkValue = equippedArmor[3];
    armorBulkBonus = equippedArmor[4];
    armorResistanceValue = equippedArmor[5];
    updateCharValues();
}
function equipHauberk() {
    let equippedArmor = Object.values(masterArmorTable[4]);
    armorDefenseValue = equippedArmor[0];
    armorArmorValue = equippedArmor[1];
    armorCostValue = equippedArmor[2];
    armorBulkValue = equippedArmor[3];
    armorBulkBonus = equippedArmor[4];
    armorResistanceValue = equippedArmor[5];
    updateCharValues();
}

//FUNCTIONS THAT EQUIP WEAPONS -- THESE FUNCTIONS APPLY VALUES FROM SELECTED WEAPONS. "FISTS" IS CALLED BY DEFAULT. REFER TO MASTER WEAPONS ARRAY TO SEE WEAPON STATS.
function equipFists() {
    let equippedWeapon = Object.values(masterWeaponTable[0]);
    weaponBonusPhysicalDamage = equippedWeapon[0];
    weaponBonusMagicalDamage = equippedWeapon[1];
    weaponResolveTime = equippedWeapon[2];
    weaponAttackDamage = equippedWeapon[3];
    weaponMagicalDamageDie = equippedWeapon[4];
    weaponBulkValue = equippedWeapon[5];
    weaponCostValue = equippedWeapon[6];
    weaponBonusAttackValue = equippedWeapon[7];
updateCharValues();
} equipFists();

function equipArmingSword() {    
    let equippedWeapon = Object.values(masterWeaponTable[1]);
    weaponBonusPhysicalDamage = equippedWeapon[0];
    weaponBonusMagicalDamage = equippedWeapon[1];
    weaponResolveTime = equippedWeapon[2];
    weaponAttackDamage = equippedWeapon[3];
    weaponMagicalDamageDie = equippedWeapon[4];
    weaponBulkValue = equippedWeapon[5];
    weaponCostValue = equippedWeapon[6];
    weaponBonusAttackValue = equippedWeapon[7];
    updateCharValues();
}

function equipMace() {
    let equippedWeapon = Object.values(masterWeaponTable[2]);
    weaponBonusPhysicalDamage = equippedWeapon[0];
    weaponBonusMagicalDamage = equippedWeapon[1];
    weaponResolveTime = equippedWeapon[2];
    weaponAttackDamage = equippedWeapon[3];
    weaponMagicalDamageDie = equippedWeapon[4];
    weaponBulkValue = equippedWeapon[5];
    weaponCostValue = equippedWeapon[6];
    weaponBonusAttackValue = equippedWeapon[7];
    updateCharValues();
}

function equipBattleAxe() {
    let equippedWeapon = Object.values(masterWeaponTable[3]);
    weaponBonusPhysicalDamage = equippedWeapon[0];
    weaponBonusMagicalDamage = equippedWeapon[1];
    weaponResolveTime = equippedWeapon[2];
    weaponAttackDamage = equippedWeapon[3];
    weaponMagicalDamageDie = equippedWeapon[4];
    weaponBulkValue = equippedWeapon[5];
    weaponCostValue = equippedWeapon[6];
    weaponBonusAttackValue = equippedWeapon[7];
    updateCharValues();
}

function equipStaff() {
    let equippedWeapon = Object.values(masterWeaponTable[4]);
    weaponBonusPhysicalDamage = equippedWeapon[0];
    weaponBonusMagicalDamage = equippedWeapon[1];
    weaponResolveTime = equippedWeapon[2];
    weaponAttackDamage = equippedWeapon[3];
    weaponMagicalDamageDie = equippedWeapon[4];
    weaponBulkValue = equippedWeapon[5];
    weaponCostValue = equippedWeapon[6];
    weaponBonusAttackValue = equippedWeapon[7];
    updateCharValues();
}

//UPDATE CHARACTER STATS FROM EQUIPMENT FUNCTION
function updateCharValues() {
    document.getElementById("charDefense").innerHTML = charAgility+armorDefenseValue;
    document.getElementById("charArmorScore").innerHTML = armorArmorValue;
    document.getElementById("totalCharGoldValue").innerHTML = charStartGold-armorCostValue-weaponCostValue;
    document.getElementById("dynamicCharBulkValue").innerHTML = charStartBulkValue + armorBulkValue+ weaponBulkValue;
    document.getElementById("totalCharBulkValue").innerHTML = charMaxBulkValue + armorBulkBonus;
    document.getElementById("charResistanceScore").innerHTML = armorResistanceValue;
    document.getElementById("charAttackBonus").innerHTML = charInsight + weaponBonusAttackValue;
    document.getElementById("charDamageBonus").innerHTML = weaponBonusPhysicalDamage;
    document.getElementById("charAttackDamage").innerHTML = weaponAttackDamage;
    document.getElementById("charAttackResolveTime").innerHTML = weaponResolveTime;
}

//PHYSICAL DAMAGE ROLL FUNCTION
document.getElementById("charAttackDamageValue").innerHTML = 0;
function rollPhysicalDamageAttack() {
    //this function produces a damage value after making an attack.
    const damageRolls = [];
    let totalPhysicalDamage = 0;
    //this for loop produces a die roll from 1 to 3 a number of times equal to the physical damage die value, and places those rolls into the damageRolls array.
    for (let i = 0, damagedie = weaponAttackDamage; i < damagedie; i++) { 
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
