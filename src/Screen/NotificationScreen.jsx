import React, { useEffect } from 'react';
import { useFetchNotifcationMutation } from '../slices/adminApiSlice';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

export default function NotificationScreen() {
  const [fetchNotifications, { data: notifications, isLoading, isError }] = useFetchNotifcationMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchNotifications(userInfo._id); // Fetch notifications on component load
  }, [fetchNotifications]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Notifications</h1>

      {isLoading && <p>Loading notifications...</p>}
      {isError && <p className="text-red-500">Error fetching notifications. Please try again later.</p>}
      {notifications && notifications.length === 0 && <p>No notifications available.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notifications &&
          notifications.map((notification, index) => (
            <motion.div
              key={notification.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white p-4 rounded-lg shadow-md"
            >
              <h2 className="text-lg font-medium">{notification.title}</h2>
              <p className="text-gray-600 mt-2">{notification.message}</p>
              <p className="text-sm text-gray-400 mt-4">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
