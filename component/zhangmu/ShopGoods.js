/**
 * Created by sjb on 18/6/23.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class ShopGoods extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            shopGoodsBeans:[],
            page:1,
            total:0,
           
        };
    }

    componentDidMount() {
        this.getShopGoods();
    }
    getShopGoods(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getShopGoods",{page:this.state.page},{type:2})
    }

    deleteShopGoods(){
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/deleteShopGoods",{shop_id:this.state.shop_id})
    }
    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    shopGoodsBeans:data.data,
                    total:data.total,
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.getShopGoods();
                break;
                case 3:
                this.showTip("移动成功")
                this.getShopGoods();
                break;
                case 4:
                this.getShopGoods();
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
                                this.deleteShopGoods();
                            }}></Widget.Tip>
                <Widget.Toolbar title={"金币商城"} history={this.props.history}></Widget.Toolbar>
                <Widget.View>
                    <Widget.Button
                        marginLeft={20}
                        value="添加商品"
                        onClick={()=>{
                            this.props.history.push("/selectGoods");
                        }}/>
                </Widget.View>
                <Widget.List
                    data={[
                        {name:"ID",flex:1,key:'shop_id'},
                        {name:"商品名",flex:1,key:'goods_name'},
                        {name:'图片',flex:1,key:'goods_img',type:'img'},
                        {name:"类型",flex:1,key:'shop_type_show'},
                        {name:'状态',flex:1,key:'shop_state',type:'radio_select'},
                        {name:"排序",flex:1,key:'sort',type:'sort'},
                        {name:"操作",flex:2,key:"-1"}]}
                        onChange={
                            (rowID,key,value)=>{
                                if(key==="sort"){
                                    this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/moveShopGoods",
                                    {shop_id:this.state.shopGoodsBeans[rowID].shop_id,
                                        sort:this.state.shopGoodsBeans[rowID].sort,
                                        sort_type:value});
                                }

                                if(key==="shop_state"){
                                    this.getDataByPost(4,sheep_homeurl+"/sheepController/v1.0/updateShopGoods",
                                    {shop_id:this.state.shopGoodsBeans[rowID].shop_id,
                                        shop_state:value,
                                        });

                                }
                                this.refresh();
                            }
                        }

                    dataSource={this.state.shopGoodsBeans}
                  
                    operationData={[{title:"编辑"},{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.props.history.push("/shopGoods_detail/"+this.state.shopGoodsBeans[rowID].shop_id);
                                break;

                            case 1:
                                this.setState({
                                    visible:true,
                                    shop_id:this.state.shopGoodsBeans[rowID].shop_id
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
                            this.getShopGoods()
                        })
                    }}>
                    >
                </Widget.List>
            </div>
        );
    }
}

module.exports=ShopGoods;