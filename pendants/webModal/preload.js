const _IpcRendererUtils = require('../../utils/IpcRendererUtils');
window.IpcRendererUtils = new _IpcRendererUtils({
    initCallback(data) {
        const { url, scrollPosition = undefined } = data;
        if (scrollPosition) {
            if (data.timeReloadValue) {
                window.timeReloadValue = data.timeReloadValue;
                document.querySelector('#timeReloadDialog input')
                    .value = data.timeReload;
                setTimeout(() => {
                    window.setTimeReload(window.timeReloadValue);
                }, 10 * 1000);
                delete data.timeReloadValue;
            }
            window.pendantsData = { ...data };
            if (window.pendantsData.saveName) {
                window.saveName = data.saveName;
                document.querySelector("#saveToListDialog input")
                    .value = data.saveName;
                delete window.pendantsData;
            }
        }
        console.log(data)
        if (url) {
            window.setUrl(url, data);
        } else {
            setTimeout(() => {
                window.enterInput();
            })
            window.IpcRendererUtils.winCenter(0, -180);
        }
    },
    windowCloseBefore() {
        if (window.pendantsData) {
            window.IpcRendererUtils.saveData(window.pendantsData);
        }
    }
});
window.winClose = () => {
    if (window.pendantsData) {
        window.IpcRendererUtils.saveData(window.pendantsData);
    }
    window.IpcRendererUtils.winClose();
}
