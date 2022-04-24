export function displayJackets(result, productContainer) {
	result.forEach((jacket) => {
		productContainer.innerHTML += `
						<div class="product-container">
											<a href="jacket.html?id=${jacket.id}">
												<div class="image-container" style="background-image: url(${jacket.images[0].src})">
												</div>
											</a>
											<div class="product-footer">
												<p class="product-name">${jacket.name} - ${jacket.categories[0].name}</p>
												<p class="product-price">Price: ${jacket.prices.price} NOK</p>
												<a><p class="product-add-cart" data-jacket-id="${jacket.id}">Add To Cart</p></a>
											</div>
							</div>
						`;
	});
}
// --- Display specific jacket on the jacket page --->

export function jacketSpec(jacketArray, specContainer, jacketImg) {
	let jacketColors = `<div>
                         <select id="color" name="color" class="form__input">
                         <option disabled selected value> -- Color -- </option>`;
	jacketArray.attributes[1].terms.forEach((element) => (jacketColors += `<option value="${element.name}">${element.name}</option>`));
	jacketColors += `</select></div>`;

	jacketImg.src = jacketArray.images[0].src;

	specContainer.innerHTML = `
    <h3 class="jacket-name">${jacketArray.name}</h3>
    <p class="product-price">Price: ${jacketArray.prices.price}</p>
    ${jacketColors}
    <p class="jacket-name">Description:</p>
    <div class="product-description">${jacketArray.description}</div>
    <p class="product-add-cart" data-jacket-id="${jacketArray.id}">Add To Cart</p>
  `;
}

// --- Track nr. of items in the cart --->

export function nrOfItems() {
	const nrOfItemsInCart = document.getElementById("items");
	if (localStorage.getItem("Cart Items")) {
		nrOfItemsInCart.innerHTML = `${JSON.parse(localStorage.getItem("Cart Items")).length}`;
	}
}

// --- Display the cart content on the side --->

export function cartDisplay(cart, jacket, totalPrice, priceInCart) {
	cart.innerHTML += `<div class="cart-product">
  <div class="cart-jacket-img" style="background-image: url(${jacket.images[0].src})"></div>
  <div class="cart-jacket-name">${jacket.name}</div>
  <div class="cart-jacket-price">${jacket.prices.price} NOK</div>
  <div class="remove-item product-price">Remove item</div>
</div>`;
	totalPrice.innerHTML = `Total: ${priceInCart} NOK`;
}
//************************************************** */
//--- Display the cart content on cart page --->

export function cartCheckout(cart, jacket) {
	let jacketColors = `<div>
                         <select id="${jacket.id}" name="color" class="form__input color" required>
                         <option disabled selected value>-- Color --</option>`;

	jacket.attributes[1].terms.forEach((element) => (jacketColors += `<option value="${element.name}">${element.name}</option>`));
	jacketColors += `</select></div>
                  <div class="color-error">Please choose color</div>`;

	let jacketSize = `<div>
                         <select id="${jacket.id}" name="size" class="form__input size" required>
                         <option disabled selected value>-- Size --</option>`;

	jacket.attributes[0].terms.forEach((element) => (jacketSize += `<option value="${element.name}">${element.name}</option>`));
	jacketSize += `</select></div>
                <div class="size-error">Please choose size</div>`;

	//jacketImg.src = jacketArray.images[0].src;

	cart.innerHTML += `<div class="cart-jacket">
                      <div class="cart-img" style="background-image: url(${jacket.images[0].src})"></div>
                      <div class="product-name">${jacket.name}</div>
                      <div class="product-price">${jacket.prices.price} NOK</div>
                      <div>
                        ${jacketColors}
                      </div>
                      <div>
                        ${jacketSize}
                      </div>
                      <div class="remove-item product-price">Remove item>></div>
                      <a class="checkout-btn">Checkout</a>
                    </div>`;
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
