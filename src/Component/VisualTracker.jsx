import React from 'react';
import { Check, Plane, Clock, Calendar, FileText, Stamp } from 'lucide-react';

const VisualTracker = ({ 
  statusSteps = [
    'Inquiry',
    'Assessment',
    'Offer Letter',
    'Fees Paid',
    'Acceptance Letter',
    'VFS date booked',
    'File Submitted',
    'Visa Approved'
  ],
  currentStatus,
}) => {
  const getCurrentStepIndex = (status) => statusSteps.indexOf(status);
  const currentStepIndex = getCurrentStepIndex(currentStatus);

  const stepIcons = {
    'Inquiry': Clock,
    'Assessment': FileText,
    'Offer Letter': FileText,
    'Fees Paid': Stamp,
    'Acceptance Letter': FileText,
    'VFS date booked': Calendar,
    'File Submitted': FileText,
    'Visa Approved': Plane
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      <div className="relative mb-12">
        {/* Progress Bar Background */}
        <div className="absolute top-[25px] left-0 h-2 w-full bg-gray-100 rounded-full" />

        {/* Active Progress Bar */}
        <div 
          className="absolute top-[25px] left-0 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700 ease-in-out"
          style={{ width: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
        />

        {/* Steps */}
        <div className="relative flex justify-between">
          {statusSteps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const isActive = isCompleted || isCurrent;
            const StepIcon = stepIcons[step] || FileText;
            
            return (
              <div key={step} className="flex flex-col items-center relative group">
                {/* Step Circle */}
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-3 transition-all duration-300 shadow-lg ${
                    isActive ? 'border-blue-500 bg-blue-500 text-white' : 'border-gray-200 bg-white text-gray-400'
                  } ${isCurrent ? 'animate-pulse' : ''}`}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6" />
                  ) : (
                    <StepIcon className="w-6 h-6" />
                  )}
                </div>

                {/* Step Label */}
                <div className="mt-4 relative">
                  <span 
                    className={`text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    }`}
                  >
                    {step}
                  </span>

                  {/* Date tooltip */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                      {isCompleted ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Display */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Current Status</h3>
            <p className="text-xl font-bold text-blue-600 mt-1">{currentStatus}</p>
          </div>
          <div className="bg-white p-3 rounded-full shadow-md">
            {stepIcons[currentStatus] && React.createElement(stepIcons[currentStatus], {
              className: "w-8 h-8 text-blue-500"
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualTracker;
