// page elements
var importRecipesButton = document.getElementById("importRecipesButton");
var importRecipesButton2 = document.getElementById("importRecipesButton2");
var textArea = document.getElementById("textArea");

// local storage strings
//const recipeStorageName = "recipes-json";
const recipeStorageName = "recipes";

// funcs
const loadRecipesJson = () => {
    //const recipes = localStorage.getItem(recipeStorageName);
    const recipes = JSON.parse(localStorage.getItem(recipeStorageName));
    /*
    const recipes = {
        "foo": "bar",
        "a": 2,
        "b": {
            "lol": "xd",
            "omg": 69420,
        },
    }
    */
    const recipesText = JSON.stringify(recipes, null, 2);
    textArea.textContent = recipesText;
}

const updateRecipesJson = recipes => {
    localStorage.setItem(recipeStorageName, recipes);
    loadRecipesJson();
}

const selectRecipesFile = e => {
    // getting a hold of the file reference
    var file = e.target.files[0];

    // setting up the reader
    var reader = new FileReader();
    reader.readAsText(file, 'UTF-8');

    // here we tell the reader what to do when it's done reading...
    reader.onload = readerEvent => {
        const fileContent = readerEvent.target.result; // this is the content!
        //const recipes = JSON.parse(fileContent);
        updateRecipesJson(fileContent);
    }
}

importRecipesButton.onclick = e => {
    var fileSelectInput = document.createElement('input');
    fileSelectInput.type = 'file';
    fileSelectInput.onchange = selectRecipesFile;
    fileSelectInput.click();
}

// load previous state
loadRecipesJson();