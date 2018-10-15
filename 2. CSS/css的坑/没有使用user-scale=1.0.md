- 页面很大的时候，手机可能会缩小页面，css-px远比viewport-px小
- viewport的width会影响html的宽度，页面的宽度不等于html的宽度

# html
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>京东移动端开发</title>
        <link rel="stylesheet" href="css/base.css">
        <link rel="stylesheet" href="css/index.css">
    </head>
    <body>
        <div class="jd_container">
            <!-- 顶部搜索 -->
            <header class="jd_search">
                <div class="jd_search_box">
                    <a href="#" class="icon_logo"></a>
                    <form action="#">
                        <span class="icon_search"></span>
                        <input type="search" placeholder="搜索您需要商品">
                    </form>
                    <a href="#" class="login">登录</a>
                </div>
            </header>

            <!-- 轮播图 -->
            <div class="jd_banner">
                <ul>
                    <li><a href=""><img src="images/l8.jpg" alt=""></a></li>
                    <li><a href=""><img src="images/l1.jpg" alt=""></a></li>
                    <li><a href=""><img src="images/l2.jpg" alt=""></a></li>
                    <li><a href=""><img src="images/l3.jpg" alt=""></a></li>
                    <li><a href=""><img src="images/l4.jpg" alt=""></a></li>
                    <li><a href=""><img src="images/l5.jpg" alt=""></a></li>
                    <li><a href=""><img src="images/l6.jpg" alt=""></a></li>
                    <li><a href=""><img src="images/l7.jpg" alt=""></a></li>
                    <li><a href=""><img src="images/l8.jpg" alt=""></a></li>
                    <li><a href=""><img src="images/l1.jpg" alt=""></a></li>
                </ul>
                
                <ul>
                    <li class="now"></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>

            <!-- 导航栏 -->
            <nav class="jd_nav">
                
            </nav>

            <!-- 产品区块 -->
        </div>
        <script src="js/index.js"></script>
    </body>
</html>
```

# CSS
```css
/* 容器 */
.jd_container {
    min-width: 320px;
    max-width: 640px;
    width: 100%;
    margin: 0 auto;
    background-color: pink;
    height: 1000px;
}

.jd_search {
    width: 100%;
    height: 40px;
    position: fixed;
    top: 0;
    left: 0;
}

/* 添加一个容器实现固定定位并且水平居中 */
.jd_search .jd_search_box {
    min-width: 320px;
    max-width: 640px;
    width: 100%;
    height: 40px;
    margin: 0 auto;
    background-color: rgba(201,21,35,0.85);
    position: relative;
}

.jd_search .jd_search_box .icon_logo {
    width: 60px;
    height: 40px;
    position: absolute;
    left: 10px;
    top: 0;
    background-position: 0 -102px;
}
.jd_search .jd_search_box .login {
    width: 60px;
    height: 40px;
    position: absolute;
    right: 0;
    top: 0;
    line-height: 40px;
    text-align: center;
    color: #fff;
}
.jd_search .jd_search_box form {
    width: 100%;
    padding-left: 70px;
    padding-right: 60px;
}

.jd_search .jd_search_box form .icon_search {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 10px;
    left: 80px;
    background-position: -60px -110px;
}

.jd_search .jd_search_box form input {
    width: 100%;
    height: 30px;
    margin-top: 5px;
    padding-left: 40px;
    background: #fff;
    border-radius: 15px;
}

[class^="icon_"],[class*=" icon_"] {
    background-image: url("../images/sprites.png");
    background-repeat: no-repeat;
    background-size: 200px 200px;
}

/* 轮播图 */
.jd_banner {
    width: 100%；
}
.jd_banner ul:first-child {
    width: 1000%;
}
.jd_banner ul:first-child li {
    width: 10%;
    float: left;
}

.jd_banner ul:first-child li a{
    width: 100%;
}

.jd_banner ul:first-child li a img{
    display: block;
    width: 100%;
}
.jd_banner ul:last-child {}
.jd_banner ul:last-child li{}
.jd_banner ul:last-child li.now{}
```