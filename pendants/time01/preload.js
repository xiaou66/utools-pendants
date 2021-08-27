const _IpcRendererUtils = require('../../utils/IpcRendererUtils');
window.IpcRendererUtils = new _IpcRendererUtils({
    windowCloseBefore: function () {
       this.saveData();
    }
})
