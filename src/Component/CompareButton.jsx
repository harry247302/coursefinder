import React, { useState } from 'react';
import { Transition } from '@headlessui/react'; // For smooth transition animations
import { useDispatch } from 'react-redux';
import { RemoveCompareCourse } from '../slices/courseSlice';
import DownloadButton from './DownloadButton';
const CompareButton = ({ compare, setCompare }) => {
const dispatch = useDispatch()
const [showModal, setShowModal] = useState(false);
// Function to toggle modal visibility
const toggleModal = () => {
    setShowModal(!showModal);
};
// Function to remove a course from comparison
const removeCourse = (index) => {
dispatch (RemoveCompareCourse(index))
};
return (
    <div>
      {/* Compare Button */}
      {compare && compare.length > 0 && (
        <div className="fixed bottom-10 right-10 z-50">
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
            onClick={toggleModal}
          >
            Compare ({compare.length})
          </button>
        </div>
      )}

      {/* Modal Popup */}
      <Transition
        show={showModal}
        enter="transition-transform transform ease-out duration-300"
        enterFrom="scale-95"
        enterTo="scale-100"
        leave="transition-transform transform ease-in duration-300"
        leaveFrom="scale-100"
        leaveTo="scale-95"
      >
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl p-8 h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Compare Courses</h2>

            {/* Vertical Comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {compare.map((course, index) => (
                <div key={index} className="relative border rounded-lg shadow-md p-4 hover:shadow-xl transition-shadow duration-300">
                  <button
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                    onClick={() => removeCourse(course?._id)}
                    aria-label={`Remove ${course?.ProgramName} from comparison`}
                  >
                    &times;
                  </button>
                  <h3 className="text-xl font-semibold mb-2">{course?.ProgramName}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Program Level:</span>
                      <span>{course?.ProgramLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Category:</span>
                      <span>{course?.Category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Duration:</span>
                      <span>{course?.Duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Fees:</span>
                      <span>{course?.Fees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Location:</span>
                      <span>{course?.Location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Scholarships:</span>
                      <span>{course?.Scholarships ? 'Available' : 'Not Available'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-700">University:</span>
                      <img
                        src={course?.University?.logo}
                        alt="University Logo"
                        className="w-10 h-10 rounded-full"
                      />
                      <span>{course?.University?.rating} ⭐</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700">Website:</span>
                      <a
                        href={course?.WebsiteURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Visit
                      </a>
                    </div>
                    
                    {/* Intake Details */}
                    {course?.Intake && course?.Intake.some(intake => intake.status) && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-800">Intake Dates:</h4>
                        <ul className="list-disc ml-5 text-gray-600">
                          {course?.Intake.filter(intake => intake.status).map((intake, idx) => (
                            <li key={idx}>{intake.date}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Standardized Tests */}
                    {Object.entries(course?.StandardizeRequirement).some(([key, value]) => value.status) && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-800">Standardized Tests:</h4>
                        <ul className="list-disc ml-5 text-gray-600">
                          {Object.entries(course?.StandardizeRequirement)
                            .filter(([key, value]) => value.status)
                            .map(([key, value], idx) => (
                              <li key={idx}>
                                {key}: {value.description || 'No description'} - Minimum Requirement: {value.minRequirement || 'Not specified'}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}

                    {/* Language Tests */}
                    {Object.entries(course?.LanguageRequirements).some(([key, value]) => value.status) && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-gray-800">Language Tests:</h4>
                        <ul className="list-disc ml-5 text-gray-600">
                          {Object.entries(course?.LanguageRequirements)
                            .filter(([key, value]) => value.status)
                            .map(([key, value], idx) => (
                              <li key={idx}>
                                {key}: {value.description || 'No description'} - Minimum Requirement: {value.minRequirement || 'Not specified'}
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {/* Close Button */}
                        {/* Download Button */}
            <DownloadButton />
            <button
              className="mt-6 w-full py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      </Transition>
    </div>
  );
};
export default CompareButton;