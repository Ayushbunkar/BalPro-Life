import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../DashboardLayout';
import AdminSidebar from './AdminSidebar';
import { productsAPI } from '../../../utils/api';
import Button from '../../../components/Button';
import { useNavigate } from 'react-router-dom';
import ConfirmDialog from '../../../components/ConfirmDialog';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = { page, limit };
        if (debouncedSearch) params.q = debouncedSearch;
        const data = await productsAPI.getProducts(params);
        setProducts(data.data || []);
        if (data.pagination) {
          setTotalPages(data.pagination.pages || 1);
        }
      } catch (err) {
        setError(err.message || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page, limit, debouncedSearch]);

  // debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 450);
    return () => clearTimeout(t);
  }, [search]);

  const removeProduct = async (id) => {
    try {
      await productsAPI.deleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete product');
    }
  };

  const confirmDelete = (id) => {
    setSelectedProductId(id);
    setConfirmOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!selectedProductId) return;
    await removeProduct(selectedProductId);
    setSelectedProductId(null);
    setConfirmOpen(false);
  };

  return (
    <DashboardLayout sidebar={<AdminSidebar />} title="Manage Products">
      <div className="mb-4 flex justify-end">
        <Button variant="primary" onClick={() => navigate('/admin/products/new')}>New Product</Button>
      </div>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search products" className="p-2 border rounded" />
        </div>
        <div>
          <Button variant="primary" onClick={() => navigate('/admin/products/new')}>New Product</Button>
        </div>
      </div>
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
                  <Button variant="secondary" onClick={() => navigate(`/admin/products/${p._id}/edit`)}>Edit</Button>
                  <Button variant="danger" onClick={() => confirmDelete(p._id)}>Delete</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 rounded bg-slate-100">Prev</button>
        <span className="px-3">Page {page} / {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 rounded bg-slate-100">Next</button>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        onConfirm={onConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </DashboardLayout>
  );
};

export default AdminProducts;
