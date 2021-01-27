const RANDOM_MEAL_API = "https://www.themealdb.com/api/json/v1/1/random.php";
const CATEGORIES_API = "https://www.themealdb.com/api/json/v1/1/categories.php";
const SEARCH_API = "https://www.themealdb.com/api/json/v1/1/search.php?s="
const MEAL_ID_API = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="

const mainContainer = document.getElementById('main-container'); 
const productContainer = document.getElementById('product-container');
const categories = document.getElementById('categories');
const menuButton = document.getElementById('menu-button');
const logo = document.getElementById('logo');
const form = document.getElementById('form');
const search = document.getElementById('search');
const searchOn = document.getElementById('search-on');
const searchOff = document.getElementById('search-off');
const itemContainer = document.getElementById('item-container');
const resultContainer = document.getElementById('result-container');
const suggestion = document.getElementById('suggestion');
const closeSug = document.getElementById('close-sug');
const showRecommend = document.getElementById('show-recommend');
const sideBar = document.getElementById('side-bar')


let prewmeal1 = ""
let prewmeal2 = ""
var counter = 0

async function getRandomMeal() {
    const mealGet = fetch(RANDOM_MEAL_API);
    const mealDB = await mealGet;
    const mealJSON = await mealDB.json();
    const meal = await mealJSON.meals
    const mealCont = meal[0] 
    
    if(counter%2 == 0){
        prewmeal1 = mealCont.idMeal 
        if(prewmeal1 == prewmeal2) {
            getRandomMeal()
        } else {
            createProduct(mealCont);
        }
    } else {
        prewmeal2 = mealCont.idMeal 
        if(prewmeal1 == prewmeal2) {
            getRandomMeal()
        } else {
            createProduct(mealCont);
        }
    }
    counter++;
}

async function openRandomMeal() {
    const mealGet = fetch(RANDOM_MEAL_API);
    const mealDB = await mealGet;
    const mealJSON = await mealDB.json();
    const meal = await mealJSON.meals
    const mealCont = meal[0] 
    
    createMealPage(mealCont);
}

async function getCategories() {
    const catGet = fetch(CATEGORIES_API);
    const catDB = await catGet;
    const catJSON = await catDB.json();
    const cat = await catJSON.categories;

    cat.forEach(element => {
        createCategory(element)
    });

}

function createProduct(element) {
    const product = document.createElement('div');
    product.classList.add('product');
    product.onclick = ()=> {
        createMealPage(element)
    }

    product.innerHTML += `
    <div class="meal-card-back-bg">
        <div>
            <img src="${element.strMealThumb}" alt="${element.strMeal}" width="100%">
        </div>
    </div>
    <div class="name-and-rating">
        <div>
            <span class="meal-name">${element.strMeal}</span>
        </div>
        <div class="meal-rate">
            <i class="rate fas fa-hamburger"></i>
            <i class="rate fas fa-hamburger"></i>
            <i class="rate fas fa-hamburger"></i>
            <i class="rate fas fa-hamburger"></i>
            <i class="rate fas fa-hamburger"></i>
        </div>
    </div>
    <div class="str-category">
        <span class="str-category-span">${element.strCategory}</span>
    </div>
    `
    productContainer.appendChild(product);
    


}

function createCategory(element) {


    const plastic = document.createElement('div')
    plastic.classList.add('category-plastic');

    plastic.innerHTML =`
    <div class="category">
        <img src="${element.strCategoryThumb}" alt="${element.strCategory}" width="100%">
    </div>
    <div class="category-title">
        ${element.strCategory}
    </div>
    `

    
    categories.appendChild(plastic);

}

var xs = 1
mainContainer.onscroll = ()=> {
    const elmnt = mainContainer;
    let y = elmnt.scrollTop;
    console.log(y)
    if(y > 1700 && xs == 1){
        init()
        xs++
    }
}



searchOn.addEventListener('click', ()=> {
    menuButton.style.display = "none";
    logo.style.display = "none";
    search.style.display = "block"
    searchOff.style.display = "block";
    searchOn.style.display = "none";
    itemContainer.style.display = "none";
    resultContainer.style.display = "block"
});

