$(function () {
    $("#container").fullpage({
        // 设置许可
        licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",

        // 设置每一屏背景颜色
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],

        // 取消垂直居中
        verticalCentered: false,

        // 设置导航栏
        navigation: true,

        // 设置动画过度的时间
        scrollingSpeed: 1000,

        // 组件初始化完毕后绑定事件
        afterRender: function () {
            // 给下一个的按钮绑定事件
            /*            $("#next").on("click",function(){
                            fullpage_api.moveSectionDown();
                        });*/
            $(".next").on("click", function () {
                fullpage_api.moveSectionDown();
            });

            // 第四屏的购物车结束过度时的时间
            $(".screen04 .cart").on("transitionend", function (e) {
                $(".screen04").addClass("show");
                return false;
            });

            $(".screen08").on("mousemove",function(e){
                let par = $(this).find(".content");
                let pos = par.position();
                let posX = pos.left + parseInt(par.css("marginLeft")) + parseInt(par.css("borderLeftWidth"));
                let posY = pos.top + parseInt(par.css("marginTop")) + parseInt(par.css("borderTopWidth"));
                $(this).find(".hand").css({
                    "left": e.clientX - posX -66 + "px",
                    "top": e.clientY - posY + 15 +"px"
                });
            });

            $(".screen08 .btn img:nth-child(3)").on("click",function(){
                // 清除所有的类now,show,leaved
                $(".now,.show,.leaved").removeClass("now").removeClass("show").removeClass("leaved");
                // 清除所有的style属性，css设置，fadeIn，等函数设置
                $(".content [style]").removeAttr("style");

                // 返回第一页
                fullpage_api.moveTo(1);
            });
        },

        // 离开页面的事件
        onLeave: function (origin, destination, direction) {
            let $section = $(".section");
            let odex = origin.index;
            let ddex = destination.index;
            if (odex === 1 && ddex === 2) {
                $section.eq(odex).addClass("leaved");
            } else if (odex === 2 && ddex === 3) {
                $section.eq(odex).addClass("leaved");
            } else if (odex === 4 && ddex === 5) {
                $section.eq(odex).addClass("leaved");
                // $section.eq(ddex).find(".box").addClass("show");
                $(".screen06 .box").addClass("show");
            }
        },

        // 进入页面的事件
        afterLoad: function (origin, destination, direction) {
            if (direction === "down") {
                if (destination.index === 6 && !$(".screen07").hasClass("now")) {
                    $(".screen07 .star img").each(function (index, item) {
                        console.log(1000*0.25*index);
                        $(this).delay(1000*0.25*index).fadeIn(0.3);
                    });
                }
                $(".section").eq(destination.index).addClass("now");
            }


        }
    });
});