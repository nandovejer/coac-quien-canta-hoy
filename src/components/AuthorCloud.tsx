import React from 'react';
interface Grupo {
    tipo: string;
    nombre: string;
    autor: string;
    id: string;
}

interface JsonData {
    [key: string]: Grupo[];
}
interface AuthorCloudProps {
    data: JsonData;
}

const AuthorCloud: React.FC<AuthorCloudProps> = ({ data }) => {
    // Extraer todos los autores de los datos
    const autores = Object.values(data).flat().map(grupo => ({
        autor: grupo.autor,
        id: grupo.id
    }));

    return (
        <aside className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-lg font-semibold mb-4 text-center">Autores</h2>
            <div className="max-w-6xl flex flex-wrap gap-2 m-auto" role="list">
                {Object.entries(data).map(([fecha, grupos]) =>
                    grupos.map((grupo, index) => (
                        grupo.autor
                            ? <a
                                key={index}
                                href={`#${grupo.id}`}
                                title={`Canta su ${grupo.tipo} el ${fecha}`}
                                className="bg-blue-200 hover:bg-blue-300 py-1 px-2 rounded-lg text-sm"
                            >
                                {grupo.autor}
                            </a>
                            : ''
                    ))
                )}
            </div>
        </aside>
    );
};

export default AuthorCloud;
