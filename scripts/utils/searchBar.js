import { recipes } from "../data/recipes.js";
import { displayRecipies } from "../main.js";
import { RecipesCard } from "../utils/constructor.js";
export { searchBar };

// algorithm that show only recipes including the searched item

function searchBar() {
  const searchInput = document.getElementById("site-search");
  const recipesSection = document.getElementById("recipes");

  searchInput.addEventListener("keyup", (e) => {
    const input = e.target.value.toLocaleLowerCase();
    const filteredRecipies = recipes.filter((recipe) => {
      const recipeIngredients = recipe.ingredients.map((element) => element.ingredient).toString();
      return (
        recipe.name.toLocaleLowerCase().includes(input) ||
        recipeIngredients.toLocaleLowerCase().includes(input) ||
        recipe.description.toLocaleLowerCase().includes(input)
      );
    });

    recipesSection.innerHTML = "";

    if (input.length >= 3) {
      if (filteredRecipies.length > 0) {
        filteredRecipies.forEach((filteredRecipe) => {
          recipesSection.appendChild(new RecipesCard(filteredRecipe).buildCard());
        });
      } else {
        recipesSection.innerHTML =
          '<div class="missing">Aucune recette ne correspond à votre critère… <br />Vous pouvez chercher « tarte aux pommes », « poisson », etc.</div>';
      }
    } else if (input.length <= 3) {
      displayRecipies();
    }
  });
}