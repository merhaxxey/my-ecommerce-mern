import dayjs from 'dayjs'

export const getRemainingTimeUntilMsTimeStamp = (timestampMs)=>{
    const timestampDayjs = dayjs(timestampMs)
    const nowDayjs = dayjs()
    if(timestampDayjs.isBefore(nowDayjs)){
        return {
            seconds: '00',
            minutes: '00',
            hours: '00'
        }
    }
    return {
        seconds: getRemainingSeconds(nowDayjs, timestampDayjs),
        minutes: getRemainingMinutes(nowDayjs, timestampDayjs),
        hours: getRemainingHours(nowDayjs, timestampDayjs)
    }
}
const getRemainingSeconds = (nowDayjs, timestampDayjs)=>{
    const seconds = timestampDayjs.diff(nowDayjs, 'seconds') % 60
    return padWithZero(seconds, 2)
}
const getRemainingMinutes = (nowDayjs, timestampDayjs)=>{
    const minutes = timestampDayjs.diff(nowDayjs, 'minutes') % 60
    return padWithZero(minutes, 2)
}
const getRemainingHours = (nowDayjs, timestampDayjs)=>{
    const hours = timestampDayjs.diff(nowDayjs, 'hours') % 24
    return padWithZero(hours, 2)
}

const padWithZero = (number, minlength)=>{
    const numberString = number.toString()
    if(numberString.length >= minlength) return numberString

    return "0".repeat(minlength - numberString.length) + numberString
}