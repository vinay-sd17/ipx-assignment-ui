# ipx-assignment-ui

Inventory management App

Create Inventory Management Frontend app for a small/medium business.

Functional overview:
Add Products to Inventory, Search From Inventory, Search by Product Category, Add Product to Cart

Additional:
User Registration & Securing API end points, Caching layer for an inventory

Preferrable Tech Stack
Angular, Tailwind CSS

API Spec:
Make use of: https://dummyjson.com/

Routes
All HTTP methods are supported. You can use http or https for your requests.

GET	/products	// get all products
GET	/products/1	// get single product
GET	/products/search?q=Laptop	// search products
GET	/products/categories	// get product categories
GET	/products/category/smartphones	// get products of a category
POST	/products/add	// add a product
PUT	/products/1	// update a product
PATCH	/products/1	// update a product
DELETE	/products/1	// delete a product
