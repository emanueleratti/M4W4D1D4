import { createCard , ENDPOINT , TOKEN } from "./modules/script.js"

const insertBtn = document.getElementById("insert-btn")
const addBtn = document.getElementById("add-btn")
const deleteBtn = document.getElementById("delete-btn")
const saveBtn = document.getElementById("save-btn")
const resetBtn = document.getElementById("reset-btn")
const cancelBtn = document.getElementById("cancel-btn")

let product = {};
let originalProduct = {};

/* INSERT PRODUCT */
insertBtn.addEventListener ('click', (e) => {
    e.preventDefault()

    /* FORM VALIDATION */
    const form = document.querySelector('form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const name = document.getElementById("name").value
    const description = document.getElementById("description").value
    const brand = document.getElementById("brand").value
    const imageUrl = document.getElementById("img-url").value
    const price = document.getElementById("price").value

    const target = document.getElementById("preview-product")
    target.innerHTML = "";
    const _id = "";

    createCard(name, description, brand, imageUrl, price, _id, target)

    product = {
        name: name,
        description: description,
        brand: brand,
        imageUrl: imageUrl,
        price: Number(price),
    }
})

/* ADD PRODUCT */
addBtn.addEventListener ('click', (e) => {
    e.preventDefault()

    const postData = async (product) => {
        const target = document.getElementById("preview-product")
        const form = document.querySelector('form');

        const response = await fetch(`${ENDPOINT}`, {
            method: `POST`,
            headers: {
                "Authorization": `${TOKEN}`,
                "Content-Type": `application/json`,
            }, 
            body: JSON.stringify(product),
        });
        const data = await response.json();
        
        await getData();
        alert("Prodotto aggiunto con successo!")
        target.innerHTML = "";
        form.reset();
        return data;
    }
    postData(product)
 })


/* DELETE PREVIEW */
deleteBtn.addEventListener ('click', () => {
    const form = document.querySelector('form');
    const target = document.getElementById("preview-product")
    target.innerHTML = "";
    form.reset();
})

/* GET PRODUCT LIST */
const getData = async () => {
    const response = await fetch(`${ENDPOINT}`, {
        method: `GET`,
        headers: {
            "Authorization": `${TOKEN}`,
            "Content-Type": `application/json`,
        },
    });
    const data = await response.json();
    
    const target = document.getElementById("list-product")
    target.innerHTML = "";

    data.forEach(product => {
        const {name, description, brand, imageUrl, price, _id} = product;

        const tr = document.createElement("tr")
        tr.scope = "row"
        const thId = document.createElement("th")
        const tdName = document.createElement("td")
        const tdDescription = document.createElement("td")
        const tdBrand = document.createElement("td")
        const tdPrice = document.createElement("td")
        const tdImageUrl = document.createElement("td")
        const tdEditBtn = document.createElement("td")
        const editBtn = document.createElement("button")
        const tdRemoveBtn = document.createElement("td")
        const removeBtn = document.createElement("button")
   
        thId.textContent = _id
        tdName.textContent = name
        tdDescription.textContent = description
        tdBrand.textContent = brand
        tdPrice.textContent = price
        tdImageUrl.textContent = imageUrl
        editBtn.textContent = "Edit"
        editBtn.classList.add("btn", "btn-sm", "btn-warning")
        removeBtn.textContent = "Remove"
        removeBtn.classList.add("btn", "btn-sm", "btn-danger")

        /* REMOVE PRODUCT FROM DATABASE */
        removeBtn.addEventListener ('click', async () => {
            const confirmed = confirm('Sei sicuro di voler eliminare?')
            if(confirmed) {
                const response = await fetch(`${ENDPOINT}/${_id}`, {
                    method: `DELETE`,
                    headers: {
                        "Authorization": `${TOKEN}`,
                        "Content-Type": `application/json`,
                    },
                });
                if (response.ok) {
                    alert("Prodotto eliminato con successo!")
                    tr.remove();
                }
            }
        })

        /* EDIT PRODUCT */
        editBtn.addEventListener ("click", () => {
            const target = document.getElementById("edit-product")
            target.innerHTML = "";

            const form = document.createElement("form")
            const inputName = document.createElement("input")
            const inputDescription = document.createElement("input")
            const inputBrand = document.createElement("input")
            const inputImageUrl = document.createElement("input")
            const inputPrice = document.createElement("input")
        
            form.classList.add("d-flex", "flex-column", "gap-2")

            inputName.id = "updatedName"
            inputName.type = "text"
            inputName.classList.add("form-control")
            inputName.value = name;

            inputDescription.id = "updatedDescription"
            inputDescription.type = "text"
            inputDescription.classList.add("form-control")
            inputDescription.value = description;

            inputBrand.id = "updatedBrand"
            inputBrand.type = "text"
            inputBrand.classList.add("form-control")
            inputBrand.value = brand;

            inputImageUrl.id = "updatedImageUrl"
            inputImageUrl.type = "text"
            inputImageUrl.classList.add("form-control")
            inputImageUrl.value = imageUrl;

            inputPrice.id = "updatedPrice"
            inputPrice.type = "text"
            inputPrice.classList.add("form-control", "mb-2")
            inputPrice.value = price;
        
            form.append(inputName, inputDescription, inputBrand, inputImageUrl, inputPrice);
            target.appendChild(form)

            originalProduct = {
                name: name,
                description: description,
                brand: brand,
                imageUrl: imageUrl,
                price: price,
            };

            /* SAVE UPDATED PRODUCT */
            saveBtn.addEventListener ('click', async (e) => {
                e.preventDefault()
    
                const name = document.getElementById("updatedName").value
                const description = document.getElementById("updatedDescription").value
                const brand = document.getElementById("updatedBrand").value
                const imageUrl = document.getElementById("updatedImageUrl").value
                const price = document.getElementById("updatedPrice").value
            
                const updatedProduct = {
                    name: name,
                    description: description,
                    brand: brand,
                    imageUrl: imageUrl,
                    price: Number(price),
                }

                const response = await fetch(`${ENDPOINT}/${_id}`, {
                    method: `PUT`,
                    headers: {
                        "Authorization": `${TOKEN}`,
                        "Content-Type": `application/json`,
                    },
                    body: JSON.stringify(updatedProduct),
                });
                if (response.ok) {
                    await getData();
                    alert("Prodotto modificato con successo!");
                    target.innerHTML = "";
                }
            })

            /* RESET EDIT CHANGES */
            resetBtn.addEventListener('click', (e) => {
                e.preventDefault();
            
                const name = document.getElementById("updatedName")
                const description = document.getElementById("updatedDescription")
                const brand = document.getElementById("updatedBrand")
                const imageUrl = document.getElementById("updatedImageUrl")
                const price = document.getElementById("updatedPrice")

                name.value = originalProduct.name;
                description.value = originalProduct.description;
                brand.value = originalProduct.brand;
                imageUrl.value = originalProduct.imageUrl;
                price.value = originalProduct.price;
            })

            /* DELETE PRODUCT */
            cancelBtn.addEventListener ('click', () => {
                const target = document.getElementById("edit-product")
                target.innerHTML = "";
            })
        })

        tdEditBtn.appendChild(editBtn)
        tdRemoveBtn.appendChild(removeBtn)
        tr.append(thId, tdName, tdDescription, tdBrand, tdPrice, tdImageUrl, tdEditBtn, tdRemoveBtn)
        target.appendChild(tr)
    });
}
getData();
