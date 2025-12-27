// Data Management Page JavaScript
const { auth, db } = window.firebaseApp;

const ITEMS_PER_PAGE = 10;
let currentPage = {
    employees: 1,
    menu: 1,
    products: 1,
    orders: 1
};

// Check authentication
firebase.auth().onAuthStateChanged(user => {
    if (!user) {
        window.location.href = 'auth.html';
    }
});

// === EMPLOYEES DATA DISPLAY ===

async function loadEmployeesTable(page = 1) {
    try {
        let query = db.collection('employees');
        
        // Apply search filter
        const searchValue = document.getElementById('employeeSearch')?.value.trim().toLowerCase();
        if (searchValue) {
            // Client-side filtering for search
            const snapshot = await query.get();
            const filtered = snapshot.docs.filter(doc => {
                const data = doc.data();
                return data.name.toLowerCase().includes(searchValue) ||
                       data.email.toLowerCase().includes(searchValue);
            });
            displayEmployeesTable(filtered, page);
            return;
        }

        const snapshot = await query.get();
        displayEmployeesTable(snapshot.docs, page);
    } catch (error) {
        console.error('Error loading employees:', error);
        showAlert('Error loading employees', 'danger');
    }
}

function displayEmployeesTable(docs, page = 1) {
    const tbody = document.getElementById('employeesTable');
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const items = docs.slice(start, end);

    if (items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No employees found</td></tr>';
        updatePagination('employeePagination', docs.length, page, loadEmployeesTable);
        return;
    }

    let html = '';
    items.forEach(doc => {
        const emp = doc.data();
        html += `
            <tr>
                <td>${escapeHtml(emp.name)}</td>
                <td>${escapeHtml(emp.position)}</td>
                <td>${escapeHtml(emp.email)}</td>
                <td>${escapeHtml(emp.phone)}</td>
                <td>
                    <button class="btn btn-sm btn-edit" data-id="${doc.id}" onclick="editEmployeeFromTable('${doc.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-delete" onclick="deleteEmployeeFromTable('${doc.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
    updatePagination('employeePagination', docs.length, page, loadEmployeesTable);
}

// === MENU DATA DISPLAY ===

async function loadMenuTable(page = 1) {
    try {
        const category = document.getElementById('menuFilter')?.value;
        let query = db.collection('menu');
        
        const snapshot = await query.get();
        let docs = snapshot.docs;

        // Apply filters
        const searchValue = document.getElementById('menuSearch')?.value.trim().toLowerCase();
        if (searchValue) {
            docs = docs.filter(doc => {
                const data = doc.data();
                return data.name.toLowerCase().includes(searchValue);
            });
        }

        if (category) {
            docs = docs.filter(doc => doc.data().category === category);
        }

        displayMenuCards(docs, page);
    } catch (error) {
        console.error('Error loading menu:', error);
        showAlert('Error loading menu items', 'danger');
    }
}

function displayMenuCards(docs, page = 1) {
    const container = document.getElementById('menuCardsContainer');
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const items = docs.slice(start, end);

    if (items.length === 0) {
        container.innerHTML = '<div class="col-12 text-center text-muted">No menu items found</div>';
        updatePagination('menuPagination', docs.length, page, loadMenuTable);
        return;
    }

    let html = '';
    items.forEach(doc => {
        const item = doc.data();
        html += `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card menu-card h-100">
                    <div class="card-header">
                        <h5 class="card-title mb-0">${escapeHtml(item.name)}</h5>
                    </div>
                    <div class="card-body">
                        <span class="badge badge-primary">${escapeHtml(item.category)}</span>
                        <p class="card-text mt-3">${escapeHtml(item.description || 'No description')}</p>
                        <p class="price-badge">$${parseFloat(item.price).toFixed(2)}</p>
                    </div>
                    <div class="card-footer bg-transparent">
                        <button class="btn btn-sm btn-edit w-100" onclick="editMenuFromTable('${doc.id}')">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    updatePagination('menuPagination', docs.length, page, loadMenuTable);
}

// === PRODUCTS DATA DISPLAY ===

async function loadProductsTable(page = 1) {
    try {
        let query = db.collection('products');
        const snapshot = await query.get();
        let docs = snapshot.docs;

        // Apply search filter
        const searchValue = document.getElementById('productSearch')?.value.trim().toLowerCase();
        if (searchValue) {
            docs = docs.filter(doc => {
                const data = doc.data();
                return data.name.toLowerCase().includes(searchValue) ||
                       data.sku.toLowerCase().includes(searchValue);
            });
        }

        displayProductsTable(docs, page);
    } catch (error) {
        console.error('Error loading products:', error);
        showAlert('Error loading products', 'danger');
    }
}

function displayProductsTable(docs, page = 1) {
    const tbody = document.getElementById('productsTable');
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const items = docs.slice(start, end);

    if (items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No products found</td></tr>';
        updatePagination('productPagination', docs.length, page, loadProductsTable);
        return;
    }

    let html = '';
    items.forEach(doc => {
        const prod = doc.data();
        html += `
            <tr>
                <td>${escapeHtml(prod.name)}</td>
                <td>${escapeHtml(prod.sku)}</td>
                <td>${prod.stock}</td>
                <td>$${parseFloat(prod.price).toFixed(2)}</td>
                <td>
                    <button class="btn btn-sm btn-edit" onclick="editProductFromTable('${doc.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-delete" onclick="deleteProductFromTable('${doc.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
    updatePagination('productPagination', docs.length, page, loadProductsTable);
}

// === ORDERS DATA DISPLAY ===

async function loadOrdersTable(page = 1) {
    try {
        let query = db.collection('orders');
        const snapshot = await query.get();
        let docs = snapshot.docs;

        // Apply filters
        const searchValue = document.getElementById('orderSearch')?.value.trim().toLowerCase();
        if (searchValue) {
            docs = docs.filter(doc => {
                const data = doc.data();
                return data.customer.toLowerCase().includes(searchValue) ||
                       data.item.toLowerCase().includes(searchValue);
            });
        }

        const status = document.getElementById('orderFilter')?.value;
        if (status) {
            docs = docs.filter(doc => doc.data().status === status);
        }

        displayOrdersTable(docs, page);
    } catch (error) {
        console.error('Error loading orders:', error);
        showAlert('Error loading orders', 'danger');
    }
}

function displayOrdersTable(docs, page = 1) {
    const tbody = document.getElementById('ordersTable');
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const items = docs.slice(start, end);

    if (items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center">No orders found</td></tr>';
        updatePagination('orderPagination', docs.length, page, loadOrdersTable);
        return;
    }

    let html = '';
    items.forEach(doc => {
        const order = doc.data();
        const statusBadgeClass = order.status === 'Completed' ? 'success' : 
                                order.status === 'Preparing' ? 'warning' : 
                                order.status === 'Ready' ? 'info' : 'secondary';
        
        html += `
            <tr>
                <td>${escapeHtml(order.customer)}</td>
                <td>${escapeHtml(order.item)}</td>
                <td>${order.quantity}</td>
                <td><span class="badge badge-${statusBadgeClass}">${order.status}</span></td>
                <td>
                    <button class="btn btn-sm btn-edit" onclick="editOrderFromTable('${doc.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-delete" onclick="deleteOrderFromTable('${doc.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
    updatePagination('orderPagination', docs.length, page, loadOrdersTable);
}

// === PAGINATION ===

function updatePagination(paginationId, totalItems, currentPage, loadFunction) {
    const pagination = document.getElementById(paginationId);
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }

    let html = '';
    
    // Previous button
    if (currentPage > 1) {
        html += `<li class="page-item"><button class="page-link" onclick="${loadFunction.name}(${currentPage - 1})">Previous</button></li>`;
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            html += `<li class="page-item active"><span class="page-link">${i}</span></li>`;
        } else {
            html += `<li class="page-item"><button class="page-link" onclick="${loadFunction.name}(${i})">${i}</button></li>`;
        }
    }

    // Next button
    if (currentPage < totalPages) {
        html += `<li class="page-item"><button class="page-link" onclick="${loadFunction.name}(${currentPage + 1})">Next</button></li>`;
    }

    pagination.innerHTML = html;
}

// === EDIT/DELETE FUNCTIONS FOR DATA DISPLAY ===

async function editEmployeeFromTable(id) {
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

async function deleteEmployeeFromTable(id) {
    if (!confirm('Are you sure?')) return;
    try {
        await db.collection('employees').doc(id).delete();
        showAlert('Employee deleted successfully!', 'success');
        loadEmployeesTable(currentPage.employees);
    } catch (error) {
        showAlert('Error: ' + error.message, 'danger');
    }
}

async function editMenuFromTable(id) {
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

async function deleteMenuFromTable(id) {
    if (!confirm('Are you sure?')) return;
    try {
        await db.collection('menu').doc(id).delete();
        showAlert('Menu item deleted!', 'success');
        loadMenuTable(currentPage.menu);
    } catch (error) {
        showAlert('Error: ' + error.message, 'danger');
    }
}

async function editProductFromTable(id) {
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

async function deleteProductFromTable(id) {
    if (!confirm('Are you sure?')) return;
    try {
        await db.collection('products').doc(id).delete();
        showAlert('Product deleted!', 'success');
        loadProductsTable(currentPage.products);
    } catch (error) {
        showAlert('Error: ' + error.message, 'danger');
    }
}

async function editOrderFromTable(id) {
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

async function deleteOrderFromTable(id) {
    if (!confirm('Are you sure?')) return;
    try {
        await db.collection('orders').doc(id).delete();
        showAlert('Order deleted!', 'success');
        loadOrdersTable(currentPage.orders);
    } catch (error) {
        showAlert('Error: ' + error.message, 'danger');
    }
}

// === EVENT LISTENERS FOR SEARCH AND FILTER ===

document.getElementById('employeeSearch')?.addEventListener('input', () => {
    currentPage.employees = 1;
    loadEmployeesTable(1);
});

document.getElementById('employeeFilter')?.addEventListener('change', () => {
    currentPage.employees = 1;
    loadEmployeesTable(1);
});

document.getElementById('menuSearch')?.addEventListener('input', () => {
    currentPage.menu = 1;
    loadMenuTable(1);
});

document.getElementById('menuFilter')?.addEventListener('change', () => {
    currentPage.menu = 1;
    loadMenuTable(1);
});

document.getElementById('productSearch')?.addEventListener('input', () => {
    currentPage.products = 1;
    loadProductsTable(1);
});

document.getElementById('orderSearch')?.addEventListener('input', () => {
    currentPage.orders = 1;
    loadOrdersTable(1);
});

document.getElementById('orderFilter')?.addEventListener('change', () => {
    currentPage.orders = 1;
    loadOrdersTable(1);
});

// === INITIALIZATION ===

document.addEventListener('DOMContentLoaded', function() {
    loadEmployeesTable(1);
    loadMenuTable(1);
    loadProductsTable(1);
    loadOrdersTable(1);
});
