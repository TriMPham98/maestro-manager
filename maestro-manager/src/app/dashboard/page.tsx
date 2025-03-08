import React from "react";
import Link from "next/link";
import { Calendar, Clock, DollarSign } from "lucide-react";

export default function Dashboard() {
  // Mock data for demonstration
  const upcomingLessons = [
    {
      id: 1,
      student: "Emma Johnson",
      instrument: "Piano",
      date: "March 10, 2025",
      time: "3:30 PM",
    },
    {
      id: 2,
      student: "Noah Williams",
      instrument: "Guitar",
      date: "March 10, 2025",
      time: "5:00 PM",
    },
    {
      id: 3,
      student: "Olivia Brown",
      instrument: "Violin",
      date: "March 11, 2025",
      time: "4:15 PM",
    },
  ];

  const recentPayments = [
    {
      id: 1,
      student: "Emma Johnson",
      amount: 60,
      date: "March 3, 2025",
      status: "Paid",
    },
    {
      id: 2,
      student: "Noah Williams",
      amount: 55,
      date: "March 2, 2025",
      status: "Paid",
    },
    {
      id: 3,
      student: "Olivia Brown",
      amount: 65,
      date: "March 1, 2025",
      status: "Paid",
    },
  ];

  const studentStats = {
    total: 12,
    active: 10,
    inactive: 2,
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

      {/* Stats Overview */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Students Stats */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Total Students
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {studentStats.total}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between">
                <div className="text-sm font-medium text-gray-500">
                  Active: {studentStats.active}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  Inactive: {studentStats.inactive}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link
                href="/students"
                className="font-medium text-indigo-600 hover:text-indigo-500">
                View all students
              </Link>
            </div>
          </div>
        </div>

        {/* Upcoming Lessons */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Upcoming Lessons
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      {upcomingLessons.length} lessons
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="ml-1 text-sm text-gray-500">
                  Next: {upcomingLessons[0].date} at {upcomingLessons[0].time}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link
                href="/lessons"
                className="font-medium text-indigo-600 hover:text-indigo-500">
                View all lessons
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    Recent Payments
                  </dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">
                      $
                      {recentPayments.reduce(
                        (sum, payment) => sum + payment.amount,
                        0
                      )}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <span className="text-sm text-gray-500">
                  {recentPayments.length} payments this month
                </span>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-4 sm:px-6">
            <div className="text-sm">
              <Link
                href="/payments"
                className="font-medium text-indigo-600 hover:text-indigo-500">
                View all payments
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Lessons */}
      <h2 className="mt-8 text-lg font-medium text-gray-900">
        Upcoming Lessons
      </h2>
      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Instrument
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {upcomingLessons.map((lesson) => (
                    <tr key={lesson.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {lesson.student}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {lesson.instrument}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {lesson.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {lesson.time}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Payments */}
      <h2 className="mt-8 text-lg font-medium text-gray-900">
        Recent Payments
      </h2>
      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentPayments.map((payment) => (
                    <tr key={payment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {payment.student}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          ${payment.amount}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {payment.date}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
