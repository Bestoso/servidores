import fs from 'fs/promises';

class ProductManager {
    static contador = 0;
    constructor () {
        this.products = [];
        this.path = '../products.json';
    }
    addProduct(title, description, price, thumbnail, stock){
        this.products.push({
            code: ProductManager.contador++,
            title,
            description,
            price,
            thumbnail,
            stock
        })
        if (title === undefined ||
            description === undefined ||
            price === undefined ||
            thumbnail === undefined ||
            stock === undefined) return 'All fields are required';
        if (typeof price !== 'number') return 'Price must be a number';
        if (typeof stock !== 'number') return 'Stock must be a number';
        fs.writeFile(this.path, JSON.stringify(this.products, null, 2))
            .then(() => console.log('File written successfully'))
            .catch((err) => console.log(err));
    }
    updateProduct(id, title, description, price, thumbnail, stock){
        const product = this.products.find(product => product.code === id);
        if (product === undefined) return 'Not found';
        if (title !== undefined) product.title = title;
        if (description !== undefined) product.description = description;
        if (price !== undefined) product.price = price;
        if (thumbnail !== undefined) product.thumbnail = thumbnail;
        if (stock !== undefined) product.stock = stock;
        fs.writeFile(this.path, JSON.stringify(this.products, null, 2))
            .then(() => console.log('File written successfully'))
            .catch((err) => console.log(err));
    }
    removeProduct(id){
        this.products = this.products.filter(product => product.code !== id);
        fs.writeFile(this.path, JSON.stringify(this.products, null, 2))
            .then(() => console.log('File written successfully'))
            .catch((err) => console.log(err));
    }
    getProductById(id){
        const product = this.products.find(product => product.code === id);
        if (product === undefined) return 'Not found';
        return fs.readFile(this.path, 'utf-8')
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }
    getProducts(){
        if (this.products.length === 0) return 'there are no products';
        return fs.readFile(this.path, 'utf-8')
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }
}

const manager = new ProductManager;

console.log(manager.getProducts());