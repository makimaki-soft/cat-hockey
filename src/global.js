var global = {
    frameCnt : 0,
    sentCnt  : -1,
    frameInfo : [],
    enemyInfo : [],
    delay : 3,
    isHost : false,
    
    deleteOldData : function(synCnt){
        
        this.frameInfo = this.frameInfo.filter(function(v){
            return v.frameCnt >= synCnt;
        });
        this.enemyInfo = this.enemyInfo.filter(function(v){
            return v.frameCnt >= synCnt;
        });
    },
    
    getData : function(frame, synCnt){
    
        var data = frame.filter(function(v){
                        return v.frameCnt == synCnt; 
                    })[0];
                    
        if( data === undefined && frame.verboseData ){
            // todo : verbose mode
        }
        
        return data;
    }
}