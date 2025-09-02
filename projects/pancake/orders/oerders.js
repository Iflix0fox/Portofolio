document.addEventListener("DOMContentLoaded", () => {
  const ordersContainer = document.getElementById("ordersContainer");
  const filterStatus = document.getElementById("filter-status");
  const clearOrdersBtn = document.getElementById("clear-orders");

  // Load orders from localStorage or empty array
  let orders = JSON.parse(localStorage.getItem("orders")) || [];

  // Function to save orders back to localStorage
  function saveOrders() {
    localStorage.setItem("orders", JSON.stringify(orders));
  }

  // Function to create and display order elements
  function displayOrders() {
    const statusFilter = filterStatus.value;
    const filteredOrders =
      statusFilter === "all"
        ? orders
        : orders.filter((order) => order.status === statusFilter);

    ordersContainer.innerHTML = "";

    if (filteredOrders.length === 0) {
      ordersContainer.textContent = "No orders found.";
      return;
    }

    filteredOrders.forEach((order) => {
      const orderDiv = document.createElement("div");
      orderDiv.className = `order ${order.status}`;

      const toppings = Array.isArray(order.toppings) ? order.toppings : [];
      const extras = Array.isArray(order.extras) ? order.extras : [];

      orderDiv.innerHTML = `
          <p><strong>Order ID:</strong> ${order.id}</p>
          <p><strong>Customer:</strong> ${order.customerName}</p>
          <p><strong>Pancake:</strong> ${order.selectedPancake}</p>
          <p><strong>Toppings:</strong> ${
            toppings.length > 0 ? toppings.join(", ") : "None"
          }</p>
          <p><strong>Extras:</strong> ${
            extras.length > 0 ? extras.join(", ") : "None"
          }</p>
          <p><strong>Delivery:</strong> ${order.deliveryMethod}</p>
          <p><strong>Total Price:</strong> ${order.totalPrice} €</p>
          <div class="status-buttons" data-id="${order.id}">
            <button class="status-btn ${
              order.status === "waiting" ? "active" : ""
            }" data-status="waiting">Waiting</button>
            <button class="status-btn ${
              order.status === "ready" ? "active" : ""
            }" data-status="ready">Ready</button>
            <button class="status-btn ${
              order.status === "delivered" ? "active" : ""
            }" data-status="delivered">Delivered</button>
          </div>
        `;

      ordersContainer.appendChild(orderDiv);
    });

    // Add event listeners for all status buttons
    const statusButtons = document.querySelectorAll(".status-btn");
    statusButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.parentElement.getAttribute("data-id");
        const newStatus = e.target.getAttribute("data-status");

        const order = orders.find((o) => o.id == id);
        if (order) {
          order.status = newStatus;
          saveOrders();
          displayOrders();
        }
      });
    });
  }

  // Event listeners
  filterStatus.addEventListener("change", () => {
    displayOrders();
  });

  clearOrdersBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all orders?")) {
      localStorage.removeItem("orders");
      orders = [];
      displayOrders();
    }
  });

  // Initial display
  displayOrders();
});
