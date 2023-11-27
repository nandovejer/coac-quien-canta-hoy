import React from 'react';

const ScrollToTop: React.FC = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Esta línea asegura que el scroll sea suave
        });
    };

    return (
        <button onClick={scrollToTop} className="fixed bottom-10 right-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-200 ease-in-out">
            Ir Arriba
        </button>
    );
};

export default ScrollToTop;
