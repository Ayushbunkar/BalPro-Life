import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../DashboardLayout';
import AdminSidebar from './AdminSidebar';
import { usersAPI } from '../../../utils/api';
import Button from '../../../components/Button';
import ConfirmDialog from '../../../components/ConfirmDialog';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const params = { page, limit };
        if (debouncedSearch) params.q = debouncedSearch;
        const data = await usersAPI.getUsers(params);
        setUsers(data.data || []);
        if (data.pagination) setTotalPages(data.pagination.pages || 1);
      } catch (err) {
        setError(err.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page, limit, debouncedSearch]);

  // debounce search input
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 450);
    return () => clearTimeout(t);
  }, [search]);

  const changeRole = async (id, newRole) => {
    try {
      await usersAPI.updateUser(id, { role: newRole });
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role: newRole } : u));
    } catch (err) {
      setError(err.message || 'Failed to update role');
    }
  };

  const removeUser = async (id) => {
    try {
      await usersAPI.deleteUser(id);
      setUsers(prev => prev.filter(u => u._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete user');
    }
  };

  const confirmDelete = (id) => {
    setSelectedUserId(id);
    setConfirmOpen(true);
  };

  const onConfirmDelete = async () => {
    if (!selectedUserId) return;
    await removeUser(selectedUserId);
    setSelectedUserId(null);
    setConfirmOpen(false);
  };

  return (
    <DashboardLayout sidebar={<AdminSidebar />} title="Manage Users">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users by name or email" className="p-2 border rounded" />
        </div>
      </div>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {loading ? (
        <div>Loading users...</div>
      ) : (
        <div className="bg-white rounded-lg shadow p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="pb-2">Name</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Role</th>
                <th className="pb-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-t">
                  <td className="py-3">{user.name}</td>
                  <td className="py-3">{user.email}</td>
                  <td className="py-3">{user.role}</td>
                  <td className="py-3">
                    <div className="flex gap-2">
                      {user.role !== 'admin' && (
                        <Button variant="primary" onClick={() => changeRole(user._id, 'admin')}>Make Admin</Button>
                      )}
                      {user.role !== 'user' && (
                        <Button variant="secondary" onClick={() => changeRole(user._id, 'user')}>Make User</Button>
                      )}
                      <Button variant="danger" onClick={() => confirmDelete(user._id)}>Delete</Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-center gap-3">
        <button disabled={page <= 1} onClick={() => setPage(p => Math.max(1, p - 1))} className="px-3 py-1 rounded bg-slate-100">Prev</button>
        <span className="px-3">Page {page} / {totalPages}</span>
        <button disabled={page >= totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))} className="px-3 py-1 rounded bg-slate-100">Next</button>
      </div>

      <ConfirmDialog open={confirmOpen} title="Delete user" message="Are you sure you want to delete this user? This cannot be undone." onConfirm={onConfirmDelete} onCancel={() => setConfirmOpen(false)} />
    </DashboardLayout>
  );
};

export default AdminUsers;
