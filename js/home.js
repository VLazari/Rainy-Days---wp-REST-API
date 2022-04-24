import { displayJackets, nrOfItems } from "./functions.js";
const urlFeatured = "https://myprojects.digital/RainyDays//wp-json/wc/store/products?featured=true";
const bestSellerProducts = document.querySelector(".box3");

async function jacketList(url) {
	const response = await fetch(url);
	const result = await response.json();

	displayJackets(result, bestSellerProducts);

	// --- Add to cart --->

	const cartButtons = document.querySelectorAll(".product-add-cart");
	const cart = document.querySelector(".cart-items");
	let jacketCart = [];

	if (localStorage.getItem("Cart Items")) {
		jacketCart = JSON.parse(localStorage.getItem("Cart Items"));
	}

	cartButtons.forEach((button) => {
		button.addEventListener("click", function () {
			const jacketId = parseInt(button.dataset.jacketId);
			result.forEach((element) => {
				if (element.id === jacketId) {
					jacketCart.push(element.id);
				}
			});
			localStorage.setItem("Cart Items", JSON.stringify(jacketCart));
			nrOfItems();
			alert("Jacket added to cart");
		});
	});
}

jacketList(urlFeatured);
