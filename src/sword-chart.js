
/**
 * 语言层面支持方法
 * 修改此脚本请联系作者
 * @author chengn
 * @date   2015-03-20
 */


/**
 * 原生工具
 * @author chengn
 * @date   2015-03-20
 */
var Lang = {
	/**
	 * 数组中为对象时候的排序，根据对象的具体属性排序
	 * @param name   数组中对象的排序属性
	 * @returns {Function}
	 */
    orderBy : function(name){
    	return function(o,p){
            var a, b;
            if (typeof o === "object" && typeof p === "object" && o && p) {
                a = o[name];
                b = p[name];
                if (a === b) {
                    return 0;
                }
                if (typeof a === typeof b) {
                    return a < b ? -1 : 1;
                }
                return typeof a < typeof b ? -1 : 1;
            }
            else {
                throw ("error");
            }
    	};
    },
    /**
     * 
     * @param from  源对象
     * @param to    目的对象
     * @returns 复制的新对象
     */
    clone:function(from){
		var fromType = typeof(from);
		if(this.isArray(from)){
			var to = [];
			for(var i=0;i<from.length;i++){
				to[i] = this.clone(from[i]);
			}
			return to;
		}
    	if(fromType == "object"){
    		var to = {};
        	for(var key in from){
        		to[key] = this.clone(from[key]);
        	}
        	return to;
    	}else{
    		return from;
    	}
    },
    isArray:function(obj){
    	return Object.prototype.toString.call(obj) === '[object Array]'; 
    },
    dateFormater:function(date,format){
    	if(format == null){
    		return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    	}
    	return date;
    },
    addDay:function(date,day){
    	date.setDate(date.getDate() + day);
    	return date;
    },
    addWeek:function(date,week){
    	return this.addDay(date,w * 7);
    },
    addMonth:function(date,month){
        var d = date.getDate();
        date.setMonth(date.getMonth() + month);
        if (date.getDate() < d){
        	date.setDate(0);
        }
        return date;
    },
    addYear:function(date,year){   
    	var m = date.getMonth();
    	date.setFullYear(date.getFullYear() + year);
	    if (m < date.getMonth()) 
	    {
	    	date.setDate(0);
	    }
	    return date;
    },
    /**
     * 对象是否为空
     * @param obj
     * @returns {Boolean}
     */
    isBlank:function(obj){
    	if(obj == null || typeof(obj) == "undefined" || obj == "")
    		return true;
    	return false;
    }
};

/**
 * http工具
 * @author chengn
 * @date  2015-03-20     
 */
var Http = {
		/**
		 * 获取url的get参数
		 * @param name  参数名称
		 * @returns
		 */
		getUrlParam : function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
			var r = window.location.search.substr(1).match(reg); //匹配目标参数
			if (r != null)
				return unescape(r[2]);
			return null; //返回参数值
		},
		rootPath : function() {
			var pathName = window.location.pathname.substring(1);
			var webName = pathName == '' ? '' : pathName.substring(0, pathName
					.indexOf('/'));
			// return window.location.protocol + '//' + window.location.host + '/'+
			// webName + '/';
			return window.location.protocol + '//' + window.location.host + '/'
					+ webName;
	}

};


/**
 * 二维表，json对象互转工具 数据不集中可能存在稀疏矩阵，以后遇到在改进
 * 
 * @author chengn
 * @date 2015-03-20
 */
