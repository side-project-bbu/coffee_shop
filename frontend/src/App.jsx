import { useState, useEffect } from 'react'
import CartSidebar from './CartSidebar'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: '',
    is_available: true
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [cart, setCart] = useState([])

  // Fetch products from FastAPI backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/products')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewProduct((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    try {
      const response = await fetch('http://localhost:8000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price)
        })
      })
      if (!response.ok) {
        throw new Error('Failed to add product')
      }
      setShowModal(false)
      setNewProduct({ name: '', price: '', category: '', is_available: true })
      // Refresh product list
      setLoading(true)
      setError(null)
      const res = await fetch('http://localhost:8000/api/products')
      setProducts(await res.json())
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
      setLoading(false)
    }
  }

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product])
  }

  const handleRemoveFromCart = (idx) => {
    setCart((prev) => prev.filter((_, i) => i !== idx))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Error: {error}</p>
            <p className="text-sm mt-2">Make sure your FastAPI server is running on http://localhost:8000</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">☕ Coffee Shop</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h2>
              <p className="text-gray-600">Discover our amazing coffee selection</p>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition-colors"
              onClick={() => setShowModal(true)}
            >
              + New Product
            </button>
          </div>

          {/* Modal for new product */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-2xl"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  &times;
                </button>
                <h3 className="text-xl font-bold mb-4">Add New Product</h3>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Price (in dollars)</label>
                    <input
                      type="number"
                      name="price"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={newProduct.category}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_available"
                      checked={newProduct.is_available}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label className="text-gray-700">Available</label>
                  </div>
                  {submitError && (
                    <div className="text-red-600 text-sm">{submitError}</div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition-colors disabled:opacity-50"
                    disabled={submitting}
                  >
                    {submitting ? 'Adding...' : 'Add Product'}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Add some products to your coffee shop!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{product.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        product.is_available 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {product.is_available ? 'Available' : 'Out of Stock'}
                      </span>
                    </div>
                    <div className="mb-4">
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full">
                        {product.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        ${parseFloat(product.price).toFixed(2)}
                      </span>
                      <button 
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                          product.is_available
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!product.is_available}
                        onClick={() => handleAddToCart(product)}
                      >
                        {product.is_available ? 'Add to Cart' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
      {/* Cart Sidebar */}
      <CartSidebar cart={cart} onRemove={handleRemoveFromCart} />
    </div>
  )
}

export default App
