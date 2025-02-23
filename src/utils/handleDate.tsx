function getCurrentSessionDate(minTime: any, maxTime: any) {
    // Convert the times to date objects
    const now = new Date();
    const minDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...minTime.split(':'));
    const maxDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), ...maxTime.split(':'));
    let resultDate;

    // Adjust the maximum date to the next day if it is before the minimum date
    if (maxDate < minDate) {
        maxDate.setDate(maxDate.getDate() + 1);
    }

    // If the current time is before the maximum date, use the date of the previous day
    now < maxDate
        ? resultDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
        : resultDate = now;


    // Format the date in dd/mm/yyyy style
    return resultDate.toLocaleDateString('es', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatDateString(date: string) {
    return date.replace(/\\/g, '-');
}


// Parse Date ===> dd//mm/yyyy
function parseDate(dateString: string) {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
}



// formatDateDDmmYYYY(new Date());
function formatDateDDmmYYYY(_date: { getDate: () => unknown; getMonth: () => number; getFullYear: () => unknown; }) {
    const dd = String(_date.getDate()).padStart(2, '0');
    const mm = String(_date.getMonth() + 1).padStart(2, '0');
    const yyyy = _date.getFullYear();

    return `${dd}/${mm}/${yyyy}`;
}



function dateFullFormat(strDate: string): string {
    const parts: string[] = strDate.split('/');
    if (parts.length !== 3) {
        throw new Error('Formato de fecha inválido');
    }

    const [day, month, year]: number[] = parts.map(Number);
    const date: Date = new Date(year, month - 1, day);

    if (isNaN(date.getTime())) {
        throw new Error('Fecha inválida');
    }

    const opt: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return date.toLocaleDateString('es-ES', opt);
    // output: jueves, 23 de enero de 2025
}





export { getCurrentSessionDate, formatDateString, formatDateDDmmYYYY, parseDate, dateFullFormat };