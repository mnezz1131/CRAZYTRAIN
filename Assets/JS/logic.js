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
    var trainFreq = $("#frequency-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    // Creates local "temporary" object for holding train data
    var newTrains = {
      name: trainName,
      dest: trainDest,
      time: trainTime,
      freq: trainFreq,
      added: firebase.database.ServerValue.TIMESTAMP,  
    };
    // Uploads employee data to the database
   firebase.database().ref().push(newTrains);
    // Logs everything to console
    console.log(newTrains.name);
    console.log(newTrains.dest);
    console.log(newTrains.time);
    console.log(newTrains.freq);
    console.log(newTrains.added);
    console.log(newTrains.next);
    console.log(newTrains.away);
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
    var trainFreq = childSnapshot.val().freq;
    var trainNext = childSnapshot.val().next;
    var trainAway = childSnapshot.val().away;
    var trainTime = childSnapshot.val().time;
  
   
   
    
    // Train Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);
    console.log(trainNext);
    console.log(trainAway);

    var currentDate =moment();
    var currentDate1 =moment().format("H:mm");
    var currentDate3 = moment().format("h:mmA");
    var currentDate2 =moment().unix();  
      console.log(currentDate);
      console.log(currentDate1);
      console.log(currentDate2);
      console.log(currentDate3);
      console.log(`Original Moment: ${currentDate.toString()}`);
      currentDate.add(20, "minutes");
      console.log(`AFter Manipulaton: ${currentDate.toString()}`);
   
      // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log("First Time Converted Is: "+firstTimeConverted);
   // Current Time
   var currentTime = moment();
   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

   // Difference between the times
   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   console.log("DIFFERENCE IN TIME: " + diffTime);
    // Time apart (remainder)
    var tRemainder = diffTime % trainFreq;
    console.log(tRemainder);

    // Minute Until Train
    var trainAway = trainFreq - tRemainder;
    console.log("MINUTES TILL TRAIN: " + trainAway);

    // Next Train
    var trainNext = moment().add(trainAway, "minutes");
    console.log("ARRIVAL TIME: " + moment(trainNext).format("hh:mm"));
   

   
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDest),
      $("<td>").text(trainFreq),    
      $("<td>").text(trainNext),
      $("<td>").text(trainAway),
    
    );
    // Append the new row to the table
    $("#myTable > tbody").append(newRow);
  });