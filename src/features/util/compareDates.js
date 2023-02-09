export const compareDates = (dueDate) => {
    if (!dueDate) return false;
    return dueDate.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
};
