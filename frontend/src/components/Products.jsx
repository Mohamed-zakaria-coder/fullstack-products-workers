import React, { useState, useEffect } from 'react';
import '../index.css'; // Import a separate CSS file for styling

// ... (imports)

export default function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Useeffect Is working ");
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    fetch("http://localhost:3001/products")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching data:', error))
      .finally(() => setLoading(false));
  };

  const handleAddOrUpdateProduct = () => {
    if (editingProduct) {
      updateProduct();
    } else {
      addProduct();
    }
  };
  const addProduct = () => {
    fetch("http://localhost:3001/products", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(res => {
        if (res.status === 200 || res.status === 201) {
          return res.json();
        } else {
          throw new Error(`Server returned ${res.status} ${res.statusText}`);
        }
      })
      .then(addedProduct => {
        setProducts([...products, addedProduct]);
        setNewProduct({ name: '', description: '', price: 0 });
      })
      .catch(error => console.error('Error adding product:', error));
  };
  

  const updateProduct = () => {
    fetch(`http://localhost:3001/products/${editingProduct._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })
      .then(res => res.json())
      .then(updatedProduct => {
        setProducts(products.map(p => (p._id === updatedProduct._id ? updatedProduct : p)));
        setNewProduct({ name: '', description: '', price: 0 });
        setEditingProduct(null);
      })
      .catch(error => console.error('Error updating product:', error));
  };

  const handleDeleteProduct = productId => {
    fetch(`http://localhost:3001/products/${productId}`, {
      method: 'DELETE',
    })
      .then(() => setProducts(products.filter(product => product._id !== productId)))
      .catch(error => console.error('Error deleting product:', error));
  };

  const handleUpdateProduct = product => {
    setNewProduct({ ...product });
    setEditingProduct(product);
  };

  const handleCancelUpdate = () => {
    setNewProduct({ name: '', description: '', price: 0 });
    setEditingProduct(null);
  };

  return (
    <div>
      <div className="form-container">
        {/* Add form for adding a new product or updating an existing one */}
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Product Description"
          value={newProduct.description}
          onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Product Price"
          value={newProduct.price}
          onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <button onClick={handleAddOrUpdateProduct}>
          {editingProduct ? 'Update Product' : 'Add Product'}
        </button>
        {editingProduct && (
          <button onClick={handleCancelUpdate} style={{ marginLeft: '10px' }}>
            Cancel Update
          </button>
        )}
      </div>

      {loading && <p>Loading...</p>}

      {products.length > 0 && (
        <div className="product-list">
          {products.map(product => (
            <div key={product._id} className="card">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <span>${product.price}</span>
              <button onClick={() => handleUpdateProduct(product)}>Update</button>
              <button
                onClick={() => handleDeleteProduct(product._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
