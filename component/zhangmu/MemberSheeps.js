/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class MemberSheeps extends Widget.Base{//用户羊管理
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            page:1,
            total:0,
            finishBeans:[{name:'全部',value:''},{name:'养殖中',value:'0'},{name:'养殖完成',value:'1'},{name:'意外死亡',value:'2'}],
            bitch_sheep_id:'',   
            MemberSheepBeans:[],
            bitchBeans:[],
            is_finish:'',  

        };
    }

    componentDidMount() {
        this.getAllBitchs();
       
    }
   
    getMemberSheeps(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getMemberSheeps"
            ,{page:this.state.page,is_finish:this.state.is_finish,bitch_sheep_id:this.state.bitch_sheep_id},{type:2})
    }
    getAllBitchs(){   //xiazai
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/getAllBitchs"
        ,{})
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    MemberSheepBeans:data.data,
                    total:data.total
                });
                break;
                case 2:
            this.setState({
                bitchBeans:data,
                bitch_sheep_id:data[0].bitch_sheep_id
            },()=>{
                this.getMemberSheeps();
            }
        )
           
            break     
            
            
        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                
                <Widget.Toolbar title={"用户羊只列表"} history={this.props.history}></Widget.Toolbar>

                <Widget.View>
                <div style={{display:'flex',alignItems:'center',}}>

                 <Widget.Select
                    title="分期ID"
                    dataSource={this.state.bitchBeans}
                    selectWidth={80}
                    selectHeight={30}
                    select_value="bitch_sheep_id"
                    show_value="bitch_sheep_id"
                    is_must="false"
                    onChange={
                        (index)=>{
                            this.setState({
                                bitch_sheep_id:this.state.bitchBeans[index].bitch_sheep_id
                            })
                        }
                    }
                />
                    <Widget.Select
                    dataSource={this.state.finishBeans}
                    selectWidth={80}
                    selectHeight={32}
                    select_value="value"
                    show_value="name"
                    is_must="false"
                    marginRight={20}
                    onChange={
                        (index)=>{
                            this.setState({
                                is_finish:this.state.finishBeans[index].value
                            })
                        }
                    }/>
                   
                   
                    <Widget.Button
                         style={{
                             marginLeft:20
                         }}
                        value="搜索"
                        onClick={()=>{
                           this.getMemberSheeps();
                        }}/>
                    </div>
                    
                    <div style={{display:'flex',alignItems:'center',justifyContent:'flex-end',flex:1}}>
                   
                        <Widget.Button
                        marginLeft={20}
                        value="上传采集信息"
                        onClick={()=>{
                           this.props.history.push('/sheep_source')
                        }}/>


                    </div>
                </Widget.View>
                
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'member_sheep_id'},
                        {name:"用户账号",flex:2,key:'member_account'},
                        {name:'订单ID',flex:1,key:'order_id'},
                        {name:"羊名称",flex:1,key:'sheep_name'},
                        {name:'分期Id',flex:1,key:'bitch_sheep_id'},
                        {name:"耳标",flex:1,key:'ear_sign'},
                        {name:"购买价格",flex:1,key:'sheep_price'},
                        {name:'羊重',flex:1,key:'sheep_kg'},
                        {name:'羊圈',flex:1,key:'sheep_room'},
                        {name:'养殖状态',flex:1,key:'is_finish_show'},
                        {name:"购买时间",flex:2,key:'create_time'},
                        {name:"完成养殖时间",flex:2,key:'sheep_end_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.MemberSheepBeans }
                    operationData={[{title:"查看"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/member_sheep_Detail/"+this.state.MemberSheepBeans[rowID].member_sheep_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    member_sheep_id:this.state.MemberSheepBeans[rowID].member_sheep_id
                                })
                                break;
                        }
                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getMemberSheeps()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}
module.exports=MemberSheeps;