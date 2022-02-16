class MonsterStatus {
  constructor() {
    //Pra prevenir os glitchs, deve-se carregar todas as imagens, o glitch acontece porque as imagens vão sendo carregadas
    //na hora da animação, então algumas vezes a imagem não foi carregada a tempo, deixando um frame em branco, fazendo o
    //efeito de "piscar" na tela.

    for (const key in monsterStatus) {
      if (monsterStatus.hasOwnProperty(key)) {
        for (const imagePath of monsterStatus[key].image) {
          this.loadImage(imagePath, monsterStatus[key]);
        }
      }
    }
  }

  loadImage(imagePath, object) {
    const canvasImage = new Image();

    canvasImage.onload = function () {
      object.imagesLoaded.push(canvasImage);
    };

    canvasImage.src = imagePath;
  }

  getMonsterInitialSpeed(type) {
    return monsterStatus[type].speed;
  }

  getMonsterInitialHealth(type) {
    return monsterStatus[type].health;
  }

  getMonsterImages(type) {
    return monsterStatus[type].imagesLoaded;
  }

  getMonsterImageHeight(type) {
    return monsterStatus[type].imageHeight;
  }

  getMonsterImageMaxHeight(type) {
    return monsterStatus[type].imageMaxHeight;
  }
}

const monsterStatus = {
  slimePink: {
    speed: 1,
    health: 100,
    image: [
      "../assets/monsters/slimePink/image1.svg",
      "../assets/monsters/slimePink/image2.svg",
      "../assets/monsters/slimePink/image3.svg",
      "../assets/monsters/slimePink/image4.svg",
      "../assets/monsters/slimePink/image5.svg",
    ],
    imagesLoaded: [],
    imageHeight: [47, 42, 39, 35, 39],
    imageMaxHeight: 47,
  },
  slimeGreen: {
    speed: 1.5,
    health: 150,
    image: [
      "../assets/monsters/slimeGreen/image1.svg",
      "../assets/monsters/slimeGreen/image2.svg",
      "../assets/monsters/slimeGreen/image3.svg",
      "../assets/monsters/slimeGreen/image4.svg",
      "../assets/monsters/slimeGreen/image5.svg",
    ],
    imagesLoaded: [],
    imageHeight: [47, 42, 39, 35, 39],
    imageMaxHeight: 47,
  },
  toad: {
    speed: 2,
    health: 200,
    image: [
      "../assets/monsters/sapo/sapo1.svg",
      "../assets/monsters/sapo/sapo2.svg",
      "../assets/monsters/sapo/sapo3.svg",
      "../assets/monsters/sapo/sapo4.svg",
      "../assets/monsters/sapo/sapo5.svg",
    ],
    imagesLoaded: [],
    imageHeight: [87, 87, 87, 87, 87],
    imageMaxHeight: 87,
  },
  robot: {
    speed: 2.5,
    health: 300,
    image: [
      "../assets/monsters/robo/image1.svg",
      "../assets/monsters/robo/image2.svg",
      "../assets/monsters/robo/image3.svg",
      "../assets/monsters/robo/image4.svg",
      "../assets/monsters/robo/image5.svg",
    ],
    imagesLoaded: [],
    imageHeight: [72, 72, 72, 72, 72],
    imageMaxHeight: 87,
  },
};

export default MonsterStatus;
