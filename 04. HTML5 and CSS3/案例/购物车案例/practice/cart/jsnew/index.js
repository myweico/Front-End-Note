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

        // 组件初始化完毕后绑定事件
        afterRender: function () {
            // 给下一个的按钮绑定事件
            /*            $("#next").on("click",function(){
                            fullpage_api.moveSectionDown();
                        });*/
            $(".next").on("click", function () {
                fullpage_api.moveSectionDown();
            });
        },

        onLeave: function (origin,destination,direction) {
            if (origin.index == 1 && destination.index == 2) {
                $(".section").eq(origin.index).addClass("leaved");
            }
        },

        afterLoad: function (origin, destination, direction) {
            $(".section").eq(destination.index).addClass("now");
        }
    });
});