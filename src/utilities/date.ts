

export const getDateFormat = (date: any)=> {
    let d = new Date(date);
    return d.getFullYear() 
    + '-' +
    (d.getMonth() > 8 ? d.getMonth() + 1 : '0'+(d.getMonth() + 1))
    + '-' +
    (d.getDate() > 9 ? d.getDate() : '0'+d.getDate());
}

export const getDateFormatDateAndTime = (date: any) => {
    let d = new Date(date);
    return getDateFormat(date) 
        + ' '+
        (d.getHours() > 9 ? d.getHours() : '0'+d.getHours())
        + ':' +
        (d.getMinutes() > 9 ? d.getMinutes() : '0'+d.getMinutes());

}