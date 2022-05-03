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
        ipcRenderer.on('init', (event, data) => {
            data = JSON.parse(data || "{}");
            console.log("init::", data);
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
                e.returnValue = false;
                this.winClose();
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
     * @param status 状态
     * @param offsetX
     * @param offsetY
     */
    swatchWindowMove(status, offsetX = 0, offsetY = 0) {
         this.sendMainMessage('control::move', {offsetX, offsetY, status})
    }

    /**
     * 保存数据一般在关闭窗口前调用
     * @param data
     */
     saveData(data) {
        this.sendMainMessage('data::saveData', data);
    }

    /**
     * 保存插件数据
     * @param key
     * @param data
     */
    saveDataContainWinInfo(key, data) {
         this.sendMainMessage('data::saveDataContainWinInfo', {key, data});
    }
    /**
     * 移除挂件数据 包含插件位置数据
     */
    removeData() {
         this.sendMainMessage('data::removeData')
    }


    /**
     * 对当前类型的窗口进行克隆
     * 非单例挂件使用
     */
     winClone() {
        this.sendMainMessage('control::clone');
    }
    /**
     * 移动窗体
     * @param selector 选择元素
     */
    winMove(selector) {
        const $selector = document.querySelector(selector);
        let move = false;
        let mouseX = 0;
        let mouseY = 0;
        $selector.onmousedown = (e) => {
            move = true;
            const { pageX, pageY } = e;
            mouseX = pageX;
            mouseY = pageY;
            this.swatchWindowMove('start');
        }
        $selector.onmousemove = (e) => {
            if (move) {
                const { pageX, pageY } = e;
                const offsetX = pageX - mouseX;
                const offsetY = pageY - mouseY;
                console.log(document.body.clientWidth, document.body.clientHeight)
                this.swatchWindowMove('move', offsetX, offsetY);
            }
        }
        const cancelMove = () => {
            if (move) {
                move = false;
                this.swatchWindowMove('end');
            }
        }
        $selector.onmouseup = () => cancelMove();
        $selector.onmouseleave = () => cancelMove();
        $selector.onmouseenter = () => cancelMove();
    }

    /**
     * 窗口居中
     * @param offsetX
     * @param offsetY
     */
    winCenter(offsetX = 0, offsetY = 0) {
        this.sendMainMessage('control:center', { offsetX, offsetY });
    }
    /**
     * 关闭窗口
     */
     winClose() {
        this.sendMainMessage('control::close');
    }
}
module.exports = IpcRendererUtils;
