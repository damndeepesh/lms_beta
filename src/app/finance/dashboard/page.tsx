"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function FinanceDashboard() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>('Finance User'); // Default or loading state

  useEffect(() => {
    // Simulate fetching user name
    const fetchUserName = async () => {
      // Replace with actual fetch logic
      setUserName('Finance Team Member'); 
    };
    fetchUserName();
  }, []);

  // Placeholder content for Finance Dashboard
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userName}!</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Finance Dashboard</p>
      <p>Specific content for this role will go here.</p>
      {/* Add Finance-specific components and features here */}
      
      {/* Example: Button to navigate somewhere or perform an action */}
      {/* <Button onClick={() => console.log('Finance action')}>Perform Action</Button> */}

      {/* Example: Logout or navigate back */}
      <Button variant="outline" onClick={() => router.push('/login')} className="mt-4">
        Logout
      </Button>
    </div>
  );
}