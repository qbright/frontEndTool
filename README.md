frontEndTool
============
-@BUG  上传大文件处理时会阻塞住方法   -------已解决<br>
-@BUG  压缩的png图片会解压失败        -------已解决<br>

-@BUG `websocket` 在连接前关闭？？  //猜测是由于使用 多线程 `socket.io` 产生的同步问题
-@BUG `doxmate` 集成后默认模板无法 生成代码 // 由于模板文件选项中无 `outputSourceFiles`选项

===============
安装方法：

主机上安装 node   <http://nodejs.org/>

安装完成之后进入  script 文件夹  运行 init.bat  


运行项目 进入script文件夹  运行start.bat   web路径  <http://localhost:3000/frontEndTool/>


注：
    -版本提交代码的时候 不要把 workspace和 uploads 、node_modules 上传！！（已做忽略）处理