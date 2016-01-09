var mkmk = mkmk || {};

mkmk.FrameByFrameSyncManager = function() {
    this._frameCnt = 0;
    this._sentCnt  = -1;
    this._frameInfo = [];
    this._enemyInfo = [];
    this._delay = 3;
    this._isHost = false;
}; 

mkmk.FrameByFrameSyncManager.prototype = {
    
    get frameCnt()  { return this._frameCnt;    },
    get sentCnt ()  { return this._sentCnt;     },
    get delay   ()  { return this._delay;       },
    get isHost  ()  { return this._isHost;      },
    get frameInfo() { return this._frameInfo;   },
    get enemyInfo() { return this._enemyInfo;   },
    
    set sentCnt (cnt)   { this._sentCnt = cnt;  },
    set delay   (delay) { this._delay = delay;  },
    set isHost  (b)     { this._isHost = b;     },
    
    incrementFrameCnt : function(){
        this._frameCnt++;
    },
    
    deleteOldData : function(synCnt){
        
        this._frameInfo = this._frameInfo.filter(function(v){
            return v.frameCnt >= synCnt;
        });
        this._enemyInfo = this._enemyInfo.filter(function(v){
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