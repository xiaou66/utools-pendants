const { intervalTime = 120, restIntervalTime = 5 } = window.UtoolsUtils.read('xiaou_05/data/setting');
const $intervalTime = $('#intervalTime');
const $restIntervalTime = $('#restTime');
$intervalTime.val(intervalTime);
$restIntervalTime.val(restIntervalTime);
function limitNumber() {
    this.value=this.value.replace(/\D/g,'');
    if (this.value.length > 2) {
        this.value = this.value.substring(2, 0);
    }
}
window.onbeforeunload = () => {
    const data = {
        intervalTime: $intervalTime.val(),
        restIntervalTime: $restIntervalTime.val()
    }
    window.UtoolsUtils.save('xiaou_05/data/setting', data)
    IpcRendererUtils.winClose();
}
