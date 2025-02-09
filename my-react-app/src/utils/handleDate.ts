// filepath: /my-react-app/my-react-app/src/utils/handleDate.ts
export const getCurrentSessionDate = (currentDate: string, maxHourSession: number): string => {
    const date = new Date(currentDate);
    date.setHours(maxHourSession);
    return date.toISOString();
};