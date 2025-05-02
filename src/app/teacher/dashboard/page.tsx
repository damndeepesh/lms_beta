"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function TeacherDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('Teacher'); // Default or loading state

  useEffect(() => {
    // Simulate fetching user name
    const fetchUserName = async () => {
      // Replace with actual fetch logic
      setUserName('Esteemed Teacher'); 
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
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Teacher Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>Welcome, {userName}!</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Here's an overview of your classes and student progress.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Placeholder for teacher-specific content */}
                  <p>Your assigned courses and student activities will appear here.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Upcoming Assignments</CardDescription>
                  <CardTitle className="text-4xl">5</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Due this week
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Active Students</CardDescription>
                  <CardTitle className="text-4xl">120</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Across all classes
                  </div>
                </CardContent>
              </Card>
              {/* Add more cards or sections as needed */}
            {/* Example Quick Actions Card - Adapt as needed */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="group flex items-center gap-2 text-lg">
                  Quick Actions
                </CardTitle>
                <CardDescription>Manage your courses and students.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                {/* Placeholder for quick actions */}
                <ul>
                  <li>Create New Assignment</li>
                  <li>View Student Submissions</li>
                  <li>Gradebook</li>
                  <li>Class Announcements</li>
                </ul>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}