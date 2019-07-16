/**
 * Created by sjb on 18/5/18.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class CompanyEditor extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        let systemAccountBean=JSON.parse(this.getStorage("systemAccountBean","{}"));
        this.state = {
            member_id:1,
            memberBean:[],
        };
    }

    componentDidMount() {
        this.getCompanyDetail();
    }





    getCompanyDetail(){
        this.getDataByPost(1,member_homeurl+"/systemController/v1.0/getCompany",{member_id:this.state.member_id})
    }


    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    memberBean:data,
                })

                break;
            case 2:
                this.showTip("修改成功");
                this.getCompanyDetail();
                break;



        }
    }

    updateCompany(){


        var params={};
        params["member_id"]=this.state.memberBean.member_id;
        params["member_nick_name"]=this.state.memberBean.member_nick_name;
        params["recommend_name"]=this.state.memberBean.recommend_name;
        params["information"]=this.state.memberBean.information;
        params["member_real_name"]=this.state.memberBean.member_real_name;
        params["member_phone"]=this.state.memberBean.member_phone;
        params["member_img"]=this.state.memberBean.member_img;


        this.getDataByPost(2,member_homeurl+"/systemController/v1.0/updateCompany",params)

    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"公司详情"} history={this.props.history}></Widget.Toolbar>

                {this.renderDetail()}

            </div>
        )
    }

    renderDetail(){
        return(
            <div style={{display:this.state.display_detail,flexDirection:'column'}}>
                <Widget.Detail
                    title="公司信息"
                    baseData={[

                        {name:"公司名称",flex:1,key:'member_nick_name'},
                        {name:"公司地址",flex:1,key:'recommend_name'},
                        {name:"公司联系人",flex:1,key:'member_real_name'},
                        {name:"公司联系电话",flex:1,key:'member_phone'},
                        {name:"公司logo",flex:1,key:'member_img',type:'img',img_style:{marginLeft:10,width:100,height:100}},
                        {name:"公司介绍",flex:1,key:'information',type:'textarea'},
                        {name:"创建时间",flex:1,key:'create_time',type:'textDate'},
                        {name:"修改时间",flex:1,key:'update_time',type:'textDate'}
                    ]}
                    data={this.state.memberBean}
                    onChange={(key,value,index)=>{
                        this.state.memberBean[key]=value;
                        this.refresh();
                    }}

                />
                <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'center'}}>
                    <Widget.Button
                        style={{display:"flex",marginRight:20,width:200,height:30,marginBottom:20}}
                        value="保存"
                        onClick={()=>{
                            this.updateCompany();
                        }}/>

                </div>




            </div>
        )
    }



}



module.exports=CompanyEditor;