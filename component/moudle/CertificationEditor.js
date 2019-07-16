/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class CertificationEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            member_id:this.props.params.member_id,

            certificationBean:{submit_state:"1"},

        };
    }

    componentDidMount() {
        this.getCertificationBean();
    }

    getCertificationBean(){
        this.getDataByPost(1,moudle_homeurl+"/moudleController/v1.0/getCertificationBean",
            {member_id:this.state.member_id})
    }




    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    certificationBean:data,
                })
                break;
            case 3:
                this.showTip("审核已拒绝");
                this.props.history.goBack();
                break;
        }
    }

    refuseCertificationBean(){

        var params={};
        params["member_id"]=this.state.member_id;
        params["refuse_cause"]=this.state.certificationBean.refuse_cause;

        this.getDataByPost(3,moudle_homeurl+"/moudleController/v1.0/refuseCertificationBean", params)
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
                    data={this.state.certificationBean}
                    onChange={(key,value)=>{

                            this.state.certificationBean[key]=value;

                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:"flex",marginRight:20}}
                                    value="保存"
                                    onClick={()=>{
                                        this.refuseCertificationBean();
                                    }}/>
                            </div>
                        )
                    }}/>
            </div>
        )
    }



}



module.exports=CertificationEditor;