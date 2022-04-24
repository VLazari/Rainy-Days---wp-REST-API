import { jacketSpec, nrOfItems } from "./functions.js";

const specContainer = document.querySelector(".jacket-description");
const jacketImg = document.querySelector(".jacket-image");

const urlString = window.location.search;
const urlParams = new URLSearchParams(urlString);
const jacketId = parseInt(urlParams.get("id"));
const url = "https://myprojects.digital/RainyDays//wp-json/wc/store/products/";
const urlSpecJacket = url + jacketId;
let jacketCart = [];
//localStorage.clear();

async function jacketList(fetchUrl) {
	const response = await fetch(fetchUrl);
	const result = await response.json();

	jacketSpec(result, specContainer, jacketImg);

	const addToCart = document.querySelector(".product-add-cart");

	addToCart.addEventListener("click", function () {
		if (localStorage.getItem("Cart Items")) {
			jacketCart = JSON.parse(localStorage.getItem("Cart Items"));
		}
		jacketCart.push(result.id);
		localStorage.setItem("Cart Items", JSON.stringify(jacketCart));
		jacketCart = [];
		nrOfItems();
		alert("Jacket added to cart");
	});

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
