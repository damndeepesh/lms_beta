"use client";

import React from 'react';
import { CardStack } from "@/components/ui/card-stack";
import { cn } from "@/utils/cn";
import Link from 'next/link'; // Import Link

// Define a simple Highlight component for demonstration
const Highlight = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

export default function AdminDashboard() {
  const CARDS = [
    // Keep only the User Management Card
    {
      id: 3, // Ensure unique ID
      name: "User Management",
      designation: "Admin Task",
      content: (
        <Link href="/admin/users/create" className="block w-full h-full">
          <p>
            Click here to <Highlight>add new users</Highlight> to the system and assign roles.
          </p>
        </Link>
      ),
    },
  ];

  return (
    <div className="h-[40rem] flex items-center justify-center w-full">
      <CardStack items={CARDS} />
    </div>
  );
}