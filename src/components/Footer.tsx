import Modal from "./Modal";
import { useState } from "react";

const Footer = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <footer className="text-center p-4 text-base-content bg-slate-50 pb-24">
            <button
                className="m-4 px-6 py-2 bg-blue-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => setIsModalOpen(true)}
            >
                Soy Escueliter o quiero serlo
            </button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-xl font-bold">Modal Content</h2>
                <p>This is an example of modal content.</p>
            </Modal>
            <aside>
                <p> Creado por <a className="text-blue-700 underline  " aria-label='author' href="https://twitter.com/nandovejer">Nando Muñoz</a> y bajo  <a className="text-blue-700 underline  " href="https://es.wikipedia.org/wiki/MIT_License">Licencia MIT</a>.</p>
            </aside>
        </footer>
    );
}

export default Footer;