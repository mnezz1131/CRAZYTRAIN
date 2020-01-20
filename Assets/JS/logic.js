// A $( document ).ready() block.
$(document).ready(function () {
    console.log("ready!");
});
console.log("linked");


//My web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAoVVGlGuD8Ycua0tI7gmV0qsWjV9c8t3U",
    authDomain: "crazy-trains.firebaseapp.com",
    databaseURL: "https://crazy-trains.firebaseio.com",
    projectId: "crazy-trains",
    storageBucket: "crazy-trains.appspot.com",
    messagingSenderId: "251042315805",
    appId: "1:251042315805:web:0f7a32a6a9188f84db50f4"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//Capture the use inputting the information
$("#add-train-btn").on("click", function(event) {
    event.preventDefault();
    // Grabs user input
    var trainName = $("#name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = moment($("#time-input").val().trim(), "MM/DD/YYYY").format("X");
    var trainFreq = $("#frequency-input").val().trim();
    // Creates local "temporary" object for holding train data
    var newTrains = {
      name: trainName,
      dest: trainDest,
      time: trainTime,
      freq: trainFreq
    };
    // Uploads employee data to the database
   firebase.database().ref().push(newTrains);
    // Logs everything to console
    console.log(newTrains.name);
    console.log(newTrains.dest);
    console.log(newTrains.time);
    console.log(newTrains.freq);
    alert("Train successfully added");
    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
  });

  firebase.database().ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;
    
    // Employee Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);
    // Prettify the employee start
   // var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");
    // Calculate the months worked using hardcore math
    // To calculate the months worked
   // var empMonths = moment().diff(moment(empStart, "X"), "months");
   // console.log(empMonths);
    // Calculate the total billed rate
   // var empBilled = empMonths * empRate;
   // console.log(empBilled);
    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainTime),
      $("<td>").text(trainFreq),
     // $("<td>").text(empRate),
     // $("<td>").text(empBilled)
    );
    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
  });