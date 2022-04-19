import { jacketList } from "./jacket-list.js";

// --- Display jackets --->

import { nrOfItems, cartCheckout } from "./functions.js";

// --- Add to cart --->

const cart = document.querySelector(".cart-items");
const totalPrice = document.querySelector(".product-price");
const emptyCart = document.querySelector(".header-text");
const clearCart = document.querySelector(".remove-items");
const allCart = document.querySelector(".cart-jacket");
let jacketCart = [];
let priceInCart = 0;

if (localStorage.getItem("Cart Items")) {
	jacketCart = jacketCart.concat(JSON.parse(localStorage.getItem("Cart Items")));
	jacketCart.forEach((element) => {
		priceInCart += element.price;
		cartCheckout(cart, element);
		emptyCart.innerHTML = `Your cart:`;
	});
	totalPrice.innerHTML = `Total price: ${priceInCart} NOK`;
	nrOfItems();
} else {
	emptyCart.innerHTML = `Cart is empty`;
	cart.innerHTML = "";
	allCart.style.display = "none";
}

// --- Remove items from cart --->

console.log(allCart);
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
					// emptyCart.innerHTML = `Cart is empty`;
					// totalPrice.innerHTML = `Total price: 0 NOK`;
				}
				jacketCart.forEach((element) => {
					priceInCart += element.price;
					cartCheckout(cart, element);
					totalPrice.innerHTML = `Total price: ${priceInCart} NOK`;
				});
			}
			clearItem = document.querySelectorAll(".remove-item");
			nrOfItems();
			delItem();
		});
	});
}
delItem();
// --- Check size and checkout --->

const checkoutAll = document.querySelector("#checkout-btn");
const checkout = document.querySelectorAll(".checkout-btn");
const size = document.querySelectorAll("#size");

checkoutAll.addEventListener("click", function () {
	checkSize();
	if (checkSize) {
	}
});

checkout.forEach((element) => {
	element.addEventListener("click", function () {
		let size = element.parentElement.querySelector("#size");
		let error = size.nextElementSibling;
		console.log(error);
		if (size.value === "size") {
			error.style.display = "block";
		} else {
			error.style.display = "none";
		}
		// checkSize();
	});
});

function checkSize() {
	size.forEach((element) => {
		let error = element.nextElementSibling;
		if (element.value === "size") {
			error.style.display = "block";
			return false;
		} else {
			error.style.display = "none";
			return true;
		}
	});
}
