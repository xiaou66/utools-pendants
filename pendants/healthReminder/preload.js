const _IpcRendererUtils = require('../../utils/IpcRendererUtils');
const UtoolsUtils = require('../../utils/UToolsUtils');
window.IpcRendererUtils = new _IpcRendererUtils({
  windowCloseBefore: () => {
    utools.showNotification("健康提醒关闭了🎉");
    window.IpcRendererUtils.winClose();
  }
});
window.UtoolsUtils = UtoolsUtils;
