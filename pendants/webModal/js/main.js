import { setTipsConfig } from '../../../utils/ToolsBox.js';
import { useragentDict, winSizePreinstall } from './data.js';
import '../../../utils/UToolsUtils.js';

window.IpcRendererUtils.winMove('#tool');
const $enter = document.getElementById('enter');
const $web = document.getElementById('web');
const $tool = document.getElementById('tool');
let $webview = undefined;
let timeReloadTimer;
window.setTimeReload = (time) => {
    if (timeReloadTimer) {
        clearInterval(timeReloadTimer);
    }
    window.timeReloadValue = time;
    if ($webview) {
        timeReloadTimer = setInterval(() => {
            $webview.reloadIgnoringCache();
        }, window.timeReloadValue * 1000);
        return true;
    }
    return false;
}
// language=CSS
const baseCss = `
    body::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        background: rgba(0,0,0,.1);
    }
    body::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
        border-radius: 3px;
        background: rgba(0,0,0,.4);
    }
    body::-webkit-scrollbar {
        width: 8px;
        height: 8px;
    }
`
// language=js
const baseJs = `
    let move = false;
    document.addEventListener('keydown', (e) => {
        console.log(e);
    if (e.ctrlKey) {
        if (e.shiftKey) {
            switch (e.keyCode) {
                case 83:
                    const top = document.documentElement.scrollTop;
                    const left = document.documentElement.scrollLeft
                    const data = {top, left};
                    console.log('xiaou::webModal::saveToList|' + JSON.stringify(data));
                    break;
            }
            return;
        }
        switch (e.key) {
            case 'w':
                console.log('xiaou::webModal::close');
                break;
            case 'q':
                if (move) {
                    move = false;
                    console.log("xiaou::webModal::stopMove");
                    return;
                }
                console.log("xiaou::webModal::startMove");
                move = true;
                break;
            case 'r':
                console.log("xiaou::webModal::reload");
                break;
            case 's':
                const top = document.documentElement.scrollTop;
                const left = document.documentElement.scrollLeft
                const data = {top, left};
                console.log('xiaou::webModal::saveData|' + JSON.stringify(data));
                break;
            case 'Tab':
                console.log('xiaou::webModal::switchTool')
                break;
        }
    }
})`


function stop(e) {
    e.preventDefault();
    e.stopPropagation();
}
document.onkeydown = (e) => {
    console.log(e);
}
window.createWebView = (url, {
    scrollPosition = undefined, useragent = '',
    width = 800, height = 600 } = {}) => {
    window.useragent = useragent;
    $enter.style.display = 'none';
    $web.style.display = 'block';
    $webview = document.createElement('webview');
    pxmu.loading({
        msg: '正在加载',
        bg: 'rgba(0, 0, 0, 0.65)',
        color: '#fff',
        animation: 'fade',
        close: false,
        inscroll: false,
        inscrollbg : 'rgba(0, 0, 0, 0.45)',
    });
    $webview.addEventListener('dom-ready', () => {
        pxmu.closeload();
        $webview.insertCSS(baseCss);
        // $webview.openDevTools();
        $webview.executeJavaScript(baseJs);
        if (scrollPosition) {
            const { top, left } = scrollPosition;
            // language=js
            const js = `
               setTimeout(() => {
                   document.documentElement.scrollTop = ${top};
                   document.documentElement.scrollLeft = ${left};
               }, 500);
            `;
            $webview.executeJavaScript(js.toString());
        }
    });
    $webview.addEventListener('console-message', (e) => {
        switch (e.message) {
            case 'xiaou::webModal::close':
                window.winClose();
                return;
            case 'xiaou::webModal::startMove':
                document.getElementById('cover').style.display = 'block';
                return;
            case 'xiaou::webModal::stopMove':
                document.getElementById('cover').style.display = 'none';
                return;
            case 'xiaou::webModal::reload':
                $webview.reloadIgnoringCache();
                return;
            case 'xiaou::webModal::switchTool':
                if ($tool.style.display === 'none') {
                    $tool.style.display = 'flex';
                    return;
                }
                $tool.style.display = 'none';
                return;
        }
        if (e.message.startsWith('xiaou::webModal::saveData')) {
            const data = JSON.parse(e.message.replace('xiaou::webModal::saveData|', ''));
            const alwaysTopStatus = eval(document.getElementById('alwaysTop').dataset.status);
            const url = $webview.src;
            window.IpcRendererUtils.saveData({ scrollPosition: data, alwaysTopStatus, url, useragent: window.useragent });
            pxmu.toast({
                msg: '保存成功',
                time: 1500,
                animation: 'slidedown',
                location: 'bottom',
                type: 'pc',
                status: 'success'
            });
        }else if (e.message.startsWith('xiaou::webModal::saveToList')) {
            debugger;
            const data = JSON.parse(e.message.replace('xiaou::webModal::saveToList|', ''));
            const alwaysTopStatus = eval(document.getElementById('alwaysTop').dataset.status);
            const url = $webview.src;
            document.getElementById('saveToListDialog').show().setParams({
                title: '设置保存名称',
                buttons: [
                    {
                        value: '保存',
                        events: (e) => {
                            console.log(e);
                            const saveName = document.querySelector('#saveToListDialog input').value;
                            console.log(saveName);
                            if (!saveName) {
                                pxmu.toast({
                                    msg: '请输入保存名称',
                                    time: 1000,
                                    animation: 'slidedown',
                                    location: 'bottom',
                                    type: 'pc',
                                    status: 'warn'
                                });
                                return;
                            }
                            e.dialog.hide();
                            const saveData = { scrollPosition: data, alwaysTopStatus, url,
                                useragent: window.useragent }
                            if (window.timeReloadValue) {
                                saveData.timeReloadValue = window.timeReloadValue;
                            }
                            window.IpcRendererUtils.saveDataContainWinInfo(`xiaou_07/list/${saveName}`, saveData);
                            pxmu.toast({
                                msg: '保存到列表成功',
                                time: 1500,
                                animation: 'slidedown',
                                location: 'bottom',
                                type: 'pc',
                                status: 'success'
                            });
                        }
                    },
                ]
            });
        }
    });
    $webview.src = url;
    $webview.useragent = useragent;
    $web.append($webview);
    if (!scrollPosition) {
        // 新窗口不是保存窗口
        window.IpcRendererUtils.setSize(width, height);
        window.IpcRendererUtils.winCenter();
    }
}
window.createIframe = (url) => {
    const $iframe = document.createElement('iframe');
    $iframe.src = url;
    $iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    $iframe.setAttribute('frameBorder', "0");
    $iframe.setAttribute('allowFullScreen', "true");
    $web.append($iframe);
}
window.setUrl = (url, data = {}) => {
    window.createWebView(url, data)
}
window.enterInput = () => {
    $enter.style.display = 'block';
    $web.innerHTML = '';
    $webview = undefined;
    $web.style.display = 'none';
    // pxmu.closeload();
    window.IpcRendererUtils.setSize(510, 200);
    window.IpcRendererUtils.winCenter();
}
const enterInputEvent = (url) => {
    if (!url || !/^(https?|file):\/\/.+/.test(url)) {
        pxmu.toast({
            msg: '请填写正确的 url',
            time: 1500,
            animation: 'slidedown',
            location: 'bottom',
            type: 'pc',
            status: 'warn'
        });
        return;
    }
    const equipment = document.getElementById('equipment').value || 'pc';
    console.log(equipment);
    const winSize = winSizePreinstall[equipment]
            .find(item => item.id === parseInt(document.querySelector('#winSize>select').value)) || {};

    window.setUrl(url, { ...winSize.value, useragent: useragentDict[equipment] });
}
// 设备
const $winSize = document.getElementById('winSize');
const createWinSizeSelect = (sizes) => {
    const $select = document.querySelector('#winSize>select');
    $select.innerHTML = '';
    $select.append(...sizes.map(size => {
        const $option = document.createElement('option');
        $option.value = size.id;
        $option.innerText = size.name;
        return $option;
    }))
}


