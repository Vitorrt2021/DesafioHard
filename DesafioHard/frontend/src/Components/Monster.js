import monster from "./monsterStatus.js";
class Monster {
  constructor(type) {
    this.cont = 0;
    this.speed = monster[type].speed;
    this.health = monster[type].health;
    this.attack;
    this.image = monster[type].image;
    this.imageHeight = monster[type].imageHeight;
    this.imageMaxHeight = monster[type].imageMaxHeight;
    this.index = null;
  }
  attack() {
    return this.health;
  }
  selectImage() {
    const imageResult = this.image[parseInt(this.cont)];
    this.index = this.image.indexOf(imageResult);
    if (this.cont >= 4.5) {
      this.cont = 0;
      return imageResult;
    } else {
      this.cont += 0.1;
      return imageResult;
    }
  }
  diferenceHeight() {
    return this.imageMaxHeight - this.imageHeight[this.index];
  }
}

export default Monster;
