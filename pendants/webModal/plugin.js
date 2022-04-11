const UToolsUtils = require('../../utils/UToolsUtils.js');
const originData = [];
module.exports = {
    open: {
        mode: 'none',
        args: {
            // 进入插件时调用
            enter: async ({type, payload, code}) => {
                const id = code.split('.')[1];
                if (type === 'regex'){
                    window.createWindowByPendantId(id, { url: payload });
                    utools.outPlugin();
                } else if (type === 'files') {
                    window.createWindowByPendantId(id, { url: `file://${payload[0].path}` });
                    utools.outPlugin();
                }
            },
        }
    },
    saveList: {
        mode: 'list',
        args: {
            // 进入插件时调用
            enter: async (action, callbackSetList) => {
                originData.length = 0;
                const doc = UToolsUtils.readAll('xiaou_07/list/');
                console.log(doc);
                originData.push(...doc.map(( {_id, data }) => {
                    console.log(_id, data);
                    data.data.saveName = _id;
                    return {
                        title: _id,
                        description: data.data.url,
                        data,
                    }
                }));
                callbackSetList(originData);
            },
            search: (action, searchWord, callbackSetList) => {
                callbackSetList(originData.filter(item =>
                    item.title.includes(searchWord) || item.description.includes(searchWord)));
            },
            select: async ({ code }, itemData, callbackSetList) => {
                if (!itemData) {
                    return;
                }
                const id = code.split('.')[1];
                window.createWindowByPendantId(id, itemData.data);
                utools.outPlugin();
            }
        },
    }
}
