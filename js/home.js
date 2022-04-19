import { jacketList } from "./jacket-list.js";
import { displayJackets, nrOfItems } from "./functions.js";

// --- Display best seller jackets --->

const bestSellerProducts = document.querySelector(".box3");
const bestSellerJacket = jacketList.filter((jacket) => jacket.bestSeller === true);
displayJackets(bestSellerJacket, bestSellerProducts);

// --- Add to cart --->

const cartButtons = document.querySelectorAll(".product-add-cart");
const cart = document.querySelector(".cart-items");
let jacketCart = [];

if (localStorage.getItem("Cart Items")) {
	jacketCart = jacketCart.concat(JSON.parse(localStorage.getItem("Cart Items")));
}

cartButtons.forEach((button) => {
	button.addEventListener("click", function () {
		const jacketId = parseInt(button.dataset.jacketId);
		const jacket = jacketList.find((element) => element.id === jacketId);
		jacketCart.push(jacket);
		localStorage.setItem("Cart Items", JSON.stringify(jacketCart));
		nrOfItems();
		alert("Jacket added to cart");
	});
});
