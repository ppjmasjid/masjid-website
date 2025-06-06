'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

// Type definition for a single calendar day
type CalendarDay = {
  date: {
    gregorian: { date: string; day: string; month: { en: string; number: number }; year: string }
    hijri: {
      date: string
      day: string
      month: { en: string }
      year: string
      holidays: string[]
    }
  }
}

export default function IslamicCalendar() {
  const [calendar, setCalendar] = useState<CalendarDay[]>([])
  const [month, setMonth] = useState(new Date().getMonth() + 1)
  const [year, setYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCalendar = async () => {
      try {
        setLoading(true)
        const res = await axios.get(
          `https://api.aladhan.com/v1/calendar?month=${month}&year=${year}&latitude=23.78&longitude=90.38&method=2`
        )
        setCalendar(res.data.data || [])
        setError(null)
      } catch {
        setError('Failed to load calendar data.')
        setCalendar([])
      } finally {
        setLoading(false)
      }
    }

    fetchCalendar()
  }, [month, year])

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12)
      setYear((prev) => prev - 1)
    } else {
      setMonth((prev) => prev - 1)
    }
  }

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1)
      setYear((prev) => prev + 1)
    } else {
      setMonth((prev) => prev + 1)
    }
  }

  const hijriHeader =
    calendar.length > 0
      ? calendar[0]?.date?.hijri?.month?.en + ' ' + calendar[0]?.date?.hijri?.year
      : ''

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const today = new Date()

  return (
    <div className="max-w-6xl mx-auto p-4 bg-gradient-to-br from-emerald-100 to-white shadow-lg rounded-xl border border-emerald-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-2">
        <button
          onClick={handlePrevMonth}
          className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-md"
        >
          ◀ Previous
        </button>
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
            {new Date(year, month - 1).toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </h2>
          <p className="text-green-700 font-medium">{hijriHeader}</p>
        </div>
        <button
          onClick={handleNextMonth}
          className="bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-md"
        >
          Next ▶
        </button>
      </div>

      {/* Calendar Grid */}
      {loading && <p className="text-center text-sm text-gray-500">Loading calendar...</p>}
      {error && <p className="text-center text-red-600 font-medium">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-7 gap-1 text-center text-sm font-bold text-green-800 mb-2">
            {dayNames.map((day, idx) => (
              <div key={idx} className="py-1">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {/* Empty cells for the first week */}
            {calendar.length > 0 &&
              Array(
                new Date(
                  Number(calendar[0].date.gregorian.year),
                  calendar[0].date.gregorian.month.number - 1,
                  1
                ).getDay()
              )
                .fill(null)
                .map((_, idx) => <div key={`empty-${idx}`} />)}

            {calendar.map((dayObj, i) => {
              const { gregorian, hijri } = dayObj.date
              const isToday =
                parseInt(gregorian.day) === today.getDate() &&
                parseInt(gregorian.month.number.toString()) === today.getMonth() + 1 &&
                parseInt(gregorian.year) === today.getFullYear()

              return (
                <div
                  key={i}
                  className={`relative flex flex-col items-center justify-center px-2 py-3 text-sm border rounded-lg shadow-sm transition-all duration-200 ${
                    isToday
                      ? 'bg-green-100 border-green-400 ring-2 ring-green-300'
                      : 'bg-white hover:bg-green-50'
                  }`}
                >
                  <div className="font-bold text-gray-800 text-base leading-none">
                    {gregorian.day}
                  </div>
                  <div className="text-green-700 mt-1 text-sm leading-none">
                    {hijri.day}
                  </div>
                  {hijri.holidays.length > 0 && (
                    <div className="text-red-500 text-xs mt-1 text-center">
                      {hijri.holidays.join(', ')}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      
    </div>
  )
}
