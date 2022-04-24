// --- Display jackets --->

import { nrOfItems, cartCheckout } from "./functions.js";

// --- Add to cart --->

const cart = document.querySelector(".cart-items");
const totalPrice = document.querySelector(".product-price");
const emptyCart = document.querySelector(".header-text");
const clearCart = document.querySelector(".remove-items");
const allCart = document.querySelector(".cart-jacket");
const url = "https://myprojects.digital/RainyDays//wp-json/wc/store/products/";
let jacketCart = [];
let priceInCart = 0;

async function jacketList(url) {
	const response = await fetch(url);
	const result = await response.json();

	if (localStorage.getItem("Cart Items")) {
		jacketCart = JSON.parse(localStorage.getItem("Cart Items"));
		jacketCart.forEach((element) => {
			for (let i = 0; i < result.length; i++) {
				if (result[i].id === element) {
					priceInCart += parseInt(result[i].prices.price);
					cartCheckout(cart, result[i]);
					emptyCart.innerHTML = `Your cart:`;
				}
			}
		});
		totalPrice.innerHTML = `Total price: ${priceInCart} NOK`;
		nrOfItems();
	} else {
		emptyCart.innerHTML = `Cart is empty`;
		cart.innerHTML = "";
		allCart.style.display = "none";
	}

	// --- Remove items from cart --->

	clearCart.onclick = function () {
		localStorage.clear();
		location.reload();
	};

	let clearItem = document.querySelectorAll(".remove-item");

	function delItem() {
		clearItem.forEach((button, id) => {
			button.addEventListener("click", function () {
				jacketCart.splice(id, 1);
				localStorage.setItem("Cart Items", JSON.stringify(jacketCart));
				if (localStorage.getItem("Cart Items")) {
					cart.innerHTML = "";
					priceInCart = 0;
					if (jacketCart.length === 0) {
						allCart.style.display = "none";
						emptyCart.innerHTML = `Cart is empty`;
						totalPrice.innerHTML = `Total price: 0 NOK`;
					}
					jacketCart = JSON.parse(localStorage.getItem("Cart Items"));
					jacketCart.forEach((element) => {
						for (let i = 0; i < result.length; i++) {
							if (result[i].id === element) {
								priceInCart += parseInt(result[i].prices.price);
								cartCheckout(cart, result[i]);
								emptyCart.innerHTML = `Your cart:`;
							}
						}
					});
					totalPrice.innerHTML = `Total price: ${priceInCart} NOK`;
					nrOfItems();
				} else {
					emptyCart.innerHTML = `Cart is empty`;
					cart.innerHTML = "";
					allCart.style.display = "none";
				}
				clearItem = document.querySelectorAll(".remove-item");
				nrOfItems();
				sizeAll = document.querySelectorAll(".size");
				colorAll = document.querySelectorAll(".color");
				delItem();
				changeImage();
				individualSizeColor();
			});
		});
	}
	delItem();

	// --- Check size and checkout --->

	const checkoutAll = document.querySelector("#checkout-btn");
	let checkout = document.querySelectorAll(".checkout-btn");
	let sizeAll = document.querySelectorAll(".size");
	let colorAll = document.querySelectorAll(".color");

	checkoutAll.addEventListener("click", function () {
		checkSizeAndColor();
	});

	function individualSizeColor() {
		checkout = document.querySelectorAll(".checkout-btn");
		sizeAll = document.querySelectorAll(".size");
		colorAll = document.querySelectorAll(".color");
		checkout.forEach((element) => {
			element.addEventListener("click", function () {
				let size = element.parentElement.querySelector(".size");
				let sizeError = element.parentElement.querySelector(".size-error");
				let color = element.parentElement.querySelector(".color");
				let colorError = element.parentElement.querySelector(".color-error");
				if (size.value === "") {
					sizeError.style.display = "block";
				} else {
					sizeError.style.display = "none";
				}
				if (color.value === "") {
					colorError.style.display = "block";
				} else {
					colorError.style.display = "none";
				}
			});
		});
	}
	individualSizeColor();

	function checkSizeAndColor() {
		sizeAll.forEach((element) => {
			let error = element.parentElement.parentElement.querySelector(".size-error");
			if (element.value === "") {
				error.style.display = "block";
			} else {
				error.style.display = "none";
			}
		});
		colorAll.forEach((element) => {
			let error = element.parentElement.parentElement.querySelector(".color-error");
			if (element.value === "") {
				error.style.display = "block";
			} else {
				error.style.display = "none";
			}
		});
	}

	function changeImage() {
		let variationUrl = url;
		colorAll.forEach((element) => {
			element.addEventListener("change", (event) => {
				for (let i = 0; i < result.length; i++) {
					if (result[i].id == element.id) {
						for (let j = 0; j < result[i].variations.length; j++) {
							if (result[i].variations[j].attributes[1].value === event.target.value.toLowerCase()) {
								variationUrl = url + result[i].variations[j].id;

								async function jacketImgChange(fetchUrl) {
									const variationResponse = await fetch(fetchUrl);
									const variationResult = await variationResponse.json();
									element.parentElement.parentElement.parentElement.firstElementChild.style.backgroundImage = `url(${variationResult.images[0].src})`;
								}
								jacketImgChange(variationUrl);
							}
						}
					}
				}
			});
		});
	}
	changeImage();
}

jacketList(url);
