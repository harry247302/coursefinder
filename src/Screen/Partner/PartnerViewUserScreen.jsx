import React, { useEffect } from 'react';
import { useFetchUserMutation } from '../../slices/adminApiSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { FaSpinner } from 'react-icons/fa';
import { useUserBlockMutation } from '../../slices/userApiSlice';
import { updateBlockUser } from '../../slices/authSlice';

export default function PartnerViewUserScreen() {
  const dispatch = useDispatch();
  const [fetchUser, { data, isLoading, isSuccess, isError, error }] = useFetchUserMutation();
  const [blockUser] = useUserBlockMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userId = userInfo?._id;
        const res = await fetchUser(userId).unwrap();
        dispatch(FetchExtraUser(res));
      } catch (err) {
        toast.error('Failed to fetch users');
      }
    };

    getUsers();
  }, [fetchUser, userInfo, dispatch]);

  const handleToggleBlock = async (userId, isBlocked) => {
    try {
        const data =  { 
            userId:userId,
            status: { 
                block:!isBlocked
            }
        }
      const res = await blockUser(data).unwrap();
    //   dispatch(updateBlockUser(res))
      toast.success(isBlocked ? 'User unblocked successfully' : 'User blocked successfully');
    } catch (err) {
      toast.error('Failed to update user status');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">User Management</h2>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <FaSpinner className="animate-spin text-blue-500 text-3xl" />
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{error?.data?.message || 'Error fetching users'}</span>
        </div>
      )}

      {/* Success State */}
      {isSuccess && (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-5 text-left">Name</th>
                <th className="py-3 px-5 text-left">Email</th>
                <th className="py-3 px-5 text-left">Password</th>

                <th className="py-3 px-5 text-left">Role</th>
                <th className="py-3 px-5 text-left">Created By</th>
                <th className="py-3 px-5 text-left">Created At</th>
                <th className="py-3 px-5 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition-colors duration-200`}>
                  <td className="py-3 px-5">{user?.name}</td>
                  <td className="py-3 px-5">{user?.email}</td>
                  <td className="py-3 px-5">{user?.passwordTracker}</td>
                  <td className="py-3 px-5">{user?.role}</td>
                  <td className="py-3 px-5">{user?.createdBy?.name || 'N/A'}</td>
                  <td className="py-3 px-5">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-3 px-5">
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={user.block}
                        onChange={() => handleToggleBlock(user._id, user.block)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="ml-2">{user.block ? 'Unblock' : 'Block'}</span>
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    );
}