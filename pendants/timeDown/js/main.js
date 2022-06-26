import { parseSecondToTime } from '../../../utils/ToolsBox.js';
let targetTime = '未设置';
function limitNumber() {
    this.value=this.value.replace(/\D/g,'');
    if (this.value.length > 2) {
        this.value = this.value.substring(2, 0);
    }
}
document.querySelectorAll('input').forEach(item => {
    item.onkeyup = limitNumber;
});
const setTimeModal = $('#setTimeModal');
const time = $('#time');
let timer = undefined;
$('#hr').focus();
$('#setTime').on('click', () => {
    time.hide();
    setTimeModal.show();
    if (typeof targetTime !== 'string') {
        const diff = targetTime.diff(moment(), 'seconds');
        if (diff <= 0) {
            time.text('时间到');
        } else {
            const times = parseSecondToTime(diff).split(":");
            if (times && times.length === 3) {
                $('#hr').val(times[0]);
                $('#minute').val(times[1]);
                $('#second').val(times[2]);
            }
        }
        timer && clearInterval(timer);
     }
})
function clearSetTime() {
    setTimeModal.hide();
    time.show();
    document.querySelectorAll('input').forEach(item => {
        item.value = '';
    });
    timer && clearInterval(timer);
    timer = undefined;
}
$('#setTimeCancelButton').on('click', clearSetTime)
window.startTime = (second) => {
    targetTime = moment().add(second, 's');
    setTimeDown();
    clearSetTime();
    timer = setInterval(setTimeDown, 900);
}
window.getTime = () => {
    if (time.text() !== '时间到') {
        return time.text();
    }
    return 0;
}
$('#setTimeOkButton').on('click', () => {
    const hr = $('#hr').val();
    const minute = $('#minute').val();
    const second = $('#second').val();
    targetTime = moment().add(hr, 'h').add(minute, 'm').add(second, 's');
    setTimeDown();
    clearSetTime();
    timer = setInterval(setTimeDown, 900);
})
$('#second,#minute,#hr').keydown((event) => {
    if (event.keyCode === 13) {
        $('#setTimeOkButton').click();
    }
})
function setTimeDown() {
    const diff = targetTime.diff(moment(), 'seconds');
    if (diff <= 0) {
        clearInterval(timer);
        timer = undefined;
        time.text('时间到');
        utools.showNotification('时间到');
        return;
    }
    console.log(window);
    time.text(parseSecondToTime(diff));
}
