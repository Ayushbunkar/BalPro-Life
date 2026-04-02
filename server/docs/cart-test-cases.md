# Cart API Test Cases

## 1) Add same product twice
- POST /api/cart/add with same productId twice
- Expected: one item in cart with quantity incremented

## 2) Remove product
- DELETE /api/cart/remove/:productId
- Expected: item removed and totalPrice recalculated

## 3) Clear cart
- DELETE /api/cart/clear
- Expected: items empty array and totalPrice = 0

## 4) Unauthorized access
- Hit any /api/cart endpoint without JWT
- Expected: 401 response

## 5) Invalid productId
- POST /api/cart/add with malformed productId
- Expected: 400 validation error

## 6) Update quantity to zero
- PUT /api/cart/update/:productId with { quantity: 0 }
- Expected: item removed from cart
