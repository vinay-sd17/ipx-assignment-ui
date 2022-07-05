# Inventory management App

Created Inventory Management Frontend app for a small/medium business.

# Functional Highlights:

- Bootstrapped with Angular & Tailwind CSS
- 0 lines of custom styles written
- Fully Responsive till mobile resolution
- Routes URL optimized for products list, category based filters and product details view (helps SEO - need to have a server side rendering or dynamic rendering though to resolve cons of Angular SPA)
- Search fields debounced to prevent frequent calls
- Added [sample code](src/app/services/user) of user authentication service, and ways tokens, authentications will be handled.
- Added [sample code](src/app/auth.guard.ts) of Auth Guard that can be utilized to scale for protected and open routes
- Added HTTP Client [src/app/services](src/app/services)
- All API requests are intercepted to configure base API URL. Added *sample code* of authentication header for API calls. [src/app/services/interceptors](src/app/services/interceptors)
- API endpoints are added as part of [url-path](src/app/services/url-paths.ts) configuration, base URL is configured as part of environment.

# Tech Stack

- Angular
- Tailwind CSS

# API Spec:

Consumed: https://dummyjson.com/

API Routes Used

- GET `/products` - get all products
- GET `/products/1` - get single product
- GET `/products/search?q=Laptop` - search products
- GET `/products/categories` - get product categories
- GET `/products/category/smartphones` - get products of a category
