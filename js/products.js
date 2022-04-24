import { displayJackets, cartDisplay, nrOfItems } from "./functions.js";
const prod = document.querySelector(".products-list");
const urlString = window.location.search;
const urlParams = new URLSearchParams(urlString);
const gen = urlParams.get("gender");
const url = "https://myprojects.digital/RainyDays//wp-json/wc/store/products";
let urlJackets = url;

if (gen === "male") {
	urlJackets = url + "?category=19";
} else if (gen === "female") {
	urlJackets = url + "?category=20";
}

async function jacketList(url) {
	const response = await fetch(url);
	const result = await response.json();

	displayJackets(result, prod);
}

jacketList(urlJackets);

async function jacketInCart(url) {
	const response = await fetch(url);
	const result = await response.json();

	// --- Add to cart --->
	//localStorage.clear();

	const cartButtons = document.querySelectorAll(".product-add-cart");
	const cart = document.querySelector(".cart-items");
	const totalPrice = document.querySelector(".total-price");
	const emptyCart = document.querySelector(".empty-cart");
	let jacketCart = [];
	let priceInCart = 0;

	if (localStorage.getItem("Cart Items")) {
		jacketCart = JSON.parse(localStorage.getItem("Cart Items"));
		jacketCart.forEach((element) => {
			for (let i = 0; i < result.length; i++) {
				if (result[i].id === element) {
					priceInCart += parseInt(result[i].prices.price);
					cartDisplay(cart, result[i], totalPrice, priceInCart);
				}
			}
			emptyCart.innerHTML = `Your cart:`;
		});
		nrOfItems();
	}

	let deleteButtons = document.querySelectorAll(".remove-item");

	cartButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const jacketId = parseInt(button.dataset.jacketId);
			if (localStorage.getItem("Cart Items")) {
				jacketCart = JSON.parse(localStorage.getItem("Cart Items"));
			}
			jacketCart.push(jacketId);
			result.forEach((element) => {
				if (element.id === jacketId) {
					priceInCart += parseInt(element.prices.price);
					cartDisplay(cart, element, totalPrice, priceInCart);
				}
			});
			emptyCart.innerHTML = `Your cart:`;
			localStorage.setItem("Cart Items", JSON.stringify(jacketCart));
			nrOfItems();
			deleteButtons = document.querySelectorAll(".remove-item");
			delItem();
			alert("Jacket added to cart");
		});
	});

	// --- Remove jacket from cart --->

	function delItem() {
		deleteButtons.forEach((button, id) => {
			button.addEventListener("click", function () {
				jacketCart.splice(id, 1);
				localStorage.setItem("Cart Items", JSON.stringify(jacketCart));
				cart.innerHTML = "";
				priceInCart = 0;
				if (jacketCart.length === 0) {
					emptyCart.innerHTML = `Cart is empty`;
					totalPrice.innerHTML = `Total: 0 NOK`;
				}
				jacketCart.forEach((element) => {
					for (let i = 0; i < result.length; i++) {
						if (result[i].id === element) {
							priceInCart += parseInt(result[i].prices.price);
							cartDisplay(cart, result[i], totalPrice, priceInCart);
						}
					}
				});
				deleteButtons = document.querySelectorAll(".remove-item");
				nrOfItems();
				delItem();
			});
		});
	}
	delItem();
}

jacketInCart(url);
