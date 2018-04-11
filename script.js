

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
  time = new Date(timeIn);
  var hours = time.getUTCHours();
  var day = time.getDay();
  //var mins = time.getUTCMinutes();
  //appending values to table view on webpage
  $("#table_body").append("<tr><td>" + fname + "</td><td>" + lname + "</td><td>" + dob + "</td><td>"
    + email + "</td><td>" + address + "</td><td>" + phoneNo + "</td><td>" + stopName + "</td><td>" + hours + "</td><td>" + day + "</td></tr>");

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

// var Calculations = function () {
//   firebase.database().ref().child("offenders").on("child_added", snap => {

//     //variables to add the db values to. 
//     var fname = snap.child("fname").val();
//     var lname = snap.child("lname").val();
//     var dob = snap.child("dateOfBirth").val();
//     var email = snap.child("email").val();
//     var address = snap.child("address").val();
//     var phoneNo = snap.child("phoneNo").val();
//     var stopName = snap.child("stopName").val();
//     var time = snap.child("time").val();

//   });

//   var count = 0;
//   var numOfRecords = Object.keys(snapshot.val());
// }



//GET Total Count
var countRef = dbRef.orderByChild("stopName").on("value", function (data) {
  var count = 0;
  data.forEach(function (data) {
    //document.getElementById("k").innerHTML = count;
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
      document.getElementById("k").innerHTML = Math.round(percentageOfStops) + "%";
    }

  });
}
/*
function CalcAge() {
  var stopRef = dbRef.orderByChild("dateOfBirth").on("value", function (data) {

    data.forEach(function (data) {


    });
  });

}

function getAllStopPercentage() {
  var counterArray = [
    ['Stop Name', 'Percentage'],
    ['Kylemore', 2],
    ['Jervis', 4],
    ['Museum', 6],
    ['Red Cow', 2],
    ['Drimnagh', 2],
    ['Georges Dock', 1]
  ];
  var totalPercentRef = dbRef.orderByChild("stopName").on("value", function (data) {

    data.forEach(function (data) {

      if (totalPercentRef.equalTo("Kylemore")) {
        counterArray[1][1] += 1;
      }
      else if (totalPercentRef.equalTo("Jervis")) {
        counterArray[2][1] += 1;
      }
      else if (totalPercentRef.equalTo("Museum")) {
        counterArray[3][1] += 1;
      }
      else if (totalPercentRef.equalTo("Red Cow")) {
        counterArray[4][1] += 1;
      }
      else if (totalPercentRef.equalTo("Drimnagh")) {
        counterArray[5][1] += 1;
      }
      else if (totalPercentRef.equalTo("Georges Dock")) {
        counterArray[6][1] += 1;
      }
    });

  });
  // drawChart(counterArray);
}

//select stop dropdown start.
//working counter of stops**************

function stopFinder(stopName) {
  var count = 1;

  var stopRef = dbRef.orderByChild("stopName").equalTo(stopName).on("value", function (data) {

    data.forEach(function (data) {
      count++;
    });

  });
}
*/
//select stop dropdown end.


//***********NEED function to search by most common times/days************
// function mostCommonDay() {
//   var dayRef = dbRef.orderByChild("time").on("value", function (data) {

//   });


// }




/*
***********NEED function to search by most common ages************Done
*/


function graphData()
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

    data.forEach(function (data) {

      if(data.child("stopName").val() =="Kylemore"){
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

graphData();

google.charts.load('current', {'packages':['corechart']});
//google.charts.load('current', {'packages':['corechart']});

      var drawChart = function(withData) {
        
        var data = google.visualization.arrayToDataTable(withData);

        var options = {
          title: 'Offences Per Stop',
          hAxis: {title: 'Number of Offences',  titleTextStyle: {color: '#333'}},
          vAxis: {minValue: 0}
        };

        var chart = new google.visualization.BarChart(document.getElementById('stopChart'));
        chart.draw(data, options);
      }
      

     