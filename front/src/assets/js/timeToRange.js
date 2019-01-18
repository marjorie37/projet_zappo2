
const setIntervalMinutes = int => Array(Math.ceil(60 / int)).fill().map((el, i, arr) => int * i);

const setIntervalHours = hourTab => Array(hourTab[1] - hourTab[0] + 1).fill().map((el, i) => hourTab[0] + i);

const hourToInt = time => time.split(':').map(parseFloat)[0];

const minuteToInt = time => time.split(':').map(parseFloat)[1];



const timeToRangeWithInterval = (t1, t2, timeInterval) => {
    if(!t1 || !t2) return [];
    return setIntervalHours([t1, t2].map(hourToInt)).map((el, i, arr) =>
        setIntervalMinutes(timeInterval).filter(el => {
            if (i === 0) return el >= [t1, t2].map(minuteToInt)[0];
            else if (arr.length - 1 === i) return el <= [t1, t2].map(minuteToInt)[1]
            else return el < 60
        }).map(e => `${el}:${String(e).padStart(2, "0")}`
        )
    )

}

export default timeToRangeWithInterval;