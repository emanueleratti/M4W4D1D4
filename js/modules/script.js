export const ENDPOINT = "https://striveschool-api.herokuapp.com/api/product/";
export const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmNjZmMyN2ZlN2VmODAwMTUwNjc2MzMiLCJpYXQiOjE3MjQ3MDk5MjgsImV4cCI6MTcyNTkxOTUyOH0.SHsJcytvHTGPJ6RKRlxhNOvXwy1gk-L3cvGt6KsFq10";

let cart = [];
let totalCart = 0

let favourite = JSON.parse(localStorage.getItem('favouriteProducts')) || [];
const favouriteCounter = document.getElementById("fav-counter");
favouriteCounter.textContent = favourite.length;

/* CREATE CARD FUNCTION */
export function createCard (name, description, brand, imageUrl, price, _id, target) {
    const divToAppend = target;

    let temp = document.getElementsByTagName("template")[0];
    let clone = temp.content.cloneNode(true);

    const productImage = clone.querySelector('.image')
    const productTitle = clone.querySelector('.title')
    const productDescription = clone.querySelector('.description')
    const productBrand = clone.querySelector('.brand')

    const productPrice = clone.querySelector('.price')
    const productLink = clone.querySelector('.link')

    productImage.src = `${imageUrl}`;
    productTitle.textContent = name;

    productDescription.textContent = description;
    productBrand.textContent = brand;

    productPrice.textContent = price;
    productLink.href = `product.html?id=${_id}`

    divToAppend.appendChild(clone);
}

export function cartSlider () {
    const cartBtn = document.getElementById("cart-button")

    cartBtn.addEventListener("click", () => {
        const cartDiv = document.querySelector(".cart");
        if (!cartDiv.classList.contains("slide-left")) {
            cartDiv.classList.add("slide-left");
            cartDiv.classList.remove("slide-right")
        } else if (cartDiv.classList.contains("slide-left")) {
            cartDiv.classList.remove("slide-left");
            cartDiv.classList.add("slide-right")
        }
    })
}

export function addToCart (product) {
    cart.push(product)

    const target = document.getElementById("cart-container")

    let temp = document.getElementsByTagName("template")[1];
    let clone = temp.content.cloneNode(true);

    const productImage = clone.querySelector('.image')
    const productTitle = clone.querySelector('.title')
    const productPrice = clone.querySelector('.price')
    const productLink = clone.querySelector('.link')
    const removeFromCartBtn = clone.querySelector(".remove-from-cart-btn");

    productImage.src = `${product.imageUrl}`; 
    productTitle.textContent = product.name;
    productPrice.textContent = product.price;
    productLink.href = `product.html?id=${product._id}`

    target.appendChild(clone);

    const cartDiv = document.querySelector(".cart");
    if (cartDiv.classList.contains("slide-left")) {
        cartDiv.classList.remove("slide-left");
        cartDiv.classList.add("slide-right")
    }

    removeFromCartBtn.addEventListener("click", () => {
        clone.remove()
    });
}

export function updateCartTotal () {
    let totalCart = cart.reduce((acc, curr) => acc + curr.price, 0);
    
    const totalCartContainer = document.getElementById("cart-total");
    if (totalCartContainer) {
        totalCartContainer.textContent = totalCart, 0;
    }
};

export function clearCart () {
    const clearCartBtn = document.getElementById("clear-cart");
    const target = document.getElementById("cart-container")
    const totalCartContainer = document.getElementById("cart-total");

    clearCartBtn.addEventListener("click", () => {
        target.innerHTML = "";
        totalCartContainer.textContent = 0;
    });
}

export function saveFavToLocalStorage () {
    localStorage.setItem('favouriteProducts', JSON.stringify(favourite));
};

export function addToFavourite (product, favouriteIcon) {
    let favouriteChecked = favourite.includes(product._id);
    favouriteChecked = !favouriteChecked;

    favouriteIcon.setAttribute("name", favouriteChecked ? "bookmark" : "bookmark-outline");

    if (favouriteChecked) {
        favourite.push(product._id)
    } else {
        favourite = favourite.filter(id => id !== product._id);
    }

    favouriteCounter.textContent = favourite.length;

    saveFavToLocalStorage();
}