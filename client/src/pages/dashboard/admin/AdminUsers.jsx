import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import AdminSidebar from '../../../components/dashboard/AdminSidebar';
import { usersAPI } from '../../../utils/api';
import Button from '../../../components/Button';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await usersAPI.getUsers();
        setUsers(data.data || []);
      } catch (err) {
        setError(err.message || 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const changeRole = async (id, newRole) => {
    try {
      await usersAPI.updateUser(id, { role: newRole });
      setUsers(prev => prev.map(u => u._id === id ? { ...u, role: newRole } : u));
    } catch (err) {
      setError(err.message || 'Failed to update role');
    }
  };

  return (
    <DashboardLayout sidebar={<AdminSidebar />} title="Manage Users">
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AdminUsers;
