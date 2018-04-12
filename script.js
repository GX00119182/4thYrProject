/* 
*Name: Gavin O'Keeffe
*X-Number: X00119182.
 */
var totalNumber = 0; //total number of records in db
var tempStopCount = 0;

var dbRef = firebase.database().ref().child("offenders"); //get reference to Firebase db table offenders
dbRef.on("child_added", snap => {

  //variables to add the db values to. 
  var fname = snap.child("fname").val();
  var lname = snap.child("lname").val();
  var dob = snap.child("dateOfBirth").val();
  var email = snap.child("email").val();
  var address = snap.child("address").val();
  var phoneNo = snap.child("phoneNo").val();
  var stopName = snap.child("stopName").val();
  var timeIn = snap.child("time").val();

  //Start altering timestamp to output day of week
  time = new Date(timeIn);
  var hours = time.getUTCHours();
  var day = time.getDay();
  var stringDay = " ";
  if(day == 0){ //Convert Day number to String
    stringDay ="Sunday";
  }
  else if(day == 1){
    stringDay ="Monday";
  }
  else if(day == 2){
    stringDay ="Tuesday";
  }
  else if(day == 3){
    stringDay ="Wednesday";
  }
  else if(day == 4){
    stringDay ="Thursday";
  }
  else if(day == 5){
    stringDay ="Friday";
  }
  else if(day == 6){
    stringDay ="Saturday";
  }
  //appending values to table view on webpage
  $("#table_body").append("<tr><td>" + fname + "</td><td>" + lname + "</td><td>" + dob + "</td><td>"
    + email + "</td><td>" + address + "</td><td>" + phoneNo + "</td><td>" 
    + stopName + "</td><td>" + hours + "</td><td>" + stringDay + "</td></tr>");

});




//Search key word start
/*
* Usage: edited
* URL: https://www.w3schools.com/jquery/jquery_filters.asp
* Title: Filtering tables using JQuery
* Author: W3Schools
*/
$(document).ready(function () {
  $("#Input").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#table_body tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
}); //search key word end

//GET Total Count
var countRef = dbRef.orderByChild("stopName").on("value", function (data) {
  var count = 0;
  data.forEach(function (data) {
    totalNumber = count++;
  });
});

//Get Percentage
function CalcPercentagePerStop() {
  var StopIn = document.getElementById("myInput").value;
  var counter1 = 0;
  var percentageOfStops = 0;
  var percentageRef = dbRef.orderByChild("stopName").equalTo(StopIn).on("value", function (data) {

    data.forEach(function (data) {
      counter1++;

    });

    var percentageOfStops = counter1 / totalNumber * 100; // algorithm for percentages of each stop
    if (percentageOfStops == 0) {
      document.getElementById("k").style.color = "red";
      document.getElementById("k").innerHTML = "Please select another stop";
    }
    else {
      document.getElementById("k").style.color = "black";
      document.getElementById("k").innerHTML = "Percentage Of Offenders: "+ Math.round(percentageOfStops) + "%";
    }

  });
}


//select stop dropdown start.
//working counter of stops**************

function stopFinder() {
  var stopIn = document.getElementById("select").val();
  if(stopIn == "All"){
    return;
  }
  else{
    var stopRef = dbRef.orderByChild("stopName").equalTo(stopIn).on("value", function (data) {

      data.forEach(function (data) {
        if(data.child("stopIn").val() =="Kylemore")
        { //if stop value = Kylemore
          $("#table_body").append("<tr><td>" + fname + "</td><td>" + lname + "</td><td>" + dob + "</td><td>"
          + email + "</td><td>" + address + "</td><td>" + phoneNo + "</td><td>" 
          + stopName + "</td><td>" + hours + "</td><td>" + stringDay + "</td></tr>");
        }
        else if(data.child("stopIn").val() == "Jervis")
        {
          $("#table_body").append("<tr><td>" + fname + "</td><td>" + lname + "</td><td>" + dob + "</td><td>"
          + email + "</td><td>" + address + "</td><td>" + phoneNo + "</td><td>" 
          + stopName + "</td><td>" + hours + "</td><td>" + stringDay + "</td></tr>");
        }
        else if(data.child("stopIn").val() =="Georges Dock")
        {
          $("#table_body").append("<tr><td>" + fname + "</td><td>" + lname + "</td><td>" + dob + "</td><td>"
          + email + "</td><td>" + address + "</td><td>" + phoneNo + "</td><td>" 
          + stopName + "</td><td>" + hours + "</td><td>" + stringDay + "</td></tr>");
        }
        else if(data.child("stopIn").val() =="Red Cow")
        {
          $("#table_body").append("<tr><td>" + fname + "</td><td>" + lname + "</td><td>" + dob + "</td><td>"
          + email + "</td><td>" + address + "</td><td>" + phoneNo + "</td><td>" 
          + stopName + "</td><td>" + hours + "</td><td>" + stringDay + "</td></tr>");
        }
        else if(data.child("stopIn").val() =="Museum")
        {
          $("#table_body").append("<tr><td>" + fname + "</td><td>" + lname + "</td><td>" + dob + "</td><td>"
    + email + "</td><td>" + address + "</td><td>" + phoneNo + "</td><td>" 
    + stopName + "</td><td>" + hours + "</td><td>" + stringDay + "</td></tr>");
        }
       else if(data.child("stopIn").val() =="Drimnagh")
       {
        $("#table_body").append("<tr><td>" + fname + "</td><td>" + lname + "</td><td>" + dob + "</td><td>"
        + email + "</td><td>" + address + "</td><td>" + phoneNo + "</td><td>" 
        + stopName + "</td><td>" + hours + "</td><td>" + stringDay + "</td></tr>");
        }
      });
  
    });
  }
 
}
//select stop dropdown end.

