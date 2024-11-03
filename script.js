
document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("product-modal");
  const closeButton = document.querySelector(".close-button");
  const productName = document.getElementById("product-name");
  const productBrand = document.getElementById("product-brand");
  const productPrice = document.getElementById("product-price");
  const productOs = document.getElementById("product-os");
  const productRam = document.getElementById("product-ram");
  const productSize = document.getElementById("product-size");

  // Handle "View Details" button click
  document.querySelectorAll(".view-details-button").forEach(button => {
      button.addEventListener("click", function () {
          const product = this.closest(".product");
          productName.textContent = product.dataset.name;
          productBrand.textContent = `Brand: ${product.dataset.brand}`;
          productPrice.textContent = `Price: Rs.${product.dataset.price}`;
          productOs.textContent = `OS: ${product.dataset.os}`;
          productRam.textContent = `RAM: ${product.dataset.ram}GB`;
          productSize.textContent = `Size: ${product.dataset.size} inches`;

          modal.style.display = "block";
      });
  });

  // Close modal when clicking the close button
  closeButton.addEventListener("click", function () {
      modal.style.display = "none";
  });

  // Close modal when clicking outside the modal content
  window.addEventListener("click", function (event) {
      if (event.target === modal) {
          modal.style.display = "none";
      }
  });
});



// Add to Cart functionality on product page




document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".add-to-cart-button").forEach(button => {
    button.addEventListener("click", function () {
      const productElement = this.closest(".product");
      const productId = productElement.getAttribute("data-id");
      const productName = productElement.getAttribute("data-name");
      const productPrice = parseFloat(productElement.getAttribute("data-price"));
      const productImage = productElement.querySelector("img").src; // Get the product image URL
      // console.log(productName, productPrice, productImage);
      // console.log(productName);
      let cart = JSON.parse(localStorage.getItem("cart")) || {};
      // console.log(cart);
      // Check if the product is already in the cart and update the quantity
      if (cart[productId]) {
        cart[productId].quantity += 1;
      } else {
        // Add new product to the cart, including the image URL
        cart[productId] = { name: productName, price: productPrice, quantity: 1, image: productImage };
      }
      console.log(cart[productId]);
      // Save updated cart back to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${productName} added to cart!`);
    });
  });
});

// Load and display cart items on the cart page
function loadCartData() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotalContainer = document.getElementById("cart-total");

  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  cartItemsContainer.innerHTML = ""; // Clear previous cart items
  let total = 0;

  for (let productId in cart) {
    const item = cart[productId];
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    // Create cart item div
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    // Product details div
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("cart-item-details");

    // Product image
    const imgDiv = document.createElement("div");
    imgDiv.classList.add("cart-item-image");
    const img = document.createElement("img");
    img.src = item.image; // Use the image URL stored in the cart
    img.alt = item.name;
    imgDiv.appendChild(img);

    // Product name and quantity
    const nameDiv = document.createElement("div");
    const productName = document.createElement("p");
    productName.classList.add("cart-item-name");
    productName.textContent = item.name;
    const productQuantity = document.createElement("p");
    productQuantity.classList.add("cart-item-quantity");
    productQuantity.textContent = `Quantity: ${item.quantity}`;
    nameDiv.appendChild(productName);
    nameDiv.appendChild(productQuantity);

    detailsDiv.appendChild(imgDiv);
    detailsDiv.appendChild(nameDiv);

    // Product price
    const priceDiv = document.createElement("div");
    priceDiv.classList.add("cart-item-price");
    priceDiv.textContent = `Rs.${itemTotal.toFixed(2)}`;

    // Append details and price to cart item
    cartItem.appendChild(detailsDiv);
    cartItem.appendChild(priceDiv);
    cartItemsContainer.appendChild(cartItem);
  }

  cartTotalContainer.textContent = total.toFixed(2); // Update total
}

// Load cart data when cart.html page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadCartData);
} else {
  loadCartData();
}




