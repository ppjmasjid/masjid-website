import ImamCard from '@/components/ImamCard';

  
import Breadcrumb from '@/components/Breadcrumb';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
          <p><strong>Education:</strong> Dawra Hadith (Equivalent to Master's Degree in Islamic Studies)</p>
          <p><strong>Experience:</strong> 15 years as Khatib and Mufti.</p>

          <table className="table-auto border-collapse border border-gray-400 w-full mt-4">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2">Year</th>
                <th className="border border-gray-300 p-2">Institution</th>
                <th className="border border-gray-300 p-2">Position</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">2010-2015</td>
                <td className="border border-gray-300 p-2">Al-Markazul Islami</td>
                <td className="border border-gray-300 p-2">Mufti</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">2016-2024</td>
                <td className="border border-gray-300 p-2">Patuarpar Jame Masjid</td>
                <td className="border border-gray-300 p-2">Chief Imam</td>
              </tr>
            </tbody>
          </table>
        </>
      ),
    },
    // You can add more imams here...
  ];

  return (
    <div> 
      <Navbar className="fixed top-0 left-0 w-full z-50 bg-gray-600" />
    
      <PageHeader location="contact" />
      <Breadcrumb />
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      
  

       
 
      {imams.map(imam => (
        <ImamCard key={imam.id} imam={imam} />
      ))}
     
    </div>
      <Footer/>
      </div>
  );
 
}
