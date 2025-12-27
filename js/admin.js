// Admin Panel JavaScript
const { auth, db } = window.firebaseApp;

// Check authentication
firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = 'auth.html';
    }
});

// === EMPLOYEES MANAGEMENT ===

// Save Employee
document.getElementById('saveEmployeeBtn')?.addEventListener('click', async function() {
    clearFormErrors('employeeForm');
    
    const id = document.getElementById('employeeId').value;
    const name = document.getElementById('employeeName').value.trim();
    const position = document.getElementById('employeePosition').value.trim();
    const email = document.getElementById('employeeEmail').value.trim();
    const phone = document.getElementById('employeePhone').value.trim();

    // Validation
    let isValid = true;
    if (name.length < 2) {
        document.getElementById('employeeNameError').textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    if (!position) {
        document.getElementById('employeePositionError').textContent = 'Position is required';
        isValid = false;
    }
    if (!validateEmail(email)) {
        document.getElementById('employeeEmailError').textContent = 'Invalid email format';
        isValid = false;
    }
    if (!validatePhone(phone)) {
        document.getElementById('employeePhoneError').textContent = 'Invalid phone format';
        isValid = false;
    }

    if (!isValid) return;

    try {
        const employeeData = {
            name,
            position,
            email,
            phone,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (id) {
            await db.collection('employees').doc(id).update(employeeData);
            showAlert('Employee updated successfully!', 'success');
        } else {
            employeeData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            await db.collection('employees').add(employeeData);
            showAlert('Employee added successfully!', 'success');
        }

        bootstrap.Modal.getInstance(document.getElementById('employeeModal')).hide();
        document.getElementById('employeeForm').reset();
        document.getElementById('employeeId').value = '';
    } catch (error) {
        showAlert('Error saving employee: ' + error.message, 'danger');
    }
});

// Edit Employee
async function editEmployee(id) {
    try {
        const doc = await db.collection('employees').doc(id).get();
        if (doc.exists) {
            const data = doc.data();
            document.getElementById('employeeId').value = id;
            document.getElementById('employeeName').value = data.name;
            document.getElementById('employeePosition').value = data.position;
            document.getElementById('employeeEmail').value = data.email;
            document.getElementById('employeePhone').value = data.phone;
            
            new bootstrap.Modal(document.getElementById('employeeModal')).show();
        }
    } catch (error) {
        showAlert('Error loading employee: ' + error.message, 'danger');
    }
}

// Delete Employee
async function deleteEmployee(id) {
    if (!confirm('Are you sure you want to delete this employee?')) return;
    
    try {
        await db.collection('employees').doc(id).delete();
        showAlert('Employee deleted successfully!', 'success');
    } catch (error) {
        showAlert('Error deleting employee: ' + error.message, 'danger');
    }
}

// Load and display employees
async function loadEmployees() {
    try {
        const snapshot = await db.collection('employees').get();
        const container = document.getElementById('employeesList');
        
        if (snapshot.empty) {
            container.innerHTML = '<div class="col-12 text-center text-muted">No employees found</div>';
            return;
        }

        let html = '';
        snapshot.forEach(doc => {
            const emp = doc.data();
            html += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${escapeHtml(emp.name)}</h5>
                            <p class="card-text">
                                <strong>Position:</strong> ${escapeHtml(emp.position)}<br>
                                <strong>Email:</strong> ${escapeHtml(emp.email)}<br>
                                <strong>Phone:</strong> ${escapeHtml(emp.phone)}
                            </p>
                            <button class="btn btn-sm btn-edit" onclick="editEmployee('${doc.id}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-delete" onclick="deleteEmployee('${doc.id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    } catch (error) {
        console.error('Error loading employees:', error);
        showAlert('Error loading employees', 'danger');
    }
}

// === MENU ITEMS MANAGEMENT ===

// Save Menu Item
document.getElementById('saveMenuBtn')?.addEventListener('click', async function() {
    clearFormErrors('menuForm');
    
    const id = document.getElementById('menuId').value;
    const name = document.getElementById('menuName').value.trim();
    const category = document.getElementById('menuCategory').value;
    const price = parseFloat(document.getElementById('menuPrice').value);
    const description = document.getElementById('menuDescription').value.trim();

    // Validation
    let isValid = true;
    if (name.length < 2) {
        document.getElementById('menuNameError').textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    if (!category) {
        document.getElementById('menuCategoryError').textContent = 'Category is required';
        isValid = false;
    }
    if (isNaN(price) || price <= 0) {
        document.getElementById('menuPriceError').textContent = 'Valid price is required';
        isValid = false;
    }

    if (!isValid) return;

    try {
        const menuData = {
            name,
            category,
            price,
            description,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (id) {
            await db.collection('menu').doc(id).update(menuData);
            showAlert('Menu item updated successfully!', 'success');
        } else {
            menuData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            await db.collection('menu').add(menuData);
            showAlert('Menu item added successfully!', 'success');
        }

        bootstrap.Modal.getInstance(document.getElementById('menuModal')).hide();
        document.getElementById('menuForm').reset();
        document.getElementById('menuId').value = '';
    } catch (error) {
        showAlert('Error saving menu item: ' + error.message, 'danger');
    }
});

// Edit Menu Item
async function editMenu(id) {
    try {
        const doc = await db.collection('menu').doc(id).get();
        if (doc.exists) {
            const data = doc.data();
            document.getElementById('menuId').value = id;
            document.getElementById('menuName').value = data.name;
            document.getElementById('menuCategory').value = data.category;
            document.getElementById('menuPrice').value = data.price;
            document.getElementById('menuDescription').value = data.description || '';
            
            new bootstrap.Modal(document.getElementById('menuModal')).show();
        }
    } catch (error) {
        showAlert('Error loading menu item: ' + error.message, 'danger');
    }
}

// Delete Menu Item
async function deleteMenu(id) {
    if (!confirm('Are you sure you want to delete this menu item?')) return;
    
    try {
        await db.collection('menu').doc(id).delete();
        showAlert('Menu item deleted successfully!', 'success');
    } catch (error) {
        showAlert('Error deleting menu item: ' + error.message, 'danger');
    }
}

// Load and display menu items
async function loadMenuItems() {
    try {
        const snapshot = await db.collection('menu').get();
        const container = document.getElementById('menuList');
        
        if (snapshot.empty) {
            container.innerHTML = '<div class="col-12 text-center text-muted">No menu items found</div>';
            return;
        }

        let html = '';
        snapshot.forEach(doc => {
            const item = doc.data();
            html += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card menu-card">
                        <div class="card-header">
                            <h5 class="card-title mb-0">${escapeHtml(item.name)}</h5>
                        </div>
                        <div class="card-body">
                            <span class="badge badge-primary">${escapeHtml(item.category)}</span>
                            <p class="card-text mt-3">${escapeHtml(item.description || 'No description')}</p>
                            <p class="price-badge">$${parseFloat(item.price).toFixed(2)}</p>
                            <button class="btn btn-sm btn-edit w-100 mb-2" onclick="editMenu('${doc.id}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-delete w-100" onclick="deleteMenu('${doc.id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    } catch (error) {
        console.error('Error loading menu items:', error);
        showAlert('Error loading menu items', 'danger');
    }
}

// === PRODUCTS MANAGEMENT ===

// Save Product
document.getElementById('saveProductBtn')?.addEventListener('click', async function() {
    clearFormErrors('productForm');
    
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value.trim();
    const sku = document.getElementById('productSku').value.trim();
    const stock = parseInt(document.getElementById('productStock').value);
    const price = parseFloat(document.getElementById('productPrice').value);

    // Validation
    let isValid = true;
    if (name.length < 2) {
        document.getElementById('productNameError').textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    if (!sku) {
        document.getElementById('productSkuError').textContent = 'SKU is required';
        isValid = false;
    }
    if (isNaN(stock) || stock < 0) {
        document.getElementById('productStockError').textContent = 'Valid stock quantity is required';
        isValid = false;
    }
    if (isNaN(price) || price <= 0) {
        document.getElementById('productPriceError').textContent = 'Valid price is required';
        isValid = false;
    }

    if (!isValid) return;

    try {
        const productData = {
            name,
            sku,
            stock,
            price,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (id) {
            await db.collection('products').doc(id).update(productData);
            showAlert('Product updated successfully!', 'success');
        } else {
            productData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            await db.collection('products').add(productData);
            showAlert('Product added successfully!', 'success');
        }

        bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
    } catch (error) {
        showAlert('Error saving product: ' + error.message, 'danger');
    }
});

// Edit Product
async function editProduct(id) {
    try {
        const doc = await db.collection('products').doc(id).get();
        if (doc.exists) {
            const data = doc.data();
            document.getElementById('productId').value = id;
            document.getElementById('productName').value = data.name;
            document.getElementById('productSku').value = data.sku;
            document.getElementById('productStock').value = data.stock;
            document.getElementById('productPrice').value = data.price;
            
            new bootstrap.Modal(document.getElementById('productModal')).show();
        }
    } catch (error) {
        showAlert('Error loading product: ' + error.message, 'danger');
    }
}

// Delete Product
async function deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
        await db.collection('products').doc(id).delete();
        showAlert('Product deleted successfully!', 'success');
    } catch (error) {
        showAlert('Error deleting product: ' + error.message, 'danger');
    }
}

// Load and display products
async function loadProducts() {
    try {
        const snapshot = await db.collection('products').get();
        const container = document.getElementById('productsList');
        
        if (snapshot.empty) {
            container.innerHTML = '<div class="col-12 text-center text-muted">No products found</div>';
            return;
        }

        let html = '';
        snapshot.forEach(doc => {
            const prod = doc.data();
            html += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${escapeHtml(prod.name)}</h5>
                            <p class="card-text">
                                <strong>SKU:</strong> ${escapeHtml(prod.sku)}<br>
                                <strong>Stock:</strong> ${prod.stock} units<br>
                                <strong>Price:</strong> $${parseFloat(prod.price).toFixed(2)}
                            </p>
                            <button class="btn btn-sm btn-edit" onclick="editProduct('${doc.id}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-delete" onclick="deleteProduct('${doc.id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    } catch (error) {
        console.error('Error loading products:', error);
        showAlert('Error loading products', 'danger');
    }
}

// === ORDERS MANAGEMENT ===

// Save Order
document.getElementById('saveOrderBtn')?.addEventListener('click', async function() {
    clearFormErrors('orderForm');
    
    const id = document.getElementById('orderId').value;
    const customer = document.getElementById('orderCustomer').value.trim();
    const item = document.getElementById('orderItem').value.trim();
    const quantity = parseInt(document.getElementById('orderQuantity').value);
    const status = document.getElementById('orderStatus').value;

    // Validation
    let isValid = true;
    if (customer.length < 2) {
        document.getElementById('orderCustomerError').textContent = 'Customer name must be at least 2 characters';
        isValid = false;
    }
    if (!item) {
        document.getElementById('orderItemError').textContent = 'Item is required';
        isValid = false;
    }
    if (isNaN(quantity) || quantity < 1) {
        document.getElementById('orderQuantityError').textContent = 'Valid quantity is required';
        isValid = false;
    }
    if (!status) {
        document.getElementById('orderStatusError').textContent = 'Status is required';
        isValid = false;
    }

    if (!isValid) return;

    try {
        const orderData = {
            customer,
            item,
            quantity,
            status,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        if (id) {
            await db.collection('orders').doc(id).update(orderData);
            showAlert('Order updated successfully!', 'success');
        } else {
            orderData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
            await db.collection('orders').add(orderData);
            showAlert('Order added successfully!', 'success');
        }

        bootstrap.Modal.getInstance(document.getElementById('orderModal')).hide();
        document.getElementById('orderForm').reset();
        document.getElementById('orderId').value = '';
    } catch (error) {
        showAlert('Error saving order: ' + error.message, 'danger');
    }
});

// Edit Order
async function editOrder(id) {
    try {
        const doc = await db.collection('orders').doc(id).get();
        if (doc.exists) {
            const data = doc.data();
            document.getElementById('orderId').value = id;
            document.getElementById('orderCustomer').value = data.customer;
            document.getElementById('orderItem').value = data.item;
            document.getElementById('orderQuantity').value = data.quantity;
            document.getElementById('orderStatus').value = data.status;
            
            new bootstrap.Modal(document.getElementById('orderModal')).show();
        }
    } catch (error) {
        showAlert('Error loading order: ' + error.message, 'danger');
    }
}

// Delete Order
async function deleteOrder(id) {
    if (!confirm('Are you sure you want to delete this order?')) return;
    
    try {
        await db.collection('orders').doc(id).delete();
        showAlert('Order deleted successfully!', 'success');
    } catch (error) {
        showAlert('Error deleting order: ' + error.message, 'danger');
    }
}

// Load and display orders
async function loadOrders() {
    try {
        const snapshot = await db.collection('orders').get();
        const container = document.getElementById('ordersList');
        
        if (snapshot.empty) {
            container.innerHTML = '<div class="col-12 text-center text-muted">No orders found</div>';
            return;
        }

        let html = '';
        snapshot.forEach(doc => {
            const order = doc.data();
            html += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${escapeHtml(order.customer)}</h5>
                            <p class="card-text">
                                <strong>Item:</strong> ${escapeHtml(order.item)}<br>
                                <strong>Quantity:</strong> ${order.quantity}<br>
                                <strong>Status:</strong> <span class="badge badge-${order.status === 'Completed' ? 'success' : order.status === 'Preparing' ? 'warning' : 'info'}">${order.status}</span>
                            </p>
                            <button class="btn btn-sm btn-edit" onclick="editOrder('${doc.id}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-delete" onclick="deleteOrder('${doc.id}')">
                                <i class="fas fa-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    } catch (error) {
        console.error('Error loading orders:', error);
        showAlert('Error loading orders', 'danger');
    }
}

// Load all data on page load
document.addEventListener('DOMContentLoaded', function() {
    loadEmployees();
    loadMenuItems();
    loadProducts();
    loadOrders();
});

// Reset modals when closing
document.getElementById('employeeModal')?.addEventListener('hidden.bs.modal', function() {
    document.getElementById('employeeForm').reset();
    document.getElementById('employeeId').value = '';
    clearFormErrors('employeeForm');
});

document.getElementById('menuModal')?.addEventListener('hidden.bs.modal', function() {
    document.getElementById('menuForm').reset();
    document.getElementById('menuId').value = '';
    clearFormErrors('menuForm');
});

document.getElementById('productModal')?.addEventListener('hidden.bs.modal', function() {
    document.getElementById('productForm').reset();
    document.getElementById('productId').value = '';
    clearFormErrors('productForm');
});

document.getElementById('orderModal')?.addEventListener('hidden.bs.modal', function() {
    document.getElementById('orderForm').reset();
    document.getElementById('orderId').value = '';
    clearFormErrors('orderForm');
});