var TableJson = {
	version : '1.0',
	rowName : 'row',
	colName : 'column',
	value : 'value',

	/**
	 * 得到属性对应在矩阵中的位置
	 * @param array  属性数组
	 * @param value  待查的值
	 * @returns  索引值 
	 */
	getIndex : function(array,value){
		for(var i= 0; i<array.length;i++){
			if(array[i].val == value){
				return array[i].index;
			}
		}
		//下标从0开始
		return array.length;
	},
	
	/**
	 * 	
	 * 矩阵表到json对象的转换
	 * @param table
	 * @returns [
	 * { 
	 *    row: 行号
	 *    col: 列号
	 *    val: 值
	 * }
	 * ]
	 */
	table2Json : function(table){
		var jsonObj = new Array();
		var k=0;
		var obj = {};
		for(var i=0;i<table.length;i++){
			for(var j=0;j<table[i].length;j++){
				obj.row = i;
				obj.col = j;
				obj.val = table[i][j];

				jsonObj[k++] = obj;
			}
		}

		return jsonObj;
	},
	
	/**
	 * json对象转为矩阵表，包含三个数组，一个行值数组，一个列值数组，一个数据的矩阵
	 * @param json    json对象
	 * @param rowName  行属性名称
	 * @param colName  列属性名称
	 * @param valName  值属性名称
	 * @returns 得到一个表.
	 * {
	 *     row: [{val: title,index:11]  ,行title数组,{val: title,index: 矩阵中数据的索引}
	 *     col: [{val: title,index:11]  ,列title数组,{val: title,index: 矩阵中数据的索引}
	 *     val: [[],[],[]]值矩阵,二维数组
	 * }
	 */
	json2TableObj : function(json,rowName,colName,valName){
		var rows = [];    //行索引表
		var cols = [];    //列索引表
		var values = []; //数据表

		if(json.length < 1)
			return;
		for(var i=0;i<json.length;i++){
			var obj = json[i];
			var rowIndex = TableJson.getIndex(rows,obj[rowName]);
			var colIndex = TableJson.getIndex(cols,obj[colName]);

			rows[rowIndex] = {val : obj[rowName], index : rowIndex};
			cols[colIndex] = {val : obj[colName], index : colIndex};
			
			if(values[rowIndex] == null){
				values[rowIndex] = new Array();
			}
			values[rowIndex][colIndex] = obj[valName];
		}

		var table = {row: rows,col : cols, val : values};   
		return table;
	},

	/**
	 * json对象转为经过排序的矩阵表，包含三个数组，一个行值数组，一个列值数组，一个数据的矩阵
	 * @param json    json对象
	 * @param key  行属性名称
	 * @param value  列属性名称
	 * @returns 得到一个键值数组.{keys:键数组,values:值数组}
	 * {
	 *     row:[],  行属性集合
	 *     col:[],  列属性集合
	 *     val:[][],行列属性位置对应的值，一个矩阵，顺序和行列属性的位置对应，
	 * }
	 * 
	 *     eg：row[1]和col[1]组成的值存在[val[1][1]] 
	 *     row:['aa','bb'],col:['周一','周二'],
	 *     那么aa在周一的数据就是val[1][1].
	 *     bb在周一的数据就是val[2][1].
	 */
	json2MapArray : function(dataList,keyName,valueName){
		var keys = [];
		var  values = [];
		for(var i = 0;i<dataList.length;i++){
			keys[i] = dataList[i][keyName];
			values[i] = dataList[i][valueName];
		}
		var mapArr = {key : keys, val : values};
		return mapArr;
	},
	
	/**
	 * 二维json对象转为map的数组，一个是属性名称，一个是属性值
	 * input:[{key:k,value:v},{key:m,value:n}]
	 * output:{key:[k,m],val:[v,n]}
	 * @param dataList   一个json对象的数组   eg:   data:[{key:k,value:v},{key:m,value:n}]
	 * @param keyName    作为属性的json对象键名称
	 * @param valueName  作为值的json对象键名称
	 */
	json2SortMapArray : function(dataList,keyName,valueName){
		dataList = dataList.sort(Lang.orderBy(keyName));
		return this.json2MapArray(dataList,keyName,valueName);
	},
	/**
	 * json对象转为矩阵表，包含三个数组，一个行值数组，一个列值数组，一个数据的矩阵
	 * @param json    json对象
	 * @param rowName  行属性名称
	 * @param colName  列属性名称
	 * @param valName  值属性名称
	 * @returns 得到一个表.
	 * {
	 *     row:[],  行属性集合
	 *     col:[],  列属性集合
	 *     val:[][],行列属性位置对应的值，一个矩阵，顺序和行列属性的位置对应，
	 * }
	 * 
	 *     eg：row[1]和col[1]组成的值存在[val[1][1]] 
	 *     row:['aa','bb'],col:['周一','周二'],
	 *     那么aa在周一的数据就是val[1][1].
	 *     bb在周一的数据就是val[2][1].
	 */
	json2Table : function(json,rowName,colName,valName){
		var table = TableJson.json2TableObj(json,rowName,colName,valName);
		var rows = table.row;
		var cols = table.col;
		var values = table.val;

//		rows = rows.sort(Lang.orderBy("val"));
//		cols = cols.sort(Lang.orderBy("val"));

        var newRows = [];
        var newCols = [];
		var newValues = [];
		for(var i=0;i<rows.length;i++){
			newRows[i] = rows[i].val;
			newValues[i] = new Array();
			for(var j=0;j<cols.length;j++){
				newValues[i][j] = values[rows[i].index][cols[j].index];
				if(newCols[j] == null){
					newCols[j] = cols[j].val;
				}
			}
		}	
		return {row:newRows,col:newCols,val:newValues};
	},
	
	/**
	 * json对象转为经过排序的矩阵表，包含三个数组，一个行值数组，一个列值数组，一个数据的矩阵
	 * @param json    json对象
	 * @param rowName  行属性名称
	 * @param colName  列属性名称
	 * @param valName  值属性名称
	 * @returns 得到一个表.
	 * {
	 *     row:[],  行属性集合
	 *     col:[],  列属性集合
	 *     val:[][],行列属性位置对应的值，一个矩阵，顺序和行列属性的位置对应，
	 * }
	 * 
	 *     eg：row[1]和col[1]组成的值存在[val[1][1]] 
	 *     row:['aa','bb'],col:['周一','周二'],
	 *     那么aa在周一的数据就是val[1][1].
	 *     bb在周一的数据就是val[2][1].
	 */
    //排序后
	json2SortTable : function(json,rowName,colName,valName){
		var table = TableJson.json2TableObj(json,rowName,colName,valName);
		var rows = table.row;
		var cols = table.col;
		var values = table.val;

		rows = rows.sort(Lang.orderBy("val"));
		cols = cols.sort(Lang.orderBy("val"));

        var newRows = [];
        var newCols = [];
		var newValues = [];
		for(var i=0;i<rows.length;i++){
			newRows[i] = rows[i].val;
			newValues[i] = new Array();
			for(var j=0;j<cols.length;j++){
				newValues[i][j] = values[rows[i].index][cols[j].index];
				if(newCols[j] == null){
					newCols[j] = cols[j].val;
				}
			}
		}	
		return {row:newRows,col:newCols,val:newValues};
	}


};


