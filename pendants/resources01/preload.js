const { getMemoryInfo, getCpuInfo } = require('../../utils/OsUtils');
const _IpcRendererUtils = require('../../utils/IpcRendererUtils');
window.IpcRendererUtils = new _IpcRendererUtils();
window.getMemoryInfo = getMemoryInfo;
window.getCpuInfo = getCpuInfo;
