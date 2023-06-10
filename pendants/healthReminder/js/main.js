import { parseSecondToTime } from '../../../utils/ToolsBox.js';
let targetTime;
let time1;
let time2;
let confirm = $('#confirm');
const { intervalTime = 120, restIntervalTime = 5 } = UtoolsUtils.read('xiaou_05/data/setting');
utools.showNotification(`当前设置\n休息间隔「${intervalTime}」分钟\n休息时长「${restIntervalTime}」分钟`);
window.nextTargetTime = () => {
    targetTime = moment().add(intervalTime, 'minute');
}
nextTargetTime();
function confirmHandler() {
    utools.showNotification("休息时间到，请到主屏幕确认是否需要休息");
    IpcRendererUtils.setSize(200, 80);
    confirm.show();
    const x = utools.getPrimaryDisplay().size.width / 2 - 100;
    const y = 10;
    IpcRendererUtils.setPosition(x, y)
    IpcRendererUtils.swatchAlwaysOnTop({status: true});
}
function restTime() {
    IpcRendererUtils.swatchFullScreen();
    $('body').css("background-color", '#343a40');
    $('#restContent').show();
    targetTime = moment().add(restIntervalTime, 'minute');
    time2 = setInterval(() => {
        const diff = targetTime.diff(moment(), 'second');
        if( diff < 0) {
            IpcRendererUtils.setSize(0, 0);
            nextTargetTime();
            $('#restContent').hide();
            confirm.hide();
            time1 = setInterval(startTime, 1000)
            $('body').css("background-color", 'rgba(0,0,0,0)');
            clearInterval(time2);
            return;
        }
        $('#time').text(parseSecondToTime(diff))
        console.log('rest', diff);
    }, 1000)
}
$('#rest').on('click', () => {
    restTime();
    confirm.hide();
})
$('#giveUp').on('click', () => {
    confirm.hide();
    nextTargetTime();
    time1 = setInterval(startTime, 1000);
})
$('#close').on('click', () => {
    IpcRendererUtils.setSize(0, 0);
    nextTargetTime();
    $('#restContent').hide();
    confirm.hide();
    time1 = setInterval(startTime, 1000)
    $('body').css("background-color", 'rgba(0,0,0,0)');
    clearInterval(time2);
})
function startTime() {
    const diff = targetTime.diff(moment(), 'second');
    if( diff < 0) {
        confirmHandler();
        clearInterval(time1);
        return;
    }
    console.log(diff)
}
time1 = setInterval(startTime, 1000)
