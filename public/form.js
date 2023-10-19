$(document).ready(function() {
    $('#randomForm').submit(function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
      // Add the class 'hideDiv' to the targeted div
      $('#randomDiv').addClass('hideDiv');
      $('#randomResult').toggle('hideDiv');
    });
  });

  $(document).ready(function() {
    $('#nameForm').submit(function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
      // Add the class 'hideDiv' to the targeted div
      $('#nameDiv').addClass('hideDiv');
      $('#nameResult').toggle('hideDiv');
    });
  });

  // SEARCH BY NAME API
  let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let url = "https://thecocktaildb.com/api/json/v1/1/search.php?s=";
let getInfo = () => {
  let userInp = document.getElementById("user-inp").value;
  if (userInp.length == 0) {
    result.innerHTML = `<h3 class="msg">The input field cannot be empty</h3>`;
  } else {
    fetch(url + userInp)
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("user-inp").value = "";
        // console.log(data);
        // console.log(data.drinks[0]);
        let myDrink = data.drinks[0];
        // console.log(myDrink.strDrink);
        // console.log(myDrink.strDrinkThumb);
        // console.log(myDrink.strInstructions);
        let count = 1;
        let ingredients = [];
        for (let i in myDrink) {
          let ingredient = "";
          let measure = "";
          if (i.startsWith("strIngredient") && myDrink[i]) {
            ingredient = myDrink[i];
            if (myDrink[`strMeasure` + count]) {
              measure = myDrink[`strMeasure` + count];
            } else {
              measure = "";
            }
            count += 1;
            ingredients.push(`${measure} ${ingredient}`);
          }
        }
        console.log(ingredients);
        result.innerHTML = `
      <div class="bar">
  <div class="container col-xl-9 px-1 ">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <img src=${myDrink.strDrinkThumb} class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">${myDrink.strDrink}</h1>
        <p class="lead">Ingredients</p>
        <ul class="list-group ingredients"></ul>
        <p class="lead">${myDrink.strInstructions}</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">

        </div>
      </div>
    </div>
  </div>
  </div>
      `;
        let ingredientsCon = document.querySelector(".ingredients");
        ingredients.forEach((item) => {
          let listItem = document.createElement("li");
          listItem.innerText = item;
          ingredientsCon.appendChild(listItem);
        });
      })
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Please enter a valid input</h3>`;
      });
  }
};
window.addEventListener("load", getInfo);
searchBtn.addEventListener("click", getInfo);

{/* <div class="d-flex flex-column flex-md-row p-4 gap-4 py-md-5 align-items-center justify-content-center">
  <div class="list-group ingredients">

      <div class="d-flex gap-2 w-100 justify-content-between">
        <div>
          <h6 class="mb-0">List group item heading</h6>
          <p class="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
        </div>
      </div>
  </div>
</div> */}

