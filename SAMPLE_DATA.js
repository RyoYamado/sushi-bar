// Sample Data for Testing
// You can use this data to populate your Firestore database for testing

/*
=== SAMPLE EMPLOYEES ===

Document 1:
{
  "name": "Hiroshi Tanaka",
  "position": "Chef",
  "email": "hiroshi@sushi-bar.com",
  "phone": "+1-555-0101",
  "createdAt": "2025-01-01T10:00:00Z",
  "updatedAt": "2025-01-01T10:00:00Z"
}

Document 2:
{
  "name": "Maria Garcia",
  "position": "Server",
  "email": "maria@sushi-bar.com",
  "phone": "+1-555-0102",
  "createdAt": "2025-01-02T10:00:00Z",
  "updatedAt": "2025-01-02T10:00:00Z"
}

Document 3:
{
  "name": "David Chen",
  "position": "Manager",
  "email": "david@sushi-bar.com",
  "phone": "+1-555-0103",
  "createdAt": "2025-01-03T10:00:00Z",
  "updatedAt": "2025-01-03T10:00:00Z"
}

Document 4:
{
  "name": "Yuki Yamamoto",
  "position": "Chef",
  "email": "yuki@sushi-bar.com",
  "phone": "+1-555-0104",
  "createdAt": "2025-01-04T10:00:00Z",
  "updatedAt": "2025-01-04T10:00:00Z"
}

=== SAMPLE MENU ITEMS ===

Document 1:
{
  "name": "California Roll",
  "category": "Roll",
  "price": 12.99,
  "description": "Fresh cucumber, avocado, and imitation crab with rice and nori",
  "createdAt": "2025-01-01T10:00:00Z",
  "updatedAt": "2025-01-01T10:00:00Z"
}

Document 2:
{
  "name": "Spicy Tuna Roll",
  "category": "Roll",
  "price": 14.99,
  "description": "Tuna, spicy mayo, sriracha, and cucumber rolled in nori",
  "createdAt": "2025-01-01T10:30:00Z",
  "updatedAt": "2025-01-01T10:30:00Z"
}

Document 3:
{
  "name": "Salmon Nigiri",
  "category": "Nigiri",
  "price": 10.99,
  "description": "Fresh Atlantic salmon over seasoned rice, hand-formed",
  "createdAt": "2025-01-02T10:00:00Z",
  "updatedAt": "2025-01-02T10:00:00Z"
}

Document 4:
{
  "name": "Tuna Sashimi",
  "category": "Sashimi",
  "price": 13.99,
  "description": "Six slices of premium grade tuna",
  "createdAt": "2025-01-02T11:00:00Z",
  "updatedAt": "2025-01-02T11:00:00Z"
}

Document 5:
{
  "name": "Edamame",
  "category": "Appetizer",
  "price": 5.99,
  "description": "Steamed soybeans with sea salt",
  "createdAt": "2025-01-03T10:00:00Z",
  "updatedAt": "2025-01-03T10:00:00Z"
}

Document 6:
{
  "name": "Dragon Roll",
  "category": "Roll",
  "price": 16.99,
  "description": "Shrimp tempura, cucumber, avocado wrapped in thin sliced avocado",
  "createdAt": "2025-01-03T11:00:00Z",
  "updatedAt": "2025-01-03T11:00:00Z"
}

Document 7:
{
  "name": "Rainbow Roll",
  "category": "Roll",
  "price": 17.99,
  "description": "Assorted sashimi over a California roll base",
  "createdAt": "2025-01-04T10:00:00Z",
  "updatedAt": "2025-01-04T10:00:00Z"
}

Document 8:
{
  "name": "Tempura Shrimp Appetizer",
  "category": "Appetizer",
  "price": 8.99,
  "description": "Crispy fried shrimp with tempura sauce",
  "createdAt": "2025-01-04T11:00:00Z",
  "updatedAt": "2025-01-04T11:00:00Z"
}

=== SAMPLE PRODUCTS ===

Document 1:
{
  "name": "Salmon Fillet",
  "sku": "SAL-001",
  "stock": 50,
  "price": 18.99,
  "createdAt": "2025-01-01T10:00:00Z",
  "updatedAt": "2025-01-01T10:00:00Z"
}

Document 2:
{
  "name": "Tuna Fillet",
  "sku": "TUN-001",
  "stock": 45,
  "price": 22.99,
  "createdAt": "2025-01-01T10:30:00Z",
  "updatedAt": "2025-01-01T10:30:00Z"
}

Document 3:
{
  "name": "Nori Sheets",
  "sku": "NOR-100",
  "stock": 200,
  "price": 3.99,
  "createdAt": "2025-01-02T10:00:00Z",
  "updatedAt": "2025-01-02T10:00:00Z"
}

Document 4:
{
  "name": "Sushi Rice (5lb)",
  "sku": "RIC-005",
  "stock": 30,
  "price": 8.99,
  "createdAt": "2025-01-02T11:00:00Z",
  "updatedAt": "2025-01-02T11:00:00Z"
}

Document 5:
{
  "name": "Wasabi Paste",
  "sku": "WAS-050",
  "stock": 100,
  "price": 2.99,
  "createdAt": "2025-01-03T10:00:00Z",
  "updatedAt": "2025-01-03T10:00:00Z"
}

Document 6:
{
  "name": "Shrimp (1lb)",
  "sku": "SHR-001",
  "stock": 35,
  "price": 12.99,
  "createdAt": "2025-01-03T11:00:00Z",
  "updatedAt": "2025-01-03T11:00:00Z"
}

=== SAMPLE ORDERS ===

Document 1:
{
  "customer": "John Smith",
  "item": "California Roll",
  "quantity": 2,
  "status": "Completed",
  "createdAt": "2025-01-05T12:00:00Z",
  "updatedAt": "2025-01-05T12:30:00Z"
}

Document 2:
{
  "customer": "Emily Johnson",
  "item": "Spicy Tuna Roll",
  "quantity": 1,
  "status": "Ready",
  "createdAt": "2025-01-05T13:00:00Z",
  "updatedAt": "2025-01-05T13:15:00Z"
}

Document 3:
{
  "customer": "Michael Brown",
  "item": "Salmon Nigiri",
  "quantity": 3,
  "status": "Preparing",
  "createdAt": "2025-01-05T13:30:00Z",
  "updatedAt": "2025-01-05T13:35:00Z"
}

Document 4:
{
  "customer": "Sarah Davis",
  "item": "Dragon Roll",
  "quantity": 2,
  "status": "Pending",
  "createdAt": "2025-01-05T14:00:00Z",
  "updatedAt": "2025-01-05T14:00:00Z"
}

Document 5:
{
  "customer": "Robert Wilson",
  "item": "Rainbow Roll",
  "quantity": 1,
  "status": "Completed",
  "createdAt": "2025-01-05T14:30:00Z",
  "updatedAt": "2025-01-05T15:00:00Z"
}

Document 6:
{
  "customer": "Jessica Martinez",
  "item": "Edamame",
  "quantity": 4,
  "status": "Ready",
  "createdAt": "2025-01-05T15:00:00Z",
  "updatedAt": "2025-01-05T15:10:00Z"
}

=== HOW TO ADD THIS DATA TO FIRESTORE ===

Option 1: Manual Entry (Firebase Console)
1. Go to Firebase Console > Firestore Database
2. For each collection, click "Add document"
3. Set document ID as "Auto ID" or specific ID
4. Enter the fields from the samples above
5. Click "Save"

Option 2: Import JSON (Firebase Console)
1. Go to Firestore Database
2. Click three dots menu
3. Select "Import / Export"
4. Select the collection
5. Upload JSON file with the data

Option 3: Bulk Upload with Script
1. Create a new script file
2. Use Firebase Admin SDK
3. Loop through sample data and add to database

Example (requires Firebase Admin SDK):
```javascript
const db = admin.firestore();

const sampleEmployees = [
  { name: "Hiroshi Tanaka", position: "Chef", ... }
];

for (const emp of sampleEmployees) {
  await db.collection('employees').add(emp);
}
```

Option 4: Web Console Script
1. Open browser console (F12)
2. Make sure you're on auth.html and logged in as admin
3. Run this code:

const sampleMenu = [
  { name: "California Roll", category: "Roll", price: 12.99, description: "..." }
];

for (const item of sampleMenu) {
  await db.collection('menu').add({
    ...item,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

console.log("Data added successfully!");

=== TIPS ===

- Test with a small amount of data first
- Verify data appears correctly in Firestore console
- Check search and filter functionality with sample data
- Test pagination with multiple records
- Use this data to demonstrate all features

=== DELETING SAMPLE DATA ===

If you want to delete the sample data:

Option 1: Firebase Console
1. Go to Firestore Database
2. For each collection, select all documents
3. Click "Delete" button
4. Confirm deletion

Option 2: Script (in browser console)
db.collection('menu').get().then(snap => {
  snap.docs.forEach(doc => doc.ref.delete());
});

=== PRODUCTION DATA ===

Before deploying to production:
1. Remove sample data
2. Set up proper security rules
3. Implement user role management
4. Set up backups
5. Monitor Firestore usage
6. Consider data retention policies

*/
