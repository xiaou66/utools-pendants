const _IpcRendererUtils = require('../../utils/IpcRendererUtils');
const UToolsUtils = require('../../utils/UToolsUtils.js');
window.IpcRendererUtils = new _IpcRendererUtils({
    initCallback: (data) => {
        console.log(data);
        if (data.time) {
            try {
               setTimeout(() => {
                   window.startTime(parseInt(data.time))
               }, 500)
            }catch (e) {
                console.log(e);
                utools.showNotification("时间格式化失败");
            }
        }
    },
    windowCloseBefore:  () => {
        const time = window.getTime();
        if (time) {
            UToolsUtils.save("xiaou_04/timeListLastTime", time);
        }else {
            utools.db.remove("xiaou_04/timeListLastTime")
        }
        window.IpcRendererUtils.saveData();
    }
});
