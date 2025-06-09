import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchUniversityMutation } from '../../slices/adminApiSlice';
import { FetchUniversitys } from '../../slices/universitySlice';
import { useNavigate } from 'react-router-dom';

const PartnerUniversityScreen = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { university } = useSelector(state => state.university);
  const [FetchUniversity, { isSuccess }] = useFetchUniversityMutation();
  const {userInfo} = useSelector(state=>state.auth)
 
  const handlenavigate= (_id)=>{
    console.log("execute")
    if(userInfo.role=== 'partner'){
    navigate(`/partner/university/${_id}`)
    }
    if(userInfo.role=== 'frenchise'){
      navigate(`/frenchise/university/${_id}`)
      }
      if(userInfo.role=== 'counsellor'){
        navigate(`/counsellor/university/${_id}`)
        }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchUniversity().unwrap();
        dispatch(FetchUniversitys(result));
      } catch (error) {
        console.error('Failed to fetch universities:', error);
      }
    };
    fetchData();
  }, [FetchUniversity, dispatch]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedUniversities = university.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="container mx-auto my-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">University View</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Hero Image</th>
              <th className="px-4 py-2 text-left">University Name</th>
              <th className="px-4 py-2 text-left">Grade</th>
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">UniLink</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUniversities.map((uni) => (
              <tr key={uni._id} className="border-t border-gray-200 hover:bg-gray-100">
                <td className="px-4 py-2">
                  <img src={uni.heroURL} alt={uni.name} className="w-24 h-16 object-cover" />
                </td>
                <td className="px-4 py-2">{uni.name}</td>
                <td className="px-4 py-2">{uni.grade}</td>
                <td className="px-4 py-2">{uni.rank}</td>
                <td className="px-4 py-2">{uni.type}</td>
                <td className="px-4 py-2">
                  <a href={uni.UniLink} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                    {uni.UniLink}
                  </a>
                </td>
                <td className="px-4 py-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                   onClick={() =>handlenavigate(uni._id)} // Navigate on click
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <select
          value={rowsPerPage}
          onChange={handleChangeRowsPerPage}
          className="border border-gray-300 rounded p-1"
        >
          <option value={3}>3 rows per page</option>
          <option value={5}>5 rows per page</option>
          <option value={10}>10 rows per page</option>
          <option value={25}>25 rows per page</option>
        </select>
        <div className="flex space-x-2">
          <button
            onClick={() => handleChangePage(Math.max(page - 1, 0))}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            disabled={page === 0}
          >
            Prev
          </button>
          <button
            onClick={() => handleChangePage(page + 1)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
            disabled={page >= Math.ceil(university.length / rowsPerPage) - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PartnerUniversityScreen;
