import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import AdminSidebar from '../../../components/dashboard/AdminSidebar';
import { productsAPI } from '../../../utils/api';
import Button from '../../../components/Button';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await productsAPI.getProducts();
        setProducts(data.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const removeProduct = async (id) => {
    try {
      await productsAPI.deleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete product');
    }
  };

  return (
    <DashboardLayout sidebar={<AdminSidebar />} title="Manage Products">
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <div>Loading products...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map(p => (
            <div key={p._id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold">{p.name}</h3>
                  <p className="text-sm text-slate-500">₹{p.price}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => removeProduct(p._id)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminProducts;
