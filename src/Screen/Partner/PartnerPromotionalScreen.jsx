import React, { useEffect } from 'react';
import { useCountryFetchMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FetchSecondCountry } from '../../slices/secondCountrySlice';
import { toast } from 'react-toastify';
import { useCountryGetMutation } from '../../slices/userApiSlice';
import { useNavigate } from 'react-router-dom';

export default function PartnerPromotionalScreen() {
  const [CountryFetch] = useCountryGetMutation();
  const { countries } = useSelector((state) => state.SecondCountry);
  const dispatch = useDispatch();
  const {userInfo} = useSelector(state=>state.auth)
  const navigate = useNavigate()
  console.log("use info",userInfo)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await CountryFetch().unwrap();
        dispatch(FetchSecondCountry(result));
      } catch (error) {
        toast.error('Something went wrong while fetching the countries.');
      }
    };
    fetchData();
  }, [CountryFetch, dispatch]);

  const handlenavigate= (_id)=>{
    console.log("execute")
    if(userInfo?.role=== 'partner'){
    navigate(`/partner/promotional/${_id}`)
    }
    if(userInfo?.role=== 'franchise'){
      navigate(`/frenchise/country/${_id}`)
      }
      if(userInfo?.role=== 'counsellor'){
        navigate(`/counsellor/country/${_id}`)
        }
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8">Our Partner Countries</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {countries.map((country) => (
          <div 
            key={country.name} 
            onClick={() => handlenavigate(country._id)}
            className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
          >
            <img 
              src={country.flagURL} 
              alt={`${country.name} Flag`} 
              className="w-24 h-24 object-cover rounded-full mb-4 border border-gray-200"
            />
            <h3 className="text-xl font-semibold text-gray-800">{country.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
