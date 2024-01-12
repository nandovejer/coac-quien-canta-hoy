interface MenuHeaderProps {
    menuData: {
        liveUrl: string;
        lastDateSession: string;
    };
}

import {
    classNameBoxActive,
    classNameGradient,
    classNameGradientHight,
    classNameGradientDisable
} from "../data/ConstantsCoac2024";

const MenuHeader = ({ menuData: { liveUrl, lastDateSession } }: MenuHeaderProps) => {

    const baseClasses = "flex justify-center font-medium px-2 py-2 md:px-5 md:py-2 text-black text-gray-800 border-gray-200 text-ellipsis overflow-hidden text-center w-1/3";
    const classNameLinksMenu = `${baseClasses} hover:text-white hover:` + classNameGradientHight;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <div className="flex justify-center items-center shadow-lg w-full bg-white sticky top-0 max-w-6xl mx-auto">
                <a target='_blank' href={liveUrl} className={classNameLinksMenu} rel="noopener noreferrer">
                    Ver en Directo
                </a>

                <a href={"#" + lastDateSession} className={classNameLinksMenu} title={`Última Sesión ` + lastDateSession}>
                    Última Sesión
                </a>
                <button role='link' onClick={scrollToTop} className={classNameLinksMenu}>
                    Ir Arriba
                </button>
            </div>
        </>
    );

};

export default MenuHeader;
