$(function(){

    var videoNew = {

        video:$('video').get(0),

        // 进度条
        progress:function(){

        },

        // 时间
        timer:function(thisz){
            function sec_to_time(b) {
                var a = null;
                var hour = Math.floor (b/ 3600);
                var other = b % 3600;
                var minute = Math.floor (other / 60);
                minute<10?minute='0'+minute:minute
                var second = (other % 60).toFixed (0);
                second<10?second='0'+second:second
                a =    minute + ':' + second;
                return a;
            }
            var currentTime = thisz.video.currentTime;
            var duration = thisz.video.duration;

            currentTime?currentTime=currentTime:currentTime=0;
            duration?duration=duration:duration=0;

            currentTime = sec_to_time(currentTime);
            duration = sec_to_time(duration);

            $('.videoMvvM .flejustify .btn .timer .currentTime').html(currentTime);
            $('.videoMvvM .flejustify .btn .timer .durationTime').html(duration);
        },

        // 进度条百分比显示
        parseent:function(thisz){

            // 时间
            thisz.timer(thisz);

            // 进度
            var length = thisz.video.currentTime/thisz.video.duration*100;
            $('.videoMvvM .flejustify .progress .pgs').width(length+'%');

            // 缓冲进度
            var bufferedVal = 0;
            if(thisz.video.buffered.length>0){
                bufferedVal = thisz.video.buffered.end(0);
            }
            for(var i = 0;i < thisz.video.buffered.length;i++){
                if(thisz.video.currentTime < thisz.video.buffered.end(i) && thisz.video.buffered){
                    bufferedVal = thisz.video.buffered.end(i);
                }
            };
            var buff_pro = parseInt((bufferedVal / thisz.video.duration) * 100);
            $('.videoMvvM .flejustify .progress .Du').width(buff_pro+'%');

        },

        // 暂停与播放
        pl:function(){
            if($('.videoMvvM .flejustify .btn .player').hasClass('active')){
                this.pause();
            }else{
                this.play();
            }
        },

        //进入全屏
        requestFullScreen:function(){
              var de = document.documentElement;
              if (de.requestFullscreen) {
                  de.requestFullscreen();
              } else if (de.mozRequestFullScreen) {
                  de.mozRequestFullScreen();
              } else if (de.webkitRequestFullScreen) {
                 de.webkitRequestFullScreen();
              }else if(de.msRequestFullscreen) {
                de.msRequestFullscreen();
            }
        },

        //退出全屏
        exitFullscreen:function(){
             var de = document;
             if (de.exitFullscreen) {
                 de.exitFullscreen();
             } else if (de.mozCancelFullScreen) {
                 de.mozCancelFullScreen();
             } else if (de.webkitCancelFullScreen) {
                 de.webkitCancelFullScreen();
             } else if (de.msCancelFullscreen) {
                de.msCancelFullscreen();
            }
        },

        // 监听退出全屏事件
        fullscreenchange:function(){
            var that = this;
            document.addEventListener("fullscreenchange", function(e) {
                if($('.videoMvvM').hasClass('active')){
                    that.exitFullscreen();
                }else{
                    that.requestFullScreen();
                }
              console.log("fullscreenchange", e);
            });
            document.addEventListener("mozfullscreenchange", function(e) {
                if($('.videoMvvM').hasClass('active')){
                    that.exitFullscreen();
                }else{
                    that.requestFullScreen();
                }
              console.log("mozfullscreenchange ", e);
            });
            document.addEventListener("webkitfullscreenchange", function(e) {
                if($('.videoMvvM').hasClass('active')){
                    that.exitFullscreen();
                }else{
                    that.requestFullScreen();
                }
              console.log("webkitfullscreenchange", e);
            });
            document.addEventListener("msfullscreenchange", function(e) {
                if($('.videoMvvM').hasClass('active')){
                    that.exitFullscreen();
                }else{
                    that.requestFullScreen();
                }
              console.log("msfullscreenchange", e);
            });
        },

        // 操作
        click:function(){
            var that = this;

            // 监听是否全屏播放
            that.fullscreenchange();

            // 点击进度条控制视频进度
            $('.videoMvvM .flejustify .progress').mousedown(function(ev){
                var posX = ev.clientX;
                var targetLeft = $(this).offset().left;
                var percentage = (posX - targetLeft)/$(this).width()*100;
                that.video.currentTime = parseInt(that.video.duration*percentage/100);
            })

            // 开启定时器
            setInterval(function(){
                that.parseent(that);
            },10);

            // 点击播放按钮开始播放
            $('.videoMvvM .flejustify .btn .player').click(function(){
                that.pl();
            })

            // 点击video视频暂停
            $('video').click(function(){
                that.pl();
            })

            // 点击全屏播放与退出全屏播放
            $('.videoMvvM .flejustify .btn .FullScreen .Q').click(function(){
                that.requestFullScreen();
                $('.videoMvvM').addClass('active');
                $('.FullScreen').addClass("active");
            });
            $('.videoMvvM .flejustify .btn .FullScreen .T').click(function(){
                that.exitFullscreen();
                $('.videoMvvM').removeClass('active');
                $('.FullScreen').removeClass("active");
            });

            // 鼠标移上video显示进度条等控件
            var stopFadeInFadeOut = null;
            $('.videoMvvM').mouseout(function(){
                stopFadeInFadeOut = setTimeout(function(){
                    $('.videoMvvM .flejustify').stop().fadeOut();
                },1000)
            });
            $('.videoMvvM').mousemove(function(){
                $('.videoMvvM .flejustify').show();
                clearTimeout(stopFadeInFadeOut);
            });
            
        },

        // 播放
        play:function(){
            $('.videoMvvM .flejustify .btn .player').addClass('active');
            this.video.play();
        },
        // 暂停
        pause:function(){
            $('.videoMvvM .flejustify .btn .player').removeClass('active');
            this.video.pause();
        },

        // 初始化
        init:function(){
            this.click();
        }

    };
    videoNew.init();












































 //判断视频是否加载完毕开始
        // $('video').get(0).addEventListener('canplaythrough',function(){
        //     $('video').attr('controls','controls')
        // })
        //判断视频是否加载完毕结束

        // setInterval(function(){
        //     var a = document.querySelector('video')
        //     //console.log($('video').get(0).buffered)
        // },1000)

        var video = $('video');


        video.bind('play',function(){
                $('.videoMvvM .HK3').hide();
                console.log('当浏览器可以开始播放该音视频时产生该事件')
        })
        video.bind('canplay',function(){
                $('.videoMvvM .HK3').hide();
                console.log('当浏览器可以开始播放该音视频时产生该事件')
        })
        video.bind('waiting',function(){
            $('.videoMvvM .HK3').show();
            console.log('//当试图获取媒体数据，但数据还不可用时产生该事件')
        })
        video.bind('stalled',function(){
            $('.videoMvvM .HK3').show();
            console.log('当视频因缓冲下一帧而停止时产生该事件')
        })
        video.bind('error',function(){
            $('.videoMvvM .HK3').show();
            console.log('当音视频加载被异常终止时产生该事件')
        })
        
        video.bind('loadstart',function(){
            $('.videoMvvM .HK3').show();
            console.log('客户端开始请求数据')
        })
        video.bind('play',function(){
            $('.videoMvvM .HK3').hide();
            console.log('当媒体播放时产生该事件')
        })
        video.bind('playing',function(){
            $('.videoMvvM .HK3').hide();
            console.log('当媒体从因缓冲而引起的暂停和停止恢复到播放时产生该事件')
        })

})