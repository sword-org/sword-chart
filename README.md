# sword-chart
非常简单的javascript的绘图库，一行代码绘制常见图形,基于echarts的库。

# 1 示例
  * 下载本项目demo文件，使用浏览器打开demo项目中的sword-chart.html文件查看
  * 访问 [chart示例](http://www.chengn.com/sword-chart/demo.html)

# 2 开发步骤
## 2.1 引入js库
```html
 <script src="js/echarts/echarts.js" > </script>
 <script src="js/sword/sword-chart.min.js" > </script>

<script type="text/javascript">
// 路径配置
require.config({
    paths: {
        echarts: 'js/echarts/'
    }
});
</script>

```

## 2.2 创建html页面布局
  页面布局的div作为图形的载体。
```html
	 <div id="main2" style="height:400px" ></div>
```

## 2.3绘图
```js
   # 示例数据
   var obj = {"msg":null,"result":"success","data":[{"id":1,"indName":"三级传媒","value":1.00034815,"tradeDate":"2015-01-06"},{"value":0.89917462,"indName":"二级传媒","tradeDate":"2015-01-06","id":2},{"id":3,"indName":"传媒","value":10.00347625,"tradeDate":"2015-01-06"},{"id":4,"tradeDate":"2015-01-07","value":0.89906148,"indName":"三级传媒"},{"indName":"二级传媒","value":0.89948459,"id":5,"tradeDate":"2015-01-07"},{"indName":"传媒","value":8.63924241,"tradeDate":"2015-01-07","id":6},{"value":0.89944371,"id":7,"tradeDate":"2015-01-08","indName":"三级传媒"},{"value":1.00033518,"tradeDate":"2015-01-08","indName":"二级传媒","id":8},{"tradeDate":"2015-01-08","value":7.25668226,"id":9,"indName":"传媒"},{"tradeDate":"2015-01-06","value":0.89948264,"id":10,"indName":"三级军工"},{"indName":"二级军工","id":11,"tradeDate":"2015-01-06","value":1.00037711},{"id":12,"indName":"军工","tradeDate":"2015-01-06","value":0.89948325},{"id":13,"tradeDate":"2015-01-07","indName":"三级军工","value":0.89948968},{"indName":"二级军工","tradeDate":"2015-01-07","id":14,"value":1.00015308},{"indName":"军工","value":6.22684023,"tradeDate":"2015-01-07","id":15},{"id":16,"indName":"三级军工","tradeDate":"2015-01-08","value":0.89948335},{"id":17,"tradeDate":"2015-01-08","value":0.89948515,"indName":"二级军工"},{"indName":"军工","id":18,"tradeDate":"2015-01-08","value":0.89917096},{"tradeDate":"2015-01-06","indName":"三级传媒","value":1.00034815,"id":19},{"id":20,"value":0.89917462,"tradeDate":"2015-01-06","indName":"二级传媒"}]};

  # 一行代码绘制线图，在id为main2的div中绘制一条线图，标题为line，图形展示的数据为obj.data的数据,indName作为z轴，tradeDate作为x轴，value作为y轴，图形的主题使用theme（即theme/dart 黑色主题）
 require([ 'echarts', 
              'echarts/theme/dark',
              'echarts/chart/line'], function(ec,theme) {
		   Echart.line(ec, "main2", "line", obj.data, "indName", "tradeDate", "value",theme);
		});
```

### 2.3.1 线图
```js
   Echart.line(ec, "main", "line", obj.data, "indName", "tradeDate", "value",theme);
```

### 2.3.2 堆积线图
```js
   Echart.lineStack(ec, "main", "lineStack", obj.data, "indName", "tradeDate", "value",theme);
```

### 2.3.3 柱状图
```js
    Echart.bar(ec, "main", "bar 3维格式3维数据", obj.data, "indName", "tradeDate", "value",theme);
```

### 2.3.4 柱状堆积图
```js
   Echart.barStack(ec, "main", "barStack", obj.data, "indName", "tradeDate", "value",theme);
```

### 2.3.5 带变化率曲线的柱状图
```js
   Echart.barRoc(ec, "main", "barRoc", json3is2.data, "tradeDate", "indName", "value",theme);
```

### 2.3.6 面积图
```js
   Echart.area(ec, "main", "area", obj.data, "indName", "tradeDate", "value",theme);
```

### 2.3.7 堆积面积图
```js
   Echart.areaStack(ec, "main", "areaStack", obj.data, "indName", "tradeDate", "value",theme);
```

### 2.3.8 饼图
```js
   Echart.pie(ec, "main", "pie 3维格式二维数据", json3is2.data, "indName", "value",theme);
```

### 2.3.9 环形图
```js
    Echart.donut(ec, "main8", "donut 3维格式二维数据", json3is2.data, "indName", "value",theme);
```

## 2.4 图形数据

图形展示的数据必须是json格式的数据，主要有如下三种形式的json数据：
* 3维数据（x,y,z三个维护的数据,json有三个键）
* 2维度数据（x,y两个维度的数据，json有两个键值）
* 2维数据表现为3为数据（x,y,z三个维度的数据，但是z值是同一个值，所以实际上只有x,y两个维度的数据）

```js
  //正常3维数据
   var jsonData = {
      result: "success",
      msg: "",
      data: [
        {"tradeDate":"2015-01-01","indName":"计算机","value":11},
        {"tradeDate":"2015-01-01","indName":"军工","value":22},
        {"tradeDate":"2015-01-02","indName":"计算机","value":33},
        {"tradeDate":"2015-01-02","indName":"军工","value":44}
      ]
    };
   //2维数据
   var json2D = {
      result: "success",
      msg: "",
      data: [
        {"indName":"计算机","value":11},
        {"indName":"军工","value":22},
        {"indName":"互联网","value":33},
        {"indName":"传媒","value":44}
      ]
    };

   //2维数据显示为3维数据 tradeData 都是2015-03-31一个值
   var json3is2 = {"msg":null,"data":[{"id":298,"indName":"生产","tradeDate":"2015-03-31","value":1.3},{"value":1.6,"id":315,"indName":"三级材料","tradeDate":"2015-03-31"},{"indName":"材料","tradeDate":"2015-03-31","value":1.20129188,"id":313},{"value":1.00133486,"indName":"医药","id":316,"tradeDate":"2015-03-31"},{"id":304,"indName":"综合","tradeDate":"2015-03-31","value":1.50198934},{"indName":"二级能源","tradeDate":"2015-03-31","id":311,"value":1.00271547},{"tradeDate":"2015-03-31","id":309,"value":1.00274985,"indName":"三级医疗"},{"id":301,"tradeDate":"2015-03-31","value":1.00466772,"indName":"制造"},{"indName":"二级材料","id":314,"value":1.00485362,"tradeDate":"2015-03-31"},{"value":1.00552668,"id":321,"indName":"三级化工","tradeDate":"2015-03-31"}],"result":"success"}

```


## 2.5 自定义图形样式
如果要自定义复杂的图形样式，比如旋转轴数据的斜度等，可以去阅读echarts的文档，然后按照如下方式自定义样式。
```js
       //自定义样式demo=====
       Echart.line(ec, "main", "line", obj.data, "indName", "tradeDate", "value",theme,function(option){
         //在这里自定义option的属性
         option.title.text = "test";
       });
```

实现了一个function，在里面进行样式的设定。

