<template>
  <div class="products-page">
    <h1>Product Management</h1>
    <div class="page-content">
      <div class="card">
        <h2>Product Overview</h2>
        <p>Welcome to the product management section. Here you can:</p>
        <ul>
          <li>View all coffee products</li>
          <li>Add new products to the menu</li>
          <li>Update product prices and descriptions</li>
          <li>Manage product categories and availability</li>
          <li>Track inventory levels</li>
        </ul>
      </div>
      
      <div class="card">
        <h3>Quick Actions</h3>
        <div class="button-group">
          <button class="btn btn-primary">Add Product</button>
          <button class="btn btn-secondary">View Menu</button>
          <button class="btn btn-secondary">Check Inventory</button>
          <button class="btn btn-secondary">Update Prices</button>
        </div>
      </div>
      
      <div class="card">
        <h3>Popular Categories</h3>
        <div class="categories">
          <span class="category">☕ Coffee</span>
          <span class="category">🧊 Cold Drinks</span>
          <span class="category">🥐 Pastries</span>
          <span class="category">🍰 Desserts</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Products page component
</script>

<style scoped>
.products-page {
  padding: 2rem;
}

.products-page h1 {
  color: #2c3e50;
  margin-bottom: 2rem;
  font-size: 2.5rem;
}

.page-content {
  display: grid;
  gap: 2rem;
}

.card {
  background: #fff;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
}

.card h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.card p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.card ul {
  color: #666;
  line-height: 1.6;
}

.card li {
  margin-bottom: 0.5rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.btn-primary {
  background: #42b883;
  color: white;
}

.btn-primary:hover {
  background: #369870;
}

.btn-secondary {
  background: #f8f9fa;
  color: #2c3e50;
  border: 1px solid #e0e0e0;
}

.btn-secondary:hover {
  background: #e9ecef;
}

.categories {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.category {
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #2c3e50;
  border: 1px solid #e0e0e0;
}
</style>