/**
 * echart工具集
 * @author chengn
 * @date  2015-03-20     
 */
var Echart = {
		title:"",
		legend:[],
		xData:[],
		seriesData:[],
		theme:"",
		
		/**
		 * 基础option
		 */
		baseOption : {
			title : {
				show : true,
				x : 'center',
				text : ""
			},
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				padding : 30,
				x : 'right',
				data : []
			},
			toolbox : {
				show : true,
				orient: 'vertical',
				 x: 'right',
			     y: 'center',
				feature : {
					mark : {
						show : false
					},
					dataView : {
						show : true,
						readOnly : false
					},
					magicType : {
						show : false,
						type : []
					},
					restore : {
						show : false
					},
					saveAsImage : {
						show : false
					}
				}
			},
			calculable : true,
			xAxis : [ {
				type : 'category',
				boundaryGap : false, //线图false柱状图true
				data : []
			} ],
			yAxis : [ {
				type : 'value'
			} ],
			series : []
		},
		
		/**
		 * line series template
		 */
		lineSeriesTemplate : { 
			name:'',
            symbol: 'none',
            type:'line',
            data:[]
        },
        /**
         * area series template
         */
		areaSeriesTemplate : {
			 name:'',
	         type:'line',
	         smooth:true,
	         itemStyle: {normal: {areaStyle: {type: 'default'}}},
	         data:[]
		},
		/**
		 * bar series template
		 */
		barSeriesTemplate :{
			name:'',
            type:'bar',
            data:[]
		},
		/**
		 * pie series template
		 */
		pieSeriesTemplate : {
            name:'',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[]
		},	
		/**
		 * 环形图
		 */
		donutSeriesTemplate : {
			name:'',
            type:'pie',
            radius : ['50%', '70%'],
            itemStyle : {
                normal : {
                    label : {
                        show : true
                    },
                    labelLine : {
                        show : true
                    }
                },
                emphasis : {
                    label : {
                        show : true,
                        position : 'center',
                        textStyle : {
                            fontSize : '30',
                            fontWeight : 'bold'
                        }
                    }
                }
            },
            data:[]
		},
		
		/**
		 * 格式化json数据对象，适配echart的数据
		 * @param jsonData     json数据格式
		 * @param title        title
		 * @param legendName   legend数组
		 * @param xAxisName    x轴数据的json对象属性
		 * @param valueName    y轴数据的json对象属性
		 * @param seriesTemplate  对应图形的series template
		 */
		formatData : function(jsonData,title,legendName,xAxisName,valueName,seriesTemplate,isSort){
			if(Lang.isBlank(jsonData))
				return;
			var table=null;
			if(isSort!=null && isSort == false){
				table = TableJson.json2Table(jsonData,legendName,xAxisName,valueName);
			}
			else{
			    table = TableJson.json2SortTable(jsonData,legendName,xAxisName,valueName);
			}
			this.legend = table.row;
			this.xData = table.col;
			var series = this.createSeries(table.row, table.val, seriesTemplate);
			this.seriesData = series;
		},
		/**
		 * 创建series
		 * @param legendData   legend 数组
		 * @param table        legend和xaxis对应的矩阵表
		 * @param seriesTemplate  series模板，使用本对象中定义的
		 */
		createSeries:function(legendData,table,seriesTemplate){
			//如果是一个legendData的时候，table可能就是一个一维数组,转为通用的二维数组
			var data = [];
			var seriesData = [];
			data = table;
			for(var i=0;i<legendData.length;i++){
				var s = Lang.clone(seriesTemplate);
				s.name = legendData[i];
				s.data = data[i];;
				seriesData[i] = s;
			}
			return seriesData;
		},
		/**
		 * 创建pie图的series数据，只有键值对的json值
		 * @param dataJson
		 * @param valueName
		 * @param nameName
		 * @param seriesTemplate
		 * @returns {___series1}
		 */
		createPieSeries:function(dataJson,nameName,valueName,legendArr,seriesTemplate){
			var seriesArr = [];
			var series = Lang.clone(seriesTemplate);
			var sDataArr = [];
			for(var i=0;i<dataJson.length;i++){
				var obj = dataJson[i];
				sDataArr[i] = {value:obj[valueName],name:obj[nameName]};
				legendArr[i] = obj[nameName];
			}
			series.data = sDataArr;
			seriesArr[0] = series;
			return seriesArr;
		},
		
		/**
		 * 绘图
		 * @param ec          echart
		 * @param divid       div id
		 * @param title       标题
		 * @param theme       主题
		 * @returns  mychart
		 */
		chart:function(ec,divid,title,theme,formatFun){
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById(divid),theme);
			
			var option = Lang.clone(this.baseOption);
			option.title.text = title;
			option.legend.data = this.legend;
			option.xAxis[0].data = this.xData;
			option.series = this.seriesData;

			if(formatFun != null){
				formatFun(option);
			}
			myChart.setOption(option);
			
			return myChart;
		},
		/**
		 * 折线图
		 * @param ec             echart
		 * @param divid          div id
		 * @param title          title
		 * @param jsonData       json data ,格式eg : [{},{}]
		 * @param legendName     legend数组
		 * @param xAxisName      xaxis array
		 * @param valueName      the value propertie in json data
		 * @param theme          主题，可空
		 * @param formatFun      客户端格式化option函数，可空
		 */
		line:function(ec,divid,title,jsonData,legendName,xAxisName,valueName, theme,formatFun) {
			this.formatData(jsonData, title, legendName, xAxisName, valueName,this.lineSeriesTemplate);
			return this.chart(ec, divid, title, theme,formatFun);
		},
		
		/**
		 * 折线堆积图
		 * @param ec             echart
		 * @param divid          div id
		 * @param title          title
		 * @param jsonData       json data ,格式eg : [{},{}]
		 * @param legendName     legend数组
		 * @param xAxisName      xaxis array
		 * @param valueName      the value propertie in json data
		 * @param theme          主题，可空
		 * @param formatFun      客户端格式化option函数，可空
		 * @returns
		 */
		lineStack:function(ec,divid,title,jsonData,legendName,xAxisName,valueName, theme,formatFun){
			//对数据进行处理
			var seriesTemplate = Lang.clone(this.lineSeriesTemplate);
			seriesTemplate.stack = "总量";
			//进行绘图
			this.formatData(jsonData, title, legendName, xAxisName, valueName,seriesTemplate);
			return this.chart(ec, divid, title, theme,formatFun);
		},
		
		/**
		 * 面积图
		 * @param ec          echart
		 * @param divid       div的id
		 * @param title       图的title
		 * @param jsonData    一个json数据数组
		 * @param legendName  legend值的属性名称
		 * @param xAxisName   x轴显示数据的属性名称
		 * @param valueName   值属性名称
		 * @param theme       主题，可空
		 * @param formatFun   客户端格式化option函数，可空
		 */
		area:function(ec,divid,title,jsonData,legendName,xAxisName,valueName,theme,formatFun){
			this.formatData(jsonData, title, legendName, xAxisName, valueName,this.areaSeriesTemplate);
			return this.chart(ec, divid, title, theme,formatFun);
		},
		/**
		 * 堆积面积图
		 * @param ec             echart
		 * @param divid          div id
		 * @param title          title
		 * @param jsonData       json data ,格式eg : [{},{}]
		 * @param legendName     legend数组
		 * @param xAxisName      jsonData中的横轴属性
		 * @param valueName      jsonData中的值属性
		 * @param theme       主题，可空
		 * @param formatFun   客户端格式化option函数，可空
		 */
		areaStack:function(ec,divid,title,jsonData,legendName,xAxisName,valueName,theme,formatFun){
			var seriesTemplate = Lang.clone(this.areaSeriesTemplate);
			seriesTemplate.stack = "总量";
			this.formatData(jsonData, title, legendName, xAxisName, valueName,seriesTemplate);
			return this.chart(ec, divid, title, theme,formatFun);
		},

		/**
		 * 柱状图
		 * @param ec          echart
		 * @param divid       div的id
		 * @param title       图的title
		 * @param jsonData    一个json数据数组
		 * @param legendName  legend值的属性名称
		 * @param xAxisName   x轴显示数据的属性名称
		 * @param valueName   值属性名称
		 * @param theme       主题，可空
		 * @param formatFun   客户端格式化option函数，可空
		 */
		bar:function(ec,divid,title,jsonData,legendName,xAxisName,valueName,theme,formatFun,isSort) {
			if(legendName == null){
				legendName = "";
			}
			if(isSort == null)
				isSort = true
			this.formatData(jsonData, title, legendName, xAxisName, valueName,this.barSeriesTemplate,isSort);

			this.baseOption.xAxis[0].boundaryGap = true;
			//对2维数据单独处理,如果不存在legend数据，则认为legendName不存在，是一个2维json对象数组
			if(typeof(this.legend[0]) == "undefined"){
				this.legend[0] = legendName;
			}
			return this.chart(ec, divid, title, theme,formatFun);
		},
		
		/**
		 * bar图的堆积
		 * @param ec          echart
		 * @param divid       div的id
		 * @param title       图的title
		 * @param jsonData    一个json数据数组
		 * @param legendName  legend值的属性名称
		 * @param xAxisName   x轴显示数据的属性名称
		 * @param valueName   值属性名称
		 * @param theme       主题，可空
		 * @param formatFun   客户端格式化option函数，可空
		 */
		barStack:function(ec,divid,title,jsonData,legendName,xAxisName,valueName,theme,formatFun){
			//对数据进行处理
			//对数据进行处理
			var seriesTemplate = Lang.clone(this.barSeriesTemplate);
			seriesTemplate.stack = "总量";
			if(legendName == null){
				legendName = "";
			}
			this.formatData(jsonData, title, legendName, xAxisName, valueName,seriesTemplate);

			this.baseOption.xAxis[0].boundaryGap = true;
			//对2维数据单独处理,如果不存在legend数据，则认为legendName不存在，是一个2维json对象数组
			if(typeof(this.legend[0]) == "undefined"){
				this.legend[0] = legendName;
			}
			return this.chart(ec, divid, title, theme,formatFun);
		},

		/**
		 * bar堆积图的叠加变化率图
		 * @param ec          echart
		 * @param divid       div的id
		 * @param title       图的title
		 * @param jsonData    一个json数据数组
		 * @param legendName  legend值的属性名称
		 * @param xAxisName   x轴显示数据的属性名称
		 * @param valueName   值属性名称
		 * @param theme  主题，可空
		 * @param formatFun   客户端格式化option函数
		 * @param rocFun      变化率数据的处理函数，入参是每个变化率值
		 */
		barRoc:function(ec,divid,title,jsonData,legendName,xAxisName,valueName,theme,formatFun,rocFun){
			if(legendName == null){
				legendName = "";
			}
			this.formatData(jsonData, title, legendName, xAxisName, valueName,this.barSeriesTemplate);
			
			//对2维数据单独处理,如果不存在legend数据，则认为legendName不存在，是一个2维json对象数组
			if(typeof(this.legend[0]) == "undefined"){
				this.legend[0] = legendName;
			}
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById(divid),theme);
			var option = Lang.clone(this.baseOption);
			option.xAxis[0].boundaryGap = true;
			option.title.text = title;
			option.legend.data = this.legend;
			option.xAxis[0].data = this.xData;
			option.series = this.seriesData;

	
			//增加变化率的y轴
			var yroc = {
		            type : 'value',
		            name : '百分比',
		            axisLabel : {
		                formatter: '{value} %'
		            }
		        };
			
			option.yAxis[1] = yroc;
			var k=option.legend.data.length;
			for(var i=0;i<k;i++){
				//叠加变化率的线图
				var barDataArr = option.series[i].data;
				var rocArr = [];
				if(rocFun == null){
					rocArr = Cal.roc(barDataArr,rocFun);
				}
				rocArr = Cal.roc(barDataArr);
				var lineSeries = Lang.clone(this.lineSeriesTemplate);
				lineSeries.data = rocArr;
				
				var lName = option.legend.data[i] + "变化率";
				option.legend.data[k+i] = lName;
				lineSeries.name = lName;
				lineSeries.yAxisIndex = 1;
				option.series[k+i] = lineSeries;
			}
			if(formatFun != null){
				formatFun(option);
			}
			myChart.setOption(option);
			return myChart;
		},
		
		/**
		 * 饼图
		 * @param ec          echart
		 * @param divid       div的id
		 * @param title       图的title
		 * @param jsonData    一个json数据数组
		 * @param nameName    legend值的属性名称
		 * @param valueName   值属性名称
		 * @param theme       主题，可空
		 * @param formatFun   客户端格式化option函数
		 * @returns   mychart
		 */
		pie:function(ec,divid,title,dataJson,nameName, valueName, theme,formatFun) {
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById(divid),theme);
			var option = Lang.clone(this.baseOption);
			//放弃对legengd的显示
