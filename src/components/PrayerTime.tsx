'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import advancedFormat from 'dayjs/plugin/advancedFormat'
dayjs.extend(advancedFormat)
import { getDate } from 'bangla-calendar'

const PRAYERS = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha']

export default function PrayerTimes() {
  const [times, setTimes] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [now, setNow] = useState(dayjs())
  const [hijri, setHijri] = useState<string>('')
  const [banglaDate, setBanglaDate] = useState("")

  useEffect(() => {
    fetchTimes()
    const interval = setInterval(() => setNow(dayjs()), 60000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const today = new Date()
    const banglaDateString = getDate(today)
    setBanglaDate(banglaDateString || "বাংলা তারিখ পাওয়া যায়নি")
  }, [])

  const fetchTimes = async () => {
    const res = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?city=Narsingdi&country=Bangladesh&method=5`
    )
    const data = res.data.data
    setTimes(data.timings)
    setHijri(
      `${data.date.hijri.day} ${data.date.hijri.month.en} ${data.date.hijri.year}`
    )
    setLoading(false)
  }

  const format12 = (timeStr: string) => {
    const time = toTodayTime(timeStr)
    return time.format('h:mm A')
  }

  const toTodayTime = (timeStr: string) => {
    const [hour, minute] = timeStr.split(':').map(Number)
    let time = dayjs().set('hour', hour).set('minute', minute).set('second', 0)
  
    // Shift to next day if time is early and now is late night (after Isha)
    if (now.hour() >= 22 && hour < 5) {
      time = time.add(1, 'day')
    }
  
    return time
  }

  const getEndTime = (prayer: string) => {
    switch (prayer) {
      case 'Fajr':
        return toTodayTime(times['Sunrise'])
      case 'Dhuhr':
        return toTodayTime(times['Asr'])
      case 'Asr':
        return toTodayTime(times['Sunset'])
      case 'Maghrib':
        return toTodayTime(times['Isha'])
      case 'Isha':
        const [fajrHour, fajrMin] = times['Fajr'].split(':').map(Number)
        return dayjs().add(1, 'day').set('hour', fajrHour).set('minute', fajrMin).set('second', 0)
      default:
        return dayjs()
    }
  }

  const isCurrent = (adhan: string, end: dayjs.Dayjs) => {
    const start = toTodayTime(adhan)
    return now.isAfter(start) && now.isBefore(end)
  }

  if (loading || !times) return <div className="text-center py-10">Loading...</div>

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-1">At-taqwa Masjid’s Daily Prayers Time</h2>
      <h1 className=" text-gray-500 mb-4">
        {now.format('dddd, MMMM D, YYYY')} ({hijri}) ({banglaDate})
      </h1>

      <div className="flex justify-between items-center bg-yellow-200 text-yellow-800 px-4 py-2 rounded-lg mb-4">
        <span>☀️ Sun Rise</span>
        <span>{format12(times.Sunrise)}</span>
      </div>

      <div className="grid grid-cols-4 text-center text-sm font-semibold border-b py-2">
        <div>Salah</div>
        <div>Adhan</div>
        <div>Iqamah</div>
        <div>Ends</div>
      </div>

      {PRAYERS.map((prayer) => {
        const adhan = times[prayer]
        const iqamah = toTodayTime(adhan).add(20, 'minute')
        const end = getEndTime(prayer)
        const highlight = isCurrent(adhan, end)

        return (
          <div
            key={prayer}
            className={`grid grid-cols-4 items-center text-center py-2 rounded-xl transition ${
              highlight ? 'bg-emerald-100 text-emerald-900 font-semibold' : ''
            }`}
          >
            <div>{prayer}</div>
            <div>{format12(adhan)}</div>
            <div>{iqamah.format('h:mm A')}</div>
            <div>{end.format('h:mm A')}</div>
          </div>
        )
      })}

      <div className="mt-6 border-t pt-4">
        <div className="text-center font-bold text-lg mb-2">🕌 Jummah (Friday)</div>
        <div className="grid grid-cols-3 items-center text-center">
          <div>Jummah</div>
          <div>1:00 PM</div>
          <div>1:30 PM</div>
        </div>
      </div>
      

      <div className="flex justify-between items-center bg-orange-100 text-orange-700 px-4 py-2 rounded-lg mt-6">
        <span>🌇 Sun Set</span>
        <span>{format12(times.Sunset)}</span>
      </div>
    </div>
  )
}
