import monster from "./monsterStatus.js";
class Monster {
  constructor(type) {
    this.cont = 0;
    this.speed = monster[type].speed;
    this.health = monster[type].health;
    this.attack;
    this.image = monster[type].image;
  }
  attack() {
    return this.health;
  }
  selectImage() {
    const imageResult = this.image[parseInt(this.cont)];
    if (this.cont >= 4.5) {
      this.cont = 0;
      return imageResult;
    } else {
      this.cont += 0.1;
      return imageResult;
    }
  }
}

export default Monster;
