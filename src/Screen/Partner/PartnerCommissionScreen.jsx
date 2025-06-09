import React, { useEffect, useState } from 'react';
import { useGetCommissionUploadMutation } from '../../slices/adminApiSlice';
import { toast } from 'react-toastify';
import { EyeIcon } from 'lucide-react';

export default function PartnerCommissionScreen() {
  const [GetCommissionUpload] = useGetCommissionUploadMutation();
  const [commissions, setCommissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommissions = async () => {
      try {
        const response = await GetCommissionUpload().unwrap();
        setCommissions(response); // Assuming response is an array of commission objects
      } catch (error) {
        console.error('Error fetching commissions:', error);
        toast.error('Failed to fetch commissions.');
        setError('Failed to fetch commissions.');
      } finally {
        setLoading(false);
      }
    };

    fetchCommissions();
  }, [GetCommissionUpload]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Partner Commissions</h1>
      
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
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-4 px-6 text-left">Country</th>
              <th className="py-4 px-6 text-left">Title</th>
              <th className="py-4 px-6 text-left">File URL</th>
            </tr>
          </thead>
          <tbody>
            {commissions.map((commission) => (
              <tr
                key={commission._id}
                className="hover:bg-gray-100 transition duration-150 ease-in-out transform hover:scale-100 hover:shadow-lg"
              >
                <td className="py-4 px-6 border-b border-gray-300 flex items-center">
                  {commission.SecondCountry?.flagURL && (
                    <img
                      src={commission.SecondCountry.flagURL}
                      alt="Flag"
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                  )}
                </td>
                <td className="py-4 px-6 font-bold border-b border-gray-300">{commission.SecondCountry.name}</td>
                <td className="py-4 px-6 border-b border-gray-300 text-center flex items-center">
                  <a
                    href={commission.fileURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center justify-center"
                  >
                    <EyeIcon className="w-5 h-5" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
