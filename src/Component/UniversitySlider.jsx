import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const UniversitySlider = ({ university }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const totalUniversities = university?.length || 0; // Safeguard against undefined
  const { userInfo } = useSelector(state => state.auth);

  // Function to go to the next university
  const nextUniversity = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalUniversities);
  };

  // Function to go to the previous university
  const prevUniversity = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalUniversities) % totalUniversities);
  };

  // Auto slide every 3 seconds
  useEffect(() => {
    if (totalUniversities > 0) { // Only set interval if there are universities
      const interval = setInterval(nextUniversity, 3000);
      return () => clearInterval(interval); // Clear interval on unmount
    }
  }, [totalUniversities]); // Add totalUniversities as a dependency

  const handleNavigate = () => {
    const selectedUniversity = university[currentIndex]; // Get the currently displayed university
    if (userInfo.role === 'partner') {
      navigate(`/partner/university/${selectedUniversity._id}`);
    } else if (userInfo.role === 'frenchise') {
      navigate(`/frenchise/university/${selectedUniversity._id}`);
    } else if (userInfo.role === 'counsellor') {
      navigate(`/counsellor/university/${selectedUniversity._id}`);
    }
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {totalUniversities > 0 ? ( // Check if there are universities to render
        university.map((uni, index) => (
          <div
            onClick={handleNavigate} // Click handler for navigation
            key={uni._id} // Use _id as the key
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out cursor-pointer ${
              index === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={uni.heroURL}
              alt={uni.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-5 left-5 bg-white bg-opacity-75 p-3 rounded">
              <h2 className="text-lg font-bold">{uni.name}</h2>
            </div>
          </div>
        ))
      ) : (
        <p>No universities available.</p> // Optional message if no universities
      )}
      <button
        onClick={prevUniversity}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md"
      >
        &#9664; {/* Left Arrow */}
      </button>
      <button
        onClick={nextUniversity}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-white p-2 text-black rounded-full shadow-md"
      >
        &#9654; {/* Right Arrow */}
      </button>
    </div>
  );
};

export default UniversitySlider;
