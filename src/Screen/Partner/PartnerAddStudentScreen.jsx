import React, { useEffect, useState } from 'react';
import { useAllCourseMutation, useCountryFetchMutation, useCreateStudentMutation, useFetchProvinceMutation, useFetchUniversityMutation } from '../../slices/adminApiSlice';
import './extra.css'; // Ensure you have this CSS file
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const steps = ['Personal Details', 'Contact Details', 'Course Details', 'Documents'];
const storage = getStorage(app);

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
  
  

export default function PartnerAddStudentScreen() {
  const [createStudent,{isSuccess}] = useCreateStudentMutation();
  const [activeStep, setActiveStep] = useState(0);
  const {userInfo} = useSelector(state=>state.auth);
   
  
    // State for fetched data
    const [countries, setCountries] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [universities, setUniversities] = useState([]);
    const [course, setCourse] = useState([]);

    const [filteredProvinces, setFilteredProvinces] = useState([]); // Filtered provinces based on selected country
    const [filters, setFilters] = useState({
      university: '',
     
    });
    // Fetch mutations
    const [AllCourse, { isLoading, isError }] = useAllCourseMutation();

    const [fetchCountries] = useCountryFetchMutation();
    const [fetchProvinces] = useFetchProvinceMutation();
    const [fetchUniversities] = useFetchUniversityMutation();
  
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
    // if(!formData.postCode) errors.postCode = "Post Code is required";
    // if (!formData.mobileNumber) errors.mobileNumber = 'Mobile Number is required';
    // if (!formData.emailID) errors.emailID = 'Email ID is required';
    // if (!formData.address) errors.address = 'Address is required';
    // if (!formData.country) errors.country = 'Country is required';
    // if (!formData.state) errors.state = 'State is required';
    // if (!formData.city) errors.city = 'City is required';

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
    citizenship: '',
    gender: '',
    photo: '',
    postCode: '',
    mobileNumber: '',
    emailID: '',
    address: '',
    country: '',
    state: '',
    city: '',
    Country: '',
    Province: '',
    University: '',
    Course: '',
    grade12Marksheet: '',
    grade10Marksheet: '',
    passportFrontBack: '',
    resume: '',
    englishTestScorecard: '',
    // Optional/Additional fields
    grade10PassingCertificate: '',
    verificationForm: '',
    applicationFeeReceipt: '',
    statementOfPurpose: '',
    extracurricularCertificates: '',
    gapJustification: '',
    workExperience: '',
    universityApplicationForm: '',
    letterOfRecommendations: '',
    masterTranscripts: '',
    masterMarksheet: '',
    masterDegree: '',
    bachelorTranscripts: '',
    bachelorMarksheet: '',
    bachelorDegree: '',
    grade12PassingCertificate: '',
    powerOfAttorney: '',
    registrationForm: '',
    declarationForm: '',
    passportPhoto: '',
    portfolio: '',
    visaDocument: '',
    birthCertificate: '',
    policeClearanceCertificate: '',
    medicalCertificate: '',
  });
  const handleNext = () => {
    console.log("1 =====>",validateFields())
    if (validateFields()) { 
        console.log("2 =====> No error")

        if (activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
            console.log("Next step triggered");
          }
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
      await createStudent(formData).unwrap();
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
                 {formErrors.firstName && <span className="error">{formErrors.firstName}</span>}
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
              {formErrors.lastName && <span className="error">{formErrors.lastName}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="passportNumber">Passport No / Profile Evaluation UID *</label>
              <input
                type="text"
                id="passportNumber"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handleInputChange}
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
            <div className="form-group">
              <label htmlFor="citizenship">Citizenship *</label>
              <input
                type="text"
                id="citizenship"
                name="citizenship"
                value={formData.citizenship}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Gender *</label>
              <div className='flex flex-row space-x-6'>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleInputChange}
                  required
                /> Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleInputChange}
                  required
                /> Female
              </label>
              </div>
              {formErrors.gender && <span className="error">{formErrors.gender}</span>}

            </div>
            <div className="form-group">
              <label htmlFor="photo">Photo</label>
              <input
                type="file"
                id="photo"
                name="photo"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
          </>
        );
      case 1:
        return (
          <>
            {/* Contact Details */}
            <div className="form-group">
              <label htmlFor="postCode">Post Code</label>
              <input
                type="text"
                id="postCode"
                name="postCode"
                value={formData.postCode}
                onChange={handleInputChange}
              />
                {formErrors.postCode && <span className="error">{formErrors.postCode}</span>}

            </div>
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
              <label htmlFor="address">Address *</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              ></textarea>
                {formErrors.address && <span className="error">{formErrors.address}</span>}

            </div>
            <div className="form-group">
              <label htmlFor="country">Country *</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              />
                {formErrors.country && <span className="error">{formErrors.country}</span>}

            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
                {formErrors.state && <span className="error">{formErrors.state}</span>}

            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
                {formErrors.city && <span className="error">{formErrors.city}</span>}

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
              <label htmlFor="Province">Province *</label>
              <select
                id="Province"
                name="Province"
                value={formData.Province}
                onChange={handleInputChange2}
                required
              >
                <option value="">Select a province</option>
                {filteredProvinces?.map((province) => (
                  <option key={province._id} value={province._id}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
      
            <div className="form-group">
              <label htmlFor="University">University *</label>
              <select
                id="University"
                name="University"
                value={formData.University}
                onChange={handleInputChange2}
                required
                disabled={!formData.Province} // Disable until province is selected
              >
                <option value="">Select a university</option>
                {universities.map((university) => (
                  <option key={university._id} value={university._id}>
                    {university.name}
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
                disabled={!formData.University} // Disable until university is selected
              >
                  <option value="">Select a Course</option>
                {course.map((university) => (
                  <option key={university._id} value={university._id}>
                    {university.ProgramName}
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
                    <label htmlFor="grade12Marksheet">Grade 12 Marksheet</label>
                    <input
                    type="file"
                    id="grade12Marksheet"
                    name="grade12Marksheet"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="grade10Marksheet">Grade 10 Marksheet</label>
                    <input
                    type="file"
                    id="grade10Marksheet"
                    name="grade10Marksheet"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passportFrontBack">Passport Front & Back</label>
                    <input
                    type="file"
                    id="passportFrontBack"
                    name="passportFrontBack"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="resume">Resume</label>
                    <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="englishTestScorecard">English Test Scorecard</label>
                    <input
                    type="file"
                    id="englishTestScorecard"
                    name="englishTestScorecard"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                {/* Additional/Optional document fields */}
                <div className="form-group">
                    <label htmlFor="grade10PassingCertificate">Grade 10 Passing Certificate</label>
                    <input
                    type="file"
                    id="grade10PassingCertificate"
                    name="grade10PassingCertificate"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="verificationForm">Verification Form</label>
                    <input
                    type="file"
                    id="verificationForm"
                    name="verificationForm"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="applicationFeeReceipt">Application Fee Receipt</label>
                    <input
                    type="file"
                    id="applicationFeeReceipt"
                    name="applicationFeeReceipt"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="statementOfPurpose">Statement of Purpose</label>
                    <input
                    type="file"
                    id="statementOfPurpose"
                    name="statementOfPurpose"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="extracurricularCertificates">Extracurricular Certificates</label>
                    <input
                    type="file"
                    id="extracurricularCertificates"
                    name="extracurricularCertificates"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="gapJustification">Gap Justification</label>
                    <input
                    type="file"
                    id="gapJustification"
                    name="gapJustification"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="workExperience">Work Experience</label>
                    <input
                    type="file"
                    id="workExperience"
                    name="workExperience"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="universityApplicationForm">University Application Form</label>
                    <input
                    type="file"
                    id="universityApplicationForm"
                    name="universityApplicationForm"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="letterOfRecommendations">Letter of Recommendations</label>
                    <input
                    type="file"
                    id="letterOfRecommendations"
                    name="letterOfRecommendations"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="masterTranscripts">Master Transcripts</label>
                    <input
                    type="file"
                    id="masterTranscripts"
                    name="masterTranscripts"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="masterMarksheet">Master Marksheet</label>
                    <input
                    type="file"
                    id="masterMarksheet"
                    name="masterMarksheet"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="masterDegree">Master Degree</label>
                    <input
                    type="file"
                    id="masterDegree"
                    name="masterDegree"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bachelorTranscripts">Bachelor Transcripts</label>
                    <input
                    type="file"
                    id="bachelorTranscripts"
                    name="bachelorTranscripts"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bachelorMarksheet">Bachelor Marksheet</label>
                    <input
                    type="file"
                    id="bachelorMarksheet"
                    name="bachelorMarksheet"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bachelorDegree">Bachelor Degree</label>
                    <input
                    type="file"
                    id="bachelorDegree"
                    name="bachelorDegree"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="grade12PassingCertificate">Grade 12 Passing Certificate</label>
                    <input
                    type="file"
                    id="grade12PassingCertificate"
                    name="grade12PassingCertificate"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="powerOfAttorney">Power of Attorney</label>
                    <input
                    type="file"
                    id="powerOfAttorney"
                    name="powerOfAttorney"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="registrationForm">Registration Form</label>
                    <input
                    type="file"
                    id="registrationForm"
                    name="registrationForm"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="declarationForm">Declaration Form</label>
                    <input
                    type="file"
                    id="declarationForm"
                    name="declarationForm"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="passportPhoto">Passport Photo</label>
                    <input
                    type="file"
                    id="passportPhoto"
                    name="passportPhoto"
                    onChange={handleFileChange}
                    accept="image/*"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="portfolio">Portfolio</label>
                    <input
                    type="file"
                    id="portfolio"
                    name="portfolio"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="visaDocument">Visa Document</label>
                    <input
                    type="file"
                    id="visaDocument"
                    name="visaDocument"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="birthCertificate">Birth Certificate</label>
                    <input
                    type="file"
                    id="birthCertificate"
                    name="birthCertificate"
                    onChange={handleFileChange}
                    accept="application/pdf"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="policeClearanceCertificate">Police Clearance Certificate</label>
                    <input
                    type="file"
                    id="policeClearanceCertificate"
                    name="policeClearanceCertificate"
                    onChange={handleFileChange}
                    accept="application/pdf"
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
