function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Количество должно быть положительным целым числом.');
  }

  const existingItem = cart.find((item) => item.id === product.id);
  const newQuantity = (existingItem?.quantity || 0) + quantity;
  if (newQuantity > product.stock) {
    throw new RangeError('Недостаточно товара на складе.');
  }

  if (existingItem) {
    return cart.map((item) => item.id === product.id ? { ...item, quantity: newQuantity } : item);
  }

  return [...cart, { ...product, quantity }];
}
function changeQuantity(cart, productId, quantity) {
  const itemToChange = cart.find((item) => item.id === productId);
  if (!itemToChange) return cart;

  if (!Number.isInteger(quantity) || quantity <= 0 || quantity > itemToChange.stock) {
    throw new RangeError('Количество должно быть положительным и не превышать остаток.');
  }

  return cart.map((item) => item.id === productId ? { ...item, quantity } : item);
}
function removeFromCart() { return notImplemented(); }
function calculateCartSubtotal() { return notImplemented(); }
function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
