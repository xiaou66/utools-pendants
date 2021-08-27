const _IpcRendererUtils = require('../../utils/IpcRendererUtils');
// 主窗体的 ID
window.IpcRendererUtils = new _IpcRendererUtils({
    initCallback: (data) => {
        setTimeout(() => {
            window.initData(data)
        }, 500)
        console.log(data)
    },
    windowCloseBefore: function () {
        this.removeData();
    }
});
window.winClose = (saveData = true) => {
    if (saveData) {
        window.saveData(window.getData());
    }
    IpcRendererUtils.winClose();
}

window.saveData = (value) => {
    IpcRendererUtils.saveData(value);
}