searchOff.addEventListener('click', ()=> {
    menuButton.style.display = "block";
    logo.style.display = "block";
    search.style.display = "none"
    searchOff.style.display = "none";
    searchOn.style.display = "block";
    itemContainer.style.display = "block";
    resultContainer.style.display = "none"

})

form.addEventListener('submit', e=>{
    e.preventDefault();

    getResults()
});

async function getResults() {
    
    let a =""
    a = search.value;
    if(a){
        const SEARCH_URL = await fetch(SEARCH_API + a)
        const searchJSON = await SEARCH_URL.json();
        const result = await searchJSON.meals;

        resultContainer.innerHTML = "";

        result.forEach(element => {
            createResults(element);
        });

    }
    
}

function createResults(result) {
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result-card');
    resultDiv.onclick = ()=> {
        createMealPage(result)
    }
    
    resultDiv.innerHTML = `
    <div class="result-img">
        <img src="${result.strMealThumb}" alt="${result.strMeal}" style="width:100%;transform: scale(1.5)">
    </div>
    <div class="result-information">
        <div class="result-title">
            ${result.strMeal}
        </div>
        <div class="result-nation">
            ${result.strArea}
        </div>
    </div>
    `;
    
    resultContainer.appendChild(resultDiv);
}

showRecommend.onclick = ()=> {
    openRandomMeal();
}

closeSug.onclick = ()=> {
    suggestion.classList.add('animate');
    suggestion.style.transform = "translateY(-1rem)";
    suggestion.style.opacity = "0";
    
    setTimeout(() => {
        productContainer.classList.add('animate');
        productContainer.style.transform = "translateY(-8rem)";
    }, 500);

}

async function createMealPage(element) {
    const mealID = element.idMeal;
    const mealapi = await fetch(MEAL_ID_API+mealID)
    const mealjson = await mealapi.json();
    const meals = await mealjson.meals;
    
    meals.forEach(element => {
        createMealPageEl(element);
    });
}

function createMealPageEl(element) {

    mainContainer.style.display = "none";

    const page = document.createElement('div');
    page.classList.add('main-container'); 
    page.classList.add('productBG') 
    page.style.backgroundImage = `url('${element.strMealThumb}')`;
    
    const pageDiv = document.createElement('div');

    pageDiv.innerHTML = `
        <div class="photo-des">

        </div>
        <div style="background-color: #FBF3FA;">
            <div class="meal-name-des">
                <span>${element.strMeal}</span>
            </div>
            <div class="meal-category-des">
                <span>${element.strCategory}</span>
            </div>
            <div class="meal-how-to-box">
                <div class="how-to-upper">
                    <p>
                        How To Cook ${element.strMeal}
                    </p>
                    <p>
                        ${element.strInstructions}
                    </p>
                </div>
            </div>
        </div>
    `
    const ings = document.createElement('div');
    ings.classList.add('how-to-lower');
    
    let a = 1;
    let ing = "";

    for (let i = 0; i < 20; i++) {
        
        const ing = "strIngredient"+ a; 
        const ingM = "strMeasure" + a; 

        if(element[ing] == ""){
            break
        }

        ings.innerHTML +=`
            <div class="todobox">
                <div class="todo">${element[ing]} : ${element[ingM]}</div>
            </div>
        `
        pageDiv.appendChild(ings)
        a++
    }

    const closeBtnDiv = document.createElement('div');
    closeBtnDiv.classList.add('closeBtnDiv');

    const closeBtn = document.createElement('span'); 
    closeBtn.classList.add('closebtn');
    closeBtn.innerHTML = "×"

    closeBtn.onclick = ()=> {
        document.body.removeChild(page);
        mainContainer.style.display = "block";
    }

    closeBtnDiv.appendChild(closeBtn);
    page.appendChild(pageDiv);
    page.appendChild(closeBtnDiv);
    document.body.appendChild(page);
}

menuButton.onclick = ()=> {
    sideBar.classList.toggle('menuOpen')

}

// window onload
window.onload = init() 

function init(){
    getCategories()
    for (let i = 0; i < 10; i++) {
        getRandomMeal()
    }
}

