/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class PartsClassEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            service_id:this.props.params.service_id,
            timeBean:{}
        };
    }

    componentDidMount() {
        if(this.props.params.service_id!=="-1"){
            this.getGoodsClassDetail();
        }
    }



    getGoodsClassDetail(){
        this.getDataByPost(1,maintail_homeurl+"/communitycontroller/v1.0/getMaintailServiceTimeDetail",{service_id:this.state.service_id});
    }

 

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    timeBean:data,
                })
                break;
            case 2:
                this.showTip("添加成功");
                this.props.history.goBack();
                break;
            case 3:
                this.showTip("修改成功");
                this.props.history.goBack();
                break;
        }
    }

    insertMaintailServiceTime(){
        var params={};
        params["service_start_time"]=this.state.timeBean.service_start_time;
        params["service_end_time"]=this.state.timeBean.service_end_time;

        if(this.state.service_id==="-1"){
            this.getDataByPost(2,maintail_homeurl+"/communitycontroller/v1.0/insertMaintailServiceTime",params);
        }else{
            params["service_id"]=this.state.service_id;
            this.getDataByPost(3,maintail_homeurl+"/communitycontroller/v1.0/updateMaintailServiceTime",params);
        }
    }


    render(){
        return(
            <div>
                <Widget.Toolbar title={"时间详情"} history={this.props.history}></Widget.Toolbar>
                              
                <Widget.Detail
                    title="基础信息"
                    baseData={[
                        {name:"开始时间",flex:1,key:'service_start_time'},
                        {name:"结束时间",flex:1,key:'service_end_time'},
                    ]}
                    data={this.state.timeBean}

                    onChange={(key,value,index)=>{

                        this.state.timeBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertMaintailServiceTime();
                    }}/>

            </div>
        )
    }

}

module.exports=PartsClassEditor;