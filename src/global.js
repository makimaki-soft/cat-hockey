var mkmk = mkmk || {};

mkmk.FrameByFrameSyncManager = function() {
    this.frameCnt = 0;
    this.sentCnt  = -1;
    this.frameInfo = [];
    this.enemyInfo = [];
    this.delay = 3;
    this.isHost = false;
}; 

mkmk.FrameByFrameSyncManager.prototype = {
    
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
};