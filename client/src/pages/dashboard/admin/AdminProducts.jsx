import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../DashboardLayout';
import AdminSidebar from './AdminSidebar';
import { productsAPI } from '../../../utils/api';
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStock, setSelectedStock] = useState('all');
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

  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 450);
    return () => clearTimeout(t);
  }, [search]);

  const removeProduct = async (id) => {
    try {
      await productsAPI.deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
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

  const getImageUrl = (product) =>
    product?.images?.[0]?.url ||
    'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=300&q=80';

  const getCategoryLabel = (category) => {
    if (!category) return 'General';
    if (category === 'protein') return 'Protein';
    if (category === 'supplements') return 'Supplements';
    if (category === 'accessories') return 'Accessories';
    if (category === 'equipment') return 'Equipment';
    return category;
  };

  const getStockStatus = (qty) => {
    if (qty <= 0) return 'out';
    if (qty < 150) return 'low';
    return 'in';
  };

  const filteredProducts = products.filter((product) => {
    const categoryPass = selectedCategory === 'all' || product.category === selectedCategory;
    const qty = product?.inventory?.quantity || 0;
    const status = getStockStatus(qty);
    const stockPass = selectedStock === 'all' || status === selectedStock;
    return categoryPass && stockPass;
  });

  const maxQty = Math.max(1, ...filteredProducts.map((p) => p?.inventory?.quantity || 0));

  const paginationButtons = [];
  const start = Math.max(1, page - 1);
  const end = Math.min(totalPages, start + 2);
  for (let i = start; i <= end; i += 1) paginationButtons.push(i);

  return (
    <DashboardLayout sidebar={<AdminSidebar />}>
      <div className="space-y-8">
        <header className="bg-[rgba(250,249,247,0.8)] backdrop-blur-xl rounded-2xl flex justify-between items-center px-8 py-4 border border-outline-variant/10">
          <div className="flex items-center gap-4 w-1/3 min-w-[260px]">
            <div className="relative w-full max-w-sm">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">search</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-surface-container-highest border-none rounded-xl pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary-container transition-all"
                placeholder="Search catalog..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-stone-500 hover:text-[#D4A65A] transition-all" type="button">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full"></span>
            </button>
            <div className="h-6 w-px bg-outline-variant/20"></div>
            <div className="flex items-center gap-3">
              <span className="font-manrope text-sm font-semibold text-[#1A1C1B]">Balpro Life</span>
            </div>
          </div>
        </header>

        <section className="flex justify-between items-end">
          <div>
            <h2 className="font-headline text-4xl font-bold tracking-tight text-on-surface mb-2">Product Catalog</h2>
            <p className="text-on-tertiary-container font-medium">Manage your premium inventory and stock levels.</p>
          </div>
          <button
            onClick={() => navigate('/admin/products/new')}
            className="bg-[linear-gradient(135deg,#7C5812_0%,#D4A65A_100%)] text-on-primary-fixed px-8 py-3 rounded-2xl font-bold flex items-center gap-2 hover:-translate-y-0.5 transition-all shadow-lg"
            type="button"
          >
            <span className="material-symbols-outlined">add</span>
            Add Product
          </button>
        </section>

        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-2xl p-6 flex flex-col xl:flex-row xl:items-center gap-6 xl:gap-8">
            <div className="flex flex-col gap-1.5">
              <span className="font-label text-[10px] font-bold tracking-widest text-secondary uppercase">Quick Category</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'All Products' },
                  { key: 'protein', label: 'Protein' },
                  { key: 'supplements', label: 'Supplements' },
                  { key: 'accessories', label: 'Accessories' },
                  { key: 'equipment', label: 'Equipment' },
                ].map((category) => (
                  <button
                    key={category.key}
                    type="button"
                    onClick={() => setSelectedCategory(category.key)}
                    className={`px-4 py-1.5 rounded-full text-xs border transition-all ${
                      selectedCategory === category.key
                        ? 'bg-surface-container-lowest text-primary font-bold border-outline-variant/15'
                        : 'hover:bg-surface-container-lowest text-secondary font-medium border-transparent'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden xl:block h-10 w-px bg-outline-variant/20"></div>

            <div className="flex flex-col gap-1.5 flex-1">
              <span className="font-label text-[10px] font-bold tracking-widest text-secondary uppercase">Stock Status</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'in', label: 'In Stock' },
                  { key: 'low', label: 'Low Stock' },
                  { key: 'out', label: 'Out of Stock' },
                ].map((stock) => (
                  <button
                    key={stock.key}
                    type="button"
                    onClick={() => setSelectedStock(stock.key)}
                    className={`px-4 py-1.5 rounded-full text-xs transition-all ${
                      selectedStock === stock.key
                        ? 'bg-surface-container-lowest text-primary font-bold'
                        : 'hover:bg-surface-container-lowest text-secondary font-medium'
                    }`}
                  >
                    {stock.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant/15 rounded-2xl p-6 flex justify-between items-center">
            <div>
              <h4 className="text-xs font-bold text-secondary tracking-widest uppercase mb-1">Inventory Health</h4>
              <p className="text-2xl font-bold text-primary">
                {filteredProducts.length === 0
                  ? '0%'
                  : `${Math.round((filteredProducts.filter((p) => getStockStatus(p?.inventory?.quantity || 0) !== 'out').length / filteredProducts.length) * 100)}%`}
              </p>
            </div>
            <span className="material-symbols-outlined text-4xl text-primary/20">inventory</span>
          </div>
        </section>

        {error && <div className="text-red-600">{error}</div>}

        <section className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-container-low/50">
                  <th className="px-8 py-5 font-label text-[10px] font-bold tracking-widest text-secondary uppercase">Product</th>
                  <th className="px-6 py-5 font-label text-[10px] font-bold tracking-widest text-secondary uppercase">SKU</th>
                  <th className="px-6 py-5 font-label text-[10px] font-bold tracking-widest text-secondary uppercase">Price</th>
                  <th className="px-6 py-5 font-label text-[10px] font-bold tracking-widest text-secondary uppercase">Stock Level</th>
                  <th className="px-6 py-5 font-label text-[10px] font-bold tracking-widest text-secondary uppercase">Status</th>
                  <th className="px-8 py-5 font-label text-[10px] font-bold tracking-widest text-secondary uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {!loading && filteredProducts.map((product) => {
                  const qty = product?.inventory?.quantity || 0;
                  const stockStatus = getStockStatus(qty);
                  const stockPercent = Math.max(0, Math.min(100, Math.round((qty / maxQty) * 100)));
                  const sku = product?.inventory?.sku || `BP-${product?._id?.slice(-6)?.toUpperCase() || 'N/A'}`;

                  return (
                    <tr key={product._id} className="hover:bg-surface-container-low/30 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-lg bg-surface-container p-1 overflow-hidden">
                            <img alt={product.name} className="w-full h-full object-cover rounded-md" src={getImageUrl(product)} />
                          </div>
                          <div>
                            <h5 className="font-bold text-sm text-on-surface">{product.name}</h5>
                            <p className="text-xs text-on-tertiary-container">{getCategoryLabel(product.category)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-mono text-xs text-secondary">{sku}</td>
                      <td className="px-6 py-5 font-bold text-sm text-on-surface">₹{Number(product.price || 0).toFixed(2)}</td>
                      <td className="px-6 py-5">
                        <div className="w-32">
                          <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] font-bold text-secondary">{qty} Units</span>
                            <span className={`text-[10px] font-bold ${stockStatus === 'out' ? 'text-error' : stockStatus === 'low' ? 'text-amber-600' : 'text-primary'}`}>
                              {stockPercent}%
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                            <div
                              className={`h-full ${stockStatus === 'out' ? 'bg-error' : stockStatus === 'low' ? 'bg-amber-500' : 'bg-primary-container'}`}
                              style={{ width: `${stockPercent}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          stockStatus === 'out'
                            ? 'bg-red-100 text-red-700'
                            : stockStatus === 'low'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-emerald-100 text-emerald-700'
                        }`}>
                          {stockStatus === 'out' ? 'Out of Stock' : stockStatus === 'low' ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => navigate(`/admin/products/${product._id}/edit`)}
                            className="px-3 py-1.5 rounded-lg border border-outline-variant/20 text-xs font-semibold text-secondary hover:text-primary hover:border-primary-container/40 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => confirmDelete(product._id)}
                            className="px-3 py-1.5 rounded-lg border border-red-200 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {loading && (
                  <tr>
                    <td className="px-8 py-8 text-sm text-stone-500" colSpan={6}>Loading products...</td>
                  </tr>
                )}

                {!loading && filteredProducts.length === 0 && (
                  <tr>
                    <td className="px-8 py-8 text-sm text-stone-500" colSpan={6}>No products found for the selected filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-8 py-6 flex justify-between items-center bg-surface-container-low/30">
            <p className="text-xs text-on-tertiary-container font-medium">Showing {filteredProducts.length} items on page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant/15 text-secondary hover:bg-surface-container-lowest transition-all disabled:opacity-50"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">chevron_left</span>
              </button>

              {paginationButtons.map((pNum) => (
                <button
                  key={pNum}
                  onClick={() => setPage(pNum)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs transition-all ${
                    pNum === page
                      ? 'bg-primary-container text-on-primary-container font-bold'
                      : 'border border-outline-variant/15 text-secondary hover:bg-surface-container-lowest'
                  }`}
                  type="button"
                >
                  {pNum}
                </button>
              ))}

              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-outline-variant/15 text-secondary hover:bg-surface-container-lowest transition-all disabled:opacity-50"
                type="button"
              >
                <span className="material-symbols-outlined text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </section>
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
