import ImamCard from '@/components/ImamCard';
import Breadcrumb from '@/components/Breadcrumb';
import PageHeader from "@/components/PageHeader";

export default function ImamPage() {
  const imams = [
    {
      id: '1',
      name: 'Mufti Abdullah',
      subheading: 'Chief Imam, Patuarpar Jame Masjid',
      imageUrl: '/images/cman.jpg',
      resume: (
        <>
          <p className="text-green-900"><strong>Education:</strong> Dawra Hadith (Equivalent to Master's Degree in Islamic Studies)</p>
          <p className="text-green-900"><strong>Experience:</strong> 15 years as Khatib and Mufti.</p>

          <table className="table-auto border-collapse border border-green-400 w-full mt-4 bg-white shadow-md rounded-md">
            <thead className="bg-green-100 text-green-900">
              <tr>
                <th className="border border-green-300 p-2">Year</th>
                <th className="border border-green-300 p-2">Institution</th>
                <th className="border border-green-300 p-2">Position</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-green-300 p-2">2010-2015</td>
                <td className="border border-green-300 p-2">Al-Markazul Islami</td>
                <td className="border border-green-300 p-2">Mufti</td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-green-300 p-2">2016-2024</td>
                <td className="border border-green-300 p-2">Patuarpar Jame Masjid</td>
                <td className="border border-green-300 p-2">Chief Imam</td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
    // Add more imams here if needed
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-green-900 font-serif">
      <PageHeader location="contact" />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-green-800 border-b-4 border-green-600 inline-block pb-2">
          Meet Our Imams
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {imams.map(imam => (
            <ImamCard key={imam.id} imam={imam} />
          ))}
        </div>
      </div>
    </div>
  );
}
