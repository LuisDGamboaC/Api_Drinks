import axios from "axios";
import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL_Random = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


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

app.get("/name", (req,res) => {
  res.render("name.ejs")
})

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });  


  