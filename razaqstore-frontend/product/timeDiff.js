
export const timeDiff = (createdAt)=>{
    const oldDate = new Date(createdAt)
    const curDate = new Date(Date.now())
    
    const diffYear = oldDate.getFullYear() - curDate.getFullYear()
    const diffMonth = oldDate.getMonth() - curDate.getMonth()
    const diffDay = oldDate.getDay() - curDate.getDay()
    const diffHours = oldDate.getHours() - curDate.getHours()
    const diffMinutes = oldDate.getMinutes() - curDate.getMinutes()
    const diffSeconds = oldDate.getSeconds() - curDate.getSeconds()

    console.log(diffYear)
    console.log(diffMonth)
    console.log(diffDay)
    console.log(diffHours)
    console.log(diffMinutes)
    console.log(diffSeconds)
    
    return {diffYear, diffMonth, diffDay, diffHours, diffMinutes, diffSeconds}
}