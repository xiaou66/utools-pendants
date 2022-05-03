const _IpcRendererUtils = require('../../utils/IpcRendererUtils');
window.UtoolsUtils = require('../../utils/UToolsUtils');
window.fontList = require('font-list');
// 主窗体的 ID
window.IpcRendererUtils = new _IpcRendererUtils({
    initCallback: (data) => {
        setTimeout(() => {
            if (window.initData) {
                window.initData(data)
            }
        }, 500)
        console.log(data)
    },
    windowCloseBefore: function () {
        // window.IpcRendererUtils.removeData();
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
