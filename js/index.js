import { ENDPOINT , TOKEN , createCard , cartSlider , addToCart , updateCartTotal, clearCart } from "./modules/script.js"

cartSlider();
clearCart();

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
}
getData();