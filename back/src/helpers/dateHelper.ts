import moment from "moment-business-days";

const ChristmasDay = '12-25-2024';
const IndependenceDay = '07-04-2024'

moment.updateLocale('us', {
    holidays: [ChristmasDay, IndependenceDay],
    holidayFormat: 'MM-DD-YYYY'
});

const parseStringToDate = (date: string) : string => {
    //TODO: PARSE TO America/Los_Angeles TIMEZONE
    return moment(date).format("MM-DD-YYYY");
}

const isHoliday = (date: string) : Boolean => {
    return moment(date).isHoliday();
}

export {
    parseStringToDate,
    isHoliday
}