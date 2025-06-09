import React, { useEffect, useState } from 'react';
import { useCreateResponseTicketMutation, useGetOneTicketMutation } from '../../slices/adminApiSlice';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

export default function PartnerTicketScreen() {
    const [getOneTicket, { data: tickets, isLoading, isError }] = useGetOneTicketMutation();
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [reply, setReply] = useState('');
    const { userInfo } = useSelector(state => state.auth);
    const [createResponseTicket, { isLoading: responseLoading }] = useCreateResponseTicketMutation();

    // Fetch the ticket data when the component mounts
    useEffect(() => {
        const fetchTickets = async () => {
            try {
                await getOneTicket(userInfo._id).unwrap();
            } catch (error) {
                toast.error('Failed to fetch ticket data. Please try again.');
            }
        };

        fetchTickets();
    }, [getOneTicket, userInfo._id]);

    const handleOpenDialog = (ticket) => {
        setSelectedTicket(ticket);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedTicket(null);
    };

    const handleReplySubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await createResponseTicket({
                id: selectedTicket._id,
                raw: {
                    content: reply,
                    userId: userInfo._id,
                },
            }).unwrap();

            // Append the new response
            setSelectedTicket((prev) => ({
                ...prev,
                responses: [...prev.responses, res],
            }));
            setReply('');
            toast.success('Reply sent successfully!');
        } catch (error) {
            console.log("Error submitting reply:", error);
            toast.error('Failed to send reply. Please try again.');
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching tickets.</div>;

    const getStatusIcon = (status) => {
        switch (status) {
            case 'open':
                return <FaExclamationCircle className="text-yellow-500" />;
            case 'closed':
                return <FaCheckCircle className="text-green-500" />;
            case 'pending':
                return <FaInfoCircle className="text-blue-500" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'open':
                return 'bg-yellow-100 border-yellow-400';
            case 'closed':
                return 'bg-green-100 border-green-400';
            case 'in-progress':
                return 'bg-blue-100 border-blue-400';
            default:
                return 'bg-gray-100 border-gray-300';
        }
    };

    return (
        <div className="min-h-screen flex items-start justify-start py-4 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-full w-full space-y-8 bg-white p-10 shadow-xl rounded-lg">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">My Tickets</h2>

                {tickets && tickets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tickets.map((ticket) => (
                            <div
                                key={ticket._id}
                                className={`border-l-4 rounded-md shadow mb-4 p-5 transition transform hover:shadow-lg ${getStatusColor(ticket.status)}`}
                            >
                                <div className="flex items-center mb-2">
                                    {getStatusIcon(ticket.status)}
                                    <h3 className="text-lg font-semibold ml-2">{ticket.title}</h3>
                                </div>
                                <p className="text-gray-700 mt-1 text-sm font-medium">{ticket?.description?.slice(0,20)}...</p>
                                <div className="mt-2">
                                    <p className="text-gray-500"><strong>Priority:</strong> {ticket.priority}</p>
                                    <p className="text-gray-500"><strong>Category:</strong> {ticket.category}</p>
                                    <p className={getStatusColor(ticket.status)}><strong>Status:</strong> {ticket.status}</p>
                                </div>
                                <button
                                    onClick={() => handleOpenDialog(ticket)}
                                    className="mt-4 inline-block text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded transition duration-200 ease-in-out"
                                >
                                    View Replies
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No tickets available.</p>
                )}

                {openDialog && selectedTicket && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white rounded-lg shadow-lg p-5 max-w-md w-full transition-opacity duration-300 ease-in-out opacity-100">
                            <h3 className="text-lg font-semibold">Replies for {selectedTicket.title}</h3>
                            <div className="overflow-y-auto max-h-60 mt-4">
                                {selectedTicket.responses && selectedTicket.responses.length > 0 ? (
                                    selectedTicket.responses.map((response) => (
                                        <div key={response._id} className="bg-gray-100 p-4 rounded-md mb-2 shadow-md">
                                            <div className="flex items-center mb-2">
                                                {/* Placeholder for user image */}
                                                <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-gray-600 mr-2">
                                                    {response?.respondedBy?.name.charAt(0)}
                                                </div>
                                                <p className="font-medium text-blue-600">{response?.respondedBy?.name}:</p>
                                            </div>
                                            <p>{response.content}</p>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Responded At: {new Date(response?.createdAt).toLocaleString()}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No replies yet.</p>
                                )}
                            </div>
                            <form onSubmit={handleReplySubmit} className="mt-4">
                                <textarea
                                    value={reply}
                                    onChange={(e) => setReply(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Type your reply here..."
                                    rows="3"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 ease-in-out"
                                    disabled={responseLoading}
                                >
                                    {responseLoading ? 'Sending...' : 'Send Reply'}
                                </button>
                            </form>
                            <button
                                onClick={handleCloseDialog}
                                className="mt-4 inline-block text-gray-700 hover:text-gray-900"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
