import React, { useEffect, useState } from 'react';
import { useGetStudentByUserMutation } from '../../slices/adminApiSlice';
import { fetchStudent } from '../../slices/studentSlice';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

export default function PartnerViewStudent() {
    const [GetStudentByUser] = useGetStudentByUserMutation();
    const { userInfo } = useSelector((state) => state.auth);
    const { student } = useSelector((state) => state.student);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // State for search term
    const [searchTerm, setSearchTerm] = useState('');
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const [rowsPerPage, setRowsPerPage] = useState(10); // Number of rows per page

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = userInfo._id;
                const res = await GetStudentByUser(data);
                dispatch(fetchStudent(res.data));
            } catch (error) {
                toast.error("Failed to fetch student data");
            }
        };

        fetchData();
    }, [GetStudentByUser, userInfo._id, dispatch]);

    // Filter students based on the search term
    const filteredStudents = student.filter((std) =>
        std.firstName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic: Calculate the students to display on the current page
    const indexOfLastStudent = currentPage * rowsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - rowsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    // Handle changing the number of rows per page
    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(parseInt(e.target.value));
        setCurrentPage(1); // Reset to first page when changing rows per page
    };

    // Calculate total number of pages
    const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);

    // Handle page change
    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-4">Student Information</h2>
            
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search by First Name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 p-2 border rounded w-full"
            />

            {/* Rows Per Page Selector */}
            <div className="flex justify-between items-center mb-4">
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
            </div>

            {/* Student Table */}
            {currentStudents && currentStudents.length > 0 ? (
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-3 px-4 border-b">Create By</th>
                            <th className="py-3 px-4 border-b">First Name</th>
                            <th className="py-3 px-4 border-b">Last Name</th>
                            <th className="py-3 px-4 border-b">Email</th>
                            <th className="py-3 px-4 border-b">DOB</th>
                            <th className="py-3 px-4 border-b">TRACKING ID</th>
                            <th className="py-3 px-4 border-b">State</th>
                            <th className="py-3 px-4 border-b">Country</th>
                            <th className="py-3 px-4 border-b">Status</th>
                            <th className="py-3 px-4 border-b">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentStudents.map((std, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-3 px-4 border-b">{std.User.name}</td>
                                <td className="py-3 px-4 border-b">{std.firstName}</td>
                                <td className="py-3 px-4 border-b">{std.lastName}</td>
                                <td className="py-3 px-4 border-b">{std.emailID || "N/A"}</td>
                                <td className="py-3 px-4 border-b">{std.dob}</td>
                                <td className="py-3 px-4 border-b">{std.trackingId}</td>
                                <td className="py-3 px-4 border-b">{std.state}</td>
                                <td className="py-3 px-4 border-b">{std.country}</td>
                                <td className="py-3 px-4 border-b">{std.status}</td>
                                <td className="py-3 px-4 border-b">
                                    <button onClick={() => navigate(`/partner/student/${std._id}`)}>
                                        <FaEye />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-gray-600">No student data available.</p>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className={`p-2 border rounded ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    Previous
                </button>
                <p>Page {currentPage} of {totalPages}</p>
                <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`p-2 border rounded ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
