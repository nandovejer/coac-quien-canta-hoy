import React from 'react';

interface AuthorCloudGrupo {
    tipo: string;
    nombre: string;
    autor: string;
    id?: string;
}


interface AuthorCloudData {
    [key: string]: AuthorCloudGrupo[];
}

interface AuthorCloudProps {
    AuthorCloudData: AuthorCloudData;
}

const AuthorCloud: React.FC<AuthorCloudProps> = ({ AuthorCloudData }) => {
    return (
        <aside className="bg-white p-6 rounded-lg shadow-lg w-full">l4
            <h2 className="text-lg font-semibold mb-4 text-center">Autores</h2>
            <div className="max-w-6xl flex flex-wrap gap-2 m-auto" role="list">
                {Object.entries(AuthorCloudData).map(([fecha, grupos], fechaIndex) =>
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

export default AuthorCloud;
