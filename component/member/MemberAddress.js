/**
 * Created by Administrator on 2018/7/10.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');


class MemberAddress extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            memberAddressBeans:[],
            page:1,
            total:0,
        };
    }
    componentDidMount() {
        this.getMemberAddress();
    }
    getMemberAddress(){
        this.getDataByPost(1,member_homeurl+"/memberController/v1.0/getMemberAddress"
            ,{page:this.state.page})
    }

    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    memberAddressBeans:data,
                    total:total
                });
                break;

            case 3:
                this.getMemberAddress();
                break;
        }
    }



    render(){
        return(
            <div>
                <Widget.Toolbar title={"用户地址列表"} history={this.props.history}></Widget.Toolbar>

                <Widget.List
                    data={[{name:"ID",flex:1,key:'address_id'},
                        {name:"用户ID",flex:1,key:'member_id'},
                        {name:"手机号",flex:1,key:'address_mobile'},
                        {name:"姓名",flex:1,key:'address_name'},
                        {name:"省",flex:1,key:'address_province'},
                        {name:"市",flex:1,key:'address_city'},
                        {name:"区",flex:1,key:'address_country'},
                        {name:"详情地址",flex:1,key:'address_detailed'},
                        {name:"街道",flex:1,key:'address_road'},
                        ]}
                    dataSource={this.state.memberAddressBeans}

                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMemberAddress()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }
}

module.exports=MemberAddress;

