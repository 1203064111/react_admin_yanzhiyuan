/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
var WangeditorComponent=require("./../WangeditorComponent");

class MemberSheepDetail extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            memberSheepBean:{},
            member_sheep_id:this.props.params.member_sheep_id,
            sourceBeans:[],
            
            
        };
    }

    componentDidMount() {
            this.getMemberSheepDetail();
    }

    getMemberSheepDetail(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getMemberSheepDetail",{member_sheep_id:this.state.member_sheep_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    memberSheepBean:data,
                    sourceBeans:data.sheepSourceBeans,
                })

                break;
           
        }
    }
    renderInformations(){//溯源信息

        return(
            <div>
                <Widget.List
                    data={[
                        {name:"信息录入",flex:1,key:'source_no_show'},
                        {name:"耳标",flex:1,key:'ear_sign'},
                        {name:"羊舍",flex:1,key:'sheep_room'},
                        {name:'羊重',flex:1,key:'sheep_kg'},
                        {name:'采集时间',flex:1,key:'create_time'},
                    ]}
                    dataSource={this.state.sourceBeans}
                    >
                </Widget.List>

            </div>
        )

    }

    
    
    render(){
        let baseData=[];
        baseData=[{name:'ID',flex:1,key:'member_sheep_id',type:'text'},
        {name:'用户账户',flex:1,key:'member_account',type:'text'},
        {name:'订单ID',flex:1,key:'order_id'},
        {name:'分期ID',flex:1,key:'bitch_sheep_id',type:'text'},
        {name:'名称',flex:1,key:'sheep_name',type:'text'},
        {name:'养殖状态',flex:1,key:'is_finish_show',type:'text'},
        {name:'购买类型',flex:1,key:'sheep_type_show',type:'text'},
    ]
        baseData=baseData.concat(
       [ 
        {name:'耳标',flex:1,key:'ear_sign',type:'text'},
        
        {name:'重量',flex:1,key:'sheep_kg'},
        {name:'羊栏',flex:1,key:'sheep_room'},
        {name:'单价',flex:1,key:'sheep_price',type:'text'},
        {name:'购买时间',flex:1,key:'create_time',type:'text'},
        {name:'开始养殖时间',flex:1,key:'sheep_start_time',type:'text'},
        {name:'养殖完成时间',flex:1,key:'sheep_end_time',type:'text'},   
    ]
      )
        return(
            <div>
                <Widget.Toolbar title={"羊只详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基本信息"
                    baseData={baseData}
                    data={this.state.memberSheepBean}
                    onChange={(key,value,index)=>{
                        this.state.memberSheepBean[key]=value;
                        this.refresh();
                    }}
                    renderButton={
                        ()=>{
                            return(
                                <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',flex:1}}>
                                      <Widget.Button
                                           style={{marginRight:20}}
                                          value="查看订单详情"
                                          onClick={()=>{
                                         //通过order_id追溯订单
                                         this.props.history.push('/order_detail/'+this.state.memberSheepBean.order_id)
                                      }}/>
                                </div>
                            )
                        }
                    }
                    />
                    {this.renderInformations()}
                  
                    
            </div>
        )
    }
}

module.exports=MemberSheepDetail;