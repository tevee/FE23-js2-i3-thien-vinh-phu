import { Product } from "./api.ts";

// Function overloads
function createAndAppend<K extends keyof HTMLElementTagNameMap>(tagName: K, content: string, container: HTMLDivElement): HTMLElementTagNameMap[K];
function createAndAppend(tagName: string, content: string, container: HTMLDivElement): HTMLElement {
    const el = document.createElement(tagName);
    if(tagName === 'img') (el as HTMLImageElement).src = content
    else el.innerText = content;
    container.appendChild(el);
    return el as HTMLElement;
}

function displayProducts(products: Product[]): void {
    const productContainer = document.querySelector('#productContainer') as HTMLDivElement
    productContainer.innerHTML = ''

    products.forEach(product => {
        const productCard = createAndAppend('div', '', productContainer)
        const imgContainer =  createAndAppend('div', '', productCard)
        createAndAppend('img', product.images[0], imgContainer)

        const productCardContent = createAndAppend('div', '', productCard)
        const productHeading = createAndAppend('div', '', productCardContent)
        createAndAppend('h3', product.title, productHeading)
        createAndAppend('p', `Rating: ${product.rating.toString()}`, productHeading)
        const productDescription = createAndAppend('p', product.description, productCardContent)

        const productStock = createAndAppend('p', `Stock: ${product.stock.toString()}`, productCardContent)
        if(product.stock < 10) {
            productStock.innerText = `Stock: Almost sold out, ${product.stock.toString()} left`
            productStock.classList.add('warning')
        }
        createAndAppend('p', `Category: ${product.category}`, productCardContent)
        const productBtn = createAndAppend('button', 'Add to cart', productCardContent)

        productCard.classList.add('product-card')
        imgContainer.classList.add('img-container')
        productCardContent.classList.add('product-card-content')
        productHeading.classList.add('product-heading')
        productDescription.classList.add('product-description')
        productBtn.classList.add('product-btn')

        productContainer.append(productCard)
    })
}

function displayError(error:string): void {
    if(error === '404') alert('Product not found')
    else if(error === 'empty array') alert('Product does not exist')
}

export {displayProducts, displayError}