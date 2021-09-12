const { ipcRenderer } = require('electron');
class IpcRendererUtils {
    mainId;

    /**
     * 构造方法
     * @param initCallback 初始化回调函数
     * @param themeCallback 设置主题回调函数
     * @param windowCloseBefore 窗口关闭前不提供不绑定
     */
    constructor({initCallback = undefined, themeCallback = undefined, windowCloseBefore = undefined} = {}) {
        debugger;
        ipcRenderer.on('init', (event, data) => {
            data = JSON.parse(data || "{}");
            this.mainId = event.senderId;
            if (initCallback) {
                initCallback(data)
            }
        });
        ipcRenderer.on('setTheme', (event, data) => {
            debugger;
            const theme =  JSON.parse(data);
            if (themeCallback) {
                themeCallback(theme)
            }
            setTimeout(() => {
                if (window.setThemeFile) {
                    window.setThemeFile(theme.file)
                }
            });
        })
        if (windowCloseBefore) {
            window.onbeforeunload = (e) => {
                windowCloseBefore();
            }
        }

    }
    /**
     * 发送信息到主窗口
     * @param messageId
     * @param data
     */
    sendMainMessage(messageId, data = {}) {
        ipcRenderer.sendTo(this.mainId, messageId, JSON.stringify(data));
    }
    /**
     * 切换是否全屏
     * @param status 如果留空就取反 [可选][boolean]
     */
     swatchFullScreen(status) {
        this.sendMainMessage("control::setFullScreen", { status })
    }
    /**
     * 切换是否置顶
     * @param status 如果留空就取反 [可选][boolean]
     */
     swatchAlwaysOnTop(status) {
        this.sendMainMessage('control::setAlwaysOnTop', { status })
    }

    /**
     * 设置窗口大小
     * @param width 宽度
     * @param height 高度
     */
     setSize(width, height) {
        this.sendMainMessage('control::resize', {width, height});
    }

    /**
     * 设置窗口位置
     * @param x
     * @param y
     */
     setPosition(x, y) {
        this.sendMainMessage('control::setPosition', {x, y});
    }

    /**
     * 保存数据一般在关闭窗口前调用
     * @param data
     */
     saveData(data) {
        this.sendMainMessage('data::saveData', data);
    }

    /**
     * 移除挂件数据 包含插件位置数据
     */
    removeData() {
         this.sendMainMessage('data:removeData')
    }

    /**
     * 对当前类型的窗口进行克隆
     * 非单例挂件使用
     */
     winClone() {
        this.sendMainMessage('control::clone');
    }

    /**
     * 关闭窗口
     */
     winClose() {
        this.sendMainMessage('control::close');
    }
}
module.exports = IpcRendererUtils;
