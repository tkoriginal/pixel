class Robot {
  constructor(statTotal) {
    this.remainingStats = statTotal;

    this.strength = Math.floor(Math.random() * Math.min(15, this.remainingStats) + 5);
    this.remainingStats -= this.strength;

    this.dexterity = Math.floor(Math.random() * Math.min(20, this.remainingStats));
    this.remainingStats -= this.dexterity;

    this.armour = Math.floor(Math.random() * Math.min(20, this.remainingStats));
    this.remainingStats -= this.armour;

    this.health = this.remainingStats * 5 + 50;
    this.remainingStats = 0;

    this.traits = ["attack", "defend", "assignDamage", "changeTurn"];
    this.traits.push(traitsArray[Math.floor(Math.random() * traitsArray.length)]);

    this.name = nameArray[Math.floor(Math.random() * nameArray.length)];

    this.img = imgArray[Math.floor(Math.random() * imgArray.length)];
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

const imgArray = [
  "img/robot1.gif",
  "img/robot2.gif",
  "img/robot3.gif",
  "img/robot4.gif",
  "img/robot5.gif",
  "img/robot6.gif",
  "img/robot7.gif",
  "img/robot8.gif",
  "img/robot9.gif",
  "img/robot10.gif",
  "img/robot11.gif",
  "img/robot12.gif",
  "img/robot13.gif",
  "img/robot14.gif",
  "img/robot15.gif",
  "img/robot16.gif",
  "img/robot17.gif",
  "img/robot18.gif",
  "img/robot19.gif",
  "img/robot20.gif"
];
const nameArray = ["Maximus", "Taqert", "Gorg", "Killary", "Brocas", "Tin", "Slimtim", "Facebump", "OnlyJuan", "Mr.Cache"];
const traitsArray = ["critical", "block", "doubleDamage", "poison", "thorns"];

module.exports = { generateRobot };
// export default generateRobot;
// console.log(generateRobot(3, 30, false));
