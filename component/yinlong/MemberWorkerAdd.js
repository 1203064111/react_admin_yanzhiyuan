/**
 * Created by Administrator on 2018/6/26.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class MemberWorkerAdd extends Widget.Base{
    constructor(props) {
        super(props);
        this.state = {
            memberBean:{},
            memberWorkerBean:{},
            cityBeans:[],
            member_id:this.props.params.member_id,
            member_type:2,
            sexBeans:[{name:'男',value:'m'},{name:'女',value:'w'}]
        };
    }



    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    memberBean:data,
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
            case 4:
                this.setState({
                    cityBeans:data

                })
                break;
        }
    }

    componentDidMount() {

        this.getCitys();

    }

    getCitys(){
        this.getDataByPost(4,member_homeurl+"/settingController/v1.0/getCitys",{});
    }

    insertSheepCLass(){
        if(this.isNull(this.state.memberBean.member_account)){
            this.showTip("请填写手机账号！");
            return;
        }
        if(this.state.memberBean.member_account.length!=11){
            this.showTip("手机号码只能为11位！");
            return;
        }
        if(this.isNull(this.state.memberBean.member_password)){
            this.showTip("请填写密码！");
            return;
        }
        if(this.isNull(this.state.memberBean.member_sex)){
            this.showTip("请填写性别！");
            return;
        }
        var params={};
        params["member_account"]=this.state.memberBean.member_account;
        params["member_password"]=this.state.memberBean.member_password;
        params["member_img"]=this.state.memberBean.member_img;
        params["member_real_name"]=this.state.memberBean.member_real_name;
        params["member_birthday"]=this.state.memberBean.member_birthday;
        params["member_type"]=this.state.member_type;
        params["member_sex"]=this.state.memberBean.member_sex;

        params["member_phone"]=this.state.memberWorkerBean.member_phone;
        params["member_name"]=this.state.memberWorkerBean.member_name;
        params["worker_type"]=this.state.memberWorkerBean.worker_type;
        params["member_provider"]=this.getNull(this.state.memberWorkerBean.member_provider,this.state.cityBeans[0].name);
        params["member_city"]=this.getNull(this.state.memberWorkerBean.member_city,this.state.cityBeans[0].cityBeans[0].name);
        params["member_country"]=this.getNull(this.state.memberWorkerBean.member_country,this.state.cityBeans[0].cityBeans[0].cityBeans[0].name);


        if(this.state.member_id+""==="-1"){

            this.getDataByPost(2,maintail_homeurl+"/yinlongMemberController/v1.0/insertMemberWorker",params);
        }
    }


    render(){
        let baseData=[
            {name:'手机账号',flex:'1',key:'member_account'},
            {name:'密码',flex:'1',key:'member_password'},
            {name:'头像',flex:'1',key:'member_img',type:'img',img_style:{width:100,height:100,marginLeft:10}},
            {name:'真实姓名',flex:'1',key:'member_real_name'},
            {name:'出生日期',flex:'1',key:'member_birthday',type:'date'},
            {name:"性别",flex:1,key:'member_sex',type:'radio',data:this.state.sexBeans,select_value:'value',show_value:'name'}
        ];
        return(
            <div>
                <Widget.Toolbar title={"添加师傅"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="用户基础信息"
                    baseData={baseData}
                    data={this.state.memberBean}
                    onChange={(key,value)=>{
                        this.state.memberBean[key]=value;
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertSheepCLass();
                    }}/>
                {this.renderAddress()}

            </div>
        )
    }




    renderAddress(){
        let baseData=[
            {name:'联系电话',flex:'1',key:'member_phone'},
            {name:'联系人',flex:'1',key:'member_name'},
            {name:'工种',flex:'1',key:'worker_type'},
            {name:"省市区",flex:1,key1:'member_provider',key2:'member_city',key3:'member_country',type:'city',addressBeans:this.state.cityBeans},
        ];
        return(
            <div>
                <Widget.Detail
                    title="维修师傅详情信息"
                    baseData={baseData}
                    data={this.state.memberWorkerBean}
                    onChange={(key,value)=>{
                        this.state.memberWorkerBean[key]=value;
                        this.refresh();
                    }}
                />
            </div>
        )
    }





}




module.exports=MemberWorkerAdd;
