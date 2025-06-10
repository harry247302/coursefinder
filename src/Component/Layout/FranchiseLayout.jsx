// Import React and other necessary components
import React, { useEffect, useState } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaCube,
  FaChartBar,
  FaTable,
  FaIcons,
  FaUser,
  FaSearch,
  FaBell,
  FaCog,
  FaUserCircle,
  FaList,
  FaMoneyBill,
  FaDownload,
} from 'react-icons/fa';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../../assets/SearchMyStudy.png';
import Placeholder from '../../assets/Placeholder.png';
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { logout } from '../../slices/authSlice';
import { toast } from 'react-toastify';
import { useFetchNavMutation, useFetchNotifcationMutation } from '../../slices/adminApiSlice';
import { FaMoneyBill1Wave, FaTicket } from 'react-icons/fa6';
import { RiInformationLine } from 'react-icons/ri';

const menuItems = [
  { icon: FaCube, label: 'Dashboard', link: '/frenchise/dashboard' },
  { icon: FaIcons, label: 'Universities', link: '/frenchise/university' },
  { icon: FaTable, label: 'Course Finder', link: '/frenchise/course' },
  { icon: FaChartBar, label: 'Countries', link: '/frenchise/country' },
  {
    icon: FaTicket,
    label: 'Create Assessment',
    hasSubmenu: true,
    submenu: [
      { label: 'Add  Assessment',  link: '/frenchise/profile/create' },
      { label: 'View Assessment', link: '/frenchise/assessment/view'}
   
    ],
  },
  {
    icon: FaUser,
    label: 'Apply Student',
    hasSubmenu: true,
    submenu: [
      { label: 'Add Student', link: '/frenchise/student/add' },
      { label: 'View Student', link: '/frenchise/student/view' },
      {label:'Track Student' ,link: '/frenchise/student/track'},
    ],
  },
  
  {icon: FaList, label: 'Useful Information', link: '/frenchise/usefullinformation' },
  { icon: FaDownload, label: 'Marketing Items', link: '/frenchise/promotional' },

  { icon: FaMoneyBill, label: 'Commission List', link: '/frenchise/commission' },
  {
      icon: FaUser,
      label: 'Add Counsellor',
      hasSubmenu: true,
      submenu: [
        { label: 'Add Counsellor', link: '/frenchise/addUser' },
        { label: 'View Counsellor', link: '/frenchise/viewUser' },
      ],
  },
    { icon: FaMoneyBill1Wave, label: 'Loan Lead', link: '/frenchise/loan' },
    { icon: FaMoneyBill1Wave, label: 'Recived Payment', link: '/frenchise/transaction' },
    
    
      {
        icon: FaTicket,
        label: 'Genrate Ticket',
        hasSubmenu: true,
        submenu: [
          { label: 'Add Ticket', link: '/frenchise/ticket/add' },
          { label: 'View Ticket', link: '/frenchise/ticket/view' },
        ],
      },
  
  
    // { icon: FaMoneyBill, label: 'Commission', link: '/frenchise/commission' },
    // { icon: FaMoneyBill1Wave, label: 'Loan', link: '/frenchise/loan' },
    // { icon: FaMoneyBill1Wave, label: 'Payment', link: '/frenchise/transaction' },
];

