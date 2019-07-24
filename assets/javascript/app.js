//Init variables
let q = "";
let maxResults = 6;
let offset = 6;
let results = "";
let listIngredients = "";
let cardSelection = "";

let apiID = "50377603"
let apiKEY = "8429a3b88a2a31286dfa2da759edd0c2"
let queryURL = `https://api.edamam.com/search?q=&app_id=${apiID}&app_key=${apiKEY}`;


//Listeners
$(document).ready( function() {

// On welcome screen ------------------------------------------------------------

    //populate intro cards
    $("#intro-card-0").append(`
        <div class="result-card">
            <div class="card">
            <img class="card-img-top" src="https://www.edamam.com/web-img/90d/90d94b734229974e1931334baf076a8a.jpg" alt="Card image cap">
            <div class="card-body">
            <h5 class="card-title" style="font-size:  20px;">Shrimp Samosas</h5>
            <ul><li class="health-label badge badge-primary">Sugar-Conscious</li><li class="health-label badge badge-primary">Peanut-Free</li></ul>  
            </div>
            </div>      
        </div>
    `)
    $("#intro-card-1").append(`
    <div class="result-card">
        <div class="card">
        <img class="card-img-top" src="https://www.edamam.com/web-img/ae7/ae7a816e77e5cad667bd59ffda26d230" alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title" style="font-size:  20px;">Overnight Oats recipes</h5>
        <ul><li class="health-label badge badge-primary">Vegetarian</li><li class="health-label badge badge-primary">Peanut-Free</li></ul>  
        </div>
        </div>      
    </div>
    `)
    $("#intro-card-2").append(`
    <div class="result-card">
        <div class="card">
        <img class="card-img-top" src="https://www.edamam.com/web-img/ec5/ec5b5a864df655b2bb9fea6630970fae.jpg" alt="Card image cap">
        <div class="card-body"><h5 class="card-title" style="font-size:  20px;">Perfect Grilled Steak</h5>
        <ul><li class="health-label badge badge-primary">Sugar-Conscious</li><li class="health-label badge badge-primary">Peanut-Free</li></ul>  
        </div>
        </div>      
    </div>
    `)

    // Click listener for search button
    $(document).on("click", "#searchBtn", function() {

        //Reject if search bar is empty
        if ($("#inputBar").val()=="") {
            return;
        }

        //Hide search screen container and show results screen container
        $("#main-page-container").hide();
        $(".hidden").show();

        //Set q to input term and update queryURL
        q = $("#inputBar").val();

        // Set variables for search filter
        var va, vg, pf, tnf, af;
        
        if($("#filter-vegan").is(':checked')){va = "&health=vegan"}
        else{va=""};
        if($("#filter-vegetarian").is(':checked')){vg = "&health=vegetarian"}
        else{vg=""};
        if($("#filter-peanut-free").is(':checked')){pf = "&health=peanut-free"}
        else{pf=""};
        if($("#filter-tree-nut-free").is(':checked')){tnf = "&health=tree-nut-free"}
        else{tnf=""};
        if($("#filter-alcohol-free").is(':checked')){af = "&health=alcohol-free"}
        else{af=""};
    
        queryURL = `https://api.edamam.com/search?q=${q}&app_id=${apiID}&app_key=${apiKEY}${va}${vg}${pf}${tnf}${af}`;
        console.log("queryURL: "+queryURL)
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

//Creates cards from API reponse (incl. offset)
function populateCard(i) {
    //Creates results mini cards
    //Return list of 3 top ingredients
    listHealthLabels(i, results[i].recipe.healthLabels.length);
    //Append card to DOM
    $("#card-wrapper").append(`
    <div class="result-card" id="card-${i}">
        <div class="card">
            <img class="card-img-top" src=${results[i].recipe.image} alt="Card image cap" >
            <div class="card-body">
                    <h5 class="card-title" style="font-size:  20px;">${results[i].recipe.label}</h5>
                    <ul>
                    ${healthLabels}
                    </ul>  
            </div>
        </div>      
    </div>
    `);
    //Creates full cards (hidden by default and expanded to show on click)
    //Return list of all ingredients
    listIngredients(i, results[i].recipe.ingredients.length);
    listNutrition(i, results[i].recipe.digest.length);
    listHealthLabels(i, results[i].recipe.healthLabels.length);    
    //Append card to DOM
    $("#full-card-wrapper").append(`
    <div class="full-card" id="full-card-${i}" style="display: none;">
        <div class="container" id="fullcard-container">
            <div id="fullcard-header">
                <div id="button-container">
                    <button id="favBtn">❤
                        <span class="tooltiptext">Favourite</span>
                    </button>
                    <button id="plusBtn">Maps
                        <span class="tooltiptext">Show Maps</span>
                    </button>
                    <button id="closeBtn">X
                        <span class="tooltiptext">Close</span>
                    </button>
                </div>
                <h1><span>${results[i].recipe.label} (${Math.round(results[i].recipe.calories)} cal)</span></h1>
            </div>
            <div id="img-lable-container">
                <img src=${results[i].recipe.image}>
                <div id="label-container">
                    ${healthLabels}
                </div>
            </div>
            <a href="${results[i].recipe.url}" target="_empty">Take me to the full recipe!
            </a>
            <div id="ingredient-nutri-container">
                <div id="ingredient">
                    <ul id="ingredient-list">
                        ${ingredients}
                    </ul>
                </div>
                <div id="nutrition">
                    <ul id="nutri-list">
                        ${nutrition}
                    </ul>
                </div>
            </div>
            <canvas id="nutriChart-${i}">
                <script>
                // Chart.js
                var ctx-${i} = $('#nutriChart-${i}');
                var chart-${i} = new Chart(ctx, {
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
                </script>
            </canvas>
        </div>
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
        <li id="nutri-li">${results[i].recipe.digest[j].label}: 
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
        <li class="health-label badge badge-primary">${results[i].recipe.healthLabels[j]}
        </li>
        `);
    };
    return healthLabels;
};

// function createChart() {
// Chart.js
// var ctx = $('#nutriChart');
// var chart = new Chart(ctx, {
//     type: 'doughnut',
//     data: {
//         labels: ["Fat", "Carbs", "Protein", "Fibre", "Other"],
//         datasets: [{
//             label: "Nutrition Information",
//             backgroundColor: ["rgb(255, 99, 132)","rgb(54, 162, 235)","rgb(255, 205, 86)", "rgb(75, 192, 192)"],
//             data: [15, 25, 25, 20, 15]
//         }]
//     },
// });
// //     debugger;
// return chart;
// }//end createChart

// Maps API
// $(document).on("click", "#plusBtn", function() {
   
//     $("#mapHide").show();
    
//     var map;
//     var service;
//     var infowindow;
    
//     debugger;

//     function initMap() {
//         var toronto = new google.maps.LatLng(43.653, -79.383);
    
//         infowindow = new google.maps.InfoWindow();
    
//         map = new google.maps.Map(document.getElementById('map'), {center: toronto, zoom: 15});
    
//         var request = {
//             query: 'Loblaws',
//             fields: ['name', 'geometry'],
//         };
    
//         service = new google.maps.places.PlacesService(map);
//         service.findPlaceFromQuery(request, function(results, status) {
//             if (status === google.maps.places.PlacesServiceStatus.OK) {
//                 for (var i = 0; i < results.length; i++) {
//                     createMarker(results[i]);
//                 }
//                 map.setCenter(results[0].geometry.location);
//             }
//         });
//     }
    
//     function createMarker(place) {
//         var marker = new google.maps.Marker({
//             map: map,
//             position: place.geometry.location
//         });
    
//         google.maps.event.addListener(marker, 'click', function() {
//             infowindow.setContent(place.name);
//             infowindow.open(map, this);
//         });
//     };

//     initMap();
//     setTimeout(createMarker, 1000);

//     });//end Maps API

});//end $(document)ready()

