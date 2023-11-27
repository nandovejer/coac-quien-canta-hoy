interface Grupo {
    tipo: string;
    nombre: string;
    autor: string;
    id?: string; // La propiedad id es opcional en la entrada, pero será añadida en la salida
  }
  
  interface JsonData {
    [key: string]: Grupo[]; // Un objeto con claves de tipo string y valores que son arrays de Grupo
  }
function appData(jsonData: JsonData): JsonData {
    const transformedData: JsonData = {};
  
    for (const date in jsonData) {
      if (Object.prototype.hasOwnProperty.call(jsonData, date)) {
        transformedData[date] = jsonData[date].map(item => {
          const id = item.autor ? `author2024${item.autor.replace(/[^a-zA-Z0-9]+/g, '').toLowerCase()}` : '';
          return { ...item, id };
        });
      }
    }
  
    return transformedData;
  }
  

  export default appData;