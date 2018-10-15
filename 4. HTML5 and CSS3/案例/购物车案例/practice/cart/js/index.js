$(function () {
    /*初始化fullpage组件*/
    /*1.设置每一个屏幕的背景颜色*/
    /*2.设置屏幕内容的对齐方式  默认是垂直居中的  改成顶部对齐*/
    /*3.设置导航 设置指示器 点容器*/
    /*4.监听进入某一屏的时候 回调*/
    $('.container').fullpage({
        /*配置参数*/
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        verticalCentered: false,
        navigation: true,
        afterLoad:function (o,d) {
            /*index 序号 1开始  当前屏的序号*/
            $('.section').eq(d).addClass('now');
        },
        /*离开某一个页面的时候触发*/
        onLeave:function (o,d,direction) {
            if(o.index == 1 && d.index == 2){
                /*当前是从第二页到第三页*/
                $('.section').eq(o.index).addClass('leaved');
            }else if(o.index == 2 && d.index == 3){
                /*当前是从第三页到第四页*/
                $('.section').eq(o.index).addClass('leaved');
            }
        },
        /*最好在组件初始完毕或者插件内容渲染完毕*/
        afterRender:function () {
            /*console.log(this);*/
            /*this没有api方法*/

            /*jquery插件初始的时候封装这个方法*/
            /*1.回想jquery插件的封装 $.fn.fullpage = function(){} */
            /*2.jquery本身没有的方法通过$.fn的方式追加方法  认为是插件方法*/
            /*3.例如：$.fn.src = function(){ return this.attr('src') } this 你选择谁this（jquery对象）执行谁 */
            /*点击更多切换下一页*/
            $('.more').on('click',function () {
                $.fn.fullpage.moveSectionDown();
            });

            /*当第四屏的购物车动画结束之后执行收货地址的动画*/
            $('.screen04 .cart').on('transitionend',function () {
                /* :last :first :visible :hidden :checked :selected jquery扩展选择器*/
                $('.screen04 .address').show().find('img:last').fadeIn(1000);
                $('.screen04 .text').addClass('show');
            });
        },
        /*页面切换的时间 默认是700*/
        scrollingSpeed:1000
    });
});