import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase';
import { useCreateLoanMutation, useGetLoadByUserMutation } from '../../slices/adminApiSlice';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { Input } from 'postcss';
const storage = getStorage(app);

const PartnerLoanScreen = () => {
  const [showForm, setShowForm] = useState(false);
  const [leads, setLeads] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const {userInfo} = useSelector(state=>state.auth)
  const [GetLoadByUser] = useGetLoadByUserMutation ()
  const [CreateLoan,{isSuccess}] = useCreateLoanMutation()
  useEffect(()=>{
      if(isSuccess){
        toast.success("Lead Genrated")
      }
  },[isSuccess])
    const uploadImage = async (file) => {
    const storageRef = ref(storage, `universities/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await GetLoadByUser(userInfo._id).unwrap();
        setLeads(result)
      } catch (error) {
        toast.error('Something went wrong while fetching the countries.');
      }
    };
    fetchData();
  }, [GetLoadByUser]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get('offerLetter');
    
    try {
      setIsUploading(true);
      const offerLetterURL = await uploadImage(file);

      const newLead = {
        User:userInfo._id,
        firstName: formData.get('firstName'),
        middleName: formData.get('middleName'),
        lastName: formData.get('lastName'),
        dob: formData.get('dob'),
        mobileNumber: formData.get('mobileNumber'),
        emailID: formData.get('emailID'),
        amount: formData.get('amount'),
        offerLetter: offerLetterURL, // Store the URL from Firebase
      };
      
      setLeads([...leads, newLead]);
      setShowForm(false);
      setIsUploading(false);
      const res = await CreateLoan(newLead)
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {!showForm ? (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800">My Students</h1>
            <button 
              onClick={() => setShowForm(true)}
              className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
            >
              Create Lead
            </button>
          </div>

          <div className="flex gap-4">
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search Students"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors">
                Search
              </button>
            </div>
            <select className="w-24 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400">
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>
          </div>

          <div className="bg-white rounded-lg shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-4 text-left font-medium text-gray-600">Tracking ID</th>
                    <th className="p-4 text-left font-medium text-gray-600">Name</th>
                    <th className="p-4 text-left font-medium text-gray-600">Email</th>
                    <th className="p-4 text-left font-medium text-gray-600">Mobile</th>
                    <th className="p-4 text-left font-medium text-gray-600">Amount</th>
                    <th className="p-4 text-left font-medium text-gray-600">Status</th>
                    <th className="p-4 text-left font-medium text-gray-600">Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="p-4 text-gray-800">{index + 1}</td>
                      <td className="p-4 text-gray-800">
                        {`${lead.firstName} ${lead.middleName} ${lead.lastName}`.trim()}
                      </td>
                      <td className="p-4 text-gray-800">{lead.emailID}</td>
                      <td className="p-4 text-gray-800">{lead.mobileNumber}</td>
                      <td className="p-4 text-gray-800">₹{lead.amount}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="p-4 text-gray-800">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Loan Application</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <input
                  name="firstName"
                  placeholder="First Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input
                  name="middleName"
                  placeholder="Middle Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <input
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                
                <input
                  name="dob"
                  type="date"
                  placeholder="Date of Birth"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                
                <input
                  name="mobileNumber"
                  placeholder="Mobile Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                
                <input
                  name="emailID"
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />

                <input
                  name="amount"
                  type="number"
                  placeholder="Loan Amount"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />

                <div className="w-full">
                  <label htmlFor="offerLetter" className="block text-sm font-medium text-gray-700 mb-1">
                    Offer Letter
                  </label>
                  <input
                    id="offerLetter"
                    name="offerLetter"
                    type="file"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="passportDoc" className="block text-sm font-medium text-gray-700 mb-1">
                    Passport
                  </label>
                  <input
                    id="passportDoc"
                    name="passportDoc"
                    type="file"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  className="px-6 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Submit Application'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerLoanScreen;
