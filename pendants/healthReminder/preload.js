const _IpcRendererUtils = require('../../utils/IpcRendererUtils');
const UtoolsUtils = require('../../utils/UToolsUtils');
const { parseSecondToTime } = require('../../utils/ToolsBox.js');
window.IpcRendererUtils = new _IpcRendererUtils();
window.UtoolsUtils = UtoolsUtils;
window.parseSecondToTime = parseSecondToTime;
