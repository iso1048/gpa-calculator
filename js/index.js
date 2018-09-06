$(document).ready(function() {
  
  var years = [
    ["First Year", "Second Year", "Third Year", "Fourth Year", "Fifth Year"],//index 0, div titles
    ["add-btn1", "add-btn2", "add-btn3", "add-btn4", "add-btn5"],//index 1, add-btn id
    ["year1-div", "year2-div","year3-div","year4-div","year5-div"]//index 2, id for div
  ];
  var noOfDivsToAdd;
  var idOfParentDiv;
  var inputGrade;
  var inputGradeGPA;
  var inputCredit;
  var thisCreditsLeft;
  var gradesObj = {}; 
  var creditsObj = {};
  var multipliedObj = {};
  var addedArr = [];
  var gpa;
  var weighting = [
    [[], 0.5, 1, 1.5],
    [[], 0.5, 0.8, 1.2, 1.5],
    [[], 0.5, 0.75, 1, 1.25, 1.5]
  ];
  
  //////////////////////////////
  /// DURATION OF DEGREE BTN ///
  //////////////////////////////
  $('.year-btn').on('click', function(){
    noOfDivsToAdd = parseInt($(this).html().substring(0,1));//determine number of segments to add
    //console.log(noOfDivsToAdd);
    $("#contain-noOfDivs").hide().html("");
    $('#your-gpa-div').html("").hide();
    for (var i = 0; i < noOfDivsToAdd; i++){
    $("#contain-noOfDivs").append(//html for segments
      `<div id=`+ years[2][i] +`>
      <h4>`+ years[0][i] +`</h4>
      <form><table class="table">
        <tbody>
          <tr class="top-row">
            <td class="t-data">Credit Value</td>
            <td class="t-data">Grade</td>
            <td class="t-data"></td>
          </tr>
          <tr class="insert-above-this-row">
            <td>
              <input type="text" name="credit-value" required class="input-credit" placeholder=120> 
            </td>
            <td class="t-data">
              <select name="grade" class="input-grade" required>
                <option class="dropdown-list" value="grade">Grade</option>
                <option class="dropdown-list" value="9">A+</option>
                <option class="dropdown-list" value="8">A</option>
                <option class="dropdown-list" value="7">A-</option>
                <option class="dropdown-list" value="6">B+</option>
                <option class="dropdown-list" value="5">B</option>
                <option class="dropdown-list" value="4">B-</option>
                <option class="dropdown-list" value="3">C+</option>
                <option class="dropdown-list" value="2">C</option>
                <option class="dropdown-list" value="1">C-</option>
              </select>
            </td>
            <td class="t-data">
              <input class="add-btn" type="submit" value="Add" id=`+years[1][i]+`>
            </td>
          </tr>
        </tbody>
        </table></form>
    </div>`
    );//append noOfDivsToAdd
      //store creditsLeft in <div id=years[2][i]>; initialise at 120
      $("#"+years[2][i]).data("creditsLeft",120);
    }//for loop
    $("#contain-noOfDivs").append(//html for adding god buttons after for loop has executed(reset and calcualte gpa)
      `<div id="god-btns-div">
      <button id="reset-btn" class="god-btn">Reset</button>
      <button id="calc-btn" class="god-btn">Calculate GPA</button>
    </div>`
    );//append god-btns
    $("#contain-noOfDivs").show("blind", 1200);   
    //set thisCreditsLeft to 
    
  });//year-btn click
  
  /////////////////
  /// RESET BTN ///
  /////////////////
  $('#contain-noOfDivs').on('click', '#reset-btn', function(){
    document.querySelector('body').scrollIntoView();
    $('#contain-noOfDivs').html("").hide();
    $('#your-gpa-div').html("").hide();
  });//reset-btn
  
  ///////////////
  /// ADD BTN ///
  ///////////////
  $('#contain-noOfDivs').on('click', '.add-btn', function(event){
    event.preventDefault();//stops page reload
    $('#your-gpa-div').html("").hide();
    $('#error-p').remove();//remove any error paragraph if it is present
    //assign id of the div in which the add-btn was clicked
    idOfParentDiv = $(this).parent().parent().parent().parent().parent().parent().attr('id');
    //assign credit value of input paper
    inputCredit = $("#"+idOfParentDiv+ " .input-credit").val();
    //assign letter grade of input paper
    inputGrade = $('#'+idOfParentDiv+' .input-grade :selected').text();
    console.log(inputCredit, inputGrade);
    inputGradeGPA = $('#'+idOfParentDiv+' .input-grade :selected').val();
    //call function to push data to array?? or do it when calculate btn is clicked?
    
    //call function to add information to row
    addInfoToRow(inputCredit, inputGrade, inputGradeGPA);
    
  });//add btn
      
  ////////////////
  /// FUNCTION ///
  ////////////////
  function addInfoToRow(credit, grade, gradeGPA){
    thisCreditsLeft = $("#"+idOfParentDiv).data("creditsLeft");
    //console.log(thisCreditsLeft);
    if (grade == "Grade" ||  isNaN(credit) || credit <= 0) {//ERROR
      $('#'+idOfParentDiv+ " form").append(
        `<p id="error-p">
          Error: ensure credit value has been input correctly and grade has been selected
        </p>`
      );
    }//ERROR if
    
    else if (credit <= thisCreditsLeft && thisCreditsLeft >0){//add row and other stuff
      thisCreditsLeft-=credit;
      $("#"+idOfParentDiv).data("creditsLeft", thisCreditsLeft);
      //insert row
      $("#"+idOfParentDiv+" .insert-above-this-row").before(
        `<tr class='added-paper'>
           <td class="t-data new-credit">` + credit +`</td>
           <td class="t-data new-grade">` + grade + `</td>
           <td class="t-data new-gradeGPA">` + gradeGPA + `</td>
           <td class='delete-btn t-data'>delete</td>
        </tr>`
      );//.insert before
      //make placeholder of input-credit field creditsLeft
      $("#"+idOfParentDiv+" .input-credit").val("").attr("placeholder", thisCreditsLeft);  
    }// else if add row
  };//function addInfoToRow
  
  //////////////////////
  /// DELETE ROW BTN ///
  //////////////////////
  $('#contain-noOfDivs').on('click', '.delete-btn', function(){
    // add the credits values from the removed row to creditsLeft
    var addToThisCreditsLeft = this.parentNode.querySelector(".new-credit").textContent;
     //console.log(addToThisCreditsLeft);
    thisCreditsLeft+=parseInt(addToThisCreditsLeft);
    //update value of thisCreditsLeft in the data stored in parent div
    $("#"+idOfParentDiv).data("creditsLeft", thisCreditsLeft);
    $("#"+idOfParentDiv+" .input-grade").val("grade");
    $("#"+idOfParentDiv+" .input-credit").prop('required',true);
    $("#"+idOfParentDiv+" .input-credit").attr("placeholder", thisCreditsLeft);
    $(this).parent().remove();
  });//delete-btn click*/
  
  /////////////////////////
  /// CALCULATE GPA BTN ///
  /////////////////////////
  $('#contain-noOfDivs').on('click', '#calc-btn', function(){
    var total = 0;
    $.each($(".table .input-credit"), function(index, element){
      total+=parseInt($(element).attr("placeholder"));
    });
    console.log(total);
    if (total > 0){
      //ERROR
      $('#your-gpa-div').html(
      `<p id="your-gpa-p">Error: ensure all years have a total of 120 credits input</p>`
      ).show("blind", 600);
    }
    else if (total == 0){
      createObjects();
      multiplicationCalculations();
      additionCalculations();
      divisionCalculations();
      displayGPA();
    }
  });//calc-btn click
 
  //////////////////////////////////
  /// FUNCTIONS FOR CALCULATIONS ///
  //////////////////////////////////
  function createObjects(){
    gradesObj = {};
    creditsObj = {};
    for (var j = 1; j<=noOfDivsToAdd; j ++){
      j = (j).toString();
      gradesObj["year"+j] = [];
      creditsObj["year"+j] = [];
      //put grade-values in object
      $.each($('#year'+j+'-div .new-gradeGPA'), function(index, element){
        //console.log(index, element);
        gradesObj["year"+j].push(element.textContent); 
      });//gradesObj   
      //put credit values in object
      $.each($('#year'+j+'-div .new-credit'), function(index, element){
        //console.log(index, element);
        creditsObj["year"+j].push(element.textContent); 
      });//creditsObj
        j = parseInt(j);
    }// for loop j
    console.log(creditsObj);
    console.log(gradesObj);
  };//function createObjects
  
  function multiplicationCalculations(){
    multipliedObj = {};
    for (var k = 1; k<=noOfDivsToAdd; k++){
      k = (k).toString();
      multipliedObj["year"+k] = [];
      for (var l = 0; l<gradesObj["year"+k].length; l++){  
        var holder = gradesObj["year"+k][l]*creditsObj["year"+k][l]*weighting[noOfDivsToAdd-3][k];
        multipliedObj["year"+k].push(holder); 
      }//for-loop l       
      k = parseInt(k);  
    }//for-loop k
    console.log(multipliedObj);
  };//function multiplicationCalculations
  
  function additionCalculations(){
    addedArr= [];
    for (var m = 1; m<=noOfDivsToAdd; m++){
      var sum = multipliedObj["year"+m].reduce(function(accumulate, current){
        return accumulate + current; 
      });//first reduce function
      addedArr.push(sum);
    }//for-loop m
    addedArr = addedArr.reduce(function(a,c){
      return a+c;
    });//second reduce function
    console.log(addedArr);
  };//function additionCalculations
  
  function divisionCalculations(){
    gpa = addedArr/noOfDivsToAdd;
    gpa/=120;
    console.log(gpa);
  };//function divisionCalculations
  
  function displayGPA(){
    $('#your-gpa-div').html(
    `<p id="your-gpa-p">Your GPA: `+gpa+`</p>`
    ).show("blind", 600);
  };//function displayGPA
  
}); //document