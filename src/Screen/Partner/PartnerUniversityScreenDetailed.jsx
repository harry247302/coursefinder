import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFetchOneUniversityMutation } from '../../slices/adminApiSlice';
import { FetchOneUniversitys } from '../../slices/universitySlice';
import { toast } from 'react-toastify'; // Make sure you import toast

export default function PartnerUniversityScreenDetailed() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [FetchOneUniversity] = useFetchOneUniversityMutation();
  const { singleUniversity } = useSelector((state) => state.university);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchOneUniversity(id).unwrap();
        dispatch(FetchOneUniversitys(result));
      } catch (error) {
        toast.error('Something went wrong while fetching the university.');
      }
    };
    fetchData();
  }, [FetchOneUniversity, dispatch, id]);

  return (
    <div className="p-4 bg-gray-100">
      <div>
        <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
          <img 
            src={singleUniversity.bannerURL || "/api/placeholder/800/200"} 
            alt={singleUniversity.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 bg-white p-2 rounded">
            <img 
              src={singleUniversity.logo || "/api/placeholder/50/50"} 
              alt={`${singleUniversity.name} logo`} 
              className="w-24 h-24"
            />
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-4">{singleUniversity.name}</h1>
        <p className="text-lg mb-6">{singleUniversity.Province?.name}</p>

        <div>
          <h2 className="text-xl font-semibold">Basic Info.</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <InfoItem title="Institution Type" value={singleUniversity.type} />
            <InfoItem title="Campus" value="1 Campus" />
            <InfoItem title="Is MOI Accepted ?" value="No" />
            <InfoItem title="Required % in last edu." value={singleUniversity.grade || "N/A"} />
            <InfoItem title="Fees Range P.A in (Euros)" value="6000-7000" />
            <InfoItem title="Application Fees (Euros)" value="0 - 0" />
            <InfoItem title="IELTS Requirements" value="N/A" />
            <InfoItem title="Deadline for application" value="N/A" />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Courses Offered</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {singleUniversity.Course && singleUniversity.Course.map(course => (
              <CourseCard key={course._id} course={course} heroURL={singleUniversity.heroURL} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ title, value }) => (
  <div className="bg-blue-50 p-3 rounded">
    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);

const CourseCard = ({ course, heroURL }) => (
  <div className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow duration-300">
    <div className="flex">
      <div className="w-1/3 h-350px overflow-hidden rounded-l">
        <img 
          src={heroURL || "/api/placeholder/200/350"} 
          alt={course.ProgramName} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-2/3 p-4">
        <h3 className="text-lg font-semibold">{course.ProgramName}</h3>
        <p className="text-sm text-gray-600">Category: {course.Category}</p>
        <p className="text-sm text-gray-600">Duration: {course.Duration}</p>
        <p className="text-sm text-gray-600">Location: {course.Location}</p>
        <p className="text-sm text-gray-600">Fees: {course.Fees ? `${course.Fees} Euros` : 'N/A'}</p>
        <p className="text-sm text-gray-600">Intake: {course.Intake.map(intake => intake.month).join(", ")}</p>
      </div>
    </div>
  </div>
);