//			option.legend.data = 
			var legendArr = [];
			option.series = this.createPieSeries(dataJson,nameName,valueName,legendArr,this.pieSeriesTemplate);
			option.title.text = title;
//			option.legend.data = legendArr;
			option.tooltip.trigger = "item";
			option.tooltip.formatter = "{a} <br/>{b} : {c} ({d}%)" ;
			
			if(formatFun != null){
				formatFun(option);
			}
			
			myChart.setOption(option);
			return myChart;
		},
		/**
		 * 环形图
		 * @param ec          echart
		 * @param divid       div的id
		 * @param title       图的title
		 * @param jsonData    一个json数据数组
		 * @param nameName    legend值的属性名称
		 * @param valueName   值属性名称
		 * @param theme       主题，可空
		 * @param formatFun   客户端格式化option函数
		 * @returns   mychart
		 */
		donut:function(ec,divid,title,dataJson,nameName, valueName, theme,formatFun){
			// 基于准备好的dom，初始化echarts图表
			var myChart = ec.init(document.getElementById(divid),theme);
			var option = Lang.clone(this.baseOption);
			var legendArr = [];
			var seriesArr = this.createPieSeries(dataJson,nameName,valueName,legendArr,this.donutSeriesTemplate);
			console.log(JSON.stringify(seriesArr));
			option.series = seriesArr;
			option.title.text = title;
//			option.legend.data = legendArr;
			option.tooltip.trigger = "item";
			option.tooltip.formatter = "{a} <br/>{b} : {c} ({d}%)" ;
			if(formatFun != null){
				formatFun(option);
			}
			myChart.setOption(option);
			return myChart;
		}

		
		
	
};

