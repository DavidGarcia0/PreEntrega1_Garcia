const fs = require('fs').promises;
const path = require('path');

class ProductManager {
    constructor() {
        this.filePath = path.join(__dirname, '../data/products.json');
    }

    async getAllProducts() {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            return JSON.parse(data);
        } catch {
            return [];
        }
    }

    async getProductById(id) {
        const products = await this.getAllProducts();
        return products.find(product => product.id === id);
    }

    async addProduct(product) {
        const products = await this.getAllProducts();
        const newProduct = { id: String(Date.now()), ...product };
        products.push(newProduct);
        await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async updateProduct(id, updates) {
        const products = await this.getAllProducts();
        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex === -1) return null;

        products[productIndex] = { ...products[productIndex], ...updates };
        await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
        return products[productIndex];
    }

    async deleteProduct(id) {
        const products = await this.getAllProducts();
        const updatedProducts = products.filter(p => p.id !== id);
        await fs.writeFile(this.filePath, JSON.stringify(updatedProducts, null, 2));
    }
}

module.exports = ProductManager;
