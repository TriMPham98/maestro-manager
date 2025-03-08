import React from "react";
import Link from "next/link";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

export default function LessonsPage() {
  // Mock data for demonstration
  const currentMonth = "March 2025";
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate calendar days for the month
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - 3; // Offset to start the month on a Wednesday
    return {
      date: day > 0 && day <= 31 ? day : null,
      isCurrentMonth: day > 0 && day <= 31,
      isToday: day === 10, // Assuming today is the 10th
      lessons: getLessonsForDay(day),
    };
  });

  // Helper function to get lessons for a specific day
  function getLessonsForDay(day: number) {
    const lessons = [
      {
        id: 1,
        student: "Emma Johnson",
        time: "3:30 PM",
        duration: 45,
        instrument: "Piano",
      },
      {
        id: 2,
        student: "Noah Williams",
        time: "5:00 PM",
        duration: 30,
        instrument: "Guitar",
      },
      {
        id: 3,
        student: "Olivia Brown",
        time: "4:15 PM",
        duration: 60,
        instrument: "Violin",
      },
      {
        id: 4,
        student: "Liam Davis",
        time: "6:00 PM",
        duration: 45,
        instrument: "Drums",
      },
      {
        id: 5,
        student: "Ava Miller",
        time: "2:30 PM",
        duration: 30,
        instrument: "Voice",
      },
    ];

    // Return lessons for specific days
    if (day === 10) return [lessons[0], lessons[1]];
    if (day === 11) return [lessons[2]];
    if (day === 12) return [lessons[3]];
    if (day === 14) return [lessons[4]];
    if (day === 17) return [lessons[0], lessons[2]];
    if (day === 18) return [lessons[1]];
    if (day === 19) return [lessons[3]];
    if (day === 21) return [lessons[4]];
    if (day === 24) return [lessons[0], lessons[1]];
    if (day === 25) return [lessons[2]];
    if (day === 26) return [lessons[3]];
    if (day === 28) return [lessons[4]];

    return [];
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Lessons</h1>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/lessons/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Schedule Lesson
          </Link>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h2 className="mx-4 text-xl font-semibold text-gray-900">
            {currentMonth}
          </h2>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-md hover:bg-indigo-200">
            Month
          </button>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-100">
            Week
          </button>
          <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-100">
            Day
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-px border-b border-gray-200">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="text-center py-2 text-sm font-semibold text-gray-900">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {calendarDays.map((day, dayIdx) => (
            <div
              key={dayIdx}
              className={`min-h-[120px] bg-white ${
                !day.isCurrentMonth ? "bg-gray-50 text-gray-400" : ""
              } ${day.isToday ? "bg-indigo-50" : ""}`}>
              {day.date !== null && (
                <div className="px-2 py-2">
                  <div
                    className={`text-right ${
                      day.isToday ? "text-indigo-600 font-semibold" : ""
                    }`}>
                    {day.date}
                  </div>
                  <div className="mt-2 space-y-1">
                    {day.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/lessons/${lesson.id}`}
                        className="block px-2 py-1 text-xs rounded-md bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                        <div className="font-semibold">
                          {lesson.time} ({lesson.duration}m)
                        </div>
                        <div className="truncate">{lesson.student}</div>
                        <div className="text-indigo-500">
                          {lesson.instrument}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Lessons */}
      <h2 className="mt-8 text-lg font-medium text-gray-900">
        Upcoming Lessons
      </h2>
      <div className="mt-2 bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {[
            ...getLessonsForDay(10),
            ...getLessonsForDay(11),
            ...getLessonsForDay(12),
          ].map((lesson) => (
            <li key={lesson.id}>
              <Link
                href={`/lessons/${lesson.id}`}
                className="block hover:bg-gray-50">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {lesson.student}
                      </p>
                      <p className="ml-2 flex-shrink-0 text-xs text-gray-500">
                        {lesson.instrument}
                      </p>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {lesson.duration} minutes
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">
                        {/* Calendar icon */}
                        <svg
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        March 10, 2025
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        {/* Clock icon */}
                        <svg
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {lesson.time}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
