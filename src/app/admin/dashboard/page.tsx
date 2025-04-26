"use client";

import React from 'react';
import { CardStack } from "@/components/ui/card-stack";
import { cn } from "@/utils/cn";

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
    {
      id: 0,
      name: "Manu Arora",
      designation: "Senior Software Engineer",
      content: (
        <p>
          These cards are amazing, <Highlight>I want to use them</Highlight> in my
          project. Framer motion is amazing.
        </p>
      ),
    },
    {
      id: 1,
      name: "Elon Musk",
      designation: "Senior Shitposter",
      content: (
        <p>
          I dont like this Twitter thing, <Highlight>deleting it right away</Highlight>
          because yolo. Instead, I will build similar thing in React Native.
        </p>
      ),
    },
    {
      id: 2,
      name: "Tyler Durden",
      designation: "Manager Project Mayhem",
      content: (
        <p>
          The first rule of <Highlight>Fight Club</Highlight> is that you do not
          talk about fight club. The second rule of Fight club is that you DO NOT
          talk about fight club.
        </p>
      ),
    },
  ];
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome to the admin dashboard.</p>
      <div className="h-[40rem] flex items-center justify-center w-full">
        <CardStack items={CARDS} />
      </div>
    </div>
  );
}