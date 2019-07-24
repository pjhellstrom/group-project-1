// group-project-1 API Call and saving to local storage

var searchTerm = "fozzie";
var key = "BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10"
var queryURL = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${key}`;
var ajaxCallCount=0;
var ajaxCallCounter;
ajaxCallCount = localStorage.getItem(ajaxCallCounter)


if (`ajaxCall${searchTerm}` == undefined){
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response) {
        console.log("Ajax Called")
        ajaxCallCount++;
        localStorage.setItem(ajaxCallCounter, ajaxCallCount);
        var results = response;
        console.log(results)

        localStorage.setItem(`ajaxCall${searchTerm}`, JSON.stringify(results));
    });
}

var localData = JSON.parse(localStorage.getItem(`ajaxCall${searchTerm}`));

console.log(ajaxCallCount);
console.log(localData);


// This may be a waste of time that we don't have, moving on.
