"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const performLogout = async () => {
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          // Handle logout failure on the client-side if needed
          console.error('Logout failed:', await response.text());
          // Optionally show an error message to the user
        }

        // Regardless of API success/failure, redirect to login
        // Clearing the cookie is the main goal, which the API attempts
        router.push('/login');

      } catch (error) {
        console.error('Error during logout:', error);
        // Still redirect even if the fetch fails
        router.push('/login');
      }
    };

    performLogout();
  }, [router]); // Dependency array ensures this runs once on mount

  // Display a loading or logging out message while the process happens
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">Logging out...</p>
        {/* Optional: Add a spinner or loading indicator here */}
      </div>
    </div>
  );
}