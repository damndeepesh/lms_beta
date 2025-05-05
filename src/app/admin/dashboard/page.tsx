"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, BarChart, LogOut } from 'lucide-react';
import CreateUserModal, { Role as UserRole } from "@/components/CreateUserModal";

export default function AdminDashboard() {
  const router = useRouter();
  const [showCreateUser, setShowCreateUser] = React.useState(false);
  const [userName, setUserName] = useState<string>('Admin'); // Default or loading state

  useEffect(() => {
    // Simulate fetching user name
    const fetchUserName = async () => {
      // Replace with actual fetch logic
      setUserName('System Administrator'); 
    };
    fetchUserName();
  }, []);

  const handleLogout = async () => {
    router.push('/logout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-700 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Welcome, {userName}!</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">Admin Dashboard</p>
          <Button variant="outline" onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Management Card */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                User Management
              </CardTitle>
              <CardDescription>Manage user accounts and roles.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600" onClick={() => setShowCreateUser(true)}>
                  Add New User
                </Button>
                <Link href="/admin/users/view">
                  <Button className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600" variant="outline">
                    Manage Users
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Placeholder: Course Management */}
          <Card className="opacity-70 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                Course Management (Future)
              </CardTitle>
              <CardDescription>Create and manage courses.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">Feature coming soon.</p>
            </CardContent>
          </Card>

          {/* Placeholder: Student Progress */}
          <Card className="opacity-70 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                Student Progress (Future)
              </CardTitle>
              <CardDescription>Track student performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 dark:text-gray-400">Feature coming soon.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      {showCreateUser && (
        <CreateUserModal open={showCreateUser} onClose={() => setShowCreateUser(false)} />
      )}
    </div>
  );
}