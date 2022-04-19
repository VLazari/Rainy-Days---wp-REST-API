// --- Display function for jackets --->

export function displayJackets(jacketArray, productContainer) {
	jacketArray.forEach((jacket) => {
		productContainer.innerHTML += `
      <div class="product-container">
                <a href="jacket.html?id=${jacket.id}">
                  <div class="image-container" style="background-image: url(${jacket.jacketImg})">
                  </div>
                </a>
                <div class="product-footer">
                  <p class="product-name">${jacket.name} - ${jacket.gender}</p>
                  <p class="product-price">Price: ${jacket.price} NOK</p>
                  <a><p class="product-add-cart" data-jacket-id="${jacket.id}">Add To Cart</p></a>
                </div>
        </div>
      `;
	});
}

// --- Display specific jacket on the jacket page --->

export function jacketSpec(jacketArray, specContainer, id) {
	const jacketSpec = jacketArray.find((element) => element.id === id);
	specContainer.innerHTML = `
  <div>
    <img class="jacket-image" src="${jacketSpec.jacketImg}" alt="${jacketSpec.name}"/>
  </div>
    <div class="jacket-description">
      <h3 class="jacket-name">${jacketSpec.name}</h3>
      <p class="product-price">Price: ${jacketSpec.price}</p>
      <p class="jacket-name">Description:</p>
      <p class="product-description"> ${jacketSpec.description}</p>
      <p class="product-add-cart" data-jacket-id="${jacketSpec.id}">Add To Cart</p>
    </div>
  `;
}

// --- Display the cart content on the side --->

export function cartDisplay(cart, jacket, totalPrice, priceInCart) {
	cart.innerHTML += `<div class="cart-product">
  <div class="cart-jacket-img" style="background-image: url(${jacket.jacketImg})"></div>
  <div class="cart-jacket-name">${jacket.name}</div>
  <div class="cart-jacket-price">${jacket.price} NOK</div>
  <div class="remove-item product-price">Remove item</div>
</div>`;
	totalPrice.innerHTML = `Total: ${priceInCart} NOK`;
}

// --- Display the cart content on cart page --->

export function cartCheckout(cart, jacket) {
	cart.innerHTML += `<div class="cart-jacket">
<div class="cart-img" style="background-image: url(${jacket.jacketImg})"></div>
<div class="product-name">${jacket.name}</div>
<div class="product-price">${jacket.price} NOK</div>
<div>
<select name="size" id="size" class="form__input" required>
  <option value="size">--Size--</option>
  <option value="small">S - small</option>
  <option value="medium">M - medium</option>
  <option value="large">L - large</option>
</select>
<div class="size-error">Please choose size</div>
</div>
<div class="remove-item product-price">Remove item>></div>
<a class="checkout-btn">Checkout</a>
</div>`;
}

// --- Track nr. of items in the cart --->

export function nrOfItems() {
	const nrOfItemsInCart = document.getElementById("items");
	if (localStorage.getItem("Cart Items")) {
		nrOfItemsInCart.innerHTML = `${JSON.parse(localStorage.getItem("Cart Items")).length}`;
	}
}

// --- Form validation functions --->

export function checkLength(value, len) {
	if (value.trim().length > len) {
		return true;
	} else {
		return false;
	}
}

export function formValidation(validateField, error) {
	if (checkLength(validateField.value, 0) === true) {
		error.style.display = "none";
		return true;
	} else {
		error.style.display = "block";
		return false;
	}
}
