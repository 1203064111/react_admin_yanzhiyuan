/**
 * Created by shenjiabo on 16/10/18.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
// import DatePicker from 'react-date-picker'
import moment from 'moment';
import DatePicker from './react-datepicker/lib/index';
import './react-datepicker/dist/react-datepicker.css';


// year	年选择器	只提供年列表选择
// month	年月选择器	只提供年、月选择
// date	日期选择器	可选择：年、月、日。type默认值，一般可不填
// time	时间选择器	只提供时、分、秒选择
// datetime	日期时间选择器	可选择：年、月、日、时、分、秒
class DateComponent extends Component{
    constructor(props) {
        super(props);
        // 初始状态
        this.state={
            id:"date"+uuid(10,100),
        }
    }
    componentDidMount(){
        layui.use('laydate', function(){
            var laydate = layui.laydate;
            //执行一个laydate实例
            laydate.render({
                elem: '#'+this.state.id, //指定元素，
                range: this.props.range?this.props.range:false,
                type:this.props.type?this.props.type:"date",
                btns: ['clear','now', 'confirm'],
                done: function(value, date, endDate){
                    if(this.props.onChange){
                        this.props.onChange(value);
                    }
                    // console.log(value); //得到日期生成的值，如：2017-08-18
                    // console.log(date); //得到日期时间对象：{year: 2017, month: 8, date: 18, hours: 0, minutes: 0, seconds: 0}
                    // console.log(endDate); //得结束的日期时间对象，开启范围选择（range: true）才会返回。对象成员同上。
                }.bind(this)
            });
        }.bind(this));
    }

    render(){
        let value=this.props.value;
        if(this.props.range+""==="true"){
            let a=value.split(' - ');
            let b=a[0];
            let c=a[1];
            if(b&&b.indexOf(".0")>0&&c&&c.indexOf(".0")>0){
                b=b.substring(0,b.length-2);
                c=c.substring(0,c.length-2);
                value=b+" - "+c;
            }
        }else{
            if(value&&value.indexOf(".0")>0){
                value=value.substring(0,value.length-2);
            }
        }
        return(
            <div className="input_div" style={this.props.style}>
                <div className="title" style={this.props.title_style}>
                    <p1 className="title_p" style={this.props.title_p_style}>*</p1>
                    <p1 className="p" style={{color:'#000000'}}>{this.props.title}</p1>
                </div>
                <input type="text"
                       id={this.state.id}
                       className="date"
                       value={value}
                       style={this.props.date_style}/>

            </div>
        )
    }
}

module.exports=DateComponent;