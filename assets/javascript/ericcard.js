// Java to expand card when clicked on

// use a Modal Box

var sampleObj = {
    name: "Roast Goose",
    image: "https://www.edamam.com/web-img/ec2/ec289f1d3e69231ed65f40bc25b50cff.jpg",
    ingredientsArray: ["1 goose, 10-12 lbs (see note)", "-- kosher salt and pepper",],
}

function floatRecipeCard(idTag){
    $(".diplayImage").empty();
    $(".displayTitle").empty();
    $(".displayIngredients").empty();

    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Populate Modal with relavant info
    $(".diplayImage").append(`<img src=${sampleObj.image}>`);
    $(".displayTitle").append(`<h1>${sampleObj.name}</h1>`);
    $(".displayIngredients").append(`<ul>`);
    for (var x=0; x<sampleObj.ingredientsArray.length;x++){
        $(".displayIngredients").append(`<li>${sampleObj.ingredientsArray[x]}</li>`);
    }
    $(".displayIngredients").append(`</ul>`);

    // <div class="diplayImage"></div>
    // <div class="displayTitle"></div>
    // <div class="displayIngredients"></div>
    // <div class="displayNutrition"></div>
    //var sampleObj = {
    // name: "Roast Goose",
    // image: "https://www.edamam.com/web-img/ec2/ec289f1d3e69231ed65f40bc25b50cff.jpg",
    // ingredientsArray: ["1 goose, 10-12 lbs (see note)", "-- kosher salt and pepper",], <ul><li></li></ul>


};

$(document).ready(function() {
    $(".result-card").on("click", function(event){
        // console.log("click");
        // console.log(this.id);
        floatRecipeCard(this.id)
    });
});