import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetLedgerByCenterCodeMutation } from '../../slices/adminApiSlice';
import { AiOutlineFileText } from 'react-icons/ai';

export default function PartnerLedgerScreen() {
  const { userInfo } = useSelector(state => state.auth);
  const [getLedgerByCenterCode] = useGetLedgerByCenterCodeMutation();
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const fetchLedger = async () => {
      try {
        const ledger = await getLedgerByCenterCode(userInfo?.CenterCode).unwrap();
        setTransactions(ledger);
      } catch (error) {
        console.error("Failed to fetch ledger:", error);
      }
    };
    fetchLedger();
  }, [getLedgerByCenterCode, userInfo.centerCode]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Partner Ledger</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {transactions?.map(transaction => (
          <div key={transaction._id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 flex flex-col">
            <div className="flex-grow mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Amount: ${transaction.amount}</h3>
                <span className="text-sm text-gray-500">{transaction.transactionDate}</span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Transaction ID:</strong> {transaction.transactionID}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Mode:</strong> {transaction.transactionMode}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>Remarks:</strong> {transaction.remarks || "N/A"}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {transaction.invoice && (
                <a
                  href={transaction.invoice}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition duration-200"
                >
                  <AiOutlineFileText className="mr-2" /> View Invoice
                </a>
              )}
              {transaction.recipt && (
                <a
                  href={transaction.recipt}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition duration-200"
                >
                  <AiOutlineFileText className="mr-2" /> View Receipt
                </a>
              )}
              {transaction.other && (
                <a
                  href={transaction.other}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition duration-200"
                >
                  <AiOutlineFileText className="mr-2" /> View Other Document
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}