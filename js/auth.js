// Authentication Page JavaScript
const { auth, db } = window.firebaseApp;

// Check if user is already logged in
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        showUserProfile(user);
    } else {
        document.getElementById('userProfile').style.display = 'none';
        document.getElementById('loginForm').parentElement.parentElement.style.display = 'block';
    }
});

// Login Form Handler
document.getElementById('loginForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    clearFormErrors('loginForm');
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const spinner = document.getElementById('loginSpinner');

    // Validation
    let isValid = true;
    if (!validateEmail(email)) {
        document.getElementById('loginEmailError').textContent = 'Please enter a valid email';
        isValid = false;
    }
    if (password.length < 6) {
        document.getElementById('loginPasswordError').textContent = 'Password must be at least 6 characters';
        isValid = false;
    }

    if (!isValid) return;

    spinner.style.display = 'inline-block';

    try {
        const result = await firebase.auth().signInWithEmailAndPassword(email, password);
        spinner.style.display = 'none';
        showAlert('Logged in successfully!', 'success');
        setTimeout(() => {
            window.location.href = 'data-management.html';
        }, 1500);
    } catch (error) {
        spinner.style.display = 'none';
        let errorMsg = 'Login failed';
        if (error.code === 'auth/user-not-found') {
            errorMsg = 'User not found';
            document.getElementById('loginEmailError').textContent = errorMsg;
        } else if (error.code === 'auth/wrong-password') {
            errorMsg = 'Incorrect password';
            document.getElementById('loginPasswordError').textContent = errorMsg;
        } else if (error.code === 'auth/invalid-email') {
            errorMsg = 'Invalid email';
            document.getElementById('loginEmailError').textContent = errorMsg;
        } else {
            showAlert(errorMsg + ': ' + error.message, 'danger');
        }
    }
});

// Register Form Handler
document.getElementById('registerForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    clearFormErrors('registerForm');
    
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    const spinner = document.getElementById('registerSpinner');

    // Validation
    let isValid = true;
    
    if (name.length < 2) {
        document.getElementById('registerNameError').textContent = 'Name must be at least 2 characters';
        isValid = false;
    }
    if (!validateEmail(email)) {
        document.getElementById('registerEmailError').textContent = 'Please enter a valid email';
        isValid = false;
    }
    if (password.length < 6) {
        document.getElementById('registerPasswordError').textContent = 'Password must be at least 6 characters';
        isValid = false;
    }
    if (password !== confirmPassword) {
        document.getElementById('registerConfirmPasswordError').textContent = 'Passwords do not match';
        isValid = false;
    }

    if (!isValid) return;

    spinner.style.display = 'inline-block';

    try {
        const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
        
        // Save user profile data to Firestore
        await db.collection('users').doc(result.user.uid).set({
            uid: result.user.uid,
            name: name,
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            role: 'user'
        });

        spinner.style.display = 'none';
        showAlert('Account created successfully! Please sign in.', 'success');
        
        // Clear form and switch to login tab
        document.getElementById('registerForm').reset();
        document.getElementById('login-tab').click();
    } catch (error) {
        spinner.style.display = 'none';
        let errorMsg = 'Registration failed';
        
        if (error.code === 'auth/email-already-in-use') {
            errorMsg = 'Email already in use';
            document.getElementById('registerEmailError').textContent = errorMsg;
        } else if (error.code === 'auth/weak-password') {
            errorMsg = 'Password is too weak';
            document.getElementById('registerPasswordError').textContent = errorMsg;
        } else if (error.code === 'auth/invalid-email') {
            errorMsg = 'Invalid email format';
            document.getElementById('registerEmailError').textContent = errorMsg;
        } else {
            showAlert(errorMsg + ': ' + error.message, 'danger');
        }
    }
});

function showUserProfile(user) {
    const userProfile = document.getElementById('userProfile');
    const authForms = document.querySelector('.nav-tabs')?.parentElement;
    
    if (userProfile) {
        userProfile.style.display = 'block';
        document.getElementById('userName').textContent = user.displayName || user.email.split('@')[0];
        document.getElementById('userEmail').textContent = user.email;
        
        if (authForms) {
            authForms.style.display = 'none';
        }
    }
}

// Logout Handler
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
