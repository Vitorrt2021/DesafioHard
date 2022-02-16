class Monster {
  constructor(type, monsterStatus) {
    this.cont = 0;
    // this.speed = monsterStatus[type].speed;
    this.speed = monsterStatus.getMonsterInitialSpeed(type);
    this.health = monsterStatus.getMonsterInitialHealth(type);
    this.attack;
    // this.image = monsterStatus[type].image;
    this.image = monsterStatus.getMonsterImages(type);
    this.imageHeight = monsterStatus.getMonsterImageHeight(type);
    this.imageMaxHeight = monsterStatus.getMonsterImageMaxHeight(type);
    this.index = null;
  }

  // getMonsterImageHeight(type) {
  //   return monsterStatus[type].imageHeight;
  // }

  // getMonsterImageMaxHeight(type) {
  //   return monsterStatus[type].imageMaxHeight;
  // }
  // loadImage(imagePath, key) {
  //   const canvasImage = new Image();
  //   canvasImage.src = imagePath;
  //   canvasImage.onload = () => key.imagesLoaded.push(canvasImage);
  // }

  // getMonsterInitialSpeed(type) {
  //   return monsterStatus[type].speed;
  // }

  // getMonsterInitialHealth(type) {
  //   return monsterStatus[type].health;
  // }

  // getMonsterImage(type, index) {
  //   return monsterStatus[type].image[index];
  // }
  attack() {
    return this.health;
  }
  selectImage() {
    const imageResult = this.image[parseInt(this.cont)];
    this.index = this.image.indexOf(imageResult);

    if (this.cont >= 4.5) {
      this.cont = 0;
    } else {
      this.cont += 0.1;
    }

    return imageResult;
  }
  diferenceHeight() {
    return this.imageMaxHeight - this.imageHeight[this.index];
  }
}

export default Monster;
