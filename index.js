//instead of listing-consider searching for area, name, and starting letter
//maybe favorite the best recipes??
//gonna have to create a card or div for each recipe-iterate through the array 

//---------CONSTANTS!!!------------//



const listAllMealCategories = "https://www.themealdb.com/api/json/v1/1/categories.php"
const listAllByArea = "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
const listAllByIngredient = "https://www.themealdb.com/api/json/v1/1/list.php?i=list"

const searchByNameUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const searchByFirstLetterUrl = "https://www.themealdb.com/api/json/v1/1/search.php?f="
const searchByRandom = "https://www.themealdb.com/api/json/v1/1/random.php"
const singleRandom = "https://www.themealdb.com/api/json/v1/1/random.php"

const filterByCategory = "https://www.themealdb.com/api/json/v1/1/filter.php?c="
const filterByArea = "http://www.themealdb.com/api/json/v1/1/filter.php?a="

const categoriesAllBtn = document.getElementById("categories-all-list")
const areaAllBtn = document.getElementById("area-all-list")
const ingredientsAllBtn = document.getElementById("ingredients-all-list")
const randomAllBtn = document.getElementById("random-list")

const categoryItem = document.getElementById("list-item")
const categoryProfile = document.getElementById("meal-profile")

const searchByname = document.getElementById("search-form-name")
const searchByFirstLetter = document.getElementById("search-form-letter")

const filterByIngredient = document.getElementById('filter-form-ingredient')







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
            // console.log(data)//---works!
            mealInfo = data.meals
            mealInfo.forEach(meal => {
                //console.log(meal)
                renderRandom(meal)
            })
        })
}

const fetchAllAreas = () => {
    resetPage()
    fetch(listAllByArea)
        .then(response => response.json())
        .then(areas => {
            //console.log(areas) //------works!!
            areaInfo = areas.meals
            areaInfo.forEach(area => { //console.log(area)//--------works
                renderAreaList(area)
            })
        })
}

// const fetchFilterArea = () => {
//     fetch(filterByArea)
//     .then(response => response.json())
//     .then(results => { console.log(results)
//         results = results.meals
//         results.forEach(meal => {
//             renderRandom(meal)
//         })
//     })
// }

const handleSearchNameResults = (e) => {
    resetPage()
    
    //debugger
    e.preventDefault()
    const term = e.target[0].value
    //can also use below instead of e.target.value
    //const term = e.target.querySelector('input[name="search-name"]').value
    
    
    //fetch by the term entered by user
    fetch(searchByNameUrl + term)
        .then(response => response.json())
        .then(results => { //console.log(results) //--------works!!
            results = results.meals
            results.forEach(result => {
                renderRandom(result)
            })
            e.target[0].value = ""  //resets the search form-coudn't figure out .reset() <--logs "term not a fxn"
        })
}

const handleSearchByFirstLetterResults = (e) => {
    resetPage()

    //debugger
    e.preventDefault()
    const term = e.target.querySelector("input[name='search-name']").value
    fetch(searchByFirstLetterUrl + term)
        .then(response => response.json())
        .then(results => { //console.log(results)
            results = results.meals
            results.forEach(result => {
                renderRandom(result)
            })
            e.target.querySelector("input[name='search-name']").value = ""
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
        const {strCategoryDescription, strCategoryThumb} = category
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
                <h3>Origin: ${strArea} <br> Category: ${strCategory}</h3>
                <a href=${strSource}>Full Recipe<a>
                <p>${strInstructions}</p>
                <img src=${strMealThumb}>`
    categoryProfile.append(mealDiv)
}

const renderAreaList = area => {
    const {strArea} = area
    const areaLi = document.createElement("li")
    areaLi.className = "areaLi"
    areaLi.id = `${strArea}`
    areaLi.innerText = `${strArea}`

//tryind to add meals to the DOM based on area----probably delete
    areaLi.addEventListener("click", function () {
        resetPage()
        //fetchFilterArea(area)
        const {strArea} = area
        const areaDiv = document.createElement("div")
        areaDiv.id = `${strArea}`
        areaDiv.innerHTML = `${strArea}`
        categoryProfile.append(areaDiv)
    })
//
    categoryItem.append(areaLi)

}



//----------HELPER FUNCTIONS-----------------------------//


const resetPage = () => {
    categoryItem.innerHTML = ""
    categoryProfile.innerHTML = ""
}



//--------- Attach EVENT LISTENERS-----------------------//

//document.addEventListener('DOMContentLoaded', )
categoriesAllBtn.addEventListener("click", fetchAllCategories)
areaAllBtn.addEventListener("click", fetchAllAreas)
// ingredientsAllBtn.addEventListener("click", fectchAllIngredients)
randomAllBtn.addEventListener("click", fetchRandom)

searchByname.addEventListener("submit", handleSearchNameResults)
searchByFirstLetter.addEventListener('submit', handleSearchByFirstLetterResults)

filterByIngredient.addEventListener('submit', handleFilterIngredientResults)