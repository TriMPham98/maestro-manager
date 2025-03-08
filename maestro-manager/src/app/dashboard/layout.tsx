import React from "react";
import Link from "next/link";
import {
  Music,
  Users,
  Calendar,
  CreditCard,
  Settings,
  LogOut,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-indigo-700">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-white">Maestro Manager</h1>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-white bg-indigo-800">
                <Music className="mr-3 h-6 w-6" />
                Dashboard
              </Link>
              <Link
                href="/students"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-600">
                <Users className="mr-3 h-6 w-6" />
                Students
              </Link>
              <Link
                href="/lessons"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-600">
                <Calendar className="mr-3 h-6 w-6" />
                Lessons
              </Link>
              <Link
                href="/payments"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-600">
                <CreditCard className="mr-3 h-6 w-6" />
                Payments
              </Link>
              <Link
                href="/settings"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-600">
                <Settings className="mr-3 h-6 w-6" />
                Settings
              </Link>
              <Link
                href="/logout"
                className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-indigo-100 hover:bg-indigo-600">
                <LogOut className="mr-3 h-6 w-6" />
                Logout
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-indigo-600 md:hidden">
                    Maestro Manager
                  </h1>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-3 relative">
                  <div>
                    <button className="max-w-xs bg-indigo-600 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-indigo-700 flex items-center justify-center text-white">
                        MT
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
