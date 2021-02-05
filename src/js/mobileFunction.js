//判断设备类型是否为移动设备
function is_mobile(){ 
	  var regex_match=/(nokia|iphone|android|motorola|^mot-|softbank|foma|docomo|kddi|up.browser|up.link|htc|dopod|blazer|netfront|helio|hosin|huawei|novarra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte-|longcos|pantech|gionee|^sie-|portalmmm|jigs browser|hiptop|^benq|haier|^lct|operas*mobi|opera*mini|320x320|240x320|176x220)/i; 
	  var u=navigator.userAgent; 
	  if (null==u){ 
	    return true; 
	  } 
	  var result = regex_match.exec(u);
	  if(null==result){ 
	    return false
	  } 
	  else{ 
	    return true
	  } 
	} 

//判断横竖屏切换
function orient() {
    //alert('gete');
    if (window.orientation == 0 || window.orientation == 180) {
        document.location.href='html://www.airmn.com/beida/m/';
    }
    else if (window.orientation == 90 || window.orientation == -90) {
        document.location.href='html://www.airmn.com/beida/1/';
    }
}
