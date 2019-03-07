const methods = require("./commands.js");

//assign traits to proper state
module.exports = assigners = {
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
  }
};
