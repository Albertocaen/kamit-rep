const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.querySelector('.modal');
const cartClose = document.querySelector('.close');
const buyBtns = document.querySelectorAll('.buy-btn');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.total-amount');
const checkoutBtn = document.querySelector('.checkout-btn');

let cartCounter = 0;
let cartPriceTotal = 0;

function updateCart() {
  cartItems.innerHTML = '';
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('product-')) {
      const item = JSON.parse(localStorage.getItem(key));
      const cartItem = document.createElement('li');
      cartItem.innerHTML = `${item.name} - $${item.price}`;
      cartItems.appendChild(cartItem);
      cartCounter += item.quantity;
      cartPriceTotal += item.price * item.quantity;
    }
  }
  document.querySelector('.cart-count').textContent = cartCounter;
  cartTotal.textContent = `$${cartPriceTotal}`;
  cartCounter = 0;
  cartPriceTotal = 0;
}

updateCart();

cartIcon.addEventListener('click', () => {
  cartModal.style.display = 'block';
});

cartClose.addEventListener('click', () => {
  cartModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
  if (e.target == cartModal) {
    cartModal.style.display = 'none';
  }
});

buyBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const section = e.target.closest('.product');
    const name = section.querySelector('h3').textContent;
    const price = parseFloat(
      section.querySelector('button').previousElementSibling.textContent.slice(1)
    );
    const key = `product-${name}`;
    const item = JSON.parse(localStorage.getItem(key));
    if (item) {
      item.quantity++;
      localStorage.setItem(key, JSON.stringify(item));
    } else {
      const product = { name, price, quantity: 1 };
      localStorage.setItem(key, JSON.stringify(product));
    }
    updateCart();
  });
});

checkoutBtn.addEventListener('click', () => {
  localStorage.clear();
  updateCart();
  alert('Gracias por su compra!');
});
