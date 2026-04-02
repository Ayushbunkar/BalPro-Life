import React, { useCallback, useEffect, useMemo, useState } from 'react';
import DashboardLayout from '../../DashboardLayout';
import AdminSidebar from './AdminSidebar';
import ConfirmDialog from '../../../components/ConfirmDialog';
import useDebounce from '../../../hooks/useDebounce';
import useApiRequest from '../../../hooks/useApiRequest';
import userService from '../../../services/userService';

const emptyForm = { name: '', email: '', password: '', role: 'user', isActive: true };

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const { loading, error, setError, execute } = useApiRequest();
  const debouncedSearch = useDebounce(search.trim(), 450);

  const fetchUsers = useCallback(async () => {
    await execute(async () => {
      const params = { page, limit };
      if (debouncedSearch) params.q = debouncedSearch;
      if (selectedRole !== 'all') params.role = selectedRole;
      if (selectedStatus !== 'all') params.status = selectedStatus;

      const data = await userService.getUsers(params);
      setUsers(data.data || []);
      setTotalPages(data.pagination?.pages || 1);
      return data;
    });
  }, [debouncedSearch, execute, limit, page, selectedRole, selectedStatus]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const openAddModal = () => {
    setEditingUser(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setForm({
      name: user.name || '',
      email: user.email || '',
      password: '',
      role: user.role || 'user',
      isActive: user.isActive !== false
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    setForm(emptyForm);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setError('');

    if (!editingUser && !form.password) {
      setError('Password is required for new users');
      return;
    }

    try {
      if (editingUser) {
        const payload = { name: form.name, email: form.email, role: form.role, isActive: form.isActive };
        const res = await execute(() => userService.updateUser(editingUser._id, payload));
        const updated = res.data;
        setUsers((prev) => prev.map((u) => (u._id === editingUser._id ? updated : u)));
      } else {
        const payload = {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          isActive: form.isActive
        };
        const res = await execute(() => userService.createUser(payload));
        setUsers((prev) => [res.data, ...prev]);
      }
      closeModal();
    } catch (_err) {
      // Error state handled by hook.
    }
  };

  const confirmDelete = (id) => {
    setSelectedUserId(id);
    setConfirmOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!selectedUserId) return;
    const currentUsers = users;
    setUsers((prev) => prev.filter((u) => u._id !== selectedUserId));
    setConfirmOpen(false);

    try {
      await execute(() => userService.deleteUser(selectedUserId));
    } catch (_err) {
      setUsers(currentUsers);
    } finally {
      setSelectedUserId(null);
    }
  };

  const activeUsers = useMemo(() => users.filter((user) => user.isActive !== false).length, [users]);
  const adminUsers = useMemo(() => users.filter((user) => user.role === 'admin').length, [users]);

  return (
    <DashboardLayout sidebar={<AdminSidebar />}>
      <div className="space-y-8">
        <header className="bg-[rgba(250,249,247,0.8)] backdrop-blur-xl rounded-2xl flex justify-between items-center px-8 py-4 border border-outline-variant/10 gap-4">
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-lg">search</span>
            <input
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="w-full bg-surface-container-highest border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-container focus:bg-surface-container-lowest transition-all"
              placeholder="Search by name or email..."
              type="text"
            />
          </div>
          <button
            className="bg-[linear-gradient(135deg,#7C5812_0%,#D4A65A_100%)] text-white px-6 py-2.5 rounded-full font-bold text-sm"
            type="button"
            onClick={openAddModal}
          >
            Add User
          </button>
        </header>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-lg p-6 shadow-sm flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-on-surface">User Management</h3>
              <p className="text-sm text-on-tertiary-container">Server-side search, pagination and filters enabled.</p>
            </div>
            <div className="flex gap-6">
              <div>
                <p className="text-2xl font-extrabold text-primary">{loading ? '—' : activeUsers}</p>
                <p className="text-[10px] uppercase tracking-widest text-stone-500">Active</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-on-surface">{loading ? '—' : adminUsers}</p>
                <p className="text-[10px] uppercase tracking-widest text-stone-500">Admins</p>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 bg-surface-container-low rounded-lg p-6 space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2">Role</p>
              <select
                className="w-full rounded-lg border border-outline-variant/20 bg-surface-container-lowest px-3 py-2 text-sm"
                value={selectedRole}
                onChange={(e) => {
                  setPage(1);
                  setSelectedRole(e.target.value);
                }}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-stone-500 font-bold mb-2">Status</p>
              <select
                className="w-full rounded-lg border border-outline-variant/20 bg-surface-container-lowest px-3 py-2 text-sm"
                value={selectedStatus}
                onChange={(e) => {
                  setPage(1);
                  setSelectedStatus(e.target.value);
                }}
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>

        {error && <div className="text-sm text-red-600">{error}</div>}

        <section className="bg-surface-container-lowest rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low/30">
                  <th className="px-6 py-4 text-xs font-bold uppercase">Name</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase">Email</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase">Role</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase">Status</th>
                  <th className="px-6 py-4 text-xs font-bold uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {!loading && users.map((user) => (
                  <tr key={user._id} className="hover:bg-surface-container-low/20">
                    <td className="px-6 py-4 font-medium">{user.name}</td>
                    <td className="px-6 py-4 text-sm text-stone-600">{user.email}</td>
                    <td className="px-6 py-4 text-sm uppercase">{user.role}</td>
                    <td className="px-6 py-4 text-sm">{user.isActive === false ? 'Inactive' : 'Active'}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="px-3 py-1 text-xs rounded border" type="button" onClick={() => openEditModal(user)}>Edit</button>
                        <button className="px-3 py-1 text-xs rounded border border-red-200 text-red-600" type="button" onClick={() => confirmDelete(user._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {loading && (
                  <tr>
                    <td className="px-6 py-8 text-sm text-stone-500" colSpan={5}>Loading users...</td>
                  </tr>
                )}
                {!loading && users.length === 0 && (
                  <tr>
                    <td className="px-6 py-8 text-sm text-stone-500" colSpan={5}>No users found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 bg-surface-container-low/10 flex justify-between items-center">
            <p className="text-xs text-stone-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-full border disabled:opacity-40"
                type="button"
              >
                &lt;
              </button>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="w-8 h-8 rounded-full border disabled:opacity-40"
                type="button"
              >
                &gt;
              </button>
            </div>
          </div>
        </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form className="w-full max-w-xl rounded-2xl bg-white p-6 space-y-4" onSubmit={submitForm}>
            <h3 className="text-lg font-bold">{editingUser ? 'Edit User' : 'Add User'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="rounded-lg border px-3 py-2" name="name" value={form.name} onChange={handleFormChange} placeholder="Full name" required />
              <input className="rounded-lg border px-3 py-2" type="email" name="email" value={form.email} onChange={handleFormChange} placeholder="Email" required />
              {!editingUser && (
                <input className="rounded-lg border px-3 py-2" type="password" name="password" value={form.password} onChange={handleFormChange} placeholder="Password" required />
              )}
              <select className="rounded-lg border px-3 py-2" name="role" value={form.role} onChange={handleFormChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" name="isActive" checked={form.isActive} onChange={handleFormChange} />
                Active account
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className="px-4 py-2 rounded-lg border" onClick={closeModal}>Cancel</button>
              <button type="submit" className="px-4 py-2 rounded-lg bg-primary text-white" disabled={loading}>{loading ? 'Saving...' : 'Save User'}</button>
            </div>
          </form>
        </div>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Delete user"
        message="Are you sure you want to delete this user? This cannot be undone."
        onConfirm={onConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </DashboardLayout>
  );
};

export default AdminUsers;
