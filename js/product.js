import { ENDPOINT , TOKEN , createCard , cartSlider , addToCart , updateCartTotal, clearCart } from "./modules/script.js"

cartSlider();
clearCart();

const getData = async () => {
    const url = new URLSearchParams(location.search);
    
    if(!url.has('id')) {
        location.href = '/'
        return
    }

    const _id = url.get('id');    
    const target = document.getElementById("product-card")
    const moreInformation = document.getElementById("product-information")

    const response = await fetch(`${ENDPOINT}/${_id}`, {
        method: `GET`,
        headers: {
            "Authorization": `${TOKEN}`,
            "Content-Type": `application/json`,
        },
    });
    const data = await response.json();

    createCard(data.name, data.description, data.brand, data.imageUrl, data.price, _id, target);

    const div = document.createElement("div")
    div.classList.add("col-8", "d-flex", "flex-column")
    const h5 = document.createElement("h5")
    h5.textContent = "More Information"
    const p = document.createElement("p")
    p.textContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel malesuada enim. Sed auctor imperdiet enim in feugiat. Proin quis ex sit amet nibh semper fringilla eu a nisl. Etiam venenatis metus quis nibh fringilla ultrices tincidunt ut enim. Quisque in imperdiet ipsum. Nullam consectetur suscipit ullamcorper. Cras nec lorem augue. Integer pulvinar, enim sed faucibus pharetra, mauris sapien sodales sapien, non bibendum purus ligula vel odio. Pellentesque hendrerit ante metus, non aliquam dui ultricies ac. Donec a odio et urna suscipit maximus vitae in justo. Pellentesque vehicula eros a porta rhoncus. Phasellus feugiat varius nunc id finibus."

    div.append(h5, p)
    moreInformation.appendChild(div)

    const addToCartBtn = document.querySelector(".add-to-cart-btn")

    addToCartBtn.addEventListener("click", () => {
        addToCart(data);
        updateCartTotal();
    });
}
getData();