let storeDiv = document.querySelector("#store");
let productForm =document.querySelector("#productForm");
let cart=[];

let startProducts = [
    {
        name: "Kobe 6 Protro Grinch",
        price: 500,
        description: "Features a vibrant green snakeskin design with bold red accents",
        image: "https://image.goat.com/1000/attachments/product_template_pictures/images/100/370/355/original/631511_00.png.png",
        category: "shoes",
        picked: false

    },
    {
        name: "KD 17 Still Blue",
        price: 150,
        description: "Vibrant blue low-cut sneaker with soft cushlon foam support",
        image: "kd17.png",
        category: "shoes",
        picked: false
    },
    {
        name: "Air Jordan 1 Mid Chicago",
        price: 120,
        description: "Iconic red, black, and white leather shoe",
        image: "https://limitedresell.com/7440-marketplace_1500/air-jordan-1-mid-chicago-black-toe.jpg",
        category: "shoes",
        picked: false
    },
    {
        name: "Lebron James Lakers Jersey",
        price: 120,
        description: "Classic gold and purple Los Angeles Lakers jersey",
        image: "https://fanatics.frgimages.com/los-angeles-lakers/unisex-nike-lebron-james-gold-los-angeles-lakers-swingman-jersey-icon-edition_ss5_p-200040747+pv-1+u-9ahuglaastmovr3gjzjv+v-davshsoducasxtnimalr.jpg?_hv=2&w=1018",
        category: "jerseys",
        picked: false
    },
    {
        name: "Stephen Curry Warriors Jersey",
        price: 105,
        description: "Classic white home jersery with gold and blue accents",
        image: "https://images.footballfanatics.com/golden-state-warriors/unisex-nike-stephen-curry-white-golden-state-warriors-swingman-jersey-association-edition_pi4650000_ff_4650305-5a3789c93b773e1b33ef_full.jpg?_hv=2",
        category: "jerseys",
        picked: false
    },
    {
        name: "Michael Jordan 1997-98 Bulls Jersey",
        price: 325,
        description: "Classic scarlet red 1997-98 Bulls jersey",
        image: "https://fanatics.frgimages.com/chicago-bulls/mens-mitchell-and-ness-michael-jordan-scarlet-chicago-bulls-1997/98-hardwood-classics-authentic-jersey_pi3902000_altimages_ff_3902287-1c1317b0ddf7fbe59314alt1_full.jpg?_hv=2&w=1018",
        category: "jerseys",
        picked: false
    }
];
let products= JSON.parse(JSON.stringify(startProducts));
let localStorageData=localStorage.getItem("products")
if (localStorageData !=null) {
    products = JSON.parse(localStorageData)
}

function renderProduct(product) {
    let productDiv= document.createElement("div");
    productDiv.classList.add("product");
    storeDiv.append(productDiv);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.addEventListener("change", function() {
        productDiv.classList.toggle("highlight");
        product.picked = checkbox.checked;
        updateButton();
    });
    productDiv.append(checkbox);

    let img = document.createElement("img");
    img.src = product.image;
    productDiv.append(img);

    let title = document.createElement("h1")
    title.innerHTML = product.name;
    productDiv.append(title);

    let desc= document.createElement("p");
    desc.innerHTML= product.description;
    productDiv.append(desc);

    let price = document.createElement("p")
    price.innerHTML = product.price;
    productDiv.append(price);

    let button = document.createElement("button");
    button.innerHTML = "Add to Cart";
    button.addEventListener("click", function() {
        cart.push(product);
        console.log(cart)
    });
    productDiv.append(button);
}
products.forEach(renderProduct);

let selectButton = document.createElement("button");
selectButton.innerHTML= "Add selected to cart";
selectButton.disabled = true;
storeDiv.append(selectButton);

let sortButton = document.createElement("button");
sortButton.innerHTML = "Sort by price";
storeDiv.append(sortButton);

sortButton.addEventListener("click", function() {
    products.sort((a,b) => a.price - b.price);

    storeDiv.innerHTML = "";
    products.forEach(renderProduct);
    storeDiv.append(selectButton);
    storeDiv.append(sortButton);
    storeDiv.append(filter);
});

function updateButton() {
    let selected = products.filter(function(product) {
        return product.picked
    });
    if (selected.length == 0) {
        selectButton.disabled = true;
        selectButton.innerHTML = "Add selected to cart";
    } else {
        selectButton.disabled = false;
        selectButton.innerHTML = "Add " + selected.length + " selected to cart";
    }

}

productForm.addEventListener("submit",(event) => {
    event.preventDefault();

    let newProduct = {
        name: document.querySelector("#nameInput").value,
        price: Number(document.querySelector("#priceInput").value),
        description: document.querySelector("#descriptionInput").value,
        image: document.querySelector("#imageInput").value,
        category: document.querySelector("#categoryInput").value,
        picked: false
    };
   if (newProduct.price>1000) {
    document.querySelector("#errorMessage").innerHTML = "Price cannot be over $1000";
   
   } else {
    document.querySelector("#errorMessage").innerHTML = "";
    products.push(newProduct);
    let jsonStringVersionOfData = JSON.stringify(products);
    localStorage.setItem("products", jsonStringVersionOfData);
    
    storeDiv.innerHTML = "";
    products.forEach(renderProduct);
    storeDiv.append(selectButton);
    storeDiv.append(sortButton);
    storeDiv.append(filter);

    productForm.reset();
   }
});

let resetButton= document.querySelector("#resetButton");
resetButton.addEventListener("click", () => {
    localStorage.removeItem("products");
    products = JSON.parse(JSON.stringify(startProducts));
    storeDiv.innerHTML = "";
    products.forEach(renderProduct);
    storeDiv.append(selectButton)
    storeDiv.append(sortButton)
    storeDiv.append(filter)
});

let categories = ["all", "shoes", "jerseys"];
let filter=document.createElement("select");
storeDiv.append(filter);

for (let category of categories) {
    let option = document.createElement("option");
    option.value = category;
    option.innerHTML = category;
    filter.append(option);
}

filter.addEventListener("change", function() {
    let selected;
    if (filter.value == "all") {
        selected = products;
    } else {
        selected = products.filter(function(product) {
            return product.category == filter.value;
        });
    }
    storeDiv.innerHTML = "";
    selected.forEach(renderProduct);
    storeDiv.append(selectButton);
    storeDiv.append(sortButton)
    storeDiv.append(filter);
});