import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as XLSX from 'xlsx';
import { clearCompare } from '../slices/courseSlice';

const DownloadButton = () => {
  const dispatch = useDispatch();
  const compare = useSelector(state => state.course.compare);

  const handleDownload = () => {
    // Convert compare array to worksheet
    const ws = XLSX.utils.json_to_sheet(compare);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Courses");

    // Generate Excel file and trigger download
    XLSX.writeFile(wb, "Compared_Courses.xlsx");
  };

  return (
    <button
      className="mt-6 w-full py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300"
      onClick={handleDownload}
    >
      Download Excel
    </button>
  );
};

export default DownloadButton;
