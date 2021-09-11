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
})
function clearSetTime() {
    setTimeModal.hide();
    time.show();
    document.querySelectorAll('input').forEach(item => {
        item.value = '';
    });
}
$('#setTimeCancelButton').on('click', clearSetTime)
$('#setTimeOkButton').on('click', () => {
    const hr = $('#hr').val();
    const minute = $('#minute').val();
    const second = $('#second').val();
    targetTime = moment().add(hr, 'h').add(minute, 'm').add(second, 's');
    setTimeDown();
    clearSetTime()
    if (timer) {
        clearInterval(timer);
    }
    timer = setInterval(setTimeDown, 1000);
})
$('#second').keydown((event) => {
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
    time.text(window.parseSecondToTime(diff));
}
