import { jacketList } from "./jacket-list.js";

// --- Display jackets --->

import { displayJackets, nrOfItems, cartDisplay } from "./functions.js";
const prod = document.querySelector(".products-list");
const urlString = window.location.search;
const urlParams = new URLSearchParams(urlString);
const gen = urlParams.get("gender");

if (gen === "male") {
	const maleJacket = jacketList.filter((jacket) => jacket.gender === "male");
	displayJackets(maleJacket, prod);
} else if (gen === "female") {
	const femaleJacket = jacketList.filter((jacket) => jacket.gender === "female");
	displayJackets(femaleJacket, prod);
} else {
	displayJackets(jacketList, prod);
}

// --- Add to cart --->
//localStorage.clear();

const cartButtons = document.querySelectorAll(".product-add-cart");
const cart = document.querySelector(".cart-items");
const totalPrice = document.querySelector(".total-price");
const emptyCart = document.querySelector(".empty-cart");
let jacketCart = [];
let priceInCart = 0;

if (localStorage.getItem("Cart Items")) {
	jacketCart = jacketCart.concat(JSON.parse(localStorage.getItem("Cart Items")));
	jacketCart.forEach((element) => {
		priceInCart += element.price;
		cartDisplay(cart, element, totalPrice, priceInCart);
		emptyCart.innerHTML = `Your cart:`;
	});
	nrOfItems();
}

let deleteButtons = document.querySelectorAll(".remove-item");

cartButtons.forEach((button) => {
	button.addEventListener("click", function () {
		const jacketId = parseInt(button.dataset.jacketId);
		const jacket = jacketList.find((element) => element.id === jacketId);
		jacketCart.push(jacket);
		priceInCart += jacket.price;
		cartDisplay(cart, jacket, totalPrice, priceInCart);
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
				priceInCart += element.price;
				console.log(priceInCart);
				cartDisplay(cart, element, totalPrice, priceInCart);
			});
			deleteButtons = document.querySelectorAll(".remove-item");
			nrOfItems();
			delItem();
		});
	});
}
delItem();
