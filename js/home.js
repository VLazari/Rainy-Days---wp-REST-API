//import { jacketList } from "./jacket-list.js";
//import { displayJackets, nrOfItems } from "./functions.js";
const urlFeatured = "https://myprojects.digital/RainyDays//wp-json/wc/store/products?featured=true";
const bestSellerProducts = document.querySelector(".box3");
// const bestSellerJacket = jacketList.filter((jacket) => jacket.bestSeller === true);
// displayJackets(bestSellerJacket, bestSellerProducts);

function displayJackets(result, productContainer) {
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

async function jacketList(url) {
	const response = await fetch(url);
	const result = await response.json();
	let test = result;
	console.log((test += `?category="Male"`));
	displayJackets(result, bestSellerProducts);
}

jacketList(urlFeatured);

// function featuredJackets(){
// 	// function displayJackets(jacketArray, productContainer) {
// 		jacketArray.forEach((jacket) => {
// 			productContainer.innerHTML += `
// 				<div class="product-container">
// 									<a href="jacket.html?id=${jacket.id}">
// 										<div class="image-container" style="background-image: url(${jacket.jacketImg})">
// 										</div>
// 									</a>
// 									<div class="product-footer">
// 										<p class="product-name">${jacket.name} - ${jacket.gender}</p>
// 										<p class="product-price">Price: ${jacket.price} NOK</p>
// 										<a><p class="product-add-cart" data-jacket-id="${jacket.id}">Add To Cart</p></a>
// 									</div>
// 					</div>
// 				`;
// 		});
// 	}
// }

// // --- Display best seller jackets --->

// const bestSellerProducts = document.querySelector(".box3");
// const bestSellerJacket = jacketList.filter((jacket) => jacket.bestSeller === true);
// displayJackets(bestSellerJacket, bestSellerProducts);

// // --- Add to cart --->

// const cartButtons = document.querySelectorAll(".product-add-cart");
// const cart = document.querySelector(".cart-items");
// let jacketCart = [];

// if (localStorage.getItem("Cart Items")) {
// 	jacketCart = jacketCart.concat(JSON.parse(localStorage.getItem("Cart Items")));
// }

// cartButtons.forEach((button) => {
// 	button.addEventListener("click", function () {
// 		const jacketId = parseInt(button.dataset.jacketId);
// 		const jacket = jacketList.find((element) => element.id === jacketId);
// 		jacketCart.push(jacket);
// 		localStorage.setItem("Cart Items", JSON.stringify(jacketCart));
// 		nrOfItems();
// 		alert("Jacket added to cart");
// 	});
// });
