var classcodes =[];
window.Import={
    /*加载一批文件，_files:文件路径数组,可包括js,css,less文件,succes:加载成功回调函数*/
    LoadFileList:function(_files,succes){
        var FileArray=[];
        if(typeof _files==="object"){
            FileArray=_files;
        }else{
            /*如果文件列表是字符串，则用,切分成数组*/
            if(typeof _files==="string"){
                FileArray=_files.split(",");
            }
        }
        if(FileArray!=null && FileArray.length>0){
            var LoadedCount=0;
            for(var i=0;i< FileArray.length;i++){
                loadFile(FileArray[i],function(){
                    LoadedCount++;
                    if(LoadedCount==FileArray.length){
                        succes();
                    }
                })
            }
        }
        /*加载JS文件,url:文件路径,success:加载成功回调函数*/
        function loadFile(url, success) {
            if (!FileIsExt(classcodes,url)) {
                var ThisType=GetFileType(url);
                var fileObj=null;
                if(ThisType==".js"){
                    fileObj=document.createElement('script');
                    fileObj.src = url;
                    fileObj.type = 'module';
                }else if(ThisType==".css"){
                    fileObj=document.createElement('link');
                    fileObj.href = url;
                    fileObj.type = "text/css";
                    fileObj.rel="stylesheet";
                }else if(ThisType==".less"){
                    fileObj=document.createElement('link');
                    fileObj.href = url;
                    fileObj.type = "text/css";
                    fileObj.rel="stylesheet/less";
                }
                success = success || function(){};
                fileObj.onload = fileObj.onreadystatechange = function() {
                    if (!this.readyState || 'loaded' === this.readyState || 'complete' === this.readyState) {
                        success();
                        classcodes.push(url)
                    }
                }
                document.getElementsByTagName('head')[0].appendChild(fileObj);
            }else{
                success();
            }
        }
        /*获取文件类型,后缀名，小写*/
        function GetFileType(url){
            if(url!=null && url.length>0){
                return url.substr(url.lastIndexOf(".")).toLowerCase();
            }
            return "";
        }
        /*文件是否已加载*/
        function FileIsExt(FileArray,_url){
            if(FileArray!=null && FileArray.length>0){
                var len =FileArray.length;
                for (var i = 0; i < len; i++) {
                    if (FileArray[i] ==_url) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}
window.setThemeFile = (files => {
    console.log(files)
    Import.LoadFileList(files,function(){
    });
})

