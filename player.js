class Player{
  constructor(playerNumber){
    this.playerNumber = playerNumber;
    this.domElements = {
      playerDom: null,
      playerBackgroundFilter: null,
      dataContainer: null,
      name: null,
      points: null,
      roundPoints: null,
      gemIcons: {
        topaz: null,
        amethyst: null,
        emerald: null,
        sapphire: null,
        ruby: null,
        diamond: null,
        obsidian: null
      },
      gemWords:{
        topaz: null,
        amethyst: null,
        emerald: null,
        sapphire: null,
        ruby: null,
        diamond: null,
        obsidian: null
      }
    }
    this.playerName = "Player " + playerNumber;
    this.points = 0;
    this.totalPoints = 0;
    this.pointsEachRound = [];
    this.typeOfGems = ["obsidian", "topaz", "amethyst", "emerald", "sapphire", "ruby", "diamond"];
    this.gems = {
      'topaz': 0,
      'amethyst': 0,
      'emerald': 0,
      'sapphire': 0,
      'ruby': 0,
      'diamond': 0,
      'obsidian': 0
    }
    this.pointChart = {
      'topaz': 1,
      'amethyst': 2,
      'emerald': 3,
      'sapphire': 4,
      'ruby': 6,
      'diamond': 8,
      'obsidian': 0
    }
    this.inMine = true;
    this.hadAccident = false;
    this.render();
  }

  render() {
    var playerContainer = $('.playerContainer');
    this.domElements.playerBackgroundFilter = $('<div>', {class: 'playerBackgroundFilter'});
    this.domElements.playerDom = $('<div>',{class: 'player' + this.playerNumber + ' player'});
    this.domElements.playerDom.append(this.domElements.playerBackgroundFilter);
    var playerDataContainer = $("<div>",{class: "playerMetaData"});
    this.domElements.dataContainer = playerDataContainer;
    var playerNameAndPointsContainer = $('<div>',{class: 'playerNameAndPoints'});
    var playerNameDom = $("<span>",{class: 'playerName', text: this.playerName});
    this.domElements.name = playerNameDom;
    var pointsContainer = $("<span>", {
      class: 'points',
      text: ' points: '})
    var points = $('<span>',{
      class: 'points',
      text: '0'});
    this.domElements.points = points;
    pointsContainer.append(points);
    playerNameAndPointsContainer.append(playerNameDom, pointsContainer);
    var playerGemScoreBoard = $("<div>",{class: "playerGemCounts"});
    for( var gemName in this.gems){
      var gemIcon = $("<span>",{
        class: 'gemIcon '+ gemName,
        html: '&diams;'
      });
      var gemCount = $("<span>",{
        class: 'gemCount',
        text: this.gems[gemName]
      })
      this.domElements.gemIcons[gemName] = gemCount;
      gemIcon.append(gemCount);
      playerGemScoreBoard.append(gemIcon)
    }
    playerDataContainer.append(playerNameAndPointsContainer, playerGemScoreBoard);
    this.domElements.playerBackgroundFilter.append(playerDataContainer);
    var gems = $('<p>').addClass('gems').text('Gems');
    var topaz = $('<p>').addClass('topaz').text('Topaz : 0');
    var amethyst = $('<p>').addClass('amethyst').text('Amethyst : 0');
    var emerald = $('<p>').addClass('emerald').text('Emerald : 0');
    var sapphire = $('<p>').addClass('sapphire').text('Sapphire : 0');
    var ruby = $('<p>').addClass('ruby').text('Ruby : 0');
    var diamond = $('<p>').addClass('diamond').text('Diamond : 0');
    var obsidian = $('<p>').addClass('obsidian').text('Obsidian : 0');
    var rounds = $('<p>').addClass('roundPoints');
    this.domElements.gemWords.topaz = topaz;
    this.domElements.gemWords.amethyst = amethyst;
    this.domElements.gemWords.emerald = emerald;
    this.domElements.gemWords.sapphire = sapphire;
    this.domElements.gemWords.ruby = ruby;
    this.domElements.gemWords.diamond = diamond;
    this.domElements.gemWords.obsidian = obsidian;
    this.domElements.roundPoints = rounds;
    this.domElements.playerBackgroundFilter.append(gems, topaz, amethyst,emerald, sapphire, ruby, diamond, obsidian, rounds);
    playerContainer.append(this.domElements.playerDom);
  }

  mine(gems) {
    for (var gemIndex = 0; gemIndex < gems.length; gemIndex++) {
      this.updateGemCount(gems[gemIndex]);
    }
    this.pointsConverter(gems);
    this.updatePlayerGemsAndPoints(gems);
    if (this.gems["obsidian"] >= 2){
      this.hadAccident = true;
    }
    return this.hadAccident;
  }

  updateGemCount(gemName) {
    this.gems[gemName]++;
  }

  updatePlayerGemsAndPoints(newGems) {
    for (var gemIndex = 0; gemIndex < newGems.length; gemIndex++) {
      var gemIconElement = this.domElements.gemIcons[newGems[gemIndex]];
      var gemWordElement = this.domElements.gemWords[newGems[gemIndex]];
      var newGemCount = this.gems[newGems[gemIndex]];
      gemIconElement.text(newGemCount);
      gemWordElement.text(newGems[gemIndex] + ": " + newGemCount);
      if (newGems.length === 2){
        var currentPlayerDoms = $(".currentPlayerContainer").find("." + newGems[gemIndex]);
        var currentPlayerGemIcon = $(currentPlayerDoms[0]);
        var currentPlayerGemCount = $(currentPlayerDoms[0]).children();
        var currentPlayerGemWord = $(currentPlayerDoms[1]);
        currentPlayerGemCount.text(newGemCount);
        currentPlayerGemWord.text(newGems[gemIndex] + ": " + newGemCount);
        this.highlightDomElement(gemIconElement);
        this.highlightDomElement(gemIconElement.parent());
        this.highlightDomElement(gemWordElement);
        this.highlightDomElement(currentPlayerGemIcon);
        this.highlightDomElement(currentPlayerGemCount);
        this.highlightDomElement(currentPlayerGemWord);
      }
    }
    this.domElements.points.text(this.points)
  }

  highlightDomElement(element){
    element.addClass("highlight");
    setTimeout(function(){element.removeClass("highlight")}, 800, element);
  }

  leaveMine() {
    this.inMine = false;
    this.domElements.playerBackgroundFilter.addClass("leftMine");
  }

  updateDomToAccident() {
    this.domElements.playerBackgroundFilter.addClass("accident");
    this.updatePlayerGemsAndPoints(this.typeOfGems);
  }

  addClassToPlayerDom(className){
    this.domElements.playerDom.addClass(className);
  }

  removeClassFromPlayerDom(className){
    this.domElements.playerDom.removeClass(className);
  }

  getAccidentStatus() {
    return this.hadAccident;
  }

  pointsConverter(minedGems) {
    for (var i = 0; i < minedGems.length; i++) {
      this.points += this.pointChart[minedGems[i]]
    }
  }

  updatePointsAtEndOfRound(round){
    this.totalPoints += this.points;
    this.pointsEachRound.push(this.points);
    this.domElements.roundPoints.text(this.domElements.roundPoints.text() + "R" + round + ": " + this.pointsEachRound[round - 1] + " ");
  }

  getPoints() {
    return this.points;
  }
  getTotalPoints() {
    return this.totalPoints;
  }
  getPlayerName(){
    return this.playerName;
  }
  getPlayerDom(){
    return this.domElements.playerDom;
  }

  returnGems() {
    var outputArray = [];
    for (var gem in this.gems) {
      var gemCount = this.gems[gem];
      for (var gemNum = 0; gemNum < gemCount; gemNum++) {
        outputArray.push(gem);
      }
    }
    this.points = 0;
    this.gems = {
      'topaz': 0,
      'amethyst': 0,
      'emerald': 0,
      'sapphire': 0,
      'ruby': 0,
      'diamond': 0,
      'obsidian': 0
    };
    this.updatePlayerGemsAndPoints(this.typeOfGems);
    return outputArray;
  }

  initializeStatus(){
    this.inMine = true;
    this.hadAccident = false;
  }

  initializeDomClassNames(){
    this.domElements.playerDom.removeClass('yourTurn');
    this.domElements.playerBackgroundFilter.removeClass("accident leftMine");
  }

  initializePoints(){
    this.points = 0;
    this.totalPoints = 0;
    this.domElements.roundPoints.text("");
  }

}
