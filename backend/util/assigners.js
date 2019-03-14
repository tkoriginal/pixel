const methods = require("./commands.js");

//assign traits to proper state
module.exports = assigners = {
  sortStates: combatStatus => {
    combatStatus.defender.states.defense.sort(methods.sortDefense);
    combatStatus.defender.states.postCombat.sort(methods.sortPostCombat);
    combatStatus.attacker.states.defense.sort(methods.sortDefense);
    combatStatus.attacker.states.postCombat.sort(methods.sortPostCombat);
  },

  attack: currentBot => {
    currentBot.states.offense.push({
      type: "attack",
      action: methods.attack
    });
  },

  defend: currentBot => {
    currentBot.states.defense.push({
      type: "defend",
      action: methods.defend
    });
  },

  assignDamage: currentBot => {
    currentBot.states.postCombat.push({
      type: "assignDamage",
      action: methods.assignDamage
    });
  },

  changeTurn: currentBot => {
    currentBot.states.postCombat.push({
      type: "changeTurn",
      action: methods.changeTurn
    });
  },

  critical: currentBot => {
    currentBot.states.offense.push({
      type: "critical",
      action: methods.critical
    });
  },

  block: currentBot => {
    currentBot.states.defense.push({
      type: "block",
      action: methods.block
    });
  },

  doubleDamage: currentBot => {
    currentBot.states.offense.push({
      type: "doubleDamage",
      action: methods.doubleDamage
    });
  },
  poison: currentBot => {
    currentBot.states.offense.push({
      type: "poison",
      action: methods.poison
    });
  },
  thorns: currentBot => {
    currentBot.states.postCombat.unshift({
      type: "thorns",
      action: methods.thorns
    });
  },
  regen: currentBot => {
    currentBot.states.postCombat.unshift({
      tyep: "regen",
      action: methods.regen
    });
  }
};
