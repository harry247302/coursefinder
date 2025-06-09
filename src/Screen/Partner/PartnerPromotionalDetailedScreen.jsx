import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as pdfjs from 'pdfjs-dist';
import { useGetMyItemsMutation } from '../../slices/adminApiSlice';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PartnerPromotionalDetailedScreen = () => {
    const { id } = useParams();
    const [getMyItems] = useGetMyItemsMutation();
    const [items, setItems] = useState([]);
    const [activeTab, setActiveTab] = useState('TEMPLATE');
    const [loading, setLoading] = useState(true);
    const [pdfThumbnails, setPdfThumbnails] = useState({});

    const generatePDFThumbnail = async (pdfUrl, itemId) => {
        try {
            const loadingTask = pdfjs.getDocument(pdfUrl);
            const pdf = await loadingTask.promise;
            const page = await pdf.getPage(1);
            
            const scale = 1.5;
            const viewport = page.getViewport({ scale });
            
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            
            await page.render(renderContext).promise;
            
            setPdfThumbnails(prev => ({
                ...prev,
                [itemId]: canvas.toDataURL()
            }));
        } catch (error) {
            console.error('Error generating PDF thumbnail:', error);
            // Create a fallback thumbnail
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 200;
            canvas.height = 280;
            ctx.fillStyle = '#f3f4f6';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#6b7280';
            ctx.font = 'bold 24px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('PDF Preview', canvas.width/2, canvas.height/2);
            setPdfThumbnails(prev => ({
                ...prev,
                [itemId]: canvas.toDataURL()
            }));
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getMyItems(id).unwrap();
                setItems(result);
                
                // Generate thumbnails for all brochures
                result.forEach(item => {
                    if (item.type === 'BROUCHER' && item.broucher) {
                        generatePDFThumbnail(item.broucher, item._id);
                    }
                });
            } catch (error) {
                toast.error('Failed to fetch items');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [getMyItems, id]);

    const templates = items.filter(item => item.type === 'TEMPLATE');
    const brochures = items.filter(item => item.type === 'BROUCHER');

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
            {loading ? (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-10 h-10 border-3 border-gray-300 border-t-blue-500 rounded-full"
                    />
                </div>
            ) : (
                <>
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-gray-800 text-center mb-6"
                    >
                        Marketing Materials
                    </motion.h1>

                    <div className="flex justify-center mb-6">
                        <motion.div 
                            className="bg-white rounded-full p-1 shadow-md"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {['TEMPLATE', 'BROUCHER'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`relative px-5 py-2 text-sm font-medium bg-white rounded-full transition-all duration-300 ${
                                        activeTab === tab 
                                            ? 'text-white' 
                                            : 'text-gray-600 hover:text-gray-800'
                                    }`}
                                >
                                    {activeTab === tab && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-blue-500 rounded-full"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <span className="relative z-10">
                                        {tab === 'TEMPLATE' ? 'Templates' : 'Brochures'}
                                    </span>
                                </button>
                            ))}
                        </motion.div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                        >
                            {(activeTab === 'TEMPLATE' ? templates : brochures).map((item) => (
                                <motion.div
                                    key={item._id}
                                    variants={itemVariants}
                                    className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="p-3">
                                        <h3 className="text-sm font-medium text-gray-800 mb-2 truncate">
                                            {item.name}
                                        </h3>
                                        
                                        <div className="relative aspect-[16/10] rounded-md  bg-gray-100">
                                            {item.type === 'TEMPLATE' ? (
                                                <motion.img
                                                    src={item.template}
                                                    alt={item.name}
                                                    className="w-full h-[400px] object-cover"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            ) : (
                                                <motion.div
                                                    className="w-full h-full"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    {pdfThumbnails[item._id] ? (
                                                        <img
                                                            src={pdfThumbnails[item._id]}
                                                            alt={`${item.name} preview`}
                                                            className="w-full h-full object-contain"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                                            <motion.div
                                                                animate={{ rotate: 360 }}
                                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                                className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full"
                                                            />
                                                        </div>
                                                    )}
                                                </motion.div>
                                            )}
                                        </div>
                                        
                                        <motion.a
                                            href={item.type === 'TEMPLATE' ? item.template : item.broucher}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-2 flex items-center justify-center w-full px-3 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors duration-300"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <svg
                                                className="w-4 h-4 mr-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                                />
                                            </svg>
                                            Download
                                        </motion.a>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </>
            )}
        </div>
    );
};

export default PartnerPromotionalDetailedScreen;