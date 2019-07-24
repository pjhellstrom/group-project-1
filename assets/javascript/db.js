  
// Initialize variables
let userKeys = [];
let newUser = {
   username: "",
   preferences: {
      vegan: 0,
      vegetarian: 0,
      peanutfree: 0,
      treenutfree: 0,
      alcoholfree: 0
   }
};
let currentUser = {};

// Web app's Firebase configuration
let firebaseConfig = {
    apiKey: "AIzaSyCnpj9YXANrIam0U34KQaH1YeFH8AS0pZM",
    authDomain: "bejm-c377a.firebaseapp.com",
    databaseURL: "https://bejm-c377a.firebaseio.com",
    projectId: "bejm-c377a",
    storageBucket: "bejm-c377a.appspot.com",
    messagingSenderId: "77408449299",
    appId: "1:77408449299:web:b141c3ee72fd3949"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let db = firebase.database();

$(document).ready( function() {
 // On add-user button click - show sign-up window
 $("#addUserBtn").on("click", function() {
    $("#signUpWrapper").show();
 });

 // On create user button click - create user in FB
 $("#createUserBtn").on("click", function() {
   var username = $("#usernameInput").val();
    // Push entry to FB and save Google-generated rand-key
   var createNewUser = db.ref().push(newUser);
    var newUserKey = createNewUser.key;
    // Store username under new user
    db.ref(`/${newUserKey}/username`).set(username);
 });

 // On sign-in button click - show sign-in window
 $("#signInBtn").on("click", function() {
   $("#signInWrapper").show();
});

 // On sign-in button confirm click - load user in DOM
 $("#signInConfirmBtn").on("click", function() {
   var username = $("#signInInput").val();
    // Find entry on FB and return profile
    db.ref().on("value", function(snap) {
      //Loop through keys and look for username
      snap.forEach(function(snap1) {
         debugger;
         //If username matches, save profile and to currentUser object
         if (snap1.val().username === username) {
            currentUser = snap1.val();
         };
         console.log(snap1.val().username);
      })
    })//end snapshot
});

// On sign-out reset currentUser object
$("#signOutBtn").on("click", function() {
   currentUser = {};
});




});//end document ready