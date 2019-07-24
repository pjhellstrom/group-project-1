//Init variables
let q = "";
let maxResults = 6;
let offset = 6;
let cardCount = 0;
let results = "";
let listIngredients = "";
let cardSelection = "";

let apiID = "50377603"
let apiKEY = "8429a3b88a2a31286dfa2da759edd0c2"
let queryURL = `https://api.edamam.com/search?q=&app_id=${apiID}&app_key=${apiKEY}`;


//Listeners
$(document).ready( function() {

// On welcome screen ------------------------------------------------------------

//-----------------------------------------





    //populate intro cards

    // Click listener for search button
    $("#searchBtn").on("click", function() {


        //Reject if search bar is empty
        if ($("#inputBar").val()=="") {
            return;
        }

        //Hide search screen container and show results screen container
        // ******
        $("#main-page-container").hide();
        $(".hidden").show();


        //Set q to input term and update queryURL
        q = $("#inputBar").val();
        queryURL = `https://api.edamam.com/search?q=${q}&app_id=${apiID}&app_key=${apiKEY}`;
        
        //API call and DOM manipulation
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                //Set response.hits array to var results
                results = response.hits;
                //Make cards for each hit in response
                for (var i = 0; i < results.length; i++) {
                    populateCard(i);
                    console.log()
                };
        });
    });

// On results screen ------------------------------------------------------------

    //Click listener for result-cards
    $(document).on("click", ".result-card", function() {
        //Maximize card (show details loaded in background) get card ID
        cardSelection = $(this).attr("id");
        $(`#full-${cardSelection}`).show();

        //Click listener to close card when X button is clicked
        $(document).on("click", "#closeBtn", function() {
            $(`#full-${cardSelection}`).hide();
        });
        //Click listener to close expanded card when clicking outside of card
        $(document).mouseup(".result-card", function(e) {
            var container = $(`#full-${cardSelection}`);
            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                container.hide();
            }
        });
    });

    // //Click listener for show me more button (additional search with offset)
    // $("#show-more").on("click", function() {

    //     //DOM manipulation - populate search results container and wrapper with cards
    //     for (var i = 0; i < results.length; i++) {
    //         populateCard(i);
    //     };
    // });

//Creates cards from API reponse (incl. offset)
function populateCard(i) {
    //Creates results mini cards
    //Return list of 3 top ingredients
    listIngredients(i, 3);
    listHealthLabels(i, 2);
    //Append card to DOM
    $("#card-wrapper").append(`
    <div class="result-card" id="card-${i}">
        <img src=${results[i].recipe.image}>
        <span>${results[i].recipe.label}</span>
        <ul>
            ${ingredients}
        </ul>
        <ul>
            ${healthLabels}
        </ul>        
    </div>
    `);
    //Creates full cards (hidden by default and expanded to show on click)
    //Return list of all ingredients
    listIngredients(i, results[i].recipe.ingredients.length);
    listNutrition(i, results[i].recipe.digest.length);
    listHealthLabels(i, results[i].recipe.healthLabels.length);    
    //Append card to DOM
    $("#card-wrapper").append(`
    <div class="full-card" id="full-card-${i}" style="display: none;">
        <button id="closeBtn">X</button>
        <img src=${results[i].recipe.image}>
        <span>${results[i].recipe.label} (${Math.round(results[i].recipe.calories)} cal)</span>
        <ul>
            ${ingredients}
        </ul>
        <ul>
            ${nutrition}
        </ul>
        <ul>
            ${healthLabels}
        </ul>
        <canvas id="nutriChart">
        </canvas>
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
        ${Math.round(results[i].recipe.digest[j].total)} g
         (${Math.round(results[i].recipe.digest[j].daily)}% of daily)
        </li>
        `);
    };
    return nutrition;
};

function listHealthLabels(i, size) {
    healthLabels = "";
    for (var j = 0; j < size; j++) {
        healthLabels += (`
        <li>${results[i].recipe.healthLabels[j]}
        </li>
        `);
    };
    return healthLabels;
};

// function createChart() {
// Chart.js
var ctx = $('#nutriChart');
var chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Fat", "Carbs", "Protein", "Fibre", "Other"],
        datasets: [{
            label: "Nutrition Information",
            backgroundColor: ["rgb(255, 99, 132)","rgb(54, 162, 235)","rgb(255, 205, 86)", "rgb(75, 192, 192)"],
            data: [15, 25, 25, 20, 15]
        }]
    },
});
// //     debugger;
// return chart;
// }//end createChart

});//end $(document)ready()