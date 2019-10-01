class Mine {
  constructor() {
    this.gemsCount = { obsidian: 18, topaz: 15, amethyst: 12, emerald: 10, sapphire: 7, ruby: 4, diamond: 2 };
    this.globalGemArray = [];
    this.makeGemArray();
  }

  makeGemArray() {
    var outputArray = [];
    for (var gem in this.gemsCount) {
      var gemCount = this.gemsCount[gem];
      for (var gemNum = 0; gemNum < gemCount; gemNum++) {
        outputArray.push(gem);
      }
    }
    this.globalGemArray = outputArray;
  }

  returnRandomGem() {
    var randomIndex = Math.floor(Math.random() * this.globalGemArray.length);
    var randomGem = this.globalGemArray[randomIndex];
    this.globalGemArray.splice(randomIndex, 1);
    return randomGem;
  }

  mineTwoGems() {
    var gems = [];
    var gem1 = this.returnRandomGem();
    var gem2 = this.returnRandomGem();
    if (gem1 === "obsidian"){
      while(gem2 === "obsidian"){
        this.globalGemArray.push(gem2);
        gem2 = this.returnRandomGem();
      }
    }
    gems.push(gem1, gem2);
    return gems;
}

returnPlayerGemsToMine (gemArray) {
  for (var indexOfGemArray = 0; indexOfGemArray < gemArray.length; indexOfGemArray++) {
    this.globalGemArray.push(gemArray[indexOfGemArray]);
  }
}
}
