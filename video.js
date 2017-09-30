var progress = parseInt((currentTime / totle) * 100); //当前播放进度
var totleTime = getDetailtime(totle);
var crtTime = getDetailtime(currentTime);
var buffered = video[0].buffered.end(0) //当前已缓冲长度
for (var i = 0; i < video[0].buffered.length; i++) {
	if (currentTime < video[0].buffered.end(i)) {
		buffered = video[0].buffered.end(i);
		break;
	}
}
var buff_pro = parseInt((buffered / totle) * 100); //当前缓冲进度