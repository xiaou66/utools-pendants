/**
 * 将秒数转换为时间字符串 hh:mm:ss
 * @return {string}
 */
function parseSecondToTime(data) {
    const time = Number(data);
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = parseInt(time % 3600) % 60;
    const hh = h < 10 ? "0" + h : h;
    const mm = m < 10 ? "0" + m : m;
    const ss = s < 10 ? "0" + s : s;
    return hh + ":" + mm + ":" + ss;
}
module.exports = {
    parseSecondToTime,
}
