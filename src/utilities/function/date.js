import dayjs from "dayjs";

export const dateToHuman = (date) => {
    return dayjs(date).format('YYYY-MM-DD | H:m')
}