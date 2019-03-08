class Robot {
  constructor(statTotal) {
    this.remainingStats = statTotal;

    this.strength = Math.floor(Math.random() * Math.min(25, this.remainingStats) + 5);
    this.remainingStats -= this.strength;

    this.dexterity = Math.floor(Math.random() * Math.min(20, this.remainingStats));
    this.remainingStats -= this.dexterity;

    this.armour = Math.floor(Math.random() * Math.min(20, this.remainingStats));
    this.remainingStats -= this.armour;

    this.health = this.remainingStats * 5 + 50;
    this.remainingStats = 0;

    this.traits = ["attack", "defend", "assignDamage", "changeTurn"];
    this.traits.push(traitsArray[Math.floor(Math.random() * 2)]);

    this.name = nameArray[Math.floor(Math.random() * (nameArray.length - 1))];
  }
}

function generateRobot(numOfBots, statTotal, enemy) {
  const robots = [];
  if (enemy) {
    for (let i = 0; i < numOfBots - 2; i++) {
      robots.push(new Robot(statTotal));
    }
    robots.push(new Robot(statTotal + 5));
    robots.push(new Robot(statTotal - 5));
  } else {
    for (let i = 0; i < numOfBots; i++) {
      robots.push(new Robot(statTotal));
    }
  }
  return robots;
}

const nameArray = ["Maximus", "Taqert", "Gorg", "Killary", "Brocas", "Tin", "Slimtim", "Facebump", "OnlyJuan", "Mr.Cache"];
const traitsArray = ["critical", "block", "doubleDamage", "poison", "thorns"];

module.exports = { generateRobot };
// export default generateRobot;
// console.log(generateRobot(3, 30, false));
