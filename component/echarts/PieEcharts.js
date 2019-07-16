/**
 * Created by sjb on 18/7/9.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/chart/pie'

var Widget=require('./../../widget/widget');

class PieEcharts extends Widget.Base{
    componentDidMount() {
    }
    render() {
        if(document.getElementById(this.props.id)){
            var myChart = echarts.init(document.getElementById(this.props.id));
            myChart.setOption({
                title : {
                    text:this.props.title,
                    subtext: '',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                series : [
                    {
                        name: '',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '50%'],
                        data:this.props.data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            });
        }

        return (
            <div>
                <div id={this.props.id} style={this.props.style?this.props.style:{width: 400, height: 400 }}></div>
            </div>
        );
    }
}
module.exports=PieEcharts;