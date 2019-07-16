/**
 * Created by Administrator on 2018/8/3.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class CreditGradesEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            credit_id:this.props.params.credit_id,
            creditGradesBean:[],
        };
    }

    componentDidMount() {

        this.getCreditGradesDetail();

    }


    getCreditGradesDetail(){
        this.getDataByPost(1,shop_homeurl+"/creditGradesController/v1.0/getCreditGradesDetail",{credit_id:this.state.credit_id})
    }



    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    creditGradesBean:data,
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

    insertCreditGrades(){

        var params={};
        params["credit_grades"]=this.state.creditGradesBean.credit_grades;

        params["credit_balance"]=this.state.creditGradesBean.credit_balance;



        if(this.state.credit_id==="-1"){
            this.getDataByPost(2,shop_homeurl+"/creditGradesController/v1.0/insertCreditGrades",params)
        }else{
            params["credit_id"]=this.state.credit_id;
            this.getDataByPost(3,shop_homeurl+"/creditGradesController/v1.0/updateCreditGrades",params)
        }

    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"授信详情"} history={this.props.history}></Widget.Toolbar>

                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){
        let baseData=[];
        if(this.props.params.credit_id==="-1"){
            baseData=[{name:"授信等级",flex:1,key:'credit_grades'},
                {name:"等级额度",flex:1,key:'credit_balance'},];
        }else{
            baseData=[{name:"授信ID",flex:1,key:'credit_id',type:'text'},
                {name:"授信等级",flex:1,key:'credit_grades'},
                {name:"等级额度",flex:1,key:'credit_balance'},];
        }
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>

                <Widget.Detail
                    title="基础信息"
                    baseData={baseData}
                    data={this.state.creditGradesBean}


                    onChange={(key,value)=>{
                        this.state.creditGradesBean[key]=value;

                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:"flex",marginRight:20}}
                                    value="保存"
                                    onClick={()=>{
                                        this.insertCreditGrades();
                                    }}/>
                            </div>
                        )
                    }}/>

            </div>
        )
    }







}



module.exports=CreditGradesEditor;