import React, { useEffect, useState } from 'react';
import SearchMyStudy from '../assets/SearchMyStudy.png';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../slices/userApiSlice';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import loginbg from "../assets/login-bg.jpg"
import Form from './Partner/Loginform';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faCircleCheck, faFileArrowDown, faBullhorn } from '@fortawesome/free-solid-svg-icons';
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isSuccess, error, isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const cards = [
    {
      card: "TrackMyClass",
      para: "Stay on top of every student’s journey. Track application status, monitor progress, and get real-time updates—all in one place.",
      icon: faGraduationCap,
    },
    {
      card: "Download Reports",
      para: "Download ready reports for your students & more!",
      icon: faFileArrowDown,
    },
    {
      card: "Marketing Resources",
      para: "Download all marketing material & make a buzz about it!",
      icon: faBullhorn,
    },
    {
      card: "Streamlined Workflow",
      para: "Skip the old methods—apply with just one click!",
      icon: faCircleCheck,
    },
  ];
  useEffect(() => {

    if (isSuccess) {
      toast.success("Login success!")
      navigate('/redirect');

    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      navigate('/');
    } catch (err) {
      console.log("fix")
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <div className="w-full  bg-white shadow-lg  overflow-hidden ">
        {/* Left Side: Login Form */}
        <section className="relative w-full  flex flex-col">
          {/* Background Image */}
          <img
            src={loginbg}
            alt="Background Image"
            className="absolute inset-0 w-full h-[500px] object-cover"
          />

          {/* Gradient Overlays */}
          <div
            className="h-[500px] absolute inset-0 opacity-95"
            style={{
              backgroundImage: `linear-gradient(to right, #0ea5e9, transparent)`
            }}
          ></div>
          <div
            className="h-[500px] absolute inset-0 opacity-90"
            style={{
              backgroundImage: `linear-gradient(to left, #0ea5e9)`
            }}
          ></div>

          {/* Navbar */}
          <nav className="relative z-10 w-full  to-sky-300 px-6 py-2 text-white font-semibold shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <span className=""> 
                <img src={SearchMyStudy} className='w-[200px]' alt="" />
              </span>
              <ul className="flex gap-6">
                <li><a href="#" className="hover:underline">Home</a></li>
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between   w-full max-w-7xl mx-auto text-white flex-1">
            {/* Text Section */}
          
            
            <div className="lg:w-1/2 space-y-6 text-center lg:text-left p-2">
              <h1 className="font-bold text-4xl sm:text-5xl leading-tight " style={{lineHeight:"60px"}}>
                Apply from over 550+ Top European Universities.
              </h1>
              <p className="text-xl font-medium">
                Super Simple Portal Trusted by 2500+ Channel Partners Across Asia!
              </p>
            </div>
  
            {/* Form Section */}
            <div className="text-gray-800" aria-label="Application Form">
              <Form />
            </div>
            
          </div>
        </section>


        <div className='mt-10'>
          <h1 className='text-3xl font-bold text-center text-sky-500'>Great tools and features for Edugo Abroad Partners all at one place!</h1>
          <p className='text-center'>Cut your time and efforts and stay ahead of the competition with these awesome features.</p>
          <section className="px-6 py-10 bg-white grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

            {cards.map((ele, index) => (
              <div key={index} className="p-6 border rounded-lg shadow hover:shadow-md transition">
                <div className='flex justify-center mb-5'>
                  <FontAwesomeIcon icon={ele.icon} style={{ color: "#10a6e9" }} size="3x" />

                </div>
                <h3 className="text-lg font-semibold mb-2 text-center">{ele.card}</h3>
                <p className="text-gray-600 text-sm text-center">{ele.para}</p>
              </div>
            ))}
          </section>
        </div>
        <footer className="bg-gray-800 text-white py-4 mt-auto">
          <div className="max-w-7xl mx-auto px-4 text-center text-sm">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </div>
        </footer>


      </div>
    </div>
  );
}
