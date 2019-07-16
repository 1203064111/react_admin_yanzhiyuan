/**
 * Created by shenjiabo on 16/10/18.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import {toast} from 'react-android-style-toast';


class CityComponent extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state={
            sourceArea:[""],
            addressBeans:[],
            cityBeans:[],
            areaBeans:[],
        }
    }

    render(){
        let provinceView=[];
        let cityView=[];
        let areaView=[];
        let provinceIndex=0;
        let cityIndex=0;
        let areaIndex=0;

        if(this.props.addressBeans&&this.props.addressBeans.length>0){
            for(let i=0;i<this.props.addressBeans.length;i++){
                if(this.props.province+""===this.props.addressBeans[i].name+""){
                    provinceIndex=i;
                    provinceView.push(<option key={i} selected="selected">{this.props.addressBeans[i]["name"]}</option>);
                }else{
                    provinceView.push(<option key={i}>{this.props.addressBeans[i]["name"]}</option>);
                }
            }

            var cityBeans=this.props.addressBeans[provinceIndex].cityBeans;
            if(cityBeans){
                for(let i=0;i<cityBeans.length;i++){
                    if(this.props.city+""===cityBeans[i].name+""){
                        cityIndex=i;
                        cityView.push(<option key={i} selected="selected">{cityBeans[i]["name"]}</option>);
                    }else{
                        cityView.push(<option key={i}>{cityBeans[i]["name"]}</option>);
                    }
                }
            }

            var areaBeans=this.props.addressBeans[provinceIndex].cityBeans[cityIndex].cityBeans;
            if(areaBeans){
                for(let i=0;i<areaBeans.length;i++){
                    if(this.props.area+""===areaBeans[i].name+""){
                        areaIndex=i;
                        areaView.push(<option key={i} selected="selected">{areaBeans[i].name}</option>);
                    }else{
                        areaView.push(<option key={i}>{areaBeans[i].name}</option>);
                    }
                }
            }
        }



        return(
            <div style={{display:!this.props.visible||this.props.visible==='true'?'flex':"none",height:50, alignItems:'center'
                ,marginTop:this.props.marginTop?this.props.marginTop:0,marginRight:this.props.marginRight?this.props.marginRight:0}}>
                <div style={{width:this.props.width?this.props.width:100,display:this.props.title?"flex":'none',justifyContent:'flex-end',}}>
                    <p1 style={{display:(this.props.is_must==='true'?"flex":"none"),color:'red',marginLeft:10}}>*</p1>
                    <p1 style={{fontSize:13,}}>{this.props.title}</p1>
                </div>
                <select
                    style={{marginLeft:10,width:this.props.selectWidth?this.props.selectWidth:200,height:30,fontSize:10}}
                    ref="provinceselect"
                    onChange={()=>{
                        if(this.props.onChange){
                            this.props.onChange(this.props.addressBeans[this.refs.provinceselect.selectedIndex].name
                                ,this.props.addressBeans[this.refs.provinceselect.selectedIndex].cityBeans[0].name
                                ,this.props.addressBeans[this.refs.provinceselect.selectedIndex].cityBeans[0].cityBeans[0].name);
                        }
                    }}>
                    {provinceView}
                </select>
                <select
                    style={{marginLeft:10,width:this.props.selectWidth?this.props.selectWidth:200,height:30,fontSize:10}}
                    ref="cityselect"
                    onChange={()=>{
                        console.log()
                        if(this.props.onChange){
                            this.props.onChange(this.props.addressBeans[provinceIndex].name
                                ,this.props.addressBeans[provinceIndex].cityBeans[this.refs.cityselect.selectedIndex].name
                                ,this.props.addressBeans[provinceIndex].cityBeans[this.refs.cityselect.selectedIndex].cityBeans[0].name);
                        }
                    }}>
                    {cityView}
                </select>
                <select
                    style={{marginLeft:10,width:this.props.selectWidth?this.props.selectWidth:200,height:30,fontSize:10}}
                    ref="areaselect"
                    onChange={()=>{
                        if(this.props.onChange){
                            this.props.onChange(this.props.addressBeans[provinceIndex].name
                                ,this.props.addressBeans[provinceIndex].cityBeans[cityIndex].name
                                ,this.props.addressBeans[provinceIndex].cityBeans[cityIndex].cityBeans[this.refs.areaselect.selectedIndex].name);
                        }
                    }}>
                    {areaView}
                </select>
            </div>
        )
    }
}

module.exports=CityComponent;