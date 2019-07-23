//Init variables
let q = "";
let maxResults = 6;
let offset = 6;
let cardCount = 0;
let results = "";
let listIngredients = "";
let cardSelection = "";


//Jonas' Credentials
// let apiID = "50377603"
// let apiKEY = "8429a3b88a2a31286dfa2da759edd0c2"
let queryURL = `https://api.edamam.com/search?q=&app_id=${apiID}&app_key=${apiKEY}`;

// My Credentials
var apiKEY = "99b6245eec9bab6137fdfb558edec22b"
var apiID= "d2bc1ce9"


//Listeners
$(document).ready( function() {

// On welcome screen ------------------------------------------------------------

    //populate intro cards

    // Click listener for search button
    $("#searchBtn").on("click", function(event) {
        event.preventDefault();
        //Reject if search bar is empty
        if ($("#inputBar").val()=="") {
            return;
        }

        //Hide search screen container and show results screen container
        // ******

        //Set q to input term and update queryURL
        q = $("#inputBar").val();

        // Set filters for search
            //Filter variables
        var lc; var va; var vg; var pf; var tnf; var af;
        
        if($("#lowcarb").is(':checked')){lc = "&diet=low-carb"} //&diet=low-carb is what is shown in an example, why isn't it working??? //xxx
        else{lc=""};
        if($("#vegan").is(':checked')){va = "&health=vegan"}
        else{va=""};
        if($("#vegetarian").is(':checked')){vg = "&health=vegetarian"}
        else{vg=""};
        if($("#peanut-free").is(':checked')){pf = "&health=peanut-free"}
        else{pf=""};
        if($("#tree-nut-free").is(':checked')){tnf = "&health=tree-nut-free"}
        else{tnf=""};
        if($("#alcohol-free").is(':checked')){af = "&health=alcohol-free"}
        else{af=""};

        //Construct Query URL

        //Most filters seem to work, but low-carb doesn't. Only diet filter I've tested...
        queryURL = `https://api.edamam.com/search?q=${q}&app_id=${apiID}&app_key=${apiKEY}${lc}${va}${vg}${pf}${tnf}${af}`;
        console.log(queryURL); //xxx
      
        // API call and DOM manipulation
        $.ajax({
            url: queryURL,
            method: "GET"
            }).then(function(response) {
                console.log(response); //xxx
                //Set response.hits array to var results
                results = response.hits;
                //Make cards for each hit in response
                for (var i = 0; i < results.length; i++) {
                    populateCard(i);
                };
        });
    });

// On results screen ------------------------------------------------------------

    //Click listener for result-cards
    // $(".result-card").on("click", function() {
    //     //Maximize card (show details loaded in background) get card ID
    //     cardSelection = $(this).attr("id");
    //     $(`#full-${cardSelection}`).show();

    //     //Click listener to close card when X button is clicked
    //     $("#closeBtn").on("click", function() {
    //         $(`#full-${cardSelection}`).hide();
    //     });
    //     //Click listener to close expanded card when clicking outside of card
    //     $(document).mouseup(function(e) {
    //         var container = $(`#full-${cardSelection}`);
    //         // if the target of the click isn't the container nor a descendant of the container
    //         if (!container.is(e.target) && container.has(e.target).length === 0) {
    //             container.hide();
    //         }
    //     });
    // });

    $(document).on("click", ".result-card", function() {
    // $(".body").on("click", function() {
        console.log("click");
        // console.log(event);
        // xxeventxx=event; // created to have a variable that stores the event for troubleshooting

        // Maximize card (show details loaded in background) get card ID
        // cardSelection = $(event.path[1].id).attr("id");
        cardSelection = event.path[1].id;
        console.log(cardSelection);
        console.log("check show input: "+`#full-${cardSelection}`)
        $(`#full-${cardSelection}`).show();

        //Click listener to close card when X button is clicked
        // $("#closeBtn").on("click", function() {
        //     $(`#full-${cardSelection}`).hide();
        // });
        //Click listener to close expanded card when clicking outside of card
        // $(document).mouseup(function(e) {
        //     var container = $(`#full-${cardSelection}`);
        //     // if the target of the click isn't the container nor a descendant of the container
        //     if (!container.is(e.target) && container.has(e.target).length === 0) {
        //         container.hide();
        //     }
        // });
    });



    //Click listener for search button

    //Click listener for show me more button (additional search with offset)
    $("#show-more").on("click", function() {
        //API call with offset
        
        //set variables from API response
        
        //DOM manipulation - populate search results container and wrapper with cards
        for (var i = 0; i < results.length; i++) {
            populateCard(i);
        };
    });

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
        <div class="full-card" id="full-card-${i} >
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

});//end $(document)ready()