'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'

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
      } catch (err) {
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

  const dayNames = ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'Sa']
  const today = new Date()

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white shadow rounded-xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded mb-2 sm:mb-0"
        >
          ◀
        </button>
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            {new Date(year, month - 1).toLocaleString('default', {
              month: 'long',
              year: 'numeric',
            })}{' '}
            | <span className="text-green-700">{hijriHeader}</span>
          </h2>
        </div>
        <button
          onClick={handleNextMonth}
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
        >
          ▶
        </button>
      </div>

      {/* Content */}
      {loading && <p className="text-center">Loading calendar...</p>}
      {error && <p className="text-red-600 text-center">{error}</p>}

      {!loading && !error && (
        <>
          {/* Day Names Row */}
          <div className="grid grid-cols-7 text-center font-bold mb-2">
            {dayNames.map((day, idx) => (
              <div key={idx} className="text-gray-700">
                {day}
              </div>
            ))}
          </div>

          {/* Dates */}
          <div className="grid grid-cols-7 gap-2 text-center">
            {/* Padding for first day of month */}
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
              const holidays = hijri?.holidays || []

              const isToday =
                parseInt(gregorian.day) === today.getDate() &&
                parseInt(gregorian.month.number.toString()) === today.getMonth() + 1 &&
                parseInt(gregorian.year) === today.getFullYear()

              const showHijriMonthName =
                i === 0 ||
                calendar[i - 1]?.date?.hijri?.month?.en !== hijri?.month?.en

              return (
                <div
                  key={i}
                  className={`relative p-2 border rounded-lg shadow-sm ${
                    isToday
                      ? 'bg-green-200 border-green-500 animate-pulse ring-2 ring-green-400'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="text-lg font-bold">{gregorian.day}</div>

                  <div className="mt-1 text-lg text-green-700">{hijri.day}</div>

                  {showHijriMonthName && (
                    <div className="absolute bottom-1 left-1 right-1 text-xs text-blue-700">
                      {hijri.month.en} {hijri.year}
                    </div>
                  )}

                  {holidays.length > 0 && (
                    <div className="text-xs text-red-600 mt-1">
                      {holidays.join(', ')}
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
