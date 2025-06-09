import React, { useEffect, useState } from 'react';
import { useAllCourseMutation, useCountryFetchMutation, useCreateAssessmentMutation, useCreateStudentMutation, useFetchProvinceMutation, useFetchUniversityMutation } from '../../slices/adminApiSlice';
import './extra.css'; // Ensure you have this CSS file
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const steps = ['Personal Details', 'Contact Details', 'Course Details', 'Documents'];
const storage = getStorage(app);

const categories = [
  'Arts',
  'Accounts',
  'Finance',
  'Marketing',
  'Science',
  'Medical',
  'Computers',
  'Engineering',
  'Law',
  'Education',
  'Social Sciences',
  'Business Administration',
  'Psychology',
  'Economics',
  'Architecture',
  'Environmental Science',
  'Nursing',
  'Hospitality Management',
  'Media and Communication',
  'Information Technology',
  'Pharmacy',
  'Agriculture',
  'Design',
  'Public Health',
  'Mathematics',
  'Data Science',
  'Artificial Intelligence'
];

const StepTracker = ({ steps, activeStep }) => {
    return (
      <div className="step-tracker flex justify-between items-center mb-6">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center flex-grow">
            <div className="flex w-full items-center">
              <div
                className={`step flex items-center justify-center w-12 h-10 rounded-full border-2 ${
                  index === activeStep ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-300'
                }`}
              >
                <span className="step-number text-lg font-semibold">{index + 1}</span>
              </div>
              {/* Show the line connecting steps */}
              {index < steps.length - 1 && (
                <div
                  className={`step-line h-1 w-full flex-grow mx-2 ${
                    index < activeStep ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                ></div>
              )}
            </div>
            {/* Step label displayed below the step number */}
            <span
              className={`mt-2 text-sm font-medium ${
                index <= activeStep ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    );
  };
export default function PartnerCreateProfile() {
    const [CreateAssessment,{isSuccess}] = useCreateAssessmentMutation();
    const [activeStep, setActiveStep] = useState(0);
    const {userInfo} = useSelector(state=>state.auth);
    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [course, setCourse] = useState([]);
    const [filteredProvinces, setFilteredProvinces] = useState([]); // Filtered provinces based on selected country
    const [filters, setFilters] = useState({
      university: '',
    });
    const [AllCourse, { isLoading, isError }] = useAllCourseMutation();

    const [fetchCountries] = useCountryFetchMutation();
    const [fetchProvinces] = useFetchProvinceMutation();
    const [fetchUniversities] = useFetchUniversityMutation(); 
    const [hasPassport, setHasPassport] = useState(false);

  
    // Fetch countries and provinces on component mount
    useEffect(() => {
      const loadCountries = async () => {
        const response = await fetchCountries();
        if (response?.data) {
          setCountries(response.data); // Set all countries
        }
      };
  
      const loadProvinces = async () => {
        const response = await fetchProvinces(); // Fetch all provinces
        if (response?.data) {
          setProvinces(response.data); // Set all provinces
        }
      };
  
      loadCountries();
      loadProvinces();
    }, [fetchCountries, fetchProvinces]);
  
    const handleInputChange2 = async (e) => {
        const { name, value } = e.target;
      
        // Update form data
        const updatedFormData = { ...formData, [name]: value };
      
        // Filter provinces when a country is selected
        if (name === 'Country' && value) {
          const countryProvinces = provinces.filter(
            (province) => province.Country._id === value // Filter based on Country ID
          );
          setFilteredProvinces(countryProvinces); // Update filtered provinces
      
          // Reset province and university when a new country is selected
          updatedFormData.Province = '';
          updatedFormData.University = '';
          setUniversities([]); // Clear universities when country changes
        }
      
        // Fetch universities when a province is selected
        if (name === 'Province' && value) {
          const response = await fetchUniversities(); // Pass selected province ID
          if (response?.data) {
            setUniversities(response.data); // Set universities related to selected province
            updatedFormData.University = ''; // Reset university
          }
        }
        if (name === 'University' && value) {
          setFilters({university: value});
          const response = await AllCourse(filters); // Pass selected province ID
          if (response?.data) {
            setCourse(response.data); // Set universities related to selected province
          }
        }
        // Finally, set the form data with all changes
        setFormData(updatedFormData);
      };
      
 
    useEffect(()=>{
        if(isSuccess){
            toast.success("Add student")
        }
    },[isSuccess])
    const [formErrors, setFormErrors] = useState({});
  // Validation function
    const validateFields = () => {
        let errors = {};
        if (!formData.firstName) errors.firstName = 'First Name is required';
        if (!formData.lastName) errors.lastName = 'Last Name is required';
        if (!formData.dob) errors.dob = 'Date of Birth is required';
        if (!formData.gender) errors.gender = 'Gender is required';
    setFormErrors(errors);
    // Return true if no errors
    return Object.keys(errors).length === 0;
  };
  
  const [formData, setFormData] = useState({
    User: userInfo._id,
    firstName: '',
    middleName: '',
    lastName: '',
    passportNumber: '',
    dob: '',
    //second step
    lastEdu:'',
    yearOfPassing:'',
    gradesInLastYear:'',
    english12Grade:'',
    englishTest:'',
    remarks:'',
    mobileNumber: '',
    emailID: '',
    //third step
    Country: '',
    Course: '',
    //fourth step
    resume: '',
    englishTestScorecard: '',
    acadmics : '',
    englishTestDoc : '',
    workExperienceDoc : '', 
  });
  const handleNext = () => {
    console.log("1 =====>",validateFields())
        if (activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
            console.log("Next step triggered");
          }
    
};
const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
}
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  console.log("Fix",activeStep)

  
  const handleFileChange = async (event) => {
    const { name, files } = event.target;
    if (files.length > 0) {
      const file = files[0];
      const url = await uploadImage(file);
      setFormData((prevData) => ({ ...prevData, [name]: url }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        // console.log("submit data",formData)
      await CreateAssessment(formData).unwrap();
      // Handle success (e.g., show a success message, redirect)
    } catch (err) {
      // Handle error (e.g., show error message)
    }
  };
  const uploadImage = async (file) => {
    const storageRef = ref(storage, `universities/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
};
console.log("filterd university",universities)
// console.log("fixx country",countries)
// console.log("fetch province",provinces)
// console.log("form data",formData)

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            {/* Personal Details */}
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="middleName">Middle Name</label>
              <input
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
                <label> I have a passport</label>
                  <input
                    type="checkbox"
                    checked={hasPassport}
                    onChange={() => setHasPassport(!hasPassport)}
                  />
              </div>
            <div className="form-group">
              <label htmlFor="passportNumber">Passport No / Profile Evaluation UID *</label>
              <input
                type="text"
                id="passportNumber"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleInputChange}
                disabled= {!hasPassport}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth *</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
              {formErrors.dob && <span className="error">{formErrors.dob}</span>}
            </div>
          </>
        );
      case 1:
        return (
            <>
            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile No *</label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
              />
              {formErrors.mobileNumber && <span className="error">{formErrors.mobileNumber}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="emailID">Email ID *</label>
              <input
                type="email"
                id="emailID"
                name="emailID"
                value={formData.emailID}
                onChange={handleInputChange}
                required
              />
              {formErrors.emailID && <span className="error">{formErrors.emailID}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="yearOfPassing">Year of Passing *</label>
              <select
                id="yearOfPassing"
                name="yearOfPassing"
                value={formData.yearOfPassing}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Year</option>
                {[...Array(30)].map((_, i) => {
                  const year = new Date().getFullYear() - i;
                  return (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="lastEdu">Last Education *</label>
              <select
                id="lastEdu"
                name="lastEdu"
                value={formData.lastEdu}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Education Level</option>
                <option value="10th">10th</option>
                <option value="12th">12th</option>
                <option value="BACHELOR DEGREE">BACHELOR DEGREE</option>
                <option value="MASTER DEGREE">MASTER DEGREE</option>
                <option value="DIPLOMA 10+3">DIPLOMA 10+3</option>
                <option value="BACHELOR IN TECHNOLOGY">BACHELOR IN TECHNOLOGY</option>
                <option value="MASTER IN TECHNOLOGY">MASTER IN TECHNOLOGY</option>
                <option value="POST GRADUATE">POST GRADUATE</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="gradesInLastYear">Grade In CGPA *</label>
              <input
                type="text"
                id="gradesInLastYear"
                name="gradesInLastYear"
                value={formData.gradesInLastYear}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="english12Grade">English Grade in 12th *</label>
              <input
                type="text"
                id="english12Grade"
                name="english12Grade"
                value={formData.english12Grade}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="englishTest">English Test *</label>
              <select
                id="englishTest"
                name="englishTest"
                value={formData.englishTest}
                onChange={handleInputChange}
                required
              >
                <option value="">Select English Test</option>
                <option value="WITH IELTS">WITH IELTS</option>
                <option value="WITHOUT IELTS">WITHOUT IELTS</option>
              </select>
            </div>
          </>
        );
      case 2:
        return (
            <>
            {/* Course Details */}
            <div className="form-group">
              <label htmlFor="Country">Country *</label>
              <select
                id="Country"
                name="Country"
                value={formData.Country}
                onChange={handleInputChange2}
                required
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country._id} value={country._id}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="Course">Course *</label>
              <select
                id="Course"
                name="Course"
                value={formData.Course}
                onChange={handleInputChange2}
                required
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
              ))}
              </select>
            </div>
          </>
        );
      case 3:
        return (
          <>
            {/* Documents */}
             <div className="form-group">
                    <label htmlFor="grade12Marksheet">Resume</label>
                    <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    />
            </div>
            <div className="form-group">
                    <label htmlFor="englishTestScorecard">English Test Score Card</label>
                    <input
                    type="file"
                    id="englishTestScorecard"
                    name="englishTestScorecard"
                    onChange={handleFileChange}
                    />
            </div>
            <div className="form-group">
                    <label htmlFor="acadmics">Acadmics</label>
                    <input
                    type="file"
                    id="acadmics"
                    name="acadmics"
                    onChange={handleFileChange}
                    
                    />
            </div>
            <div className="form-group">
                    <label htmlFor="workExperienceDoc">Grade 12 Marksheet</label>
                    <input
                    type="file"
                    id="workExperienceDoc"
                    name="workExperienceDoc"
                    onChange={handleFileChange}
                    />
            </div>
          
            {/* Add more file input fields as required */}
          </>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="partner-add-student-container p-5">
    <h1>Add New Student</h1>
    {/* Step Tracker */}
    <StepTracker steps={steps} activeStep={activeStep} />
    <div>
      <div className="grid grid-cols-3 gap-10 p-10">
        {renderStepContent(activeStep)}
      </div>
  
      <div className="form-navigation flex flex-row justify-between w-full">
    
          <button
            type="button"
            onClick={handleBack}
            disabled={activeStep === 0}
            className="btn-back"
          >
            Back
          </button>
        {activeStep < steps.length - 1 ? (
          <button
            type="button"
            onClick={handleNext}
            className="btn-next"
          >
            Next
          </button>
        ) : (
          <button
            onClick={(e)=>handleSubmit(e)}
            className="btn-submit"
          >
            Submit
          </button>
        )}
      </div>
    </div>
  </div>
  );
}
