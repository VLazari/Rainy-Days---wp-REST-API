import { jacketList } from "./jacket-list.js";
import { jacketSpec, nrOfItems } from "./functions.js";

const specContainer = document.querySelector(".jacket-spec");

const urlString = window.location.search;
const urlParams = new URLSearchParams(urlString);
const jacketId = parseInt(urlParams.get("id"));
let jacketCart = [];

jacketSpec(jacketList, specContainer, jacketId);

const addToCart = document.querySelector(".product-add-cart");

addToCart.addEventListener("click", function () {
	const jacket = jacketList.find((element) => element.id === jacketId);
	jacketCart = jacketCart.concat(JSON.parse(localStorage.getItem("Cart Items")));
	jacketCart.push(jacket);
	localStorage.setItem("Cart Items", JSON.stringify(jacketCart));
	nrOfItems();
	alert("Jacket added to cart");
});
