import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-950 dark:via-slate-900 dark:to-black">
      <header className="sticky top-0 z-50 px-4 lg:px-6 h-16 flex items-center shadow-sm bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
        <Link href="#" className="flex items-center justify-center group" prefetch={false}>
          <MountainIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 group-hover:animate-pulse" />
          <span className="ml-2 font-semibold text-lg text-gray-800 dark:text-gray-200">Retenance</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-200 hover:underline underline-offset-4" prefetch={false}>
            Features
          </Link>
          <Link href="#about" className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-200 hover:underline underline-offset-4" prefetch={false}>
            About
          </Link>
          <Link href="#contact" className="text-sm font-medium text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors duration-200 hover:underline underline-offset-4" prefetch={false}>
            Contact
          </Link>
          <Button asChild variant="outline" size="sm" className="transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:shadow-md hover:shadow-indigo-500/30 dark:hover:shadow-indigo-400/30">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild size="sm" className="transition-all duration-300 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-500/50 dark:hover:shadow-indigo-400/50">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-1 flex flex-col items-center w-full">
        <section id="hero" className="w-full py-20 md:py-32 lg:py-40 xl:py-56 flex items-center justify-center text-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-950/40 dark:via-purple-950/40 dark:to-pink-950/40">
          <div className="container px-4 md:px-6 space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl/none text-gray-900 dark:text-gray-100">
              Welcome to Retenance - Your Modern Learning Management System
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-700 md:text-xl dark:text-gray-300">
              Retenance provides a seamless and engaging platform for educators and learners to manage courses, track progress, and collaborate effectively.
            </p>
            <div className="space-x-4">
              <Button asChild size="lg" className="transition-transform duration-200 hover:scale-105">
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="transition-transform duration-200 hover:scale-105">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </section>
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950 scroll-mt-16"> {/* Added scroll-mt-16 for header offset */}
          <div className="container px-4 md:px-6 space-y-12">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-indigo-100 px-3 py-1 text-sm dark:bg-indigo-800/40 text-indigo-700 dark:text-indigo-300">Core Features</div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl text-gray-900 dark:text-white">Everything You Need for Effective Learning Management</h2>
                <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Retenance offers a comprehensive suite of tools designed to enhance the teaching and learning experience.
                </p>
              </div>
            </div>
            {/* Updated Feature Cards with Glow Effect */}
            <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {[ // Array for easier mapping if needed later
                { title: "Course Management", description: "Easily create, organize, and manage your online courses." },
                { title: "Progress Tracking", description: "Monitor student progress, grades, and engagement in real-time." },
                { title: "Interactive Content", description: "Deliver engaging learning materials, quizzes, and assignments." },
                { title: "Communication Tools", description: "Facilitate communication between instructors and students." },
                { title: "User Management", description: "Manage student enrollments, instructor roles, and user permissions." },
                { title: "Reporting & Analytics", description: "Generate insightful reports on course effectiveness and learner performance." },
              ].map((feature, index) => (
                <div key={index} className="grid gap-2 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/80 hover:shadow-xl hover:shadow-indigo-500/20 dark:hover:shadow-indigo-400/20 hover:scale-[1.03] transition-all duration-300 ease-in-out group">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{feature.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Add About and Contact sections if needed */}
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-950/70 mt-auto"> {/* Added mt-auto to push footer down */}
        <p className="text-xs text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} Retenance. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600 dark:text-gray-400 transition-colors duration-200" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4 text-gray-600 dark:text-gray-400 transition-colors duration-200" prefetch={false}>
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