function graphDataStops() //Prepare Data to calc graph for count of offenders at each stop
{
  var counterArray = [
    ["Stop", "Count"],
    ["Kylemore", 0],
    ["Jervis", 0],
    ["Georges Dock", 0],
    ["Red Cow", 0],
    ["Museum", 0],
    ["Drimnagh", 0]
  ];
 
  var graphRef = dbRef.orderByChild("stopName").on("value", function (data) {

    data.forEach(function (data) { //for each data value

      if(data.child("stopName").val() =="Kylemore"){ //if stop value = Kylemore
        counterArray[1][1] += 1;
      }
      else if(data.child("stopName").val() == "Jervis"){
        counterArray[2][1] += 1;
      }
      else if(data.child("stopName").val() =="Georges Dock"){
        counterArray[3][1] += 1;
      }
      else if(data.child("stopName").val() =="Red Cow"){
        counterArray[4][1] += 1;
      }
      else if(data.child("stopName").val() =="Museum"){
        counterArray[5][1] += 1;
      }
     else if(data.child("stopName").val() =="Drimnagh"){
        counterArray[6][1] += 1;
      }
    
    });
    drawChart(counterArray);
  });
  
}

graphDataStops();// call the graphData method to be prep data to be used by drawChart()

google.charts.load('current', {'packages':['corechart']});

      var drawChart = function(withData) {
        
        var data = google.visualization.arrayToDataTable(withData);//turn the data into a data table

        var options = {
          title: 'Offences Per Stop',
          hAxis: {title: 'Number of Offences',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0}
        };

        var chart = new google.visualization.BarChart(document.getElementById('stopChart'));
        chart.draw(data, options);
      }
      
      function graphDataDays()
      {
        /* var timeIn = snap.child("time").val();
            time = new Date(timeIn);
            var hours = time.getUTCHours();
            var day = time.getDay();*/
        var dayCounterArray = [
          ["Day", "Count"],
          ["Monday", 0],
          ["Tuesday", 0],
          ["Wednesday", 0],
          ["Thursday", 0],
          ["Friday", 0],
          ["Saturday", 0],
          ["Sunday", 0]
        ];
       
        var graphRef = dbRef.orderByChild("time").on("value", function (data) {
      
          data.forEach(function (data) { //for each data value
             var timeIn = data.child("time").val();
            time = new Date(timeIn);
            var hours = time.getUTCHours();
            var day = time.getDay();
            if(day == 1){
              dayCounterArray[1][1] += 1;
            }
            else if(day == 2){
              dayCounterArray[2][1] += 1;
            }
            else if(day == 3){
              dayCounterArray[3][1] += 1;
            }
            else if(day == 4){
              dayCounterArray[4][1] += 1;
            }
            else if(day == 5){
              dayCounterArray[5][1] += 1;
            }
            else if(day == 6){
              dayCounterArray[6][1] += 1;
            }
            else if(day == 0){ //Convert Day number to String
              dayCounterArray[7][1] += 1;
            }
          
          });
          drawChart2(dayCounterArray);
        });
        
      }
      graphDataDays();

      var drawChart2 = function(withData) {
        
        var data = google.visualization.arrayToDataTable(withData);//turn the data into a data table

        var options = {
          title: 'Most Common Days Offended On',
          colors: ['#522398'],
          hAxis: {title: 'Number of Offences',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0}
        };

        var chart = new google.visualization.BarChart(document.getElementById('stopChart2'));
        chart.draw(data, options);
      }

      //Calc Most Common Times 
