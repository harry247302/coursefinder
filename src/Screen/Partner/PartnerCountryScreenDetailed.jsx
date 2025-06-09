import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCountryGetOneMutation } from '../../slices/userApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FetchOneSecondCountry } from '../../slices/secondCountrySlice';
import { toast } from 'react-toastify';
import { FaFlag, FaMoneyBillAlt, FaRegQuestionCircle, FaFileAlt, FaClipboardCheck, FaRegLifeRing } from 'react-icons/fa'; // Importing necessary icons

export default function PartnerCountryScreenDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [CountryGetOne] = useCountryGetOneMutation();
  const { singleCountry } = useSelector((state) => state.SecondCountry);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await CountryGetOne(id).unwrap();
        dispatch(FetchOneSecondCountry(result));
      } catch (error) {
        toast.error('Something went wrong while fetching the country.');
      }
    };
    fetchData();
  }, [CountryGetOne, dispatch, id]);

  if (!singleCountry) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-center text-blue-main mb-14">
        Country Detailed Page
      </h1>

      {/* First Row: 3 cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
        {/* Card 1: Flag and Country Name */}
        <div className="bg-white shadow-lg flex flex-row justify-center items-center space-x-10 rounded-xl p-3 transition-transform hover:scale-105 duration-300 ease-in-out">
          <img src= {singleCountry.flagURL} className="w-12 h-12 text-blue-main" />
          <h2 className="text-2xl font-bold text-center text-blue-main">
            {singleCountry.name}
          </h2>
        </div>

        {/* Card 2: Currency */}
        <div className="bg-white shadow-lg flex flex-row justify-center items-center space-x-10 rounded-xl p-3 transition-transform hover:scale-105 duration-300 ease-in-out">
          <div className="flex items-center justify-center">
            <FaMoneyBillAlt className="w-12 h-12 text-blue-main" />
          </div>
          <div className='flex flex-col'>
            <p className="text-xl font-bold text-center text-blue-main">
                Currency
            </p>
            <p className="text-xl font-bold text-center text-blue-main">
                {singleCountry.currency}
            </p>
          </div>
        </div>

        {/* Card 3: Country Code */}
        <div className="bg-white shadow-lg flex flex-row justify-center items-center space-x-10 rounded-xl p-3 transition-transform hover:scale-105 duration-300 ease-in-out">
          <div className="flex items-center justify-center">
            <FaRegQuestionCircle className="w-12 h-12 text-blue-main" />
          </div>
          <div className='flex flex-col'>
            <p className="text-xl font-bold text-center text-blue-main">
                Code
            </p>
            <p className="text-xl font-bold text-center text-blue-main">
                 {singleCountry.code}
            </p>
          </div>
        </div>
      </div>

      {/* Second Row: 4 cards for step, vfs, whyThisCountry, and FAQ */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Card 1: Step */}
        <div
          className="bg-white shadow-lg rounded-xl p-6 cursor-pointer hover:shadow-xl transition-transform hover:scale-105 duration-300 ease-in-out"
          onClick={() => window.open(singleCountry.step, '_blank')}
        >
          <h3 className="text-center text-xl font-bold text-gold-main">Step</h3>
          <FaClipboardCheck className="w-16 h-16 text-blue-main mx-auto mt-4" />
          <p className="text-center mt-4 text-blue-main font-medium">
            View Step Document
          </p>
        </div>

        {/* Card 2: VFS */}
        <div
          className="bg-white shadow-lg rounded-xl p-6 cursor-pointer hover:shadow-xl transition-transform hover:scale-105 duration-300 ease-in-out"
          onClick={() => window.open(singleCountry.vfs, '_blank')}
        >
          <h3 className="text-center text-xl font-bold text-gold-main">VISA PROCESS</h3>
          <FaFileAlt className="w-16 h-16 text-blue-main mx-auto mt-4" />
          <p className="text-center mt-4 text-blue-main font-medium">
            View VFS Document
          </p>
        </div>

        {/* Card 3: Why This Country */}
        <div
          className="bg-white shadow-lg rounded-xl p-6 cursor-pointer hover:shadow-xl transition-transform hover:scale-105 duration-300 ease-in-out"
          onClick={() => window.open(singleCountry.whyThisCountry, '_blank')}
        >
          <h3 className="text-center text-xl font-bold text-gold-main">
            Why This Country
          </h3>
          <FaRegLifeRing className="w-16 h-16 text-blue-main mx-auto mt-4" />
          <p className="text-center mt-4 text-blue-main font-medium">
            View Why This Country Document
          </p>
        </div>

        {/* Card 4: FAQ */}
        <div
          className="bg-white shadow-lg rounded-xl p-6 cursor-pointer hover:shadow-xl transition-transform hover:scale-105 duration-300 ease-in-out"
          onClick={() => window.open(singleCountry.faq, '_blank')}
        >
          <h3 className="text-center text-xl font-bold text-gold-main">FAQ</h3>
          <FaRegQuestionCircle className="w-16 h-16 text-blue-main mx-auto mt-4" />
          <p className="text-center mt-4 text-blue-main font-medium">
            View Frequently Asked Questions
          </p>
        </div>
      </div>
    </div>
  );
}
