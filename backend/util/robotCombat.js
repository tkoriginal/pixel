function Combat(robot1, robot2) {
  // robot1.name = "Rocky";
  // robot2.name = "Dolf";
  atk = "attack";
  def = "defend";

  let attacker = robot1.dexterity > robot2.dexterity ? robot1 : robot2;
  let defender = attacker == robot1 ? robot2 : robot1;
  let turn = 1;

  while (robot1.health > 0 && robot2.health > 0) {
    // let damage = defend(attack(attacker), defender);
    let damage = test[def](test[atk](attacker), defender);
    defender.health -= damage;

    if (damage) {
      combatLog.push({ [`Turn ${turn}`]: `${attacker.name} dealt ${damage} damage to ${defender.name}!` });
    } else {
      combatLog.push({ [`Turn ${turn}`]: `${defender.name} evaded the attack!` });
    }

    //Swap
    let temp = attacker;
    attacker = defender;
    defender = temp;
    turn++;
  }

  combatLog.push({ [`Turn ${turn}`]: `${attacker.name} has died!` });

  const results = {
    winner: defender,
    log: combatLog
  };

  return results;
}

test = {
  attack: function attack(attacker) {
    return attacker.strength;
  },

  defend: function defend(intendedDamage, defender) {
    if (Math.random() * 100 < defender.dexterity * 3) {
      // console.log(defender.name, 0);
      return 0;
    }

    let takenDamage = intendedDamage * ((100 - defender.armour * 3) / 100);
    //   console.log(defender.name, takenDamage);
    return Math.floor(takenDamage);
  }
};

const combatLog = [];

Robot1 = {
  remainingStats: 0,
  strength: 16,
  dexterity: 0,
  armour: 8,
  health: 80
};

Robot2 = {
  remainingStats: 0,
  strength: 13,
  dexterity: 14,
  armour: 0,
  health: 80
};

let results = Combat(Robot1, Robot2);
console.log(results.log);
console.log(results)
console.log(`The winner is: ${results.winner.name} with ${results.winner.health} health remaining!`);

module.exports = {Combat}

