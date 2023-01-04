//This helpers function is so we can use handlebars for various tasks such as format data, parse strings or perform calculations

//Need to Display a Date for the tech blog so we have times when the content was posted
module.exports = {
    format_date: (date) => {
        return date.toLocaleDataString();
    }
}
