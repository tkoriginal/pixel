const assigners = require("./assigners.js");
// let combatLog = [];

function Combat(robot1, robot2) {
  // robot1.name = "Rocky";
  // robot2.name = "Dolf";
  let attacker = robot1.dexterity > robot2.dexterity ? robot1 : robot2;
  let defender = attacker === robot1 ? robot2 : robot1;

  const combatStatus = { attacker: attacker, defender: defender, turn: 1, combatLog: [] };

  combatStatus.attacker.states = {
    offense: [],
    defense: [],
    postCombat: []
  };

  combatStatus.defender.states = {
    offense: [],
    defense: [],
    postCombat: []
  };

  combatStatus.attacker.traits.forEach(trait => {
    assigners[trait](robot1);
  });

  combatStatus.defender.traits.forEach(trait => {
    assigners[trait](robot2);
  });

  assigners.sortStates(combatStatus);

  while (combatStatus.attacker.health > 0 && combatStatus.defender.health > 0) {
    // let damage = defend(attack(attacker), defender);
    // methods[atk](combatStatus);
    // methods[def](combatStatus);
    combatStatus.damage = 0;
    combatStatus.turnLog = [];
    combatStatus.effectiveArmour = combatStatus.defender.armour;
    combatStatus.effectiveStrength = combatStatus.attacker.strength;

    combatStatus.attacker.states.offense.forEach(command => {
      command.action(combatStatus);
    });

    assigners.sortStates(combatStatus);

    combatStatus.defender.states.defense.forEach(command => {
      command.action(combatStatus);
    });
    combatStatus.defender.states.postCombat.forEach(command => {
      command.action(combatStatus);
    });
    // combatStatus.damage = damage;

    // combatStatus = methods[element]

    // console.log(combatStatus.damage);

    // methods.assignDamage(combatStatus);
    // methods.changeTurn(combatStatus);
  }

  if (combatStatus.attacker.health <= 0 && combatStatus.defender.health <= 0) {
    combatStatus.combatLog.push({
      text: `***Both fighters are dead!***`,
      type: "death"
    });

    const results = {
      winner: null,
      log: combatStatus.combatLog
    };

    return results;
  }
  combatStatus.winner = combatStatus.attacker.health > 0 ? combatStatus.attacker : combatStatus.defender;
  combatStatus.loser = combatStatus.winner === combatStatus.attacker ? combatStatus.defender : combatStatus.attacker;
  combatStatus.combatLog.push({
    text: `***${combatStatus.loser.name} has died!***`,
    type: "death"
  });

  const results = {
    winner: combatStatus.winner,
    log: combatStatus.combatLog
  };

  return results;
}

// Robot1 = {
//   remainingStats: 0,
//   strength: 16,
//   dexterity: 0,
//   armour: 8,
//   health: 80
// };

// Robot2 = {
//   remainingStats: 0,
//   strength: 13,
//   dexterity: 14,
//   armour: 0,
//   health: 80
// };

// let results = Combat(Robot1, Robot2);
// console.log(results.log);
// console.log(results)
// console.log(`The winner is: ${results.winner.name} with ${results.winner.health} health remaining!`);

module.exports = { Combat };
