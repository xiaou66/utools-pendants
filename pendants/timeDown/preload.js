const { parseSecondToTime } = require('../../utils/ToolsBox');
const _IpcRendererUtils = require('../../utils/IpcRendererUtils');
window.IpcRendererUtils = new _IpcRendererUtils()
window.parseSecondToTime = parseSecondToTime;
