import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_UrL_SEARCH_Name = "www.thecocktaildb.com/api/json/v1/1/search.php?s="; //'margarita'
const API_URL_Random = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const API_URL_Ingredients = "www.thecocktaildb.com/api/json/v1/1/filter.php?i=";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function getIngredients(drink) {
  const ingredients2 = [];
  for (let i = 1; i <= 15; i++) {
    const ingredientNm = drink[`strIngredient${i}`];
    const measureNm = drink[`strMeasure${i}`];
    if (ingredientNm && measureNm) {
      ingredients2.push(`${measureNm} ${ingredientNm}`);
    }
  }
  return ingredients2;
}

app.use(getIngredients);

app.get("/", async(req, res)=> {

        try {
            const response = await axios.get(API_URL_Random);
            const result = response.data;
            const cocktail = response.data.drinks[0];
            const measure = response.data.drinks[0];
            const drinkName = result.drinks[0].strDrink;
            const drinkCategory = result.drinks[0].strCategory;
            const drinkAlcoholic = result.drinks[0].strAlcoholic;
            const drinkInstructions = result.drinks[0].strInstructions;
            const drinkImg = result.drinks[0].strDrinkThumb;
            
            const ingredients1 = [];
            for (let i = 1; i <= 15; i++) {
              const ingredient = cocktail[`strIngredient${i}`];
              if (ingredient) {
                ingredients1.push(ingredient);
              }
            }

            const measure1 = [];
            for(let i=1; i <= 15; i++) {
              const strMeasure = measure[`strMeasure${i}`];
              if(strMeasure) {
                measure1.push(strMeasure);
              }
            }

            res.render("index.ejs", { drinkName, drinkCategory, drinkAlcoholic, drinkInstructions, drinkImg, ingredients1, measure1 });    
            } catch (error) {
                console.error("Failed to make request:", error.message);
                res.render("index.ejs", {
                  error:"No result.",
                });
            }
});

app.post("/name", async(req,res) => {
  var inputName = req.body.drinkName;

  try {
    const response = await axios.post(API_UrL_SEARCH_Name + `${inputName}`);
    const drinks = response.data.drinks;
    const formattedDrinks = drinks.map((drink) => ({
      name: drink.strDrink,
      category: drink.strCategory,
      ingredientsN: getIngredients(drink),
      instructions: drink.strInstructions,
    }));
    res.render("name", { drinkName: formattedDrinks });

  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error:"No result.",
    });
  }
});


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });  


  