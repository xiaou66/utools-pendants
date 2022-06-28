const UToolsUtils = require('../../utils/UToolsUtils.js');
const defaultOptions = [
  {id: 1, title: '倒计时', description: '在子输入框中输入秒数回车', value: -1}
];
let subText = '';
module.exports = {
  timeDownList: {
    mode: 'list',
    args: {
      // 进入插件时调用
      enter: async (action, callbackSetList) => {
        const options = [];
        options.push(...defaultOptions);
        const timeList = UToolsUtils.read("xiaou_04/timeList") || [];
        options.push(...timeList.map(item => ({id: 2, title: `记录: ${item.time}`,description: '回车后直接计时', time: item.time, value: 2})));
        const timeItem = UToolsUtils.read("xiaou_04/timeListLastTime");
        if (timeItem) {
          options.push({id: -1, title: '最后一次未计时完时间', description: timeItem, time: timeItem, value: 1});
        }
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
              .filter(item => item.trim().length && /^\+?[0-9]\d*$/.test(item)))
          } else {
            times.push(...subText.split(" ")
              .filter(item => item.trim().length && /^\+?[0-9]\d*$/.test(item)))
          }
          if (!times.length) {
            utools.showNotification("请按格式输入时间");
          }
        } else {
          times = itemData.time.split(":");
        }
        if (times.length > 3) {
          utools.showNotification("仅支持「时 分 秒」三位");
          return;
        }
        //region 保存历史记录
        const timeList = UToolsUtils.read("xiaou_04/timeList") || [];
        if (timeList.length > 8) {
          timeList.pop();
        }
        const saveTime = times.join(":");
        if (timeList.findIndex(item => item.time === saveTime) === -1) {
          timeList.unshift({time: saveTime})
        }
        UToolsUtils.save("xiaou_04/timeList", timeList);
        //endregion
        const id = code.split('.')[1];
        times = times.reverse();
        let seconds = parseInt(times[0]);
        for (let i = 1; i < times.length; i++) {
          seconds += parseInt(times[i]) * Math.pow(60, i);
        }
        console.log(seconds)
        window.createWindowByPendantId(id, { data: { time: seconds} });
      },
      placeholder: '请输入时间|使用空格分隔比如[2 0]和[120]都是倒计时2分钟'
    }
  }
}
