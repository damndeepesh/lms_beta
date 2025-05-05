"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Assuming Button component exists
import { cn } from "@/utils/cn";
import { IconBrandApple, IconBrandGoogle } from "@tabler/icons-react";
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link for navigation

// Placeholder for a Logo component or simple text/image
const Logo = () => (
  <div className="flex items-center space-x-2">
    {/* Replace with actual SVG or Image component if available */}
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span className="font-semibold text-lg text-gray-800 dark:text-white">Myna UI</span>
  </div>
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@admin.com'); // Pre-filled example
  const [password, setPassword] = useState('admin@123'); // Pre-filled example
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    console.log("Form submitted with:", { email, password });

    // --- Existing Login Logic --- (Keep or adapt as needed)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      console.log('Login successful:', data);

      if (data.passwordResetRequired) {
        // Redirect to password reset page if needed
        router.push('/auth/reset-password');
      } else {
        // Redirect based on role
        const { role } = data;
        switch (role) {
          case 'ADMIN':
            router.push('/admin/dashboard');
            break;
          case 'STUDENT': // Add case for STUDENT role
            router.push('/student/dashboard'); // Assuming '/student/dashboard' is the correct path
            break;
          case 'MANAGEMENT': // Add case for MANAGEMENT role
            router.push('/management/dashboard');
            break;
          case 'FINANCE': // Add case for FINANCE role
            router.push('/finance/dashboard');
            break;
          case 'TEACHER': // Add case for TEACHER role
            router.push('/teacher/dashboard');
            break;
          // Add other roles as needed
          default:
            console.error('Unknown user role:', role);
            setError('Login successful, but could not determine dashboard.');
            router.push('/'); // Default redirect
            break;
        }
      }

    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An unexpected error occurred.');
    }
    // --- End of Existing Login Logic ---
  };

  const handleGoogleLogin = () => {
    console.log("Login with Google clicked");
    // Add Google OAuth logic here
  };

  const handleAppleLogin = () => {
    console.log("Login with Apple clicked");
    // Add Apple Sign In logic here
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-emerald-50 via-cyan-50 to-light-blue-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">


      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-4">
        {/* Login Card */}
        <div className="relative z-10 max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <h2 className="font-semibold text-2xl text-center text-gray-800 dark:text-neutral-100 mb-1">
            Login
          </h2>
          <p className="text-center text-sm text-gray-600 dark:text-neutral-400 mb-6">
            Nice to see you again!
          </p>



          {/* Email/Password Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1 block">Email</Label>
              <Input
                id="email"
                placeholder="team@mynaui.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md h-11 px-4 text-gray-900 dark:text-neutral-200 placeholder-gray-400 dark:placeholder-neutral-500 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:ring-1 focus:outline-none transition duration-200 w-full"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-neutral-300 mb-1 block">Password</Label>
              <Input
                id="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md h-11 px-4 text-gray-900 dark:text-neutral-200 placeholder-gray-400 dark:placeholder-neutral-500 focus:border-emerald-500 dark:focus:border-emerald-400 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:ring-1 focus:outline-none transition duration-200 w-full"
              />
            </div>

            {error && (
              <div className="w-full bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-2 rounded text-sm" role="alert">
                {error}
              </div>
            )}

            <Button
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-md h-11 font-medium transition duration-200 w-full flex items-center justify-center gap-1"
              type="submit"
            >
              Sign In <span aria-hidden="true">→</span>
            </Button>
          </form>

        </div>
      </main>


    </div>
  );
}