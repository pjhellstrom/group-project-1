// API Request Variables

// My Credentials
var key = "99b6245eec9bab6137fdfb558edec22b"
var appId= "d2bc1ce9"


//Jonas' Credentials
// var key = "8429a3b88a2a31286dfa2da759edd0c2"
// var appId= "50377603"

var searchTerm;
// var queryURL = `https://api.edamam.com/search?
// q=${searchTerm}
// &app_id=${appId}
// &app_key=${key}`

// var queryURL = `https://api.edamam.com/search?q=${searchTerm}&app_id=${appId}&app_key=${key}`


    // &from=0&to=3&calories=591-722
    // &health=alcohol-free`;

//Global Variables
searchTerm = "pork loin";

var drillDown;

//Note: must construct URL just before ajax call
var queryURL = `https://api.edamam.com/search?q=${searchTerm}&app_id=${appId}&app_key=${key}`
console.log(queryURL);
// Call to edamam
$.ajax({
    url: queryURL,
    method: "GET"
})
.then(function(response) {
    console.log("Ajax Called")
    var results = response;
    // console.log(results)
    drillDown=results;
});

console.log(drillDown);

// let q = "";
// let maxResults = 6;
// let offset = 6;
// let cardCount = 0;
// let results = "";
// let listIngredients = "";

// let apiID = "50377603"
// let apiKEY = "8429a3b88a2a31286dfa2da759edd0c2"
// let queryURL = `https://api.edamam.com/search?q=&app_id=${apiID}&app_key=${apiKEY}`;

// $.ajax({
//     url: queryURL,
//     method: "GET"
//     }).then(function(response) {
//         //Set response.hits array to var results
//         results = response.hits;
//         console.log(response);
        
//     });