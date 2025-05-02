"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

export default function StudentDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('Student'); // Default or loading state

  useEffect(() => {
    // In a real app, fetch user data here
    // For now, simulate fetching the name
    const fetchUserName = async () => {
      // Replace with actual fetch logic (e.g., API call, session check)
      // const user = await getUserData(); 
      // if (user && user.name) {
      //   setUserName(user.name);
      // }
      // Simulated name for demonstration
      setUserName('Valued Student'); 
    };

    fetchUserName();
  }, []); // Empty dependency array means this runs once on mount

  const handleLogout = async () => {
    router.push('/logout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-100 to-blue-100 dark:from-gray-900 dark:via-slate-800 dark:to-gray-700 p-8">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Student Dashboard</h1>
          <Button variant="outline" onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="sm:col-span-2">
                <CardHeader className="pb-3">
                  <CardTitle>Welcome, {userName}!</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Your learning journey starts here. Check your courses and assignments.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Placeholder for student-specific content */}
                  <p>Your enrolled courses and upcoming deadlines will be displayed here.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Assignments Due</CardDescription>
                  <CardTitle className="text-4xl">3</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    This week
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>Completed Courses</CardDescription>
                  <CardTitle className="text-4xl">2</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    Total completed
                  </div>
                </CardContent>
              </Card>
              {/* Add more cards or sections as needed */}
            {/* Example Progress Card - Adapt as needed */}
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="group flex items-center gap-2 text-lg">
                  My Progress
                </CardTitle>
                <CardDescription>Track your learning activities.</CardDescription>
              </CardHeader>
              <CardContent className="p-6 text-sm">
                {/* Placeholder for progress tracking */}
                <ul>
                  <li>View Grades</li>
                  <li>Course Certificates</li>
                  <li>Activity Log</li>
                  <li>Upcoming Quizzes</li>
                </ul>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}