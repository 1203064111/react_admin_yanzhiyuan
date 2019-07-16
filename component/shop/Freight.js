/**
 * Created by sjb on 18/5/11.
 */

import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class Freight extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            freightBeans:[],
            page:1,
            total:0,
        };
    }

    componentDidMount() {
        this.getFreights();
    }
    getFreights(){
        this.getDataByPost(1,shop_homeurl+"/goodsController/v1.0/getFreights"
            ,{page:this.state.page,merchants_id:this.state.systemAccountBean.merchants_id},{type:2})
    }

    deleteFreight(){
        this.getDataByPost(2,shop_homeurl+"/goodsController/v1.0/deleteFreight",{freight_id:this.state.freight_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    freightBeans:data.data,
                    total:data.total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getFreights();
                break;
            case 3:
                this.getFreights();
                break;
        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>
                <Widget.Tip visible={this.state.visible} msg="确定删除?"
                            onClose={()=>{
                                this.setState({
                                    visible:false
                                })
                            }}
                            onPress={()=>{
                                this.deleteFreight();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"运费模板"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        style={{display:this.state.systemAccountBean.system_type+""==="2"?"flex":"none"}}
                        marginLeft={20}
                        value="添加"
                        onClick={()=>{
                            this.props.history.push("/goods_freight_editor/-1");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[{name:"模板ID",flex:1,key:'freight_id'},
                        {name:"商家名称",flex:1,key:'merchants_name'},
                        {name:"模板名称",flex:1,key:'freight_name'},
                        {name:"默认首件数(件)",flex:1,key:'freight_range'},
                        {name:"默认首费(¥)",flex:1,key:'freight_price'},
                        {name:"默认续件数(件)",flex:1,key:'freight_add_range'},
                        {name:"默认续费(¥)",flex:1,key:'freight_add_price'},
                        {name:"模板方式",flex:1,key:'freight_way_show'},
                        {name:"模板类型",flex:1,key:'freight_type_show'},
                        {name:"权重",flex:1,key:'sort',type:'sort'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:2,key:"-1"}]}
                    dataSource={this.state.freightBeans}
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/goods_freight_editor/"+this.state.freightBeans[rowID].freight_id);
                                break;
                            case 1:
                                this.setState({
                                    visible:true,
                                    freight_id:this.state.freightBeans[rowID].freight_id
                                })
                                break;
                        }
                    }}
                    onChange={(rowID,key,value)=>{
                        if(key==="sort"){
                            this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/moveFreight"
                                ,{freight_id:this.state.freightBeans[rowID].freight_id
                                    ,sort:this.state.freightBeans[rowID].sort,
                                    sort_type:value})
                        }else if(key==="freight_state"){
                            this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/updateFreight",
                                {freight_id:this.state.freightBeans[rowID].freight_id,
                                    freight_state:value});
                        }

                    }}
                    onMove={(rowID,key,type)=>{
                        this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/moveFreight"
                            ,{freight_id:this.state.freightBeans[rowID].freight_id
                                ,sort:this.state.freightBeans[rowID].sort,
                                sort_type:type})

                    }}
                    page={this.state.page}
                    total={this.state.total}
                    onPage={(page)=>{
                        this.setState({
                            page:page
                        },()=>{
                            this.getFreights()
                        })
                    }}>
                </Widget.List>
            </div>
        );
    }
}

module.exports=Freight;