document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("pancakeForm");
  const totalPriceBanner = document.getElementById("totalPrice");
  const totalPriceDisplay = document.getElementById("totalPriceDisplay");
  const orderButton = document.getElementById("seeOrder");
  const summaryText = document.getElementById("summaryText");

  let toppings = [];
  let extras = [];

  // Update toppings and extras lists
  function handleToppings(checkbox) {
    const toppingName = checkbox.parentElement.textContent.trim();
    if (checkbox.checked) {
      toppings.push(toppingName);
    } else {
      toppings = toppings.filter((topping) => topping !== toppingName);
    }
  }

  function handleExtras(checkbox) {
    const extraName = checkbox.parentElement.textContent.trim();
    if (checkbox.checked) {
      extras.push(extraName);
    } else {
      extras = extras.filter((extra) => extra !== extraName);
    }
  }

  // Update price calculation
  function updatePrice() {
    const pancakeType = document.getElementById("type");
    const selectedType = pancakeType.options[pancakeType.selectedIndex];
    let total = parseFloat(selectedType.getAttribute("data-price"));

    // add toppings
    total += toppings.length * 1;

    // add extras
    document.querySelectorAll(".extra").forEach((checkbox) => {
      if (checkbox.checked) {
        total += parseFloat(checkbox.getAttribute("data-price"));
      }
    });

    // add delivery cost
    const delivery = document.querySelector("input[name='delivery']:checked");
    total += parseFloat(delivery.getAttribute("data-price"));

    // format price
    const formattedTotal = total.toFixed(2);
    totalPriceBanner.textContent = formattedTotal + " €";
    totalPriceDisplay.textContent = formattedTotal + " €";
  }

  // Listen to changes in form
  form.addEventListener("change", function (event) {
    const target = event.target;
    if (target.classList.contains("topping")) {
      handleToppings(target);
    } else if (target.classList.contains("extra")) {
      handleExtras(target);
    }
    updatePrice();
  });

  // Order button click
  orderButton.addEventListener("click", function () {
    const customerName = document.getElementById("customerName").value.trim();
    const pancakeType = document.getElementById("type");
    const selectedType = pancakeType.options[pancakeType.selectedIndex];
    const delivery = document
      .querySelector("input[name=delivery]:checked")
      .parentElement.textContent.trim();

    // Build summary
    let summary = `<strong>Asiakas:</strong> ${
      customerName || "(ei nimeä)"
    }<br>`;
    summary += `<strong>Tyyppi:</strong> ${selectedType.value}<br>`;
    summary += `<strong>Täytteet:</strong> ${
      toppings.length > 0 ? toppings.join(", ") : "Ei täytteitä"
    }<br>`;
    summary += `<strong>Lisukkeet:</strong> ${
      extras.length > 0 ? extras.join(", ") : "Ei lisukkeita"
    }<br>`;
    summary += `<strong>Toimitustapa:</strong> ${delivery}<br>`;
    summary += `<strong>Kokonaishinta:</strong> ${totalPriceDisplay.textContent}`;

    summaryText.innerHTML = summary;

    // Save order to localStorage
    const order = {
      id: Date.now(),
      customerName: customerName || "(ei nimeä)", // fixed spelling
      selectedPancake: selectedType.value, // fixed name
      toppings: [...toppings],
      extras: [...extras], // fixed spelling
      deliveryMethod: delivery,
      totalPrice: parseFloat(totalPriceDisplay.textContent),
      status: "waiting",
    };

    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Success message
    const messageEl = document.getElementById("orderMessage");
    messageEl.textContent = "Order saved!";
    setTimeout(() => (messageEl.textContent = ""), 3000);
  });

  // Ingredients add/remove
  const ingredientList = document.getElementById("ingredientList");
  const newIngredient = document.getElementById("newIngredient");
  const addIngredientBtn = document.getElementById("addIngredient");

  addIngredientBtn.addEventListener("click", () => {
    const ingredient = newIngredient.value.trim();
    if (ingredient) {
      const li = document.createElement("li");
      li.textContent = ingredient;
      li.addEventListener("click", () => li.remove());
      ingredientList.appendChild(li);
      newIngredient.value = "";
    }
  });

  // Initial price update
  updatePrice();
});
