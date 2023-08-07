class DateConvert {
    getToday() {
        const today = new Date();
        const year = today.getFullYear();
        const dateLength = 2;
        const month = (today.getMonth() + 1)
            .toString()
            .padStart(dateLength, "0");
        const day = today.getDate().toString().padStart(dateLength, "0");
        return `${year}-${month}-${day}`;
    }
}

module.exports = new DateConvert();
