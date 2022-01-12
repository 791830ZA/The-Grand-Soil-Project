/**
 * @class PlotOfLand
 * @classdesc This will be a new class used to describe each plot of land and its dimensions. Can be used to either create a field for gardening, or for barns.
 */
class PlotOfLand{
  
  /**
   * @constructor
   * this function will construct the PlotOfLand object
   * 
   * @param {String} name - identifier of this specific land
   * @param {int} length - length of the land in meters
   * @param {int} width - width of the land in meters
   * @param {string} soilType - type of soil (clay, loamy, sandy)
   * @param {string} soilColour - colour of soil relative (light, dark, very dark)
   * @parm {int} nContent - nitrogen content in soil (in parts in million)
   * @param {int} pContent - Phosphorus content found in the soil (in parts per million)
   * @param {int} kContent - Potassium content found int eh soil (in parts per million)
   * @param {int} pHLevel - the pH level of the soil (in pH Level)
   */
  constructor(name, length, width, soilType, soilColour, nContent,  pContent, kContent, pHLevel, soilTest=false, currentCrop="none"){
    this.name = name;
    this.length = length;
    this.width = width;
    this.soilType = soilType;
    this.soilColour = soilColour;
    this.nContent = nContent;
    this.pContent = pContent;
    this.kContent = kContent;
    this.pHLevel = pHLevel;
    this.soilTest = soilTest;
    this.currentCrop = currentCrop;
  };

  /**
   * @method
   * This method will be used in order to calculate the area of the PlotOfLand
   * 
   * @returns {int} - The returns include an integer which is the value of the area in    meters squared
   */
  calcArea(){
    return Math.round(this.length * this.width)
  };

  /**
   * @method
   * This method will calculate the the health of the soil and return it's estimated health out of 100
   * 
   * @returns {int} - returns health of soil out of 100 (percentage)
   */
  calcSoilHealth(){
    var soilHealth = 0;

    if (this.soilType.toUpperCase() == "CLAY"|| this.soilType.toUpperCase == "SANDY"){
      soilHealth += 5
    } else {
      soilHealth += 15
    };

    if (this.soilColour.toUpperCase() == "LIGHT"){
      soilHealth += 5
    } else if (this.soilColour.toUpperCase() == "DARK"){
      soilHealth += 10
    } else {
      soilHealth += 15
    };

    if (this.nContent > 30 && this.nContent < 35){
      soilHealth += 5
    } else if (this.nContent >= 35 && this.nContent <= 45){
      soilHealth += 20
    } else if (this.nContent > 45 && this.nContent < 50){
      soilHealth += 5
    } else {
      soilHealth += 0
    };

    if (this.pContent >= 30 && this.pContent <= 50){
      soilHealth += 10
    }else{
      soilHealth += 0
    };

    if (this.kContent >= 40 && this.kContent <= 80){
      soilHealth += 10
    }else{
      soilHealth += 0
    };

    if (this.pHLevel > 5 && this.pHLevel < 6){
      soilHealth += 5
    }else if (this.pHLevel >= 6 && this.pHLevel <= 7.5){
      soilHealth += 30
    }else if (this.pHLevel > 7.5 && this.pHLevel < 8){
      soilHealth += 5
    }else{
      soilHealth += 0
    };

    return soilHealth
  };
};

/**
 * Temporary Save File for All Lands in the List
 */
listOfLands = []


/**
 * @function
 *  creates an object using the class above by taking in inputs
 * 
 * @returns
 * Returns a temporary shell for the object
 */
function createObject(){
  
  var name = document.getElementById("name").value;
  var length = parseInt(document.getElementById("length").value);
  var width = parseInt(document.getElementById("width").value);

  var soilTypeRadios = document.getElementsByName("soilType");
  for (var i = 0; i<soilTypeRadios.length; i++){
    if(soilTypeRadios[i].checked){
      soilType=soilTypeRadios[i].value;
      break;
    }else{
      soilType=NaN;
    };
  };

  var soilColourRadios = document.getElementsByName("soilColour");
  for(var i=0; i<soilColourRadios.length;i++){
    if (soilColourRadios[i].checked){
      soilColour=soilColourRadios[i].value;
      break;
    }else{
      soilColour=NaN;
    };
  };

  var soilTestRadios = document.getElementsByName("soilTest");
  for(var i=0; i<soilTestRadios.length;i++){
    if (soilTestRadios[i].value == "true" && soilTestRadios[i].checked){
      var nContent = parseInt(document.getElementById("nContent").value);
      var pContent = parseInt(document.getElementById("pContent").value);
      var kContent = parseInt(document.getElementById("kContent").value);
      var pHLevel = parseInt(document.getElementById("pHLevel").value);
      var soilTest = false;
      break;
    }else if (soilTestRadios[i].value == "false" && soilTestRadios[i].checked){
      var nContent = 40;
      var pContent = 40;
      var kContent = 40;
      var pHLevel = 7;
      var soilTest = false;
      break;
    }else{
      var soilTest = true;
    };
  };


  
  temporaryObject = new PlotOfLand(name, length, width, soilType, soilColour, nContent, pContent, kContent, pHLevel, soilTest);


  return temporaryObject

};

/**
 * @function
 * checks that all necessary inputs were put in so that the object can be created and all it's modules work
 * Directs them to a new survey page which they must complete properly in order to create the object
 * 
 * @returns 
 */
function checkCorrectVariables(){

  var temporaryObject = createObject()

  if (isNaN(temporaryObject.width) || isNaN(temporaryObject.length)){
    window.location.href = "newPlotError.html";

  }else if(!(typeof(temporaryObject.soilType) == "string") || !(typeof(temporaryObject.soilColour) == "string")){
    alert(temporaryObject.soilType, temporaryObject.soilColour);
    window.location.href = "newPlotError.html";

  }else if(temporaryObject.soilTest){
    alert(temporaryObject.soilTest);
    window.location.href = "newPlotError.html";

  }else{
    alert("Successfully Created New Plot Of Land")
    listOfLands.push(temporaryObject)
    alert(listOfLands)
    window.location.href = "myPlots.html"
  };
};

function displayLands(){
  var str = "<ul>"
  listOfLands.forEach(function(land){
    str += '<div>' + land.name + "</div>";
    str += "<div>" + land.calcSoilHealth() + "</div>";
    str += "<div>" + land.currentCrop + "</div><br>";
  });

  str += "</ul>";
  document.getElementById("Lands Display").innerHTML = str;
};

function addInputBox(){
  var str = "<input type='text' name='pHLevel' id='pHLevel' placeholder='Input Name of Crop Here'></input><br><br>"
  str += "</input>"
  document.getElementById("Input Crop").innerHTML = str;
};

    
