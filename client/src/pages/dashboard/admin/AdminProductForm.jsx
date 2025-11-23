import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import AdminSidebar from '../../../components/dashboard/AdminSidebar';
import { productsAPI } from '../../../utils/api';
import Button from '../../../components/Button';
import { useNavigate, useParams } from 'react-router-dom';

const AdminProductForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEdit && id) {
      (async () => {
        try {
          const data = await productsAPI.getProduct(id);
          const p = data.data;
          setForm({ name: p.name || '', price: p.price || '', description: p.description || '' });
        } catch (err) {
          setError(err.message || 'Failed to load product');
        }
      })();
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => setImageFile(e.target.files[0] || null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const fd = new FormData();
      fd.append('name', form.name);
      fd.append('price', form.price);
      fd.append('description', form.description);
      if (imageFile) fd.append('image', imageFile);

      if (isEdit && id) {
        await productsAPI.updateProductForm(id, fd);
      } else {
        await productsAPI.createProductForm(fd);
      }

      navigate('/admin/products');
    } catch (err) {
      setError(err.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout sidebar={<AdminSidebar />} title={isEdit ? 'Edit Product' : 'Create Product'}>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="w-full mt-1 p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input name="price" type="number" value={form.price} onChange={handleChange} className="w-full mt-1 p-2 border rounded" required />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full mt-1 p-2 border rounded" rows={4} />
        </div>
        <div>
          <label className="block text-sm font-medium">Image</label>
          <input type="file" accept="image/*" onChange={handleFile} className="mt-1" />
        </div>
        <div className="flex gap-3">
          <Button type="submit" variant="primary" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
          <Button type="button" variant="secondary" onClick={() => navigate('/admin/products')}>Cancel</Button>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default AdminProductForm;
