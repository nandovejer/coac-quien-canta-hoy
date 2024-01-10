interface MenuHeaderProps {
    menuData: {
        liveUrl: string;
        lastDateSession: string;
    };
}

const MenuHeader = ({ menuData: { liveUrl, lastDateSession } }: MenuHeaderProps) => {

    const scrollToTop = () => {

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <div className="flex justify-center items-center shadow-lg w-full bg-white sticky top-0 max-w-6xl mx-auto">
                <a target='_BLANK' href={liveUrl} 
                    className="flex justify-center font-medium px-2 py-2 md:px-5 md:py-2 bg-white text-gray-800 border-gray-200 hover:bg-rose-700 hover:text-white text-ellipsis overflow-hidden text-center w-1/3">
                    Ver en Directo
                </a>

                <a href={"#" + lastDateSession} className="flex justify-center font-medium px-2 py-2 md:px-5 md:py-2 bg-white text-gray-800 border-gray-200 hover:bg-rose-700 hover:text-white text-ellipsis overflow-hidden text-center w-1/3" title={`Última Sesión ` + lastDateSession}>
                    Última Sesión
                </a>
                <button role='link' onClick={scrollToTop} className="flex justify-center font-medium px-2 py-2 md:px-5 md:py-2 bg-white text-gray-800 border-gray-200 hover:bg-rose-700 hover:text-white text-ellipsis overflow-hidden text-center w-1/3">
                    Ir Arriba
                </button>
            </div>
        </>
    );
};

export default MenuHeader;