function MostCommonTime()
{
  var hourCounterArray = [
    ["Time", "Count"],
    ["5am", 0],
    ["6am", 0],
    ["7am", 0],
    ["8am", 0],
    ["9am", 0],
    ["10am", 0],
    ["11am", 0],
    ["12pm", 0],
    ["1pm", 0],
    ["2pm", 0],
    ["3pm", 0],
    ["4pm", 0],
    ["5pm", 0],
    ["6pm", 0],
    ["7pm", 0],
    ["8pm", 0],
    ["9pm", 0],
    ["10pm", 0],
    ["11pm", 0],
    ["12am", 0],
    ["1am", 0]
  ];
 
  var graphRef = dbRef.orderByChild("time").on("value", function (data) {

    data.forEach(function (data) { //for each data value

       var timeIn = data.child("time").val();
      time = new Date(timeIn);
      var hours = time.getUTCHours();
       if(hours == 5){
        hourCounterArray[1][1] += 1;
      }
      else if(hours == 6){
        hourCounterArray[2][1] += 1;
      }
      else if(hours == 7){
        hourCounterArray[3][1] += 1;
      }
      else if(hours == 8){ 
        hourCounterArray[4][1] += 1;
      }
      else if(hours == 9){
        hourCounterArray[5][1] += 1;
      }
      else if(hours == 10){
        hourCounterArray[6][1] += 1;
      }
      else if(hours == 11){
        hourCounterArray[7][1] += 1;
      }
      else if(hours == 12){
        hourCounterArray[8][1] += 1;
      }
      else if(hours == 13){
        hourCounterArray[9][1] += 1;
      }
    else if(hours == 14){ 
      hourCounterArray[10][1] += 1;
    }
    else if(hours == 15){
      hourCounterArray[11][1] += 1;
    }
    else if(hours == 16){
      hourCounterArray[12][1] += 1;
    }
    else if(hours == 17){
      hourCounterArray[13][1] += 1;
    }
    else if(hours == 18){
      hourCounterArray[14][1] += 1;
    }
    else if(hours == 19){ 
      hourCounterArray[15][1] += 1;
    }
    else if(hours == 20){
      hourCounterArray[16][1] += 1;
    }
    else if(hours == 21){
      hourCounterArray[17][1] += 1;
    }
    else if(hours == 22){
      hourCounterArray[18][1] += 1;
    }
    else if(hours == 23){
      hourCounterArray[19][1] += 1;
    }
    else if(hours == 0){
      hourCounterArray[20][1] += 1;
    }
    else if(hours == 1){
      hourCounterArray[21][1] += 1;
    }
    });
   drawChart3(hourCounterArray);
  });
  
}
MostCommonTime();

var drawChart3 = function(withData) { //Most Common Times 
        
  var data = google.visualization.arrayToDataTable(withData);//turn the data into a data table

  var options = {
    title: 'Most Common Times of Day Offended At',
    colors: ['green'],
    hAxis: {title: 'Number of Offences',  titleTextStyle: {color: '#333'}},
    vAxis: {minValue: 0}
  };

  var chart = new google.visualization.LineChart(document.getElementById('stopChart3'));
  chart.draw(data, options);
}

//FindMeanAgeRange
function CalcAgeRangeCount(){
  var counterArray = [
    ["Age Range", "Count"],
    ["0 to 10", 0],
    ["10 to 20", 0],
    ["20 to 30", 0],
    ["30 to 40", 0],
    ["40 to 50", 0],
    ["50 to 65", 0]
  ];
  var ageRef = dbRef.orderByChild("dateOfBirth").on("value", function (data) {

    data.forEach(function (data) {
      var dobIn = data.child("dateOfBirth").val();
      var result = dobIn.split("/");
      dob = result[1] + '-' + result[0] + '-' + result[2];
      
      var today = new Date();
      var birthDate = new Date(dob);
      var age = today.getFullYear() - birthDate.getFullYear();
    
       if(age <= 10){
        counterArray[1][1] +=1;
      }
      else if(age > 10 && age <= 20){
        counterArray[2][1] +=1;
      }
      else if(age > 20 && age <= 30){
        counterArray[3][1] +=1;
      }
      else if(age > 30 && age <=40){
        counterArray[4][1] +=1;
      }
      else if(age > 40 && age <=50){
        counterArray[5][1] +=1;
      }
      else if(age > 50 && age <= 65){
        counterArray[6][1] +=1;
      }
    });
      drawChart4(counterArray);
  });
 
}
CalcAgeRangeCount();

var drawChart4 = function(withData) { //Most Common Times 
        
  var data = google.visualization.arrayToDataTable(withData);//turn the data into a data table

  var options = {
    title: 'Most Common Age Range of Offenders',
    colors: ['green', 'blue','red','yellow','orange','purple'],
    hAxis: {title: 'Number of Offences',  titleTextStyle: {color: '#333'}},
    vAxis: {minValue: 0}
  };

  var chart = new google.visualization.PieChart(document.getElementById('gridItem2'));
  chart.draw(data, options);
}