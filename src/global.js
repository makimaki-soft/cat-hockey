var mkmk = mkmk || {};

mkmk.frameByFrameSyncManager = function() {
    var frameCnt = 0;
    var sentCnt  = -1;
    var frameInfo = [];
    var enemyInfo = [];
    var delay = 3;
    var isHost = false;
    
    return {
    
        get frameCnt()  { return frameCnt;    },
        get sentCnt ()  { return sentCnt;     },
        get delay   ()  { return delay;       },
        get isHost  ()  { return isHost;      },
        get frameInfo() { return frameInfo;   },
        get enemyInfo() { return enemyInfo;   },
        
        set sentCnt (cnt)   { sentCnt = cnt;  },
        set delay   (delay) { delay = delay;  },
        set isHost  (b)     { isHost = b;     },
        
        incrementFrameCnt : function(){
            frameCnt++;
        },
        
        deleteOldData : function(synCnt){
            
            frameInfo = frameInfo.filter(function(v){
                return v.frameCnt >= synCnt;
            });
            enemyInfo = enemyInfo.filter(function(v){
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
        },
        
        /**
         * Push frame data into local FIFO & send over RTC connection.
         * This function should be called every frame.
         * @param {Objct}
         * @returns {boolean}
         */
        pushFrameData : function(frameData){
            
            if( frameCnt != sentCnt + 1 ){
                return false;
            }
            
            var currFrameInfo = {
                frameCnt : frameCnt,
                userData : data
            };
            
            frameInfo.push(currFrameInfo);
            rtc_manager.send(JSON.stringify(currFrameInfo));
            sentCnt = frameCnt;
            
            return true;
        }
    };
}();