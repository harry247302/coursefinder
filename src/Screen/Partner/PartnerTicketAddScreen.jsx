import React, { useEffect, useState } from 'react';
import { useCreateTicketMutation } from '../../slices/adminApiSlice';
import { useSelector } from 'react-redux';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { app } from '../../firebase';
import { toast } from 'react-toastify';
import { FiFile, FiAlertTriangle, FiEdit, FiFilePlus } from 'react-icons/fi';

const storage = getStorage(app);

export default function PartnerTicketAddScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('General');
  const [attachments, setAttachments] = useState([]);
  const { userInfo } = useSelector((state) => state.auth);

  const [createTicket, { isSuccess }] = useCreateTicketMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Ticket created successfully!');
      setTitle('');
      setDescription('');
      setAttachments([]);
    }
  }, [isSuccess]);

  const uploadFiles = async () => {
    const uploadPromises = attachments.map(async (file) => {
      const storageRef = ref(storage, `tickets/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      return url;
    });

    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const attachmentUrls = await uploadFiles();

      const formData = {
        title,
        description,
        priority,
        category,
        userId: userInfo._id,
        attachments: attachmentUrls,
      };

      await createTicket(formData).unwrap();
      setTitle('');
      setDescription('');
      setAttachments([]);
    } catch (error) {
      toast.error('Failed to create ticket. Try again.');
    }
  };

  const handleFileChange = (e) => {
    setAttachments([...e.target.files]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8 bg-white p-10 shadow-xl rounded-lg">
        <h2 className="text-center text-4xl font-extrabold text-gray-900">
          <FiFilePlus className="inline text-blue-600 mr-2" />
          Create New Ticket
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                <FiEdit className="inline mr-1" /> Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter ticket title"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                <FiFile className="inline mr-1" /> Description
              </label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Describe the issue"
                rows="4"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                <FiAlertTriangle className="inline mr-1" /> Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option>General</option>
                <option>Technical</option>
                <option>Billing</option>
              </select>
            </div>

            <div className="mb-4 col-span-2">
              <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">
                Attachments
              </label>
              <input
                id="attachments"
                name="attachments"
                type="file"
                multiple
                onChange={handleFileChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {attachments.length > 0 && (
                <ul className="mt-2">
                  {Array.from(attachments).map((file, index) => (
                    <li key={index} className="text-sm text-gray-600">
                      {file.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
