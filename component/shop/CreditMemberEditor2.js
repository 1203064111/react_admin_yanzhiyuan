/**
 * Created by Administrator on 2018/8/3.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class CreditMemberEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            member_id:this.props.params.member_id,
            shopMemberBean:[],
            creditGradesBeans:[{credit_grades:"授信等级",}],

        };
    }

    componentDidMount() {
        this.getMemberCreditDetail();
        this.getCreditGradess();

    }


    getCreditGradess(){
        this.getDataByPost(4,shop_homeurl+"/creditGradesController/v1.0/getCreditGradess"
            ,{page:this.state.page})
    }


    getMemberCreditDetail(){
        this.getDataByPost(1,shop_homeurl+"/creditGradesController/v1.0/getMemberCreditDetail",{member_id:this.state.member_id})
    }

    insertOrderCredit(){
        if(this.isNull(this.state.shopMemberBean.credit_grades)){
            this.showTip("请选择授信等级");
            return;
        }

        var params={};
        params["member_id"]=this.state.member_id;
        params["credit_id"]=this.state.shopMemberBean.credit_grades;

        this.getDataByPost(2,shop_homeurl+"/orderController/v1.0/insertOrderCredit",
            params);
    }



    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    shopMemberBean:data,
                })
                break;
            case 2:
                this.showTip("赠送成功");
                this.props.history.goBack();
                break;
            case 3:

                break;
            case 4:
                this.setState({
                    creditGradesBeans:this.state.creditGradesBeans.concat(data),
                })
                break;

        }
    }



    render(){
        return(
            <div>
                <Widget.Toolbar title={"授信用户"} history={this.props.history}></Widget.Toolbar>

                {this.renderDetail()}
            </div>
        )
    }

    renderDetail(){

        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>

                <Widget.Detail
                    baseData={[
                    {name:"授信等级",flex:1,key:'credit_grades',type:'select',data:this.state.creditGradesBeans,show_value:"credit_grades",select_value:"credit_id"},

                    ]}
                    data={this.state.shopMemberBean}


                    onChange={(key,value)=>{
                        this.state.shopMemberBean[key]=value;

                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:"flex",marginRight:20}}
                                    value="保存"
                                    onClick={()=>{
                                        this.insertOrderCredit();
                                    }}/>
                            </div>
                        )
                    }}/>

            </div>
        )
    }



}



module.exports=CreditMemberEditor;