'use client'

import Image from 'next/image'

const topMembers = [
  {
    name: 'Mohammad Zahid',
    position: 'President',
    image: '/images/cman.jpg',
  },
  {
    name: 'Ahsan Ali',
    position: 'Vice President',
    image: '/images/cman.jpg',
  },
]

const otherMembers = [
  {
    name: 'Sami Khan',
    position: 'Treasurer',
    image: '/images/cman.jpg',
  },
  {
    name: 'Hassan Raza',
    position: 'Event Coordinator',
    image: '/images/cman.jpg',
  },
  {
    name: 'Imran Qureshi',
    position: 'Vice President',
    image: '/images/cman.jpg',
  },
  {
    name: 'Rashid Mehmood',
    position: 'Maintenance Manager',
    image: '/images/cman.jpg',
  },
  {
    name: 'Usman Javed',
    position: 'Security Head',
    image: '/images/cman.jpg',
  },
  {
    name: 'Nadeem Abbas',
    position: 'Fundraising Manager',
    image: '/images/cman.jpg',
  },
  {
    name: 'Faisal Iqbal',
    position: 'IT Support',
    image: '/images/cman.jpg',
  },
  {
    name: 'Waseem Akram',
    position: 'Media Coordinator',
    image: '/images/cman.jpg',
  },
]

const MemberCard = ({ member }: { member: any }) => (
  <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-md border border-green-200 hover:shadow-lg transition">
    <Image
      src={member.image}
      alt={member.name}
      width={100}
      height={100}
      className="rounded-full object-cover mb-2 border-4 border-green-500"
    />
    <h3 className="font-semibold text-green-700 text-lg">{member.name}</h3>
    <p className="text-sm text-gray-600 italic">{member.position}</p>
  </div>
)

export default function CommitteePage() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white min-h-screen py-10 px-4">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-center text-green-800 mb-2" style={{ fontFamily: 'serif' }}>
          Masjid Committee
        </h1>
        <div className="text-center mb-10 text-green-600">
          <p className="text-md italic">Serving the community with sincerity and faith</p>
        </div>

        {/* Top Two Members */}
        <div className="flex flex-col sm:flex-row justify-center gap-10 mb-12">
          {topMembers.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>

        {/* Other Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {otherMembers.map((member, index) => (
            <MemberCard key={index} member={member} />
          ))}
        </div>
      </div>
    </div>
  )
}
