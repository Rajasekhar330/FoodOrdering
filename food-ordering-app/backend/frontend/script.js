const menuDiv = document.getElementById('menu');
const orderForm = document.getElementById('orderForm');
const orderHistoryDiv = document.getElementById('orderHistory');

// Fetch Menu Items
const fetchMenu = async () => {
    const response = await fetch('http://localhost:3000/api/menu');
    const menuItems = await response.json();

    menuItems.forEach(item => {
        const dishDiv = document.createElement('div');
        dishDiv.classList.add('dish');
        dishDiv.innerHTML = `
            <div>
                <strong>${item.name}</strong> - $${item.price} - Available: ${item.available_quantity}
            </div>
            <button onclick="addToOrder(${item.id}, '${item.name}', ${item.price})">Add to Order</button>
        `;
        menuDiv.appendChild(dishDiv);
    });
};

let orderItems = [];

// Add item to order
const addToOrder = (id, name, price) => {
    const availableItem = orderItems.find(item => item.menu_item_id === id);

    if (availableItem) {
        availableItem.quantity += 1;
    } else {
        orderItems.push({ menu_item_id: id, name, price, quantity: 1 });
    }
    alert(`${name} added to order!`);
};

// Place Order
orderForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const tableNumber = document.getElementById('tableNumber').value;
    const contactNumber = document.getElementById('contactNumber').value;

    const order = {
        items: orderItems,
        total_price: orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
        table_number: tableNumber,
        contact_number: contactNumber,
    };

    const response = await fetch('http://localhost:3000/api/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(order),
    });

    if (response.ok) {
        alert('Order placed successfully!');
        orderItems = []; // Reset the order
        fetchOrderHistory(); // Refresh order history
    } else {
        alert('Failed to place order');
    }
});

// Fetch Order History
const fetchOrderHistory = async () => {
    const response = await fetch('http://localhost:3000/api/orders');
    const orders = await response.json();

    orderHistoryDiv.innerHTML = '';
    orders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.innerHTML = `
            <div>
                <strong>Order ID: ${order.id}</strong> - Total: $${order.total_price} - Date: ${new Date(order.order_date).toLocaleString()}
                <ul>
                    ${order.OrderItems.map(item => `<li>${item.name} - Quantity: ${item.quantity} - Price: $${item.price}</li>`).join('')}
                </ul>
            </div>
        `;
        orderHistoryDiv.appendChild(orderDiv);
    });
};

// Initialize
fetchMenu();
fetchOrderHistory();
