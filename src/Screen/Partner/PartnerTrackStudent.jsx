import React, { useState } from 'react';
import { useFetchOneStudentByTrackingIDMutation } from '../../slices/adminApiSlice';

export default function PartnerTrackStudent() {
    const [trackingId, setTrackingId] = useState('');
    const [fetchOneStudentByTrackingID, { isSuccess, data, error, isLoading }] = useFetchOneStudentByTrackingIDMutation();

    const handleSearch = async () => {
        if (trackingId) {
            await fetchOneStudentByTrackingID(trackingId);
        }
    };

    const getStatusSteps = () => {
        return [
            'Inquiry',
            'Assessment',
            'Offer Letter',
            'Fees Paid',
            'Acceptance Letter',
            'VFS date booked',
            'File Submitted',
            'Visa Approved',
        ];
    };

    const renderStatusStepper = () => {
        const steps = getStatusSteps();
        return (
            <div className="border border-gray-300 p-4 rounded-lg shadow-lg mt-4 bg-gray-50">
                <h2 className="font-bold text-xl text-gray-800 mb-2">Status Timeline</h2>
                <div className="flex flex-col">
                    {steps.map((step, index) => {
                        const isActive = data.status === step;
                        const isCompleted = steps.indexOf(data.status) > index;
                        return (
                            <div key={step} className="flex items-center mb-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${isCompleted ? 'bg-green-500 text-white' : isActive ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                                    {isCompleted ? '✓' : index + 1}
                                </div>
                                <div className={`flex-grow ${isActive ? 'font-bold' : ''}`}>
                                    {step}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Search Student by Tracking ID</h1>
            <div className="flex space-x-2 mb-4">
                <input
                    type="text"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    placeholder="Enter Tracking ID"
                    className="border border-gray-300 p-2 rounded-lg flex-grow focus:outline-none focus:ring focus:ring-blue-500"
                />
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                    Search
                </button>
            </div>

            {isLoading && <p className="text-gray-500">Loading...</p>}
            {isSuccess && data ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-300 p-4 rounded-lg shadow-lg bg-white">
                        <h2 className="font-bold text-xl text-gray-800 mb-2">Personal Information</h2>
                        <div className="flex items-center mb-4">
                            {data.photo ? (
                                <img
                                    src={data.photo}
                                    alt="Student"
                                    className="w-24 h-24 rounded-full mr-4 shadow-md"
                                />
                            ) : (
                                <div className="w-24 h-24 rounded-full bg-gray-300 mr-4" />
                            )}
                            <div>
                                <p><strong>First Name:</strong> {data.firstName}</p>
                                <p><strong>Middle Name:</strong> {data.middleName}</p>
                                <p><strong>Last Name:</strong> {data.lastName}</p>
                                <p><strong>Email ID:</strong> {data.emailID}</p>
                                <p><strong>Date of Birth:</strong> {data.dob}</p>
                                <p><strong>Phone Number:</strong> {data.mobileNumber}</p>
                            </div>
                        </div>
                    </div>
                    <div className="border border-gray-300 p-4 rounded-lg shadow-lg bg-white">
                        <h2 className="font-bold text-xl text-gray-800 mb-2">Academic Information</h2>
                        <div className='flex flex-row space-x-5 items-center'>
                            <div>
                                <img src={data?.University?.logo}/>
                            </div>
                            <div>
                                <p><strong>University Applied:</strong> {data.University?.name}</p>
                                <p><strong>Course Applied:</strong> {data.Course?.ProgramName}</p>
                                <p><strong>Fees:</strong> {data.Course?.Fees}</p>
                                <p><strong>Duration:</strong> {data.Course?.Duration}</p>
                                <p><strong>Category:</strong> {data.Course?.Category}</p>



                            </div>
                       
                        </div>
                    </div>
                    <div className="border border-gray-300 p-4 rounded-lg shadow-lg col-span-2 bg-white">
                        <h2 className="font-bold text-xl text-gray-800 mb-2">Documents</h2>
                        <ul className="list-disc list-inside">
                            <li><strong>Grade 12 Marksheet:</strong> {data.grade12Marksheet ? <a href={data.grade12Marksheet} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-600 transition duration-200">View Document</a> : 'N/A'}</li>
                            <li><strong>Grade 10 Marksheet:</strong> {data.grade10Marksheet ? <a href={data.grade10Marksheet} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-600 transition duration-200">View Document</a> : 'N/A'}</li>
                            <li><strong>Passport Front & Back:</strong> {data.passportFrontBack ? <a href={data.passportFrontBack} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-600 transition duration-200">View Document</a> : 'N/A'}</li>
                            <li><strong>Resume:</strong> {data.resume ? <a href={data.resume} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-600 transition duration-200">View Document</a> : 'N/A'}</li>
                            <li><strong>English Test Scorecard:</strong> {data.englishTestScorecard ? <a href={data.englishTestScorecard} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-600 transition duration-200">View Document</a> : 'N/A'}</li>
                        </ul>
                    </div>
                    {renderStatusStepper()}
                </div>
            ) : error ? (
                <p className="text-red-500">Error: {error.message}</p>
            ) : null}
        </div>
    );
}
