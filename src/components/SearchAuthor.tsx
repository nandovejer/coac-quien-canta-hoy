import React, { useState } from 'react';

interface SearchAuthorGrupo {
    tipo: string;
    nombre: string;
    autor: string;
    id?: string;
}

interface SearchAuthorData {
    [key: string]: SearchAuthorGrupo[];
}

interface SearchAuthorProps {
    SearchAuthorData: SearchAuthorData;
}

const SearchAuthor: React.FC<SearchAuthorProps> = ({ SearchAuthorData }) => {
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar grupos en base al término de búsqueda
    const filteredGroups = Object.entries(SearchAuthorData).reduce((acc, [fecha, grupos]) => {
        const filtered = grupos.filter(grupo => grupo.autor.toLowerCase().includes(searchTerm.toLowerCase()));
        if (filtered.length) acc[fecha] = filtered;
        return acc;
    }, {} as SearchAuthorData);

    return (
        <aside className="bg-white p-6 rounded-lg shadow-lg w-full flex flex-col ">
            <h2 className="text-2xl md:text-3xl font-extrabold leading-tighter tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400  text-center">Busca el autor/a destacado/a</h2>

            <input
                type="text"
                placeholder="Filtra por autor..."
                className="w-full border h-12 shadow mb-4 p-2 rounded max-w-6xl m-auto"
                onChange={e => setSearchTerm(e.target.value)}
            />

            <div className="max-w-6xl flex flex-wrap gap-2 m-auto" role="list">
                {Object.entries(filteredGroups).map(([fecha, grupos], fechaIndex) =>
                    grupos.map((grupo, grupoIndex) => (
                        grupo.autor
                            ? <a
                                key={`${fechaIndex}-${grupoIndex}`} // Mejora para la clave única
                                href={`#${grupo.id}`}
                                title={`Canta su ${grupo.tipo} el ${fecha}`}
                                className="bg-blue-200 hover:bg-blue-300 py-1 px-2 rounded-lg text-sm"
                            >
                                {grupo.autor}
                            </a>
                            : null
                    ))
                )}
            </div>
        </aside>
    );
};

export default SearchAuthor;
