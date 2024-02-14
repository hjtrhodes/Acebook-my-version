import { useEffect } from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        const handleCloseModal = (event) => {
            if (isOpen && event.target.classList.contains('modal-overlay')) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleCloseModal);
        }

        return () => {
            document.removeEventListener('click', handleCloseModal);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="modal-overlay fixed inset-0 bg-gray-900 opacity-50"></div>
            <div className="modal-content bg-white rounded-lg shadow-lg p-6 relative">
                <button className="modal-close-btn absolute top-0 right-0 m-4 text-gray-600" onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;

