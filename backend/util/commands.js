module.exports = methods = {
  sortDefense: (a, b) => {
    return defenseOrder.indexOf(a.type) - defenseOrder.indexOf(b.type);
  },

  sortPostCombat: (a, b) => {
    return postCombatOrder.indexOf(a.type) - postCombatOrder.indexOf(b.type);
  },

  changeTurn: combatStatus => {
    combatStatus.turnLog.forEach(log => {
      combatStatus.combatLog.push(log);
    });

    let temp = combatStatus.attacker;
    combatStatus.attacker = combatStatus.defender;
    combatStatus.defender = temp;
    combatStatus.turn++;
  },

  attack: combatStatus => {
    combatStatus.damage = combatStatus.effectiveStrength;

    // return combatStatus;
  },

  defend: combatStatus => {
    if (Math.random() * 100 < combatStatus.defender.dexterity * 3) {
      //console.log(defender.name, 0);
      combatStatus.damage = -1;
      combatStatus.turnLog.push({ [`Turn ${combatStatus.turn}`]: `${combatStatus.defender.name} evaded the attack!` });
      return;
    }

    let takenDamage = combatStatus.effectiveStrength * ((100 - combatStatus.effectiveArmour * 3) / 100);
    //console.log(defender.name, takenDamage);

    combatStatus.damage = Math.floor(takenDamage);

    // return combatStatus;
  },

  critical: combatStatus => {
    if (Math.random() * 100 < 30) {
      combatStatus.effectiveArmour = 0;
      combatStatus.turnLog.push(`   ~~~${combatStatus.attacker.name} attempted a critical strike!~~~   `);
    }
  },

  block: combatStatus => {
    if (combatStatus.damage > 0) {
      if (Math.random() * 100 < 30) {
        combatStatus.damage = 0;
        combatStatus.turnLog.push({ [`Turn ${combatStatus.turn}`]: `${combatStatus.defender.name} blocked ${combatStatus.attacker.name}'s attack!` });
      }
    }
  },

  assignDamage: combatStatus => {
    if (combatStatus.damage > 0) {
      combatStatus.turnLog.push({
        [`Turn ${combatStatus.turn}`]: `${combatStatus.attacker.name} dealt ${combatStatus.damage} damage to ${combatStatus.defender.name}!`
      });
      combatStatus.defender.health -= combatStatus.damage;
    }
  },

  doubleDamage: combatStatus => {
    if (Math.random() * 100 < 30) {
      combatStatus.effectiveStrength = combatStatus.effectiveStrength * 2;
      combatStatus.turnLog.push(`   ~~~${combatStatus.attacker.name} dealt double damage!~~~   `);
    }
  },

  poison: combatStatus => {
    if (Math.random() * 100 < 20) {
      if (!combatStatus.defender.poisoned) {
        combatStatus.defender.states.postCombat.unshift({
          type: "poisoned",
          action: methods.poisoned
        });
      }
      combatStatus.defender.poisoned = 5;
    }
  },

  poisoned: combatStatus => {
    if (combatStatus.defender.poisoned == 5) {
      combatStatus.turnLog.push(`     ~~~${combatStatus.defender.name} was oxidized!~~~     `);
    }

    if (combatStatus.defender.poisoned > 2) {
      combatStatus.turnLog.push(`   ~~~${combatStatus.defender.name} took 3 damage from rust!~~~   `);
      combatStatus.defender.health -= 3;
      combatStatus.defender.poisoned--;
      return;
    } else if (combatStatus.defender.poisoned === 1) {
      combatStatus.turnLog.push(`   ~~~${combatStatus.defender.name} is rusted no longer!~~~   `);
      combatStatus.defender.poisoned--;
    }
  },

  thorns: combatStatus => {
    if (combatStatus.damage >= 3) {
      combatStatus.attacker.health -= Math.floor(combatStatus.damage * 0.3);
      combatStatus.turnLog.push(` ~~~${combatStatus.attacker.name} took ${Math.floor(combatStatus.damage * 0.2)} return damage from spikes!~~~ `);
    }
  }
};

const defenseOrder = ["block", "defend"];
const postCombatOrder = ["assignDamage", "thorns", "poisoned", "changeTurn"];
