type Product = {
    images: string[],
    title: string,
    description: string,
    rating: number,
    stock: number,
    category: string
}

async function getProducts(product:string): Promise<Product[]> {
    const url = `https://dummyjson.com/products/search?q=${product}`

    const res = await fetch(url)
    const products = await res.json()
    
    if(res.status === 404) throw '404'
    else if(products.products.length === 0) throw 'empty array'
    else return products.products as Product[]
}

export {Product, getProducts}