"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function TeacherDashboard() {
  const router = useRouter();

  // Placeholder content for Teacher Dashboard
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Teacher Dashboard</h1>
      <p>Welcome to the Teacher dashboard. Specific content for this role will go here.</p>
      {/* Add Teacher-specific components and features here */}
      
      {/* Example: Button to navigate somewhere or perform an action */}
      {/* <Button onClick={() => console.log('Teacher action')}>Perform Action</Button> */}

      {/* Example: Logout or navigate back */}
      <Button variant="outline" onClick={() => router.push('/login')} className="mt-4">
        Logout
      </Button>
    </div>
  );
}