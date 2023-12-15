function formatDate(dateString) {
    console.log("dateString ", dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dateParts = dateString.split('-');
    const year = dateParts[0].slice(-2);
    const month = months[parseInt(dateParts[1]) - 1];
    const day = dateParts[2];

    return `${day} ${month}, ${year}`;
};

export default formatDate;