/**
 * 计算器
 */
var Cal = {
		/**
		 * 计算给定数组的变化率、
		 * 环比
		 * rate-of-change
		 * @param arr  给定数组
		 * @param rule 显示乘数，默认为1，即结果是小数，要显示百分比输入100 
		 * @return rocArr  给定数组的roe
		 */
		roc:function(arr,formatFun){
			var rocArr = [];
			for(var i=1;i<arr.length;i++){
				rocArr[i] = ((arr[i]-arr[i-1])/arr[i-1]);
				if(formatFun != null){
				    rocArr[i] = formatFun(rocArr[i]);
				}
			}
			return rocArr;
		},
		/**
		 * 对数组进行乘运算
		 * @param arr     指定数组
		 * @param rule    乘数
		 * @returns
		 */
		mutiArr:function(arr,rule,reserve){
			return this.calArr(arr,function(item){
				if(reserve != null){
					return (item*rule).toFixed(reserve);
				}
				return item*rule;
			});
		},
		
		/**
		 * 对数组进行简单运算
		 * @param arr    指定数组
		 * @param calFun 运算函数
		 * @returns
		 */
		calArr:function(arr,calFun){
			for(var i=0;i<arr.length;i++){
				arr[i] = calFun(arr[i]);
			}
			return arr;
		},
		
		/**
		 * 求两个数组对应item的百分比
		 * @param arrA
		 * @param arrB
		 * @returns {Array}
		 */
		percent:function(arrA,arrB,formatFun){
			var arr=[];
			var minLength = arrA.length < arrB.length?arrA.length : arrB.length;
			for(var i=0;i<minLength;i++){			
				arr[i]=arrA[i]/arrB[i];		
				if(formatFun != null){
					arr[i] = formatFun(arr[i]);
				}
			}
			return arr;
		}
};



