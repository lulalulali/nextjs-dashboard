# 自己的一点总结

## 各个文件夹一般放什么东西

app中放route components和逻辑
  其lib中放utility函数和默认函数
  其ui中放ui组件：卡片 表格 窗体
publi中放static asse如图像等
scripts中放种子设定脚本 用它来填数据库

## 获取数据

使用服务器组件获取数据  在lib的data.ts文件中用import从数据库中拿sql过来
从data。ts中那取“值”函数 在export中定义一个变量 把取到的传给这个变量
最后在组件（表格 卡片 窗体）代码中用这个变量即可
一般情况下，数据获取是瀑布流 按代码前后执行
如果想并行获取 在datats中使用await Promise。all

## 静态动态渲染

静态渲染可以立马做好端上来，利于排名，一般对于非定制内容比较便利
动态适合实时 特定内容 请求时间
如何是仪表板动态化？在datats中，import一个unstable nostore从next cache，然后在对应的组件export后第一项就用nostore。 tip：nostore cookie都是动态函数
如何模拟低速数据获取  await new Promise((resolve) => setTimeout(resolve, 3000));

## streaming

分块，平行处理，防止加载阻塞
第一种:用loadingtsx/整页整页 还可以在里面塞骨架 import skeleton export skeleton
第二种：流式传输组件/悬挂   首先就不能data里面拿fetchrenevue 要从react拿suspense和从skeletons拿revenuechartskeleton  然后在main里面加入一个悬挂语句=await fetchRevenue();   tip：悬挂没有正确答案 按需  是一个强大的api

## 部分预渲染partial render

悬挂被优先视作预渲染
建库减延迟，即本地有一个。服务器和数据库之间尽量少
隔开处理，防止加载的慢的影响整个页面的加载。

## 搜索和分页pagination

所谓通过url搜索参数，是在现有的url上继续加东西，使得内容呈现的越来越具体。比如从笔记本到5000的笔记本到5000的灰色笔记本
搜索 第一步:抓搜索框中用户键入的东西 建一个handlesearch函数 然后在框上放一个onchange监听器用这个函数(效果:控制台会有你的输入)
     第二步:用键入的东西更新url:从navigation中usesearchparams并传给一个变量 对此变量使用urlsearchparams格式化传给给个新参数 if判别它是否为空  然后替换
     第三步:使url与输入同步 有query就给表单元素defaultvalue 没有就没值
     第四步：更新表格 await fetchfilteredinvoices给invoices
debouncng：是为了不要键入中实时不停的去search数据
添加分页：page页import fetchinovicepage 用来查询page数   然后将totalpages给pagination组件 然后创一个createpageurl函数一是旧的url而是当前的page数三是新的url

## mutating data

服务器操作："Server Actions" 就是后台管理员执行的一系列操作，以响应前台收银员和顾客的需求，确保购物过程正常进行。用form元素来invoke这个操作
revalidatePath and revalidateTag.用来验证相关缓存  功效：allows users to interact with the form and submit data even if the JavaScript for the form hasn't been loaded yet or if it fails to load.
创建发票的过程：创建一个表单来抓数据  这里是发票表单
从表单中唤醒创建的sa 在lib中actionsTs中'use server';创一个异步叫ci接收formdata ci向action传
在sa中从formdata中提数据  actionts
验证并准备插入数据 类型验证导入zod对象和强制更改 以美分存储amount乘以100 创建新日期
插入数据并处理错误 import sql 然后取发票中的值传入变量 
重新验证并向用户带回应该的界面
