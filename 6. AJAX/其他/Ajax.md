总结要点
- php返回的文件可以使用`header("Content-Type: application/json")`来设定相应报文返回的文件类型，客户端会根据返回的文件类型对返回的报文进行处理
- 使用`console.time('id')`以及`console.timeEnd`计时
- xhr.response会根据xhr.responseType解析得到的相应报文数据