import React, { useEffect, useState } from 'react';
import { useGetAssessmentByUserMutation } from '../../slices/adminApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAssessment } from '../../slices/assessmentSlice';
import { toast } from 'react-toastify';
import { EyeIcon } from 'lucide-react';

export default function PartnerAssessmentView() {
    const [GetAssessmentByUser, { isSuccess, isLoading, error }] = useGetAssessmentByUserMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const { assessment } = useSelector((state) => state.assessment);
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [statusFilter, setStatusFilter] = useState('');

    const [selectedAssessment, setSelectedAssessment] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = userInfo._id;
                const res = await GetAssessmentByUser(data);
                dispatch(fetchAssessment(res.data));
            } catch (error) {
                toast.error("Failed to fetch student data");
            }
        };

        fetchData();
    }, [GetAssessmentByUser, userInfo._id, dispatch]);

    // Filter by name, date range, and status
    const filteredAssessments = assessment?.filter((std) => {
        const fullName = `${std.firstName} ${std.lastName}`.toLowerCase();
        const matchesName = fullName.includes(searchTerm.toLowerCase());

        const createdAt = new Date(std.createdAt);
        const matchesFromDate = fromDate ? new Date(fromDate) <= createdAt : true;
        const matchesToDate = toDate ? new Date(toDate) >= createdAt : true;
        const matchesStatus = statusFilter ? std.status === statusFilter : true;

        return matchesName && matchesFromDate && matchesToDate && matchesStatus;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredAssessments?.length / rowsPerPage);
    const currentStudents = filteredAssessments?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1); // Reset to first page
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const handleEyeClick = (assessment) => {
        setSelectedAssessment(assessment);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Set background color based on status
    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-200';
            case 'shared':
                return 'bg-blue-200';
            case 'eligible':
                return 'bg-green-200';
            case 'ineligible':
                return 'bg-red-200';
            default:
                return '';
        }
    };

    // Function to format date to DD-MM-YYYY
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Assessment Information</h2>

            {isLoading && <p className="text-gray-600">Loading data...</p>}
            {error && <p className="text-red-600">Error fetching data: {error.message}</p>}

            {/* Filters */}
            <div className="flex justify-between items-center mb-4">
                {/* Rows Per Page */}
                <div>
                    <label htmlFor="rowsPerPage" className="mr-2">Rows per page:</label>
                    <select
                        id="rowsPerPage"
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        className="border p-2 rounded"
                    >
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                    </select>
                </div>

                {/* Search By Name */}
                <div>
                    <label htmlFor="searchTerm" className="mr-2">Search by Name:</label>
                    <input
                        type="text"
                        id="searchTerm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Enter name"
                        className="border p-2 rounded"
                    />
                </div>

                {/* Date Filters */}
                <div className="flex items-center">
                    <div className="mr-4">
                        <label htmlFor="fromDate" className="mr-2">From:</label>
                        <input
                            type="date"
                            id="fromDate"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                            className="border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="toDate" className="mr-2">To:</label>
                        <input
                            type="date"
                            id="toDate"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                            className="border p-2 rounded"
                        />
                    </div>
                </div>

                {/* Status Filter */}
                <div className="ml-4">
                    <label htmlFor="statusFilter" className="mr-2">Filter by Status:</label>
                    <select
                        id="statusFilter"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="border p-2 rounded"
                    >
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="shared">Shared</option>
                        <option value="eligible">Eligible</option>
                        <option value="ineligible">Ineligible</option>
                    </select>
                </div>
            </div>

            {/* Student Table */}
            {currentStudents && currentStudents.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-3 px-4 border-b">Create At</th>
                            <th className="py-3 px-4 border-b">Name</th>
                            <th className="py-3 px-4 border-b">Email</th>
                            <th className="py-3 px-4 border-b">Phone</th>
                            <th className="py-3 px-4 border-b">Country</th>
                            <th className="py-3 px-4 border-b">Course</th>
                            <th className="py-3 px-4 border-b">Status</th>
                            <th className="py-3 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.map((std, index) => (
                            <tr key={index} className={`hover:bg-gray-100 transition duration-200 ${getStatusColor(std.status)}`}>
                                <td className="py-3 px-4 border-b">{formatDate(std.createdAt)}</td>
                                <td className="py-3 px-4 border-b">{std.firstName} {std.lastName}</td>
                                <td className="py-3 px-4 border-b">{std.emailID || "N/A"}</td>
                                <td className="py-3 px-4 border-b">{std.mobileNumber}</td>
                                <td className="py-3 px-4 border-b">{std?.Country?.name}</td>
                                <td className="py-3 px-4 border-b">{std.Course}</td>
                                <td className="py-3 px-4 border-b">{std.status}</td>
                                <td className="py-3 px-4 border-b">
                                    <button onClick={() => handleEyeClick(std)}>
                                        <EyeIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">No assessments found.</p>
            )}

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
                <button onClick={goToPrevPage} disabled={currentPage === 1} className="bg-blue-500 text-white px-4 py-2 rounded">Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={goToNextPage} disabled={currentPage === totalPages} className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
            </div>

            {/* Modal for Selected Assessment */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-lg">
                        <h3 className="text-lg font-semibold">Assessment Details</h3>
                        {/* Render assessment details here */}
                        <button onClick={closeModal} className="mt-4 text-blue-500">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
