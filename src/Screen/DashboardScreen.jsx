import React, { useEffect, useState } from 'react';
import { TrendingUp, Package, DollarSign, ThumbsUp, Users, FileText, Check, Clock, ChevronLeft, ChevronRight, MailIcon, PhoneIcon } from 'lucide-react';
import { useFetchUniversityMutation, useGetAllPromotionalMutation, useStudentMatrixMutation } from '../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FetchPromotional } from '../slices/promotionalSlice';
import { FetchUniversitys } from '../slices/universitySlice';
import { useNavigate } from 'react-router-dom';
import UniversitySlider from '../Component/UniversitySlider';

const DashboardScreen = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [StudentMatrix] = useStudentMatrixMutation()
    const {userInfo} = useSelector(state => state.auth)
    const {promotional} = useSelector(state=> state.promotional)
    const [rawData,setRawData] = useState()
    const { university } = useSelector(state => state.university);
    const [FetchUniversity, { isSuccess }] = useFetchUniversityMutation();
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
    const [formData, setFormData] = useState({
        date: '',
        time: ''
    });
    const [GetAllPromotional] = useGetAllPromotionalMutation()
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
      }, [GetAllPromotional]);
       // Sample university data
       const universities = [
        {
            id: 1,
            image: "/api/placeholder/400/300",
            name: "Amity University Dubai",
            criteria: {
                academic: "50%",
                english: "NO IELTS",
                age: "ANY GAP"
            }
        },
        {
            id: 2,
            image: "/api/placeholder/400/300",
            name: "University 2",
            criteria: {
                academic: "60%",
                english: "NO IELTS",
                age: "ANY GAP"
            }
        },
        {
            id: 3,
            image: "/api/placeholder/400/300",
            name: "Amity University Dubai 3",
            criteria: {
                academic: "50%",
                english: "NO IELTS",
                age: "ANY GAP"
            }
        },
        {
            id: 4,
            image: "/api/placeholder/400/300",
            name: "University 5",
            criteria: {
                academic: "60%",
                english: "NO IELTS",
                age: "ANY GAP"
            }
        },
        // Add more universities as needed
    ];
    const contact = [
        {
            name: "John Doe",
            postion:"admin",
            email: "john.doe@example.com",
            phone: "+1 123 456 7890",
            image: ""
        },
        {
            name: "Jane Smith",
            postion:"admin",
            email: "jane.smith@example.com",
            phone: "+1 987 654 3210",
            image: ""

        },
        {
            name: "Jane Smith",
            postion:"sub admin",
            email: "jane.smith@example.com",
            phone: "+1 987 654 3210",
            image: ""

        },
        // Add more contacts as needed
    ]

    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentSlide1, setCurrentSlide1] = useState(0);

    const nextSlide = () => {
        setCurrentSlide(curr => 
            curr >= Math.ceil(universities.length/2) - 1 ? 0 : curr + 1
        );
    };
    

    const prevSlide = () => {
        setCurrentSlide(curr => 
            curr === 0 ? Math.ceil(universities.length/2) - 1 : curr - 1
        );
    };
    const nextSlide1 = () => {
        setCurrentSlide1(curr => 
            curr >= Math.ceil(promotional.length/2) - 1 ? 0 : curr + 1
        );
    };

    const prevSlide1 = () => {
        setCurrentSlide1(curr => 
            curr === 0 ? Math.ceil(promotional.length/2) - 1 : curr - 1
        );
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = userInfo._id;
                const res = await StudentMatrix(data).unwrap();
                setRawData(res)
           } catch (error) {
                toast.error("Failed to fetch student data");
            }
        };

        fetchData();
    }, [StudentMatrix, userInfo._id, dispatch]);

    console.log("Data",rawData)
    // Top metrics data
    const topMetrics = [
        { title: 'All Students', value: rawData?.totalStudents, icon: Users, color: 'bg-blue-100' },
        { title: 'Offers Received', value: rawData?.totalOffers, icon: Package, color: 'bg-cyan-100' },
        { title: 'Fees Paid', value:  rawData?.totalFeesPaid, icon: DollarSign, color: 'bg-orange-100' },
        { title: 'Visa Received', value:  rawData?.totalVisaApproved, icon: ThumbsUp, color: 'bg-green-100' }
    ];

    // Assessment metrics
    const assessmentMetrics = [
        { title: 'Total Assessments', value: rawData?.totalAssessmentsProfile, icon: FileText , color: 'bg-blue-100'  },
        { title: 'Assessments Shared', value: rawData?.totalOffersProfile, icon: Users ,color: 'bg-cyan-100' },
        { title: 'Assessments Pending', value:  rawData?.totalFeesPaidProfile, icon: Clock ,color: 'bg-orange-100'},
        { title: 'Application Submitted', value: rawData?.totalAcceptanceLettersProfile, icon: Check ,color: 'bg-green-100'}
    ];

    // Handle modal open/close
    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submit (you can add your logic here)
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Close modal after submission
        setIsModalOpen(false);
    };
    const handlenavigate= ()=>{
        console.log("execute")
        if(userInfo.role=== 'partner'){
        navigate(`/partner/key`)
        }
        if(userInfo.role=== 'frenchise'){
          navigate(`/frenchise/key`)
          }
          if(userInfo.role=== 'counsellor'){
            navigate(`/counsellor/key`)
            }
      }
      const handlenavigate1= ()=>{
        console.log("execute")
        if(userInfo.role=== 'partner'){
        navigate(`/partner/university`)
        }
        if(userInfo.role=== 'frenchise'){
          navigate(`/frenchise/university`)
          }
          if(userInfo.role=== 'counsellor'){
            navigate(`/counsellor/university`)
            }
      }
    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {topMetrics?.map((metric, index) => (
                    <div key={index} className="p-6 bg-white shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-gray-600 font-medium mb-2">{metric.title}</h3>
                                <p className="text-2xl font-semibold">{metric.value}</p>
                            </div>
                            <div className={`${metric.color} p-3 rounded-lg`}>
                                <metric.icon className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {assessmentMetrics?.map((metric, index) => (
                    <div key={index} className="p-6 bg-white shadow-sm">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="text-gray-600 font-medium mb-2">{metric.title}</h3>
                                <p className="text-2xl font-semibold">{metric.value}</p>
                            </div>
                            <div className={`${metric.color} p-3 rounded-lg`}>
                                <metric.icon className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            {/* Book Training Section */}
            <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Book My Training</h2>
                    <button
                        className="bg-blue-900 text-white px-6 py-2 rounded-md"
                        onClick={handleModalToggle}
                    >
                        Book Now
                    </button>
                </div>
            </div>

         {/* University Carousel */}
<div className="mb-8 w-full flex  flex-row space-x-5">
    <div className="relative w-1/3 shadow-xl">
        <div className="overflow-hidden p-2">
            <div className="grid grid-cols-1 gap-6">
                {promotional.slice(currentSlide, currentSlide + 1).map((uni) => (
                    <div key={uni.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                        <div className="relative">
                            <img 
                                src={uni.imageURL} 
                                alt={uni.name}
                                className="w-full h-[500px] object-contained" // Adjust the height as needed
                            />
                        </div>
                        <div className="">
                            <button
                            onClick={()=>handlenavigate()} 
                            className="w-full mt-2 bg-blue-900 text-white rounded-md hover:bg-blue-800">
                                View All
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <button 
            onClick={prevSlide1}
            className="absolute left-0 top-1/2 -translate-y-1/2  p-2 text-white rounded-full shadow-lg"
        >
            <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
            onClick={nextSlide1}
            className="absolute right-0 top-1/2 -translate-y-1/2  p-2 text-white rounded-full shadow-lg"
        >
            <ChevronRight className="w-6 h-6" />
        </button>
    </div>
    <div className='w-2/3'>
    <div className="relative shadow-xl">
        <div className="overflow-hidden p-2">
            <UniversitySlider university = {university} />
        </div>
  
    </div>

    </div>
</div>
<div>
    <div>
        <span className="text-xl font-semibold">Point of contact</span>
    </div>
    <div className='grid grid-cols-3 gap-8'>
        {contact?.map((item)=>{
         return   (
            <div className="bg-white shadow-lg rounded-lg p-6 transition-transform duration-200 transform hover:scale-105">
                <div className="flex items-start">
                    <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-16 h-16 rounded-full mr-4" 
                    />
                    <div className="flex-1">
                        <h3 className="text-gray-800 font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-2">{item.postion}</p>
                        <div className="flex flex-col items-start">
                            <a href={`mailto:${item.email}`} className="flex items-start justify-start text-blue-500 hover:text-blue-700 transition-colors">
                                <MailIcon className="w-5 h-5" />
                                <span className="ml-1">{item.email}</span>
                            </a>
                            <a href={`tel:${item.phone}`} className="flex items-start justify-start text-blue-500 hover:text-blue-700 transition-colors">
                                <PhoneIcon className="w-5 h-5" />
                                <span className="ml-1">{item.phone}</span>
                            </a>
                        </div>
                    </div>
                </div>
                <hr className="border-t border-gray-200 my-4" />
            </div>

        
            )
        })}
    </div>

</div>


            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Book Training</h3>
                        <form onSubmit={handleFormSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="date">
                                    Select Date
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    id="date"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="time">
                                    Select Time
                                </label>
                                <input
                                    type="time"
                                    name="time"
                                    id="time"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={formData.time}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    className="bg-gray-300 px-4 py-2 rounded"
                                    onClick={handleModalToggle}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-900 text-white px-4 py-2 rounded"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

          

        </div>
    );
};

export default DashboardScreen;
