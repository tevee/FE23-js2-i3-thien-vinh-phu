import {getProducts} from "./modules/api.ts";
import {displayProducts, displayError} from "./modules/display.ts";

const searchFormEl = document.querySelector('#searchForm') as HTMLFormElement
searchFormEl.addEventListener('submit', event => {
    event.preventDefault()
    const inputEl = searchFormEl.querySelector('input') as HTMLInputElement
    const searchInput:string = inputEl.value;

    getProducts(searchInput)
        .then(displayProducts)
        .catch(displayError)

    searchFormEl.reset()
})