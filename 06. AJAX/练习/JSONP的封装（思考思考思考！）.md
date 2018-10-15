# html文件
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>JSONP</title>
</head>
<body>
    <script>
        function jsonp(urlto, data, callback){
            var funcName = "jsonp" + Date.now() + Math.random().toString().slice(2);

            data = data || "";
            if (typeof data == "object") {
                var tempArr = [];
                for (var name in data) {
                    tempArr.push(name + "=" + data[name]);
                }
                data = tempArr.join("&");
            }

            var scriptElem = document.createElement("script");
            scriptElem.src= urlto + "?" + data + (callback ? "&callback="+funcName : "");
            document.body.appendChild(scriptElem);

            window[funcName] = function(data){
                callback(data);

                // 执行后删除随机生成的函数
                delete window[funcName];

                // 删除标签
                document.body.removeChild(scriptElem);
            }
        }

        jsonp("http://site1.tech/jsonp.php",{"ok":"ok","nice":"nice"},function(res){
            console.log(res);
        });
    </script>
</body>
</html>
```

# php文件
```php
<?php 
    $data = file_get_contents("users.json");

    if (empty($_GET['callback'])) {
        header('Content-Type: application/json');
        echo $data;
    } else {
        header("Content-Type: application/javascript");
        $funcName = $_GET['callback'];
        echo "typeof {$funcName} == 'function' && {$funcName}({$data})";
    }
?>
```