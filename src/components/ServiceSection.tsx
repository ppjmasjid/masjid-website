"use client";

import Image from "next/image";

export default function ServiceSection() {
  return (
    <section id="services" className="py-16 bg-transparent text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 animate-pulse">🔥 Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Service Card 1 */}
          <div className="bg-transparent text-black rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
            < Image
              src="/qread.png"
              alt="Service 1"
              width={500}
              height={500}
              className="w-full h-auto object-contain rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold">Read Quran</h3>
              <p className="text-gray-600 mt-2">Way of jannah</p>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all">
                <a href="/quran">Start Reading</a>
              </button>
            </div>
          </div>


          {/* Service Card 2 */}
          <div className="bg-transparent text-black rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
            <Image
              src="/qtext.png"
              alt="Service 2"
              width={500}
              height={500}
              className="w-full h-auto object-contain rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
            />

            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold">Learn to read Quran</h3>
              <p className="text-gray-600 mt-2">way of peace</p>
              <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all">
                <a href="/learnquran">Start Learning</a>
              </button>
            </div>
          </div>
          {/* Service Card 3 */}
          <div className="bg-transparent text-black rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
            <Image
              src="/qvid.png"
              alt="Service 2"
              width={500}
              height={500}
              className="w-full h-auto object-contain rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
            />

            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold">Learn to read Quran with video</h3>
              <p className="text-gray-600 mt-2">way of peace</p>
              <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all">
                <a href="/learnquranwithvideo">Start Learning</a>
              </button>
            </div>
          </div>

          {/* Service Card 4*/}
          <div className="bg-transparent text-black rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
            <Image
              src="/ruq.png"
              alt="Service 2"
              width={500}
              height={500}
              className="w-full h-auto object-contain rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
            />

            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold">Ruqyah</h3>
              <p className="text-gray-600 mt-2">Rebirth of a sunnah </p>
              <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all">
                <a href="/rokayah">Start Listening</a>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}