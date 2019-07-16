import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');
class ShopGoodsDetailV2 extends Widget.Base{

    constructor(props){
           super(props);
           this.state={
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            shopGoodsBean:{},
            goods_id:this.props.params.goods_id,
            shopTypes:[{name:'兑换',value:'1'},{name:'换购',value:'2'}],
           }
    }

    componentDidMount() {
        console.log(this.state.goods_id)
        
            this.setState(
                {
                    shopGoodsBean:{shop_type:'1',shop_state:'1'},

                }
            )
    }
 
    insertShopGoods(){
        var params={};
        params["goods_id"]=this.state.goods_id;
        params["shop_state"]=this.state.shopGoodsBean.shop_state;
        params["shop_type"]=this.state.shopGoodsBean.shop_type;
        params["goods_need_price"]=this.state.shopGoodsBean.goods_need_price;
        params["goods_need_coin"]=this.state.shopGoodsBean.goods_need_coin;
        params["shop_desc"]=this.state.shopGoodsBean.shop_desc;



    
        this.getDataByPost(3,sheep_homeurl+"/sheepController/v1.0/insertShopGoods",params)

      

       

    }
  
    

    
    doSuccess(index,data){

        switch(index){
            case 1:
            
            break;
            case 3:
            this.showTip("添加成功");
            this.props.history.push("/ShopGoods")
            break;
           
        }

    }

    render(){
        let baseData=[];
        baseData=[
          
            {name:'状态',flex:1,key:'shop_state',type:'radio_select'},
            {name:'类型',flex:1,key:'shop_type',type:'select',data:this.state.shopTypes,select_value:'value',show_value:'name'},
            {name:'兑换所需金币',flex:1,key:'goods_need_coin'},
            {name:'兑换量',flex:1,key:'take_num',type:'text'},
            {name:'描述',flex:1,key:'shop_desc',type:'textarea'} ,
        ]
        if(this.state.shopGoodsBean.shop_type+""==="2"){
            baseData.splice(5,0,{name:'换购金额',flex:1,key:'goods_need_price'})
        }
       
        return(
            <div>
                 <Widget.Toolbar title={"金币商城"} history={this.props.history}></Widget.Toolbar>
                 <Widget.Detail
                    title="商品详细"
                    baseData={baseData}
                    data={this.state.shopGoodsBean}
                    onSave={()=>{
                       this.insertShopGoods();
                    }}
                    onChange={(key,value,index)=>{
                        this.state.shopGoodsBean[key]=value;
                        
                        this.refresh();
                    }}
                    >
                    </Widget.Detail>
                    </div>
                    )
                }

}
module.exports=ShopGoodsDetailV2;