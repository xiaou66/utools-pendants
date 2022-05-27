const { getMemoryInfo, getCpuInfo } = require('../../utils/OsUtils');
const _IpcRendererUtils = require('../../utils/IpcRendererUtils');
window.IpcRendererUtils = new _IpcRendererUtils({
  windowCloseBefore: () => {
    window.IpcRendererUtils.winClose();
  }
});
window.getMemoryInfo = getMemoryInfo;
window.getCpuInfo = getCpuInfo;
