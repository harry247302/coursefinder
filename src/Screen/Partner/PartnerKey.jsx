import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetAllPromotionalMutation } from '../../slices/adminApiSlice';
import { FetchPromotional } from '../../slices/promotionalSlice';
import { toast } from 'react-toastify';
import { Download } from 'lucide-react'; // Ensure you have lucide-react installed for icons

export default function PartnerKey() {
    const [GetAllPromotional] = useGetAllPromotionalMutation();
    const dispatch = useDispatch();
    const { promotional } = useSelector((state) => state.promotional);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await GetAllPromotional();
                dispatch(FetchPromotional(res.data));
            } catch (error) {
                toast.error('Failed to fetch data');
            }
        };
        fetchData();
    }, [GetAllPromotional, dispatch]);

    const handleDownload = (url) => {
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', ''); // This will download the image
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
   
    

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold mb-6">Key highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {promotional?.map((item) => (
                    <div
                        key={item.id}
                        className="relative bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl"
                    >
                        <img
                            src={item.imageURL}
                            alt={item.name} // Change this according to your promotional object structure
                            className="w-full h-64 object-contained transition-transform duration-300 ease-in-out"
                        />
                        <button
                            onClick={() => handleDownload(item.imageURL)}
                            className="absolute top-2 left-2 bg-white rounded-full p-2 shadow-lg hover:bg-blue-600 hover:text-white transition-colors duration-300 ease-in-out"
                        >
                            <Download className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
