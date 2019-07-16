/**
 * 2018/12/05 zhuxiong
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

var type="advertiseOrderMember";
class AdvertiseOrderMember extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            position_id:this.props.params.position_id,
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            requirePositionBean:[],
            total:0,
            page:this.getNull(this.getSessionStorage(type+"page"),1),


        };
    }
    componentDidMount() {
        this.getFinalAdvertiseOrderMember();
    }
    getFinalAdvertiseOrderMember(){
        this.setSessionStorage(type+"page",this.state.page);
        this.getDataByPost(1,information_homeUrl+"/positionController/v1.0/getRequirePositions",
            {
                page:this.state.page,
                position_id:this.state.position_id,
            });
    }
    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    requirePositionBean:data,
                    total:total
                });
                break;
            case 2:
                this.getFinalAdvertiseOrderMember();
                break;


        }
    }


    render(){


        return(
            <div>
                <Widget.Toolbar title={"简历列表"} history={this.props.history}></Widget.Toolbar>


                <Widget.List
                    data={[{name:"简历ID",flex:1,key:'require_position_id'},
                        {name:"用户id",flex:1,key:'member_id'},
                        {name:"用户银行卡号",flex:1,key:'bank_account'},
                        {name:"用户支付宝账号",flex:1,key:'alipay_account'},
                        {name:"简历名称",flex:1,key:'name'},
                        {name:"是否打款给用户",flex:1,key:'order_remit',type:'radio_select'},
                        ]}
                    dataSource={this.state.requirePositionBean}
                    onChange={(rowID,key,value)=>{
                        if(key==="order_remit"){
                            if(value==="1") {
                                this.openTip("确认打款?",()=>{
                                    this.setState({

                                    },()=>{
                                        this.getDataByPost(2, information_homeUrl + "/positionController/v1.0/updatePositionPersonRemit"
                                            , {
                                                position_persons_id: this.state.requirePositionBean[rowID].position_persons_id,
                                                member_id: this.state.requirePositionBean[rowID].member_id,
                                                position_id: this.state.position_id,
                                                order_remit: value
                                            });
                                    })
                                })

                            }

                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getFinalAdvertiseOrderMember()
                        })
                    }}>
                </Widget.List>


            </div>
        )
    }
}

module.exports=AdvertiseOrderMember;


