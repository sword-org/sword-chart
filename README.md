# sword-chart
非常简单的javascript的绘图库，一行代码绘制常见图形。

# 示例
  * 下载本项目demo文件，使用浏览器打开demo项目中的sword-chart.html文件查看
  * 访问 [chart示例](http://www.chengn.com/sword-chart/demo.html)

# 开发步骤
## 引入js库
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

## 创建html页面布局
```html
	 <div id="main2" style="height:400px" ></div>
```

## 绘图
```js
   # 示例数据
   var obj = {"msg":null,"result":"success","data":[{"id":1,"indName":"三级传媒","value":1.00034815,"tradeDate":"2015-01-06"},{"value":0.89917462,"indName":"二级传媒","tradeDate":"2015-01-06","id":2},{"id":3,"indName":"传媒","value":10.00347625,"tradeDate":"2015-01-06"},{"id":4,"tradeDate":"2015-01-07","value":0.89906148,"indName":"三级传媒"},{"indName":"二级传媒","value":0.89948459,"id":5,"tradeDate":"2015-01-07"},{"indName":"传媒","value":8.63924241,"tradeDate":"2015-01-07","id":6},{"value":0.89944371,"id":7,"tradeDate":"2015-01-08","indName":"三级传媒"},{"value":1.00033518,"tradeDate":"2015-01-08","indName":"二级传媒","id":8},{"tradeDate":"2015-01-08","value":7.25668226,"id":9,"indName":"传媒"},{"tradeDate":"2015-01-06","value":0.89948264,"id":10,"indName":"三级军工"},{"indName":"二级军工","id":11,"tradeDate":"2015-01-06","value":1.00037711},{"id":12,"indName":"军工","tradeDate":"2015-01-06","value":0.89948325},{"id":13,"tradeDate":"2015-01-07","indName":"三级军工","value":0.89948968},{"indName":"二级军工","tradeDate":"2015-01-07","id":14,"value":1.00015308},{"indName":"军工","value":6.22684023,"tradeDate":"2015-01-07","id":15},{"id":16,"indName":"三级军工","tradeDate":"2015-01-08","value":0.89948335},{"id":17,"tradeDate":"2015-01-08","value":0.89948515,"indName":"二级军工"},{"indName":"军工","id":18,"tradeDate":"2015-01-08","value":0.89917096},{"tradeDate":"2015-01-06","indName":"三级传媒","value":1.00034815,"id":19},{"id":20,"value":0.89917462,"tradeDate":"2015-01-06","indName":"二级传媒"}]};

 require([ 'echarts', 
              'echarts/theme/dark',
              'echarts/chart/line'], function(ec,theme) {
		   Echart.line(ec, "main", "line", obj.data, "indName", "tradeDate", "value",theme);
		});
```