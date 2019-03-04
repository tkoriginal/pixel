class Robot {
  constructor(statTotal, enemy) {
    this.remainingStats = statTotal;

    this.strength = Math.floor(
      Math.random() * Math.min(20, this.remainingStats)
    );
    this.remainingStats -= this.strength;

    this.dexterity = Math.floor(
      Math.random() * Math.min(20, this.remainingStats)
    );
    this.remainingStats -= this.dexterity;

    this.armour = Math.floor(Math.random() * Math.min(20, this.remainingStats));
    this.remainingStats -= this.armour;

    this.health = this.remainingStats * 5 + 50;
  }
}

function generateRobot(numOfBots, statTotal, enemy) {
  const robots = [];
  for (let i = 0; i < numOfBots; i++) {
    robots.push(new Robot(statTotal, enemy));
  }

  return robots;
}
export default generateRobot;
// console.log(generateRobot(3, 30, false));