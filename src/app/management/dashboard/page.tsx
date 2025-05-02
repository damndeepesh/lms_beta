"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function ManagementDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('Manager'); // Default or loading state

  useEffect(() => {
    // Simulate fetching user name
    const fetchUserName = async () => {
      // Replace with actual fetch logic
      setUserName('Management Team Member'); 
    };
    fetchUserName();
  }, []);

  // Placeholder content for Management Dashboard
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userName}!</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Management Dashboard</p>
      <p>Specific content for this role will go here.</p>
      {/* Add Management-specific components and features here */}
      
      {/* Example: Button to navigate somewhere or perform an action */}
      {/* <Button onClick={() => console.log('Management action')}>Perform Action</Button> */}

      {/* Example: Logout or navigate back */}
      <Button variant="outline" onClick={() => router.push('/login')} className="mt-4">
        Logout
      </Button>
    </div>
  );
}