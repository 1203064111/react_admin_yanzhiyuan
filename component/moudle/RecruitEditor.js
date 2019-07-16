/**
 * Created by Administrator on 2018/7/16.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class RecruitEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            recruit_id:this.props.params.recruit_id,

            recruitBean:{submit_state:"1"},

        };
    }

    componentDidMount() {
        this.getRecruitDetail();
    }

    getRecruitDetail(){
        this.getDataByPost(1,moudle_homeurl+"/recruitController/v1.0/getRecruitDetail",
            {recruit_id:this.state.recruit_id})
    }




    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    recruitBean:data,
                })
                break;
            case 3:
                this.showTip("审核已拒绝");
                this.props.history.goBack();
                break;
        }
    }

    refuseRecruit(){

        var params={};
        params["recruit_id"]=this.state.recruit_id;
        params["refuse_cause"]=this.state.recruitBean.refuse_cause;

        this.getDataByPost(3,moudle_homeurl+"/recruitController/v1.0/refuseRecruit", params)
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"审核拒绝"} history={this.props.history}></Widget.Toolbar>
                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>
                <Widget.Detail
                    title="拒绝原因"
                    baseData={[
                        {name:"拒绝原因",flex:1,key:'refuse_cause'},

                    ]}
                    data={this.state.recruitBean}
                    onChange={(key,value)=>{

                        this.state.recruitBean[key]=value;

                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:"flex",marginRight:20}}
                                    value="保存"
                                    onClick={()=>{
                                        this.refuseRecruit();
                                    }}/>
                            </div>
                        )
                    }}/>
            </div>
        )
    }



}



module.exports=RecruitEditor;