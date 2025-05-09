```mermaid
sequenceDiagram
    participant User
    participant Frontend (React Native App)
    participant Backend (API Gateway, Microservices)
    participant Database (PostgreSQL, Redis)

    User->>Frontend: Opens App / Browses Restaurants
    Frontend->>Backend: API Request (e.g., /restaurants?location=...)
    Backend->>Database: Query Restaurants
    Database-->>Backend: Restaurant Data
    Backend-->>Frontend: Restaurant List

    User->>Frontend: Selects Restaurant / Views Menu
    Frontend->>Backend: API Request (e.g., /restaurants/{id}/menu)
    Backend->>Database: Query Menu Items
    Database-->>Backend: Menu Data
    Backend-->>Frontend: Menu Displayed

    User->>Frontend: Adds Items to Cart / Places Order
    Frontend->>Backend: POST /orders (Order Details)
    Backend->>Database: Create Order Record (Status: Pending)
    Backend->>Backend: Process Payment (via Payment Gateway)
    Backend->>Database: Update Order Status (e.g., Paid, Preparing)
    Backend-->>Frontend: Order Confirmation

    opt[Restaurant Accepts Order]
        Backend->>Vendor App: Notify New Order
        Vendor App->>Backend: Confirm Order
        Backend->>Database: Update Order Status (e.g., Accepted)
        Backend-->>Frontend: Order Status Update
    end

    opt[Restaurant Rejects Order]
        Backend->>Vendor App: Notify Order Rejection
        Vendor App->>Backend: Confirm Rejection
        Backend->>Database: Update Order Status (e.g., Rejected, Refunded)
        Backend-->>Frontend: Order Rejection Notification
    end

    opt[Driver Assignment]
        Backend->>Driver App: New Delivery Task
        Driver App->>Backend: Accept/Reject Task
        Backend->>Database: Update Order Status (e.g., Out for Delivery)
        Backend-->>Frontend: Order Status Update
    end

    opt[Delivery & Completion]
        Driver App->>Backend: Mark as Delivered
        Backend->>Database: Update Order Status (e.g., Delivered)
        Backend-->>Frontend: Order Status Update
        Frontend->>User: Rate/Review Order
        User->>Frontend: Submit Rating/Review
        Frontend->>Backend: Store Rating/Review
        Backend->>Database: Save Rating/Review
    end
```
