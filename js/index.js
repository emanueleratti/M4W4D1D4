import { ENDPOINT , TOKEN , createCard , cartSlider , addToCart , updateCartTotal, clearCart , addToFavourite } from "./modules/script.js"

cartSlider();
clearCart();

let favourite = JSON.parse(localStorage.getItem('favouriteProducts')) || [];
const favouriteCounter = document.getElementById("fav-counter");
favouriteCounter.textContent = favourite.length;

const getData = async () => {
    const response = await fetch(`${ENDPOINT}`, {
        method: `GET`,
        headers: {
            "Authorization": `${TOKEN}`,
            "Content-Type": `application/json`,
        },
    });
    const data = await response.json();
    
    data.forEach(product => {
        const target = document.getElementById("list-product")

        const {name, description, brand, imageUrl, price, _id} = product;
        createCard(name, description, brand, imageUrl, price, _id, target);
    });

    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn")

    addToCartButtons.forEach((button, id) => {
        button.addEventListener("click", () => {
            addToCart(data[id]);
            updateCartTotal();
        });
    });

    const addToFavouriteButtons = document.querySelectorAll(".add-to-fav-btn")

    addToFavouriteButtons.forEach((button, id) => {
        const favouriteIcon = button.querySelector(".fav-icon"); 
        button.addEventListener("click", () => {
            addToFavourite(data[id], favouriteIcon);
        });
    });
}
getData();