//Init variables
let q = "chicken";
let maxResults = 6;
let offset = 6;
let cardCount = 0;
let results = "";

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
                //Set response.hits array a var results
                results = response.hits;
                debugger;
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
        populateCard();

    });

//Populates Card with API reponse (incl. offset)
function populateCard(i) {
    var j =0;
    listTopIngredients(i,j);
    // debugger;
    $("#card-wrapper").append(`
    <div class="result-card" id="card-${i}">
        <img src=${results[i].recipe.image}>
        <span>${results[i].recipe.label}</span>
        <ul>
            ${shortListIngredients}
        </ul>
    </div>
`)};    

function listTopIngredients(i,j) {
    var shortListIngredients = "";
    for (var j = 0; j < 3; j++){
        $(shortListIngredients).append(`<li>${results[i].recipe.ingredients[j].text}</li>`);
    };
    return shortListIngredients;
};

});//end $(document)ready()