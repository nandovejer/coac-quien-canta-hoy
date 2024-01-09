interface MenuHeaderProps {
    menuData: {
        liveUrl: string;
        lastDateSession: string;
    };
}



const MenuHeader = ({ menuData: { liveUrl, lastDateSession } }: MenuHeaderProps) => {

    const classNameLinksMenu = "flex flex-col justify-center items-center font-medium px-2 py-2 md:px-5 md:py-2  text-gray-800 text-center w-1/3 hover:text-white hover:bg-rose-700";

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <div className="flex justify-center items-center shadow-lg w-full z-10 bg-slate-50 sticky top-0 max-w-6xl mx-auto">
                <a target='_blank' href={liveUrl} className={classNameLinksMenu} rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                    </svg> <span className="text-xs md:text-sm"> Ver en Directo</span>
                </a>

                <a href={"#" + lastDateSession} className={classNameLinksMenu} title={`Última Sesión ` + lastDateSession}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                    </svg> <span className="text-xs md:text-sm">Sesión hoy</span>
                    
                </a>
                <button role='link' onClick={scrollToTop} className={classNameLinksMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 9 6-6m0 0 6 6m-6-6v12a6 6 0 0 1-12 0v-3" />
                    </svg><span className="text-xs md:text-sm">Ir Arriba</span>
                    
                </button>
            </div>
        </>
    );

};

export default MenuHeader;
