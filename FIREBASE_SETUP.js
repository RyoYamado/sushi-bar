// Firebase Setup and Configuration Guide
// This file contains instructions for setting up Firebase with this project

/*
=== FIREBASE PROJECT SETUP ===

1. GO TO FIREBASE CONSOLE
   - Visit: https://console.firebase.google.com
   - Click "Create a project"
   - Name: "susi-bar"
   - Click "Continue"

2. ENABLE AUTHENTICATION
   - In Firebase Console, go to: Authentication > Sign-in method
   - Enable "Email/Password"
   - Enable "Anonymous" (optional, for testing)
   
3. CREATE FIRESTORE DATABASE
   - In Firebase Console, go to: Firestore Database
   - Click "Create database"
   - Select "Start in production mode"
   - Select location: us-central1 (or your preferred region)
   - Click "Create"

4. CREATE COLLECTIONS
   Open Firebase Console > Firestore Database > Collections tab
   Create the following collections by clicking "Start collection":
   
   a) Collection: "employees"
      - Document auto-id
      - Fields: name (string), position (string), email (string), phone (string)
   
   b) Collection: "menu"
      - Document auto-id
      - Fields: name (string), category (string), price (number), description (string)
   
   c) Collection: "products"
      - Document auto-id
      - Fields: name (string), sku (string), stock (number), price (number)
   
   d) Collection: "orders"
      - Document auto-id
      - Fields: customer (string), item (string), quantity (number), status (string)
   
   e) Collection: "users"
      - Document id: {uid}
      - Fields: uid (string), name (string), email (string), role (string), createdAt (timestamp)

5. GET YOUR FIREBASE CONFIG
   - In Firebase Console, go to: Project settings (gear icon)
   - Go to: General tab > Your apps section
   - Look for: Web app (</> icon)
   - If not created, click "Add app" and select "Web"
   - Copy the Firebase config object
   - This is already configured in: js/firebase-config.js

6. SET FIRESTORE SECURITY RULES
   Go to: Firestore Database > Rules tab
   
   Use these rules for development (NOT for production):
   
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Allow read/write for authenticated users
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
       
       // Allow anonymous read for menu and products
       match /menu/{document=**} {
         allow read: if true;
       }
       match /products/{document=**} {
         allow read: if true;
       }
     }
   }

=== FIREBASECONFIG.JS ===

Current configuration in js/firebase-config.js:

const firebaseConfig = {
  apiKey: "AIzaSyAzgzSDcxuMFezjupYe2x93flh7C1Hye64",
  authDomain: "susi-bar.firebaseapp.com",
  databaseURL: "https://susi-bar-default-rtdb.firebaseio.com",
  projectId: "susi-bar",
  storageBucket: "susi-bar.firebasestorage.app",
  messagingSenderId: "32851424950",
  appId: "1:32851424950:web:9ef282498a0af7a99e1817",
  measurementId: "G-2W5FX7WBL6"
};

IMPORTANT: If you're using a different Firebase project:
1. Go to Firebase Console > Project settings
2. Copy your config from the Web app section
3. Replace the above config in js/firebase-config.js

=== RUNNING THE APPLICATION ===

Option 1: Using Python (Python 3 required)
   python -m http.server 8000
   Open: http://localhost:8000/index.html

Option 2: Using Node.js
   npm install -g http-server
   http-server
   Open: http://localhost:8080/index.html

Option 3: Using VS Code Live Server Extension
   Right-click index.html > "Open with Live Server"

Option 4: Direct browser (limited functionality)
   Open index.html directly in browser (file:// protocol)
   Note: CORS issues may occur - local server recommended

=== TESTING THE APPLICATION ===

1. REGISTER A NEW USER
   - Go to: http://localhost:8000/auth.html
   - Click "Register" tab
   - Enter: Name, Email, Password
   - Click "Register"
   - You should see a success message

2. LOG IN
   - Click "Sign In" tab
   - Enter email and password
   - Click "Sign In"
   - Should redirect to data-management.html

3. ADD MENU ITEMS
   - Go to: Admin Panel (admin.html)
   - Click "Add Menu Item"
   - Fill in details:
     Name: "California Roll"
     Category: "Roll"
     Price: 12.99
     Description: "Fresh cucumber, avocado, and imitation crab"
   - Click "Save Menu Item"
   - Go to main page (index.html) to see it in featured items

4. ADD EMPLOYEES
   - Go to: Admin Panel (admin.html)
   - Click "Add Employee"
   - Fill in details:
     Name: "John Doe"
     Position: "Chef"
     Email: "john@example.com"
     Phone: "555-1234567"
   - Click "Save Employee"
   - Go to Data Management to view

5. ADD PRODUCTS
   - Go to: Admin Panel (admin.html)
   - Click "Add Product"
   - Fill in details:
     Name: "Salmon"
     SKU: "SAL-001"
     Stock: 50
     Price: 8.99
   - Click "Save Product"
   - Go to Data Management to view

6. ADD ORDERS
   - Go to: Admin Panel (admin.html)
   - Click "Add Order"
   - Fill in details:
     Customer: "Jane Smith"
     Item: "California Roll"
     Quantity: 2
     Status: "Pending"
   - Click "Save Order"
   - Go to Data Management to view

7. TEST SEARCH AND FILTER
   - Go to: Data Management (data-management.html)
   - Try searching for employees by name
   - Filter menu by category
   - Filter orders by status
   - Try pagination if you have many records

=== TROUBLESHOOTING ===

Problem: "Firebase is not defined"
Solution: Make sure firebase-config.js is loaded before other scripts
          Check browser console (F12) for errors

Problem: "No data appears in forms"
Solution: Check that collections exist in Firestore
          Verify user is authenticated
          Check Firestore security rules

Problem: "Can't log in"
Solution: Ensure Authentication is enabled in Firebase Console
          Check that users collection exists
          Verify email/password match in authentication records

Problem: "Data not saving"
Solution: Check Firestore quota usage in Firebase Console
          Verify security rules allow write access
          Check browser console for error messages

Problem: "Images not loading"
Solution: Place images in /assets folder
          Update image paths in HTML files
          Use relative paths (./assets/image.jpg)

=== FIRESTORE FIELD TYPES ===

String: Text data (Name, Email, Position)
Number: Numeric data (Price, Stock, Quantity)
Boolean: True/False values
Date/Timestamp: Date and time values (use serverTimestamp())
Array: List of values
Map: Object with key-value pairs
GeoPoint: Location coordinates
Reference: Link to another document

=== FIREBASE COSTS ===

Free Tier (Spark Plan):
- Up to 1GB storage
- 50k read operations/day
- 20k write operations/day
- 20k delete operations/day

Paid Tier (Blaze Plan):
- Pay per read/write/delete
- Higher quotas
- Better for production

Monitor usage in: Firebase Console > Usage tab

=== ADDITIONAL RESOURCES ===

Firebase Docs: https://firebase.google.com/docs
Firestore Queries: https://firebase.google.com/docs/firestore/query-data/queries
Security Rules: https://firebase.google.com/docs/firestore/security/get-started
Authentication: https://firebase.google.com/docs/auth/web/start

=== NEXT STEPS ===

1. Set up your Firebase project
2. Create collections and documents
3. Update security rules for your use case
4. Test all CRUD operations
5. Deploy to production (Firebase Hosting, Netlify, Vercel)
6. Monitor Firestore usage and costs
7. Implement additional features as needed

Happy coding! 🍣
*/
