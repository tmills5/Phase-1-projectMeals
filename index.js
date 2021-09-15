// User should be able to search recipes and see a grid (or list? we'll see) of pictures
//when click on the pic, the recipe should come up
//maybe favorite the best recipes??
//gonna have to create a card for each recipe-iterate through the array 

//---------CONSTANTS!!!------------//
const listAllMealCategories = "https://www.themealdb.com/api/json/v1/1/categories.php"
const listAllByArea = "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
const listAllByIngredient = "https://www.themealdb.com/api/json/v1/1/list.php?i=list"

const searchByName = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const searchByFirstLetter = "https://www.themealdb.com/api/json/v1/1/search.php?f="
const searchByRandom = "https://www.themealdb.com/api/json/v1/1/random.php"
const singleRandom = "https://www.themealdb.com/api/json/v1/1/random.php"

const filterByCategory = "https://www.themealdb.com/api/json/v1/1/filter.php?c="

const categoriesAllBtn = document.getElementById("categories-all-list")
const areaAllBtn = document.getElementById("area-all-list")
const ingredientsAllBtn = document.getElementById("ingredients-all-list")
const randomAllBtn = document.getElementById("random-list")

const categoryItem = document.getElementById("list-item")
const categoryProfile = document.getElementById("meal-profile")

//---------EVENT HANDLERS / FETCH HANDLERS---------------//

const fetchAllCategories = () => {
    //get request to the categories list url and render to page
    resetPage()
    fetch(listAllMealCategories)
        .then(response => response.json())
        .then(data => { //console.log(data)//---works!
            mealCategory = data.categories //pull from within the obj-not sure why? though this was array of obj
            mealCategory.forEach(category => {
                //console.log(category)
                renderListItem(category);
            })
        })
}

const fetchRandom = () => {
    resetPage()
    fetch(searchByRandom)
        .then(response => response.json())
        .then(data => {
            console.log(data)//---works!
            mealInfo = data.meals
            mealInfo.forEach(meal => {
                //console.log(meal)
                renderRandom(meal)
            })
        })
}
//---------RENDER FUNCTIONS---------------------//

const renderListItem = category => {
    const { strCategory, idCategory } = category;
    const categoryLi = document.createElement("li")
    categoryLi.id = idCategory
    categoryLi.className = "categoryLi"
    categoryLi.innerText = `${strCategory}`

    categoryLi.addEventListener('click', function () {
        resetPage()
        const { strCategoryDescription, strCategoryThumb } = category
        const categoryDiv = document.createElement("div")
        categoryDiv.innerHTML = `
    <h3>${strCategoryDescription}</h3>
    <img src=${strCategoryThumb}>`
        categoryProfile.append(categoryDiv)
    })

    categoryItem.append(categoryLi)
}

const renderRandom = meal => {
    const { strMeal, strCategory, strArea, strInstructions, strMealThumb, strSource } = meal
    mealDiv = document.createElement("div")
    mealDiv.id = "random-meal-div"
    mealDiv.innerHTML =
        `<h1>${strMeal}</h1>
                <h3>${strCategory} : ${strArea}</h3>
                <a href=${strSource}>Full Recipe<a>
                <p>${strInstructions}</p>
                <img src=${strMealThumb}>`
    categoryProfile.append(mealDiv)
}


//----------HELPER FUNCTIONS-----------------------------//
const resetPage = () => {
    categoryItem.innerHTML = ""
    categoryProfile.innerHTML = ""
}

//--------- Attach EVENT LISTENERS-----------------------//

categoriesAllBtn.addEventListener("click", fetchAllCategories)
// areaAllBtn.addEventListener("click", fetchAllAreas)
// ingredientsAllBtn.addEventListener("click", fectchAllIngredients)
randomAllBtn.addEventListener("click", fetchRandom)
