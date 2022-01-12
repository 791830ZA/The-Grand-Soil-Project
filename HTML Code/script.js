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
    this.nContent = Math.round(nContent);
    this.pContent = Math.round(pContent);
    this.kContent = Math.round(kContent);
    this.pHLevel = Math.round(pHLevel);
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
  
  calcExpectedYield(area=this.calcArea(), soilHealth=this.calcSoilHealth()){
    return Math.round(area * (soilHealth/100))
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
    alert("Invalid Input. Make sure you have correctly put in correct variables.");

  }else if(!(typeof(temporaryObject.soilType) == "string") || !(typeof(temporaryObject.soilColour) == "string")){
    alert("Invalid Input. Make sure you have correctly put in correct variables.");

  }else if(temporaryObject.soilTest){
    alert("Invalid Input. Make sure you have correctly put in correct variables.");

  }else{
    alert("Successfully Created New Plot Of Land")
    listOfLands.push(temporaryObject)
  };
};

function displayLands(){
  var str = "<ul>"
  listOfLands.forEach(function(land){
    str += '<div>Field Name: ' + land.name + "</div>";
    str += "<div>Soil Health: " + land.calcSoilHealth() + "</div>";
    str += "<div>Expected Yield " + land.calcExpectedYield() + " meters squared of produce</div>";
    
    if (land.calcSoilHealth() >= 80){
      str += "<div>Congratulations you have sufficiently healthy soil. Keep up the good work by making sure you implement crop rotation properly (basic one: brassicas > roots > potato families > legumes). Also make sure to use organic compost.</div>"
    }else if(land.calcSoilHealth() < 80 && land.calcSoilHealth() > 50){
      str += "<div>You have decently healthy soil, however you can improve upon it by following the following tips.</div>"
      if (land.nContent < 30){
        str +="<div>Recommended: It is recommended that you either plant legumes or cover plants like winter field beans or peas.</div>"
      };
      if (land.nContent > 50){
        str += "<div>It is recommended NOT to plant root plants. Next plants should include kale, pac, choi, or mustards.</div>"
      };
      if (land.pContent < 30){
        str += "<div>It is recommended that you add some organic compost in order to increase phosphorus Levels.</div>"
      };
      if (land.pContent > 50){
        str += "<div>The level of Phosphorus is too high! Avoid using organic compost and use low phosphorus products like bone meal. Add iron and zinc supplements to the plants directly. Be careful with the proportions as they are harmful to the environment.</div>"
      };
      if (land.kContent < 40){
        str += "<div> Potassium is a requirement for almost all plants. We recommend that you put potassium additives in the soil such as sulfate of potash or tomato feed.</div>"
      };
      if (land.kContent > 80){
        str += "<div> In a high potassium environment it is recommended that you plant comfrey, woody ash, guano and most commonly potatoes as they thrive in these environments.</div>"
      };
      if (land.pHLevel > 7){
        str += "<div>Having high pHLevel is very bad as a moderate pHLevel is essential. You should consider adding well decomposed compost instead of adding elemental sulfur, aluminum sulfate or sulfuric acid in order to naturally reduce it. This process is slower than artificial means however, but it results in a healthier environment overall.</div>"
      };
      if (land.pHLevel < 6){
        str += "<div>Having a low pHlevel is very bad as a moderate pHLevel is essential. Consider adding substances with lime slowly overtime, or baking soda to your plants.</div>"
      };
    }else{
      str += "<div>You're soil is very unhealthy. It is recommended to follow the following instructions and perhaps leave the field to recover using cover crops, slow supplemental provision over time, and constant monitoring ont he soil.</div>"
      if (land.nContent < 30){
        str +="<div>Recommended: It is recommended that you either plant legumes or cover plants like winter field beans or peas.</div>"
      };
      if (land.nContent > 50){
        str += "<div>It is recommended NOT to plant root plants. Next plants should include kale, pac, choi, or mustards.</div>"
      };
      if (land.pContent < 30){
        str += "<div>It is recommended that you add some organic compost in order to increase phosphorus Levels.</div>"
      };
      if (land.pContent > 50){
        str += "<div>The level of Phosphorus is too high! Avoid using organic compost and use low phosphorus products like bone meal. Add iron and zinc supplements to the plants directly. Be careful with the proportions as they are harmful to the environment.</div>"
      };
      if (land.kContent < 40){
        str += "<div> Potassium is a requirement for almost all plants. We recommend that you put potassium additives in the soil such as sulfate of potash or tomato feed.</div>"
      };
      if (land.kContent > 80){
        str += "<div> In a high potassium environment it is recommended that you plant comfrey, woody ash, guano and most commonly potatoes as they thrive in these environments.</div>"
      };
      if (land.pHLevel > 7){
        str += "<div>Having high pHLevel is very bad as a moderate pHLevel is essential. You should consider adding well decomposed compost instead of adding elemental sulfur, aluminum sulfate or sulfuric acid in order to naturally reduce it. This process is slower than artificial means however, but it results in a healthier environment overall.</div>"
      };
      if (land.pHLevel < 6){
        str += "<div>Having a low pHlevel is very bad as a moderate pHLevel is essential. Consider adding substances with lime slowly overtime, or baking soda to your plants.</div>"
      };
    };
  });

  str += "</ul>";
  document.getElementById("Lands Display").innerHTML = str;
};

function addInputBox(){
  var str = "<input type='text' name='pHLevel' id='pHLevel' placeholder='Input Name of Crop Here'></input><br><br>"
  str += "</input>"
  document.getElementById("Input Crop").innerHTML = str;
};
