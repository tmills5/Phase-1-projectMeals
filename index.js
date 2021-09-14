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

const categoriesAllBtn = document.getElementById("categories-all-list")
const areaAllBtn = document.getElementById("area-all-list")
const ingredientsAllBtn = document.getElementById("ingredients-all-list")
const randomAllBtn = document.getElementById("random-list")

const categoryItem = document.getElementById("list-item")

//---------EVENT HANDLERS / FETCH HANDLERS---------------//
const fetchAllCategories = () => {
//get request to the categories list url and render to page
    fetch(listAllMealCategories)
        .then(response => response.json())
        .then(data => { console.log(data)//---works!
            mealCategory = data.categories //pull from within the obj-not sure why? though this was array of obj
            mealCategory.forEach(category => {
                //console.log(category)
                renderListItem(category);
            })
        })
}

//---------RENDER FUNCTIONS---------------------//
const renderListItem = category => {
    const {strCategory, strCategoryDescription} = category;
    const categoryLi = document.createElement("li")
    categoryLi.className = "categoryLi"
    categoryLi.innerText = `${strCategory}`
    categoryItem.append(categoryLi)
}

//---------EVENT LISTENERS-----------------------//

categoriesAllBtn.addEventListener("click", fetchAllCategories)