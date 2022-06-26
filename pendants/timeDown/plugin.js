const UToolsUtils = require('../../utils/UToolsUtils.js');
const options = [
  {id: 1, title: '倒计时', description: '在子输入框中输入秒数回车', value: -1}
];
let subText = '';
module.exports = {
  timeDownList: {
    mode: 'list',
    args: {
      // 进入插件时调用
      enter: async (action, callbackSetList) => {
        callbackSetList(options)
      },
      search: (action, searchWord, callbackSetList) => {
        subText = searchWord;
      },
      select: async ({ code }, itemData, callbackSetList) => {
        let times = [];
        if (itemData.value === -1) {
          if (subText.indexOf(":") !== -1) {
            times.push(...subText.split(":")
              .filter(item => item.trim().length && /^\+?[1-9]\d*$/.test(item)))
          } else {
            times.push(...subText.split(" ")
              .filter(item => item.trim().length && /^\+?[1-9]\d*$/.test(item)))
          }
          if (!times.length) {
            utools.showNotification("请按格式输入时间");
          }
        } else {
          times = itemData.time.split(":");
        }
        const id = code.split('.')[1];
        times = times.reverse();
        let seconds = parseInt(times[0]);
        for (let i = 1; i < times.length; i++) {
          seconds += parseInt(times[i]) * i * 60;
        }
        console.log(seconds)
        window.createWindowByPendantId(id, { data: { time: seconds} });
      },
      placeholder: '请输入时间|使用空格分隔比如[2 0]和[120]都是倒计时2分钟'
    }
  }
}
