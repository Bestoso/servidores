import products from '../products.json' assert { type: 'json' }
import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Home Page, go to /products to see the products')
})

app.get('/products', (req, res) => {
    const { limit } = req.query;
    if (limit) {
        res.send(products.slice(0, +limit));
    } else {
        res.send(products);
    }
})

app.get('/products/:pid', (req, res) => {
    const { pid } = req.params;
    const product = products.find(prod => prod.code === +pid);
    if (!product) {
        res.status(404).send('The product was not found');
    } else {
        res.send(product);
    }
})

app.get('*', (req, res) => {
    res.status(404).send('The page was not Found')
})

app.listen(8080, () => {
    console.log('Listening on port 8081');
})