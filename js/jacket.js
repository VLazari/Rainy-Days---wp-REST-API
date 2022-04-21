// import { jacketList } from "./jacket-list.js";
import { jacketSpec } from "./functions.js";

const specContainer = document.querySelector(".jacket-description");
const jacketImg = document.querySelector(".jacket-image");

const urlString = window.location.search;
const urlParams = new URLSearchParams(urlString);
const jacketId = parseInt(urlParams.get("id"));
const url = "https://myprojects.digital/RainyDays//wp-json/wc/store/products/";
const urlSpecJacket = url + jacketId;
let jacketCart = [];

async function jacketList(fetchUrl) {
	const response = await fetch(fetchUrl);
	const result = await response.json();

	jacketSpec(result, specContainer, jacketImg);

	const jacketImgColor = document.querySelector("#color");
	let variationId = jacketId;
	jacketImgColor.addEventListener("change", (event) => {
		for (let i = 0; i < result.variations.length; i++) {
			if (result.variations[i].attributes[1].value === event.target.value.toLowerCase()) {
				variationId = result.variations[i].id;
				break;
			}
		}
		let variationUrl = url + variationId;

		async function jacketImgChange(fetchUrl) {
			const variationResponse = await fetch(fetchUrl);
			const variationResult = await variationResponse.json();
			jacketImg.src = variationResult.images[0].src;
		}
		jacketImgChange(variationUrl);
	});
}

jacketList(urlSpecJacket);

//------------->

// export function jacketSpec(jacketArray, specContainer) {
// 	specContainer.innerHTML = `
//   <div>
//     <img class="jacket-image" src="${jacketArray.images[0].src}" alt="${jacketArray.name}"/>
//   </div>
//     <div class="jacket-description">
//       <h3 class="jacket-name">${jacketArray.name}</h3>
//       <p class="product-price">Price: ${jacketArray.prices.price}</p>
//       <p class="jacket-name">Description:</p>
//       <p class="product-description"> ${jacketArray.description}</p>
//       <p class="product-add-cart" data-jacket-id="${jacketArray.id}">Add To Cart</p>
//     </div>
//   `;
// }
// import { jacketList } from "./jacket-list.js";
// import { jacketSpec, nrOfItems } from "./functions.js";

// const specContainer = document.querySelector(".jacket-spec");

// const urlString = window.location.search;
// const urlParams = new URLSearchParams(urlString);
// const jacketId = parseInt(urlParams.get("id"));
// let jacketCart = [];

// jacketSpec(jacketList, specContainer, jacketId);

// const addToCart = document.querySelector(".product-add-cart");

// addToCart.addEventListener("click", function () {
// 	const jacket = jacketList.find((element) => element.id === jacketId);
// 	jacketCart = jacketCart.concat(JSON.parse(localStorage.getItem("Cart Items")));
// 	jacketCart.push(jacket);
// 	localStorage.setItem("Cart Items", JSON.stringify(jacketCart));
// 	nrOfItems();
// 	alert("Jacket added to cart");
// });
