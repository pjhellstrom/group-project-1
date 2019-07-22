//Init variables
let q = "";
let maxResults = 6;
let offset = 6;
let cardCount = 0;
let results = "";
let listIngredients = "";

let apiID = "50377603"
let apiKEY = "8429a3b88a2a31286dfa2da759edd0c2"
let queryURL = `https://api.edamam.com/search?q=&app_id=${apiID}&app_key=${apiKEY}`;


//Listeners
$(document).ready( function() {

// On welcome screen ------------------------------------------------------------

    //populate intro cards

    // Click listener for search button
    $("#searchBtn").on("click", function() {
        //Reject if search bar is empty
        if ($("#inputBar").val()=="") {
            return;
        }
        //Set q to input term and update queryURL
        q = $("#inputBar").val();
        queryURL = `https://api.edamam.com/search?q=${q}&app_id=${apiID}&app_key=${apiKEY}`;
        //API call
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                debugger;
                //Set response.hits array to var results
                results = response.hits;
                //Make cards for each hit in response
                for (var i = 0; i < results.length; i++) {
                populateCard(i);
                }
        });

        //set variables from API response

        //DOM manipulation - populate search results container and wrapper with cards

    });

// On results screen ------------------------------------------------------------

    //Click listener for result-cards
    $(".recipe-card").on("click", function() {
        //Maximize card (show details loaded in background) get card ID
        var cardSelection = $(this).attr("id")

        //Populate maximized card with API

        //Click listener to close card when X button is clicked
        $("#closeBtn").on("click", function() {
            //Minimize card

        });
        //Click listener to close expanded card when clicking outside of card
        $(document).mouseup(function(e) 
        {
            var container = $("CONTAINER SELECTOR");

            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) 
            {
                container.hide();
        }
        });
    });

    //Click listener for search button

    //Click listener for show me more button (additional search with offset)
    $("#show-more").on("click", function() {
        //API call with offset
        
        //set variables from API response
        
        //DOM manipulation - populate search results container and wrapper with cards
        for (var i = 0; i < results.length; i++) {
            // debugger;
            populateCard(i);
        };
    });

//Creates cards from API reponse (incl. offset)
function populateCard(i) {
    //Creates results mini cards
    //Return list of 3 top ingredients
    listIngredients(i, 3);
    //Append card to DOM
    $("#card-wrapper").append(`
    <div class="result-card" id="card-${i}">
        <img src=${results[i].recipe.image}>
        <span>${results[i].recipe.label}</span>
        <ul>
            ${ingredients}
        </ul>
    </div>
    `);
    //Creates full cards (hidden by default and expanded to show on click)
    //Return list of all ingredients
    listIngredients(i, results[i].recipe.ingredients.length);
    listNutrition(i, results[i].recipe.digest.length);
    //Append card to DOM
    $("#card-wrapper").append(`
    <div class="full-card" id="full-card-${i}">
        <img src=${results[i].recipe.image}>
        <span>${results[i].recipe.label} (${Math.round(results[i].recipe.calories)} cal)</span>
        <ul>
            ${ingredients}
        </ul>
        <ul>
            ${nutrition}
        </ul>
    </div>
    `);    
};    

function listIngredients(i, size) {
    ingredients = "";
    for (var j = 0; j < size; j++) {
        ingredients += (`
        <li>${results[i].recipe.ingredients[j].text}</li>
        `);
    };
    return ingredients;
};

function listNutrition(i, size) {
    nutrition = "";
    for (var j = 0; j < size; j++) {
        nutrition += (`
        <li>${results[i].recipe.digest[j].label}: 
        ${Math.round(results[i].recipe.digest[j].total)}g
         (${Math.round(results[i].recipe.digest[j].daily)}% of daily)
        </li>
        `);
    };
    return nutrition;
};

});//end $(document)ready()