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
  <div className="flex flex-col items-center bg-white p-4 rounded-2xl shadow-md">
    <Image
      src={member.image}
      alt={member.name}
      width={100}
      height={100}
      className="rounded-full object-cover mb-2"
    />
    <h3 className="font-semibold">{member.name}</h3>
    <p className="text-sm text-gray-500">{member.position}</p>
  </div>
)

export default function CommitteePage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Masjid Committee</h1>

      {/* Top Two Members */}
      <div className="flex flex-col sm:flex-row justify-center gap-10 mb-10">
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
  )
}
