let categories = document.querySelector("#lists");
let sidebar = document.querySelector(".sidebar");
url = fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
.then((res) =>{
    return res.json();
})
.then((data) => {
    for(let i=0;i<data.categories.length;i++){        
       categories.innerHTML += `<div><a href = "/Meals_project/meals_${data.categories[i].strCategory}.html"><img src = ${data.categories[i].strCategoryThumb}><p>&nbsp; ${data.categories[i].strCategory} &nbsp;<p></a></div>`;
    }
})
.catch((err) =>{
    console.log(err);
})    
let body = document.querySelector("body");

sidebar.addEventListener("click",() =>{
    let parentdiv = document.createElement("div");
    let sidebarlist = document.createElement("div");
    parentdiv.classList.add("parentdiv");
    sidebarlist.classList.add("sidebarlist1");
    body.appendChild(parentdiv);
    parentdiv.appendChild(sidebarlist);

  // sidebarlist//........
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then((res) => {
        return res.json();
    })
    .then((data) => {
        
        sidebarlist.innerHTML = `<div class=closebutton> <button> <i class="fa-solid fa-xmark"></i> </button> </div>`;
        sidebarlist.innerHTML += `<div><a href ="/Meals_project//homepage.html">Home</a></div><hr>`;


        for(let i=0;i<data.categories.length;i++){
            sidebarlist.innerHTML +=  `<div><a href ="/Meals_project/meals_${data.categories[i].strCategory}.html" class=${data.categories[i].strCategory}>${data.categories[i].strCategory}</a></div> <hr>`;
        }
     let closebutton = document.querySelector(".closebutton");
     let a = document.querySelector(".sidebarlist1");
     closebutton.addEventListener("click",() =>{
        let random = a.parentElement;
        random.remove();
     })

    })
    .catch((err) => {
        console.log(err);
    })

})





function description(i){
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
.then((res) => {
    return res.json();
})
.then((data) => {
    let meal_description = document.querySelector("#meal_description");

    meal_description.innerHTML = `<h3>${data.categories[i].strCategory}</h3><p>${data.categories[i].strCategoryDescription}</p>`;
})
}

function meal(categoryname) {

//meals list //.......

let meals_list = document.querySelector("#meals_list");
fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${categoryname}`)
.then((res) => {
    return res.json();
})
.then((data) => {
    for(let i=0;i<data.meals.length;i++){
        meals_list.innerHTML += `<div> <a href="meals_ingredients.html?id=${data.meals[i].idMeal}"><img src= ${data.meals[i].strMealThumb} > <p>${data.meals[i].strMeal}</p></a></div>`;
    }
})

}

let ingredientlist = document.querySelector("#ingredientlist");
let measurements = document.querySelector("#measurements");
let instructions = document.querySelector("#instructions");
let mealsinfobar = document.querySelector("#mealsinfobar");
 const urlParams = new URLSearchParams(window.location.search);
 const mealid = urlParams.get("id");
//  console.log(mealid);
fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`)
.then((res) => {
    return res.json();
})
.then((data) => {
    mealsinfobar.innerHTML = `<p><i class="fa-solid fa-house"></i> &nbsp;${data.meals[0].strMeal}</p>`;
    ingredientlist.innerHTML = 
    `<div class=ingredientlist1>
    <img src="${data.meals[0].strMealThumb}">
    </div>

    <div class=ingredientlist2>

     <div class=mealname><p>${data.meals[0].strMeal}</p></div>
     <hr>
     <div class=CATEGORY><h3>CATEGORY:</h3><p>&nbsp;${data.meals[0].strCategory}</p></div>
     <div class=source><b>Source:</b><p>&nbsp;${data.meals[0].strSource}</p></div>
     <div class=tags><b>Tags:</b>&nbsp;<p> &nbsp;${data.meals[0].strTags}&nbsp;</p></div>
     <div class=ingredientsbox>
     <div class=a>Ingredients</div>
     <div class=b></div>
     </div>

    </div>`
    for(let i=1;i<20;i++){
        let b = document.querySelector(".b");
        let something = data.meals[0][`strIngredient${i}`];
        console.log(something);
        if(something!=""){
        b.innerHTML += `<div class=c>${i}) ${something}</div>`;
        }
    }

    measurements.innerHTML = `
     <div>
     <b>Measure:</b>
     </div>
     <div class=measurementbox>
     <div class=measurementdetails></div>
     </div>`

for(let i=1;i<20;i++){
    let measurementdetails = document.querySelector(".measurementdetails");
    let measure = data.meals[0][`strMeasure${i}`];
    if(measure != ""){
    measurementdetails.innerHTML += `<div class=gappingdiv><i class="fa-solid fa-spoon"></i>${measure}</div>`;
    }
}

instructions.innerHTML = `
<div class=instruction>
<b>Instructions:</b>
<div class=instructionlist>
${data.meals[0].strInstructions}
</div>

</div>`

})


