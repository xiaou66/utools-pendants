const _IpcRendererUtils = require('../../utils/IpcRendererUtils');
console.log('1111')
window.IpcRendererUtils = new _IpcRendererUtils({
    windowCloseBefore:  () => {
        window.IpcRendererUtils.saveData();
    }
});
