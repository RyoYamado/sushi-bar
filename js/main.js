// Main Page JavaScript
const { auth, db } = window.firebaseApp;

// Load featured menu items on page load
document.addEventListener('DOMContentLoaded', async function() {
    try {
        const snapshot = await db.collection('menu').limit(6).get();
        const container = document.getElementById('featuredMenu');
        
        if (snapshot.empty) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <p class="text-muted">No menu items available yet.</p>
                </div>
            `;
            return;
        }

        let html = '';
        snapshot.forEach(doc => {
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
                            <button class="btn btn-primary w-100">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    } catch (error) {
        console.error('Error loading menu:', error);
        showAlert('Error loading menu items', 'danger');
    }
});

// Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
