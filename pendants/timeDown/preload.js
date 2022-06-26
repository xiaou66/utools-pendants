const _IpcRendererUtils = require('../../utils/IpcRendererUtils');
window.IpcRendererUtils = new _IpcRendererUtils({
    initCallback: (data) => {
        console.log(data);
        if (data.time) {
            try {
                debugger
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
        window.IpcRendererUtils.saveData();
    }
});
