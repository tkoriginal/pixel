module.exports = methods = {
  changeTurn: combatStatus => {
    let temp = combatStatus.attacker;
    combatStatus.attacker = combatStatus.defender;
    combatStatus.defender = temp;
    combatStatus.turn++;
  },

  attack: combatStatus => {
    combatStatus.damage = combatStatus.effectiveStrength;

    return combatStatus;
  },

  defend: combatStatus => {
    if (Math.random() * 100 < combatStatus.defender.dexterity * 3) {
      //console.log(defender.name, 0);
      combatStatus.damage = -1;
      combatStatus.combatLog.push({ [`Turn ${combatStatus.turn}`]: `${combatStatus.defender.name} evaded the attack!` });
      return combatStatus;
    }

    let takenDamage = combatStatus.damage * ((100 - combatStatus.effectiveArmour * 3) / 100);
    //console.log(defender.name, takenDamage);

    combatStatus.damage = Math.floor(takenDamage);

    return combatStatus;
  },

  // getCrit: combatStatus => {
  //   combatStatus.damage = Math.floor(combatStatus.damage / ((100 - combatStatus.defender.armour * 3) / 100));
  //   combatStatus.combatLog.push(`${combatStatus.attacker.name} dealt a critical hit!`);

  //   return combatStatus;
  // },

  critical: combatStatus => {
    if (Math.random() * 100 < 30) {
      combatStatus.effectiveArmour = 0;
      combatStatus.combatLog.push(`   ~~~${combatStatus.attacker.name} attempted a critical strike!~~~   `);
    }
  },

  block: combatStatus => {
    if (Math.random() * 100 < 30) {
      combatStatus.damage = 0;
      combatStatus.combatLog.push({ [`Turn ${combatStatus.turn}`]: `${combatStatus.defender.name} blocked the attack!` });
    }
  },

  assignDamage: combatStatus => {
    if (combatStatus.damage > 0) {
      combatStatus.combatLog.push({
        [`Turn ${combatStatus.turn}`]: `${combatStatus.attacker.name} dealt ${combatStatus.damage} damage to ${combatStatus.defender.name}!`
      });
      combatStatus.defender.health -= combatStatus.damage;
    }
    // else if (combatStatus.damage == 0) {
    //   combatStatus.combatLog.push({ [`Turn ${combatStatus.turn}`]: `${combatStatus.defender.name} blocked the attack!` });
    // }
  }
};