export default function PartnerLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [visibleNotifications, setVisibleNotifications] = useState(3); // To control visible notifications
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [logoutApiCall, { isSuccess }] = useLogoutMutation();
  const [FetchNotifcation] = useFetchNotifcationMutation();
  const [extraLink,setExtraLink] = useState(false);
  const [FetchNav] = useFetchNavMutation()
  

    useEffect(() => {
      const fetchPopups = async () => {
        try {
          const second = await FetchNav().unwrap()
          setExtraLink(second)
        } catch (err) {
          console.error('Failed to fetch popups:', err);
        }
      };
  
      fetchPopups();
    }, [FetchNav]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleNotifications = async () => {
    setIsNotificationsOpen(!isNotificationsOpen);

    if (!isNotificationsOpen) {
      try {
        const response = await FetchNotifcation(userInfo._id).unwrap();
        setNotifications(response);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success('Logout success!');
      navigate('/');
    }
  }, [isSuccess]);

  const toggleSubmenu = (index, event) => {
    event.preventDefault();
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
  };

 const logoutHandler = async () => {
  const isConfirmed = window.confirm("Are you sure you want to logout?");
  if (!isConfirmed) return;

  try {
    await logoutApiCall().unwrap();
    dispatch(logout());
    window.location.reload();
  } catch (err) {
    console.log('Error', err);
  }
};


  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (value.trim()) {
      const filtered = menuItems
        .flatMap((item) =>
          item.hasSubmenu
            ? item.submenu.map((sub) => ({ ...sub, parentLabel: item.label }))
            : [item]
        )
        .filter(
          (item) =>
            item.label.toLowerCase().includes(value) ||
            (item.parentLabel && item.parentLabel.toLowerCase().includes(value))
        );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  };

  const handleViewAllNotifications = () => {
    setVisibleNotifications(notifications.length); // Show all notifications
  };

  return (
    <div className="flex bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-white shadow-lg h-full text-gray-700 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4">
          
          <img
            className={`h-[60px] object-contain w-full ${
              isCollapsed ? 'hidden' : 'block'
            }`}
            src={Logo}
            alt="Logo"
          />
   
       
        </div>

        {/* User Profile */}
        <div className="flex flex-col items-center mt-8 mb-8">
        
          <img
            src={ userInfo.ProfilePhoto ? userInfo.ProfilePhoto : Placeholder}
            alt="User"
            className="w-12 h-12 rounded-full mb-2"
          />
          <span className={`font-medium text-gray-800 ${isCollapsed ? 'hidden' : 'block'}`}>
            {userInfo?.name}
          </span>
          <span className={`text-sm text-gray-500 ${isCollapsed ? 'hidden' : 'block'}`}>
            {userInfo?.role.toUpperCase()}
          </span>
        </div>

        {/* Menu Items */}
        <nav className='overflow-auto'>
          {menuItems.map((item, index) => {
            const isActive = location.pathname.startsWith(item.link);
            return (
              <div  key={index}>
                <div
                  onClick={(event) => {
                    if (item.hasSubmenu) {
                      toggleSubmenu(index, event);
                    } else {
                      navigate(item.link);
                    }
                  }}
                  className={`flex items-center py-3 px-4 border-b ${
                    isActive
                      ? 'bg-blue-100 text-blue-600'
                      : 'hover:bg-gray-100'
                  } ${isCollapsed ? 'justify-center' : ''} cursor-pointer`}
                >
                  <item.icon
                    size={20}
                    className={`${
                      isActive ? 'text-blue-600' : 'text-gray-600'
                    } ${isCollapsed ? 'text-center' : 'mr-4'}`}
                  />
                  {!isCollapsed && <span>{item.label}</span>}
                  {item.hasSubmenu && !isCollapsed && (
                    <FaChevronRight
                      size={12}
                      className={`ml-auto transition-transform duration-200 ${
                        openSubmenuIndex === index ? 'rotate-90' : ''
                      }`}
                    />
                  )}
                </div>

                {/* Submenu */}
                {item.hasSubmenu &&
                  openSubmenuIndex === index &&
                  !isCollapsed && (
                    <div className="pl-8 bg-gray-50">
                      {item.submenu.map((submenuItem, submenuIndex) => (
                        <Link
                          key={submenuIndex}
                          to={submenuItem.link}
                          className="block py-2 text-sm text-gray-600 hover:bg-gray-100"
                        >
                          {submenuItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
              </div>
            );
          })}
            <div className='mt-2'>
                      {extraLink?.navItems?.map((link)=>{
                        return( 
                          <div className='flex flex-row  space-between items-center py-3 px-4'>
                             <RiInformationLine
                              size={20}
                            
                            />
                          <Link
                            to={link.url}
                            className="block text-sm ml-2 font-bold text-gray-700 hover:bg-gray-100"
                          >
                            {link.name}
                          </Link>
                          </div>
                        )
          
                      })}
          
                    </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
          <div>
                <button
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none"
                >
                  {isCollapsed ? (
                    <FaChevronRight size={20} className="text-gray-600" />
                  ) : (
                    <FaChevronLeft size={16} className="text-gray-600" />
                  )}
                </button>
              </div>
            <div className="relative w-full max-w-xs">
              
              <div className="flex items-center bg-gray-100 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
                <FaSearch size={20} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search Pages..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="bg-gray-100 text-gray-700 ml-2 w-full focus:outline-none"
                />
              </div>

              {/* Suggestions Dropdown */}
              {filteredItems.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="absolute mt-2 bg-white shadow-lg rounded-lg z-10 w-full border border-gray-200"
                >
                  {filteredItems.map((item, index) => (
                    <li
                      key={index}
                      onClick={() => navigate(item.link)}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                    >
                      {item.parentLabel && (
                        <span className="text-xs text-gray-400">
                          {item.parentLabel} &gt;
                        </span>
                      )}
                      {item.label}
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>

            <div className="flex items-center mr-[50px] space-x-6">
              <div className="relative ">
                <button
                    onClick={()=>navigate('/frenchise/notification')}
                    className="relative text-white focus:outline-none"
                >
                  <FaBell size={30} />
                
                </button>

                {/* Notifications Dropdown */}
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute mt-2 right-0 w-64 bg-white shadow-lg rounded-lg z-10 border border-gray-200"
                  >
                    <h2 className="text-center font-medium py-2">Notifications</h2>
                    <div className="p-2 flex flex-col">
                      {notifications.slice(0, visibleNotifications).map((notification, index) => (
                        <span
                        onClick={()=>navigate('/partner/notification')}
                          key={index}
                          className="border-b py-2 px-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          {notification.message}
                        </span>
                      ))}
                    </div>
                    {visibleNotifications < notifications.length && (
                      <button
                        className="block text-center w-full py-2 bg-gray-100 hover:bg-gray-200"
                        onClick={handleViewAllNotifications}
                      >
                        View All Notifications
                      </button>
                    )}
                  </motion.div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="relative text-white focus:outline-none"
                >
                  <FaUserCircle size={30} />
                </button>

                {/* Dropdown */}
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute mt-2 right-0 w-40 bg-white shadow-lg rounded-lg z-10 border border-gray-200"
                  >
                    <Link
                      to="/frenchise/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Outlet */}
        <main className="flex-1 overflow-scroll">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
