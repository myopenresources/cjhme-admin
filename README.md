# 项目描述
cjhme-admin是一个基于Angularjs1.4.6、Jquery1.11.3、Bootstrap3.3.5的后台管理系统

# 界面展示
<img src="https://github.com/332557712/cjhme-admin/blob/master/cc/c0.png" width="960" height="515" />
<img src="https://github.com/332557712/cjhme-admin/blob/master/cc/c1.png" width="960" height="515" />
<img src="https://github.com/332557712/cjhme-admin/blob/master/cc/c1.png" width="960" height="515" />


# 运行项目
1.使用node运行
  1.1.node js进入到项目目录，运行： `scripts/web-server.js`
  1.2.打开浏览器输入： `http://localhost:<port>/app/index.html` 

2.使用HBuilder运行
  2.1.打开login.html页面，右击`运行方式`，`web应用程序`
  
3.使用Tomcat运行
  3.1将项目复制到Tomcat的webapp目录中，运行Tomcat
  3.2打开浏览器输入： `http://localhost:8080/myui/app/login.html` 
  

# 目录说明
    app/                --> 应用目录
      css/              --> 样式目录
      img/              --> 图片目录
      js/               --> JS目录
      lib/              --> 第三方包目录
      module/           --> 应用模块
      index.html        --> 主页页面
      login.htnl        --> 登录页面
      help.html         --> 帮助页面
      
    psd/                --> PS文件目录
      
    config/testacular.conf.js        --> config file for running unit tests with Testacular
    config/testacular-e2e.conf.js    --> config file for running e2e tests with Testacular

    scripts/            --> handy shell/js/ruby scripts
      e2e-test.sh       --> runs end-to-end tests with Testacular (*nix)
      e2e-test.bat      --> runs end-to-end tests with Testacular (windows)
      test.bat          --> autotests unit tests with Testacular (windows)
      test.sh           --> autotests unit tests with Testacular (*nix)
      web-server.js     --> simple development webserver based on node.js

    test/               --> test source files and libraries
      e2e/              -->
        runner.html     --> end-to-end test runner (open in your browser to run)
        scenarios.js    --> end-to-end specs
      lib/
        angular/                --> angular testing libraries
          angular-mocks.js      --> mocks that replace certain angular services in tests
          angular-scenario.js   --> angular's scenario (end-to-end) test runner library
          version.txt           --> version file
      unit/                     --> unit level specs/tests
        controllersSpec.js      --> specs for controllers
        directivessSpec.js      --> specs for directives
        filtersSpec.js          --> specs for filters
        servicesSpec.js         --> specs for services


