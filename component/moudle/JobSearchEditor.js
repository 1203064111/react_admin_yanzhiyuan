/**
 * Created by Administrator on 2018/7/16.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class JobSearchEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            jobsearch_id:this.props.params.jobsearch_id,

            jobSearchBean:{submit_state:"1"},

        };
    }

    componentDidMount() {
        this.getJobSearchDetail();
    }

    getJobSearchDetail(){
        this.getDataByPost(1,moudle_homeurl+"/jobSearchController/v1.0/getJobSearchDetail",
            {jobsearch_id:this.state.jobsearch_id})
    }




    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    jobSearchBean:data,
                })
                break;
            case 3:
                this.showTip("审核已拒绝");
                this.props.history.goBack();
                break;
        }
    }

    refuseJobSearch(){

        var params={};
        params["jobsearch_id"]=this.state.jobsearch_id;
        params["refuse_cause"]=this.state.jobSearchBean.refuse_cause;

        this.getDataByPost(3,moudle_homeurl+"/jobSearchController/v1.0/refuseJobSearch", params)
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
                    data={this.state.jobSearchBean}
                    onChange={(key,value)=>{

                        this.state.jobSearchBean[key]=value;

                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:"flex",marginRight:20}}
                                    value="保存"
                                    onClick={()=>{
                                        this.refuseJobSearch();
                                    }}/>
                            </div>
                        )
                    }}/>
            </div>
        )
    }



}



module.exports=JobSearchEditor;