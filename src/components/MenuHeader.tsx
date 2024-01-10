interface MenuHeaderProps {
    menuData: {
        liveUrl: string;
        lastDateSession: string;
    };
}


const MenuHeader = ({ menuData: { liveUrl, lastDateSession } }: MenuHeaderProps) => {

    const classNameLinksMenu = "flex flex-col justify-center items-center font-medium px-2 py-2 md:px-5 md:py-2  text-center w-1/3 max-w-xs hover:bg-gradient-to-r from-blue-500  to-blue-400";


    return (
        <>
            <div className="flex justify-center items-center shadow-lg w-full z-10  text-white bg-gray-800 fixed bottom-0">
                <a target='_blank' href={liveUrl} className={classNameLinksMenu} rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                    </svg> <span className="text-xs md:text-sm"> Ver en Directo</span>
                </a>

                <a href={"#" + lastDateSession} className={classNameLinksMenu} title={`Última Sesión ` + lastDateSession}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                    </svg> <span className="text-xs md:text-sm">Sesión hoy</span>

                </a>
                <a title="Buscar Autor en la web" href="#searchAuthor" className={classNameLinksMenu}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <span className="text-xs md:text-sm">Buscar</span>
                </a>
            </div>
        </>
    );

};

export default MenuHeader;