const setEquipmentWinSize = (equipment) => {
    createWinSizeSelect(winSizePreinstall[equipment]);
}
setEquipmentWinSize('pc');
document.getElementById('equipment').onchange = (e) => {
    setEquipmentWinSize(e.target.value)
};
document.getElementById('enterInput').onkeydown = (e) => {
    if (e.code === 'Enter') {
        enterInputEvent(e.target.value);
        e.target.value = '';
    }
}
document.getElementById('enterButton').onclick = (e) => {
    enterInputEvent(e.target.previousElementSibling.value);
    e.target.previousElementSibling.value = '';
}

// tool
document.getElementById('close').onclick = (e) => {
    window.winClose();
    stop(e);
}
document.getElementById('back').onclick = (e) => {
    window.enterInput();
    stop(e);
}
document.getElementById('alwaysTop').onclick = (e) => {
    const status = eval(e.target.dataset.status);
    console.log(status)
    window.IpcRendererUtils.swatchAlwaysOnTop(!status);
    e.target.dataset.status = `${!status}`;
    stop(e)
}
document.getElementById('deleteToList').onclick = (e) => {
    if (!window.saveName) {
        pxmu.toast({
            msg: '还未保存',
            time: 1500,
            animation: 'slidedown',
            type: 'pc',
            status: 'warn'
        });
        return;
    }
    window.UToolsUtils.delete(`xiaou_07/list/${window.saveName}`);
    pxmu.toast({
        msg: '删除成功',
        time: 1500,
        animation: 'slidedown',
        type: 'pc',
        status: 'success'
    });
    stop(e);
}

document.getElementById('timeReload').onclick = () => {
    // 定时刷新页面
    if (saveData.timeReloadValue) {
        document.getElementById('timeReloadDialog').show().setParams({
            title: '定时刷新页面(忽略缓存)',
            buttons: [
                {
                    value: '取消定时',
                    events: (e) => {
                        if (timeReloadTimer) {
                            clearInterval(timeReloadTimer);
                        }
                        delete window.timeReloadValue;
                    }
                },
                {
                    value: '定时',
                    events: (e) => {
                        const value = document.querySelector('#timeReloadDialog input').value;
                        if(isNaN(value)) {
                            pxmu.toast({
                                msg: '格式不正确',
                                time: 1500,
                                animation: 'slidedown',
                                type: 'pc',
                                status: 'warn'
                            });
                            return
                        }
                        if (!window.setTimeReload(value)) {
                            pxmu.toast({
                                msg: '当前页面不支持',
                                time: 1500,
                                animation: 'slidedown',
                                type: 'pc',
                                status: 'warn'
                            });
                        }
                    }
                },
            ]
        });
    }
}
document.getElementById('reload').onclick = (e) => {
    $webview.reloadIgnoringCache();
}
document.getElementById('delete').onclick = (e) => {
    window.IpcRendererUtils.removeData();
    delete window.pendantsData;
    pxmu.toast({
        msg: '删除成功',
        time: 1500,
        animation: 'slidedown',
        type: 'pc',
        status: 'success'
    });
    stop(e);
}
document.onkeydown = (e) => {
    console.log(e);
    document.getElementById('cover').style.display = 'none';
}
const tipConfigs = [
    { selector: '#close', tips: '关闭' },
    { selector: '#saveToList', tips: '保存到列表' },
    { selector: '#deleteToList', tips: '从列表中删除' },
    { selector: '#delete', tips: '删除' },
    { selector: '#reload', tips: '刷新忽略缓存' },
    { selector: '#back', tips: '返回' },
    { selector: '#alwaysTop', tips: '置顶/取消置顶'},
    { selector: '#save', tips: '保存' },
    { selector: '#timeReload', tips: '定时刷新' }
]
setTipsConfig(tipConfigs);
