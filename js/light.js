// 霓虹灯效果
// 颜色数组
var arr = ["#39c5bb", "#f14747", "#f1a247", "#f1ee47", "#b347f1", "#1edbff", "#ed709b", "#5636ed"];
// 颜色索引
var idx = 0;

// 切换颜色
function changeColor() {
    // 仅夜间模式才启用
    if (document.getElementsByTagName('html')[0].getAttribute('data-theme') == 'dark') {
        if (document.getElementById("site-name"))
            document.getElementById("site-name").style.textShadow = arr[idx] + " 0 0 15px";
        if (document.getElementById("site-title"))
            document.getElementById("site-title").style.textShadow = arr[idx] + " 0 0 15px";
        if (document.getElementById("site-subtitle"))
            document.getElementById("site-subtitle").style.textShadow = arr[idx] + " 0 0 10px";
        if (document.getElementById("post-info"))
            document.getElementById("post-info").style.textShadow = arr[idx] + " 0 0 5px";
        try {
            document.getElementsByClassName("author-info__name")[0].style.textShadow = arr[idx] + " 0 0 12px";
            document.getElementsByClassName("author-info__description")[0].style.textShadow = arr[idx] + " 0 0 12px";
        } catch {
            
        }
        idx++;
        if (idx == 8) {
            idx = 0;
        }
    } else {
        // 白天模式恢复默认
        if (document.getElementById("site-name"))
            document.getElementById("site-name").style.textShadow = "#1e1e1ee0 1px 1px 1px";
        if (document.getElementById("site-title"))
            document.getElementById("site-title").style.textShadow = "#1e1e1ee0 1px 1px 1px";
        if (document.getElementById("site-subtitle"))
            document.getElementById("site-subtitle").style.textShadow = "#1e1e1ee0 1px 1px 1px";
        if (document.getElementById("post-info"))
            document.getElementById("post-info").style.textShadow = "#1e1e1ee0 1px 1px 1px";
        try {
            document.getElementsByClassName("author-info__name")[0].style.textShadow = "";
            document.getElementsByClassName("author-info__description")[0].style.textShadow = "";
        } catch {
            
        }
    }
}

// 开启计时器
let colorTimer = null;
const colorMotionQuery = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
function syncColorTimer() {
  const active = document.documentElement.getAttribute('data-theme') === 'dark'
    && !document.hidden && !(colorMotionQuery && colorMotionQuery.matches);
  if (active && colorTimer === null) {
    changeColor();
    colorTimer = window.setInterval(changeColor, 1200);
  } else if (!active && colorTimer !== null) {
    window.clearInterval(colorTimer);
    colorTimer = null;
    changeColor();
  }
}
new MutationObserver(syncColorTimer).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
document.addEventListener('visibilitychange', syncColorTimer);
if (colorMotionQuery && colorMotionQuery.addEventListener) colorMotionQuery.addEventListener('change', syncColorTimer);
syncColorTimer();