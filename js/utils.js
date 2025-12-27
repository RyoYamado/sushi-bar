// Utility Functions
function showAlert(message, type = 'success') {
    const alertId = 'alert-' + Date.now();
    const alertHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert" id="${alertId}">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'danger' ? 'exclamation-circle' : 'info-circle'}"></i>
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    const container = document.getElementById('alertContainer');
    const alertDiv = document.createElement('div');
    alertDiv.innerHTML = alertHTML;
    container.appendChild(alertDiv);
    
    setTimeout(() => {
        const element = document.getElementById(alertId);
        if (element) {
            element.remove();
        }
    }, 4000);
}

function clearFormErrors(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.querySelectorAll('[id$="Error"]').forEach(el => {
            el.textContent = '';
        });
    }
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^\d{10,}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Check authentication status
firebase.auth().onAuthStateChanged(user => {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.style.display = user ? 'block' : 'none';
    }
});

// Logout functionality
if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').addEventListener('click', function() {
        firebase.auth().signOut().then(() => {
            showAlert('Logged out successfully', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        }).catch(error => {
            showAlert('Error logging out: ' + error.message, 'danger');
        });
    });
}
