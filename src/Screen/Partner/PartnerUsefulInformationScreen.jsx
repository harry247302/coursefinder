import React, { useEffect, useState } from 'react';
import { useGetPartnerUploadMutation } from '../../slices/adminApiSlice';

export default function PartnerUsefulInformationScreen() {
  const [GetPartnerUpload] = useGetPartnerUploadMutation();
  const [partnerData, setPartnerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartnerData = async () => {
      try {
        const response = await GetPartnerUpload().unwrap();
        setPartnerData(response); // Assuming response is an array of objects
      } catch (error) {
        setError('Error fetching partner data');
        console.error('Error fetching partner data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartnerData();
  }, [GetPartnerUpload]);

  return (
    <div className="p-10 bg-gray-100 h-full">
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <h2 className="text-2xl font-bold my-6 text-gray-800 text-center">Partner Useful Information</h2>
        
        {loading && (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}

        {error && (
          <div className="text-red-500 text-center my-4">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-blue-500 text-white">
                <tr>
                  <th className="py-3 px-6 text-left font-medium tracking-wider">Icon</th>
                  <th className="py-3 px-6 text-left font-medium tracking-wider">Title</th>
                  <th className="py-3 px-6 text-left font-medium tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {partnerData?.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition duration-200 ease-in-out transform hover:scale-100 hover:shadow-lg"
                  >
                    <td className="py-4 px-6 flex items-center text-gray-700">
                      {item.iconURL && (
                        <img
                          src={item.iconURL}
                          alt="Icon"
                          className="h-8 w-8 mr-3 rounded-full shadow"
                        />
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <span className="font-bold text-gray-700">{item.title}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {item.imageURL && (
                        <a
                          href={item.imageURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition duration-200"
                        >
                          View
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
