/**
 * Created by sjb on 18/8/13.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class Percent extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            percentBeans:[]
        };
    }

    componentDidMount() {
        this.getPercents();
    }
    getPercents(){
        this.getDataByPost(1,shop_homeurl+"/shopSettingController/v1.0/getPercents",{});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    percentBeans:data
                })
                break;
            case 2:
                this.showTip("保存成功");
                break;
        }
    }

    savePercents(){
        this.getDataByPost(2,shop_homeurl+"/shopSettingController/v1.0/savePercents",{json:JSON.stringify(this.state.percentBeans)});
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"比例设置"} history={this.props.history}></Widget.Toolbar>
                <Widget.Foreach
                    count={3}
                    style={{display:"flex",cursor: "pointer"}}
                    dataSource={this.state.percentBeans}
                    renderRow={(index)=>{
                        return(
                            <div style={{display:'flex',alignItems:'center',marginTop:10}}>
                                <Widget.Editor
                                    title_style={{width:150}}
                                    title_p_style={{display:"flex"}}
                                    input_style={{marginLeft:10,width:150}}
                                    title={this.state.percentBeans[index].percent_name}
                                    value={this.state.percentBeans[index].percent_value}
                                    onChange={(value)=>{
                                        this.state.percentBeans[index].percent_value=value;
                                        this.refresh();
                                    }}/>
                            </div>
                        )
                    }}>
                </Widget.Foreach>
                <div style={{display:"flex",flex:1,marginTop:20,alignItems:'center',justifyContent:'center'}}>
                    <Widget.Button
                        style={{display:"flex",marginRight:20,width:200,height:30,marginBottom:20}}
                        value="保存"
                        onClick={()=>{
                            this.savePercents();
                        }}/>
                </div>
            </div>
        )
    }
}

module.exports=Percent;