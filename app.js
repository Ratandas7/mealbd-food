document.getElementById("button").addEventListener("click", () => {
    const inputValue = document.getElementById("searchField").value;
    // console.log(inputValue);
    const details = document.getElementById("details")
    details.innerHTML = ""

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data.meals);
            const items = document.getElementById("items");
            items.innerHTML = "";
            if(data.meals == null){
                // console.log("No Meals");
                document.getElementById("msg").style.display = "block";
            }
            else{
                document.getElementById("msg").style.display = "none";
                // console.log(data.meals);
                data.meals.forEach(meal => {
                    // console.log(meal);
                    const itemDiv = document.createElement("div");
                    itemDiv.className = 'm-2 singleItem';
                    itemDiv.setAttribute("onclick", `details('${meal.idMeal}')`);
                    const itemInfo = `
                        <div class="card" style="width: 18rem;">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                            <div class="card-body text-center">
                                <h5 class="card-text">${meal.strMeal}</h5>
                            </div>
                        </div>
                    `
                    itemDiv.innerHTML = itemInfo;
                    items.appendChild(itemDiv)
                })
            }
        })
    document.getElementById("searchField").value = "";
});

function details(id){
    // console.log(id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(detail => {
            // console.log(detail)
            const meal = detail.meals[0];
            // console.log(meal);
            const details = document.getElementById("details")
            details.innerHTML = ""
            const detailsDiv = document.createElement("div");
            const detailsInfo = `
                <div class="card" style="width: 26rem;">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-text">${meal.strMeal}</h5>
                        <h6>${meal.strCategory}</h6>
                        <ul>
                            <li>${meal.strArea}</li>
                            <li>${meal.strIngredient1}</li>
                            <li>${meal.strIngredient2}</li>
                            <li>${meal.strIngredient3}</li>
                            <li>${meal.strIngredient4}</li>
                            <li>${meal.strIngredient5}</li>
                            <li>${meal.strIngredient6}</li>
                        </ul>
                        <p>${meal.strInstructions}</p>
                    </div>
                </div>
            `
            detailsDiv.innerHTML = detailsInfo;
            details.appendChild(detailsDiv);
        })
};