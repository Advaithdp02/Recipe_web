const SearchBox=document.querySelector(".SearchBox"); 
const SearchBtn=document.querySelector(".SearchBtn"); 
const RecipeContainer=document.querySelector(".RecipeContainer"); 
const RecipeDetail=document.querySelector(".RecipeDetail");
const recipeclosebtn=document.querySelector('.recipeclose');
const Detailrecipe=document.querySelector('.Detailrecipe');
const fetchRecipies=async(x)=>{
    RecipeContainer.innerHTML="<h2>Fetching Recipes. . . </h2>";
     const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${x}`);
     const response=await data.json();
     RecipeContainer.innerHTML='';
     response.meals.forEach(meal => {
        const RecipeDiv=document.createElement('div');
        RecipeDiv.classList.add('recipe');
        RecipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea} </span>Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        
        `
        const Btn=document.createElement("Button");
        Btn.textContent="View Recipe";
        RecipeDiv.appendChild(Btn);

        Btn.addEventListener('click',()=>{
            OpenRecipiePopUp(meal);
        });

        RecipeContainer.appendChild(RecipeDiv);
        
     });
}
const fetchIngredients=(meal)=>{
    let Ingredientlist="";
    for(let i=1;i<20;i++){
        const Ingredient=meal[`strIngredient${i}`];
        if (Ingredient){
            const measure=meal[`strMeasure${i}`];
            Ingredientlist+=`<li> ${measure} ${Ingredient}</li>`;
        }
        else{
            break
        }

        
    }
    return Ingredientlist;

}
const OpenRecipiePopUp=(meal)=>{
Detailrecipe.innerHTML=`
<h2 class="RecipeName">${meal.strMeal}</h2>
<h3 >Ingredients:</h3>
<ul class="IngredientList">
${fetchIngredients(meal)}
</ul>
<div>
<h3>Instructions:</h3>
<p class="Instructions">
${meal.strInstructions}</p>
</div>

`
Detailrecipe.parentElement.style.display="block";
}
recipeclosebtn.addEventListener('click',()=>{
    Detailrecipe.parentElement.style.display="none";

});
SearchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const SearchInput=SearchBox.value.trim();
    fetchRecipies(SearchInput);
    console.log("button clicked");
});