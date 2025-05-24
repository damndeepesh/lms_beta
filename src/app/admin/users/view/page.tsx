"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, AlertCircle } from 'lucide-react';
import EditUserModal from '@/components/admin/EditUserModal';
import { Role } from '@prisma/client'; // Assuming Role enum is correctly imported from Prisma client
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// Define the User interface matching expected data structure
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

// State for API loading and error handling
interface ApiState {
  loading: boolean;
  error: string | null;
}

export default function ViewUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [apiState, setApiState] = useState<ApiState>({ loading: true, error: null });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  // Moved batch modal and batch name hooks inside the component
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [batchName, setBatchName] = useState("");
  const [batchAssignLoading, setBatchAssignLoading] = useState(false);
  const [batchAssignError, setBatchAssignError] = useState<string | null>(null);
  const [batchAssignSuccess, setBatchAssignSuccess] = useState<string | null>(null);
  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to fetch users from the API
  const fetchUsers = useCallback(async () => {
    setApiState({ loading: true, error: null });
    try {
      const res = await fetch("/api/admin/users/all");
      if (!res.ok) {
        // Attempt to parse error message from response, provide fallback
        const errorData = await res.json().catch(() => ({ message: 'Failed to fetch users and parse error response' }));
        throw new Error(errorData.message || `HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      // Ensure data.users is an array before setting state
      setUsers(Array.isArray(data.users) ? data.users : []);
    } catch (err: any) {
      // Set error message in state
      setApiState(prev => ({ ...prev, error: err.message || "An unexpected error occurred while fetching users." }));
    } finally {
      // Ensure loading is set to false regardless of outcome
      setApiState(prev => ({ ...prev, loading: false }));
    }
  }, []);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Handler to open the edit modal
  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  // Handler to close the edit modal
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  // Handler called after a user is successfully updated
  const handleUserUpdate = () => {
    fetchUsers(); // Refresh the user list
  };

  // Handler to delete a user
  const handleDelete = async (userId: string) => {
    // Confirmation dialog before deleting
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      setApiState(prev => ({ ...prev, loading: true, error: null })); // Indicate loading state
      try {
        const res = await fetch(`/api/admin/users/delete/${userId}`, {
          method: 'DELETE',
        });
        if (!res.ok) {
          // Attempt to parse error message from response, provide fallback
          const errorData = await res.json().catch(() => ({ error: 'Failed to delete user and parse error response' }));
          throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
        }
        fetchUsers(); // Refresh the user list on successful deletion
      } catch (error: any) {
        // Set error message in state
        setApiState({ loading: false, error: `Failed to delete user: ${error.message}` });
      } 
      // No finally block needed here for loading state, handled by fetchUsers or catch
    }
  };

  // Handler to select/deselect a single user
  const handleSelectUser = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  // Handler to select/deselect all users
  const handleSelectAll = () => {
    if (selectedUserIds.length === filteredUsers.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(filteredUsers.map((user) => user.id));
    }
  };

  // Handler for batch delete
  const handleBatchDelete = async () => {
    if (selectedUserIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedUserIds.length} selected user(s)? This action cannot be undone.`)) return;
    setApiState(prev => ({ ...prev, loading: true, error: null }));
    try {
      for (const userId of selectedUserIds) {
        await fetch(`/api/admin/users/delete/${userId}`, { method: 'DELETE' });
      }
      setSelectedUserIds([]);
      fetchUsers();
    } catch (error: any) {
      setApiState({ loading: false, error: `Failed to delete selected users: ${error.message}` });
    }
  };

  // Component to render loading state
  const renderLoading = () => (
    <p className="text-center text-gray-500 dark:text-gray-400 py-4">Loading users...</p>
  );

  // Component to render error state
  const renderError = () => (
    <Alert variant="destructive" className="my-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{apiState.error}</AlertDescription>
    </Alert>
  );

  // Component to render the user table
  const columns = [
    {
      key: "select",
      header: (
        <input
          type="checkbox"
          checked={selectedUserIds.length === filteredUsers.length && filteredUsers.length > 0}
          onChange={handleSelectAll}
          aria-label="Select all users"
        />
      ),
      className: "text-center",
      render: (_: any, row: User) => (
        <input
          type="checkbox"
          checked={selectedUserIds.includes(row.id)}
          onChange={() => handleSelectUser(row.id)}
          aria-label={`Select user ${row.firstName} ${row.lastName}`}
        />
      ),
    },
    {
      key: "firstName",
      header: "First Name",
      className: "font-semibold",
    },
    {
      key: "lastName",
      header: "Last Name",
      className: "font-semibold",
    },
    {
      key: "email",
      header: "Email",
      className: "font-semibold font-mono text-sm",
    },
    {
      key: "role",
      header: "Role",
      className: "font-semibold",
      render: (value: any) => (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700">{value}</span>
      ),
    },
    {
      key: "batch",
      header: "Batch/Class",
      className: "font-semibold",
      render: (value: any, row: User) => (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-700">{(row as any).batch || "-"}</span>
      ),
    },
    {
      key: "actions",
      header: <span className="text-right font-semibold">Actions</span>,
      className: "text-right font-semibold",
      render: (_: any, row: User) => (
        <div className="flex justify-end gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => handleEdit(row)}
            aria-label={`Edit user ${row.firstName} ${row.lastName}`}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="destructive" 
            size="icon" 
            onClick={() => handleDelete(row.id)}
            aria-label={`Delete user ${row.firstName} ${row.lastName}`}
            className="hover:bg-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const renderUserTable = () => (
    <div className="overflow-x-auto rounded-md border">
      {selectedUserIds.length > 0 && (
        <div className="flex items-center justify-between px-4 py-2 bg-blue-50 dark:bg-gray-700 border-b">
          <span className="text-sm font-medium">{selectedUserIds.length} user(s) selected</span>
          <Button variant="destructive" size="sm" onClick={handleBatchDelete}>
            Delete Selected
          </Button>
        </div>
      )}
      <Table columns={columns} data={filteredUsers} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-700 p-4 md:p-8">
      <div className="container mx-auto">
        <Card className="shadow-xl rounded-lg bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Manage Users</CardTitle>
            <CardDescription className="text-center">View, edit, and delete user accounts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-1/3 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
                aria-label="Search users"
              />
              <Button
                variant="outline"
                className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600 ml-2"
                disabled={selectedUserIds.length === 0}
                onClick={() => setIsBatchModalOpen(true)}
              >
                Assign to Batch/Class
              </Button>
            </div>
            {apiState.error && renderError()}
            {apiState.loading ? renderLoading() : renderUserTable()}
          </CardContent>
        </Card>
      </div>
      {/* Render EditUserModal only when needed */}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          open={isEditModalOpen}
          onClose={handleCloseModal}
          onUserUpdate={handleUserUpdate}
        />
      )}
      {/* Batch Assignment Modal */}
      {isBatchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">Assign Selected Students to Batch/Class</h2>
            <p className="mb-4 text-sm text-gray-600 dark:text-gray-300">Enter a batch/class name to group the selected students. You can use this batch for future assignments.</p>
            <input
              type="text"
              placeholder="Batch/Class Name"
              value={batchName}
              onChange={(e) => setBatchName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            {batchAssignError && <p className="text-red-500 text-sm">{batchAssignError}</p>}
            {batchAssignSuccess && <p className="text-green-600 text-sm">{batchAssignSuccess}</p>}
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="secondary" onClick={() => { setIsBatchModalOpen(false); setBatchName(""); setBatchAssignError(null); setBatchAssignSuccess(null); }}>Cancel</Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                disabled={!batchName || batchAssignLoading}
                onClick={async () => {
                  setBatchAssignLoading(true);
                  setBatchAssignError(null);
                  setBatchAssignSuccess(null);
                  try {
                    const res = await fetch("/api/admin/batch/assign", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ batchName, userIds: selectedUserIds }),
                    });
                    const data = await res.json();
                    if (!res.ok) throw new Error(data.error || "Failed to assign batch");
                    setBatchAssignSuccess("Batch assigned successfully!");
                    setBatchName("");
                    setIsBatchModalOpen(false);
                    setSelectedUserIds([]);
                    fetchUsers();
                  } catch (err: any) {
                    setBatchAssignError(err.message || "An error occurred");
                  } finally {
                    setBatchAssignLoading(false);
                  }
                }}
              >
                {batchAssignLoading ? "Assigning..." : "Assign"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}