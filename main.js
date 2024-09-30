const searchbox = document.querySelector(".serach-box");
const searchbtn = document.querySelector(".search-btn");
const recipecontainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");



const fetchRecipe = async (query)=>{
    recipecontainer.innerHTML = "<h2>Fetching Recipes...</h2>";

     try{
       const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
       const response = await data.json();
       // console.log(response.meals[0]);

       recipecontainer.innerHTML = "";
       response.meals.forEach(meal =>{
         const recipeDiv = document.createElement("div");
         recipeDiv.classList.add("recipe");

         recipeDiv.innerHTML = `
         <img src="${meal.strMealThumb}">
         <h3>${meal.strMeal}</h3>
         <P> <span>${meal.strArea}</span> Dish</P>
         <P> Belongs to <span> ${meal.strCategory} </span> Category </P>
         `
         const   button = document.createElement("button");
         button.textContent = "View Recipe";
         recipeDiv.appendChild(  button);
        //  adding aventlistener to recipe button

        button.addEventListener("click",()=>{
            openRecipePopup(meal);
        });

         recipecontainer.appendChild(recipeDiv);
       });
    }catch(error){
        recipecontainer.innerHTML = "<h2> Error in  Fetching Recipes...</h2>";
    }

};

const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients</h3>
    <ul class="ingedientList">${fetchIngredients(meal)}</ul>
     <div class="recipeInstruction">
        <h3 class="instruction">Instructions:</h3>
        <p >${meal.strInstructions}</p>
    </div>
    `
   
    recipeDetailsContent.parentElement.style.display = "block"

}

// fetchIngredents  function to fetch ingredents and measurements

const fetchIngredients = (meal)=>{
    let ingredientList = "";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
           ingredientList+=`<li>${measure} ${ingredient}</li>`
        }else{
            break;
        }
    }
    return ingredientList;
}

recipeCloseBtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display = "none";
})
searchbtn.addEventListener("click",(e)=>{
    e.preventDefault();

    const searchInput = searchbox.value.trim();
     if(!searchInput){
        recipecontainer.innerHTML = `<h2>Type the meal in the serach box...</h2>`
        return;
     }
    fetchRecipe(searchInput);

});