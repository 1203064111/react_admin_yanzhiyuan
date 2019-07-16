/**
 * Created by sjb on 18/5/5.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class FreightEditor extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            systemAccountBean:JSON.parse(this.getStorage("systemAccountBean","{}")),
            freightBean:{freight_state:"0",freight_way:"1",freight_type:"1"},
            freight_id:this.props.params.freight_id,
            wayBeans:[{name:"买家承担运费",value:"1"},{name:"卖家承担运费",value:"2"}],
            typeBeans:[{name:"按件",value:"1"},{name:"按重量",value:"2"},{name:"按体积",value:"3"}],

            // freightCityBeans:[{
            //     province_ids:"",
            //     province_names:"",
            //     city_ids:"",
            //     city_names:"",
            //     freight_range:"",
            //     freight_price:"",
            //     freight_add_range:"",
            //     freight_add_price:"",
            // }],
            freightCityBeans:[],
            freightFreeBeans:[],
            display:"none",
            cityBeans:[],
            provinceShowBeans:[],
            province_ids:[],
            province_names:[],


            cityShowBeans:[],
            city_ids:[],
            city_names:[],
            freight_city_index:0
        };
    }

    componentDidMount() {
        if(this.props.params.freight_id!=="-1"){
            this.getFreightDetail();
        }else{

        }
        this.getOneCitys();
    }

    getOneCitys(){
        this.getDataByPost(4,member_homeurl+"/settingController/v1.0/getCitys",{parent_id:"-1"});
    }
    getFreightDetail(){
        this.getDataByPost(1,shop_homeurl+"/goodsController/v1.0/getFreightDetail",{freight_id:this.state.freight_id});
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    freightBean:data,
                    freightCityBeans:data.freightCityBeans,
                    freightFreeBeans:data.freightFreeBeans
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

    insertFreight(){
        if(this.isNull(this.state.freightBean.freight_name)){
            this.showTip("请先添加名称");
            return;
        }


        if(this.state.freightBean.freight_way==="1"){
            for(let i=0;i<this.state.freightCityBeans.length;i++){
                if(this.isNull(this.state.freightCityBeans[i].city_ids)){
                    this.showTip("运费城市未选");
                    return;
                }

                if(this.isNaN(this.state.freightCityBeans[i].freight_range)){
                    this.showTip("首件数非法");
                    return;
                }

                if(this.isNaN(this.state.freightCityBeans[i].freight_price)){
                    this.showTip("首费非法");
                    return;
                }
                if(this.isNaN(this.state.freightCityBeans[i].freight_add_range)){
                    this.showTip("续件数非法");
                    return;
                }
                if(this.isNaN(this.state.freightCityBeans[i].freight_add_price)){
                    this.showTip("续费非法");
                    return;
                }
            }
        }

        if(this.state.freightBean.freight_way==="1"){
            for(let i=0;i<this.state.freightFreeBeans.length;i++){
                if(this.isNull(this.state.freightFreeBeans[i].city_ids)){
                    this.showTip("运费城市未选");
                    return;
                }
                if(this.isNaN(this.state.freightFreeBeans[i].free_range)){
                    this.showTip("免邮条件非法");
                    return;
                }
            }
        }
        var params={};
        params["freight_name"]=this.state.freightBean.freight_name;
        params["freight_way"]=this.state.freightBean.freight_way;
        params["freight_type"]=this.state.freightBean.freight_type;
        params["freight_range"]=this.state.freightBean.freight_range;
        params["freight_price"]=this.state.freightBean.freight_price;
        params["freight_add_range"]=this.state.freightBean.freight_add_range;
        params["freight_add_price"]=this.state.freightBean.freight_add_price;

        params["freight_citys"]=JSON.stringify(this.state.freightCityBeans);
        params["freight_frees"]=JSON.stringify(this.state.freightFreeBeans);
        params["merchants_id"]=this.state.systemAccountBean.merchants_id;
        if(this.state.freight_id==="-1"){
            this.getDataByPost(2,shop_homeurl+"/goodsController/v1.0/insertFreight",params);
        }else{
            params["freight_id"]=this.state.freight_id;
            this.getDataByPost(3,shop_homeurl+"/goodsController/v1.0/updateFreight",params);
        }
    }

    render(){
        return(
            <div>
                <Widget.Toolbar title={"运费详情"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="基础信息"
                    baseData={[
                        {name:"运费名称",flex:1,key:'freight_name'},
                        {name:"默认首件数(件/重量/体积)",flex:1,key:'freight_range'},
                        {name:"默认首费(¥)",flex:1,key:'freight_price'},
                        {name:"默认续件数(件/重量/体积)",flex:1,key:'freight_add_range'},
                        {name:"默认续费(¥)",flex:1,key:'freight_add_price'},

                        {name:"运费方式",flex:1,key:'freight_way',type:'select',data:this.state.wayBeans,show_value:"name",select_value:"value"},
                        {name:"运费类型",flex:1,key:'freight_type',type:'select',data:this.state.typeBeans,show_value:"name",select_value:"value"},
                    ]}
                    data={this.state.freightBean}
                    onChange={(key,value,index)=>{
                        if(key==="class_name"){
                            this.state.goodsClassBeans[index].is_check=value;
                        }else{
                            this.state.freightBean[key]=value;
                        }
                        this.refresh();
                    }}
                    onSave={()=>{
                        this.insertFreight();
                    }}/>
                <Widget.Detail
                    title="运费价格设置"
                    baseData={[]}
                    data={{}}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center'}}>
                                <Widget.Button
                                    style={{display:"flex",marginLeft:20}}
                                    value="添加"
                                    onClick={()=>{
                                        this.state.freightCityBeans.push({
                                            province_ids:"",
                                            province_names:"",
                                            city_ids:"",
                                            city_names:"",
                                            freight_range:"",
                                            freight_price:"",
                                            freight_add_range:"",
                                            freight_add_price:""
                                        });
                                        this.refresh();
                                    }}/>
                            </div>
                        )
                    }}>
                    <div  style={{flex:1,display:'flex',height:40,background:'#efefef'}}>
                        <div  style={{display:'flex',flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <p1  style={{fontSize:13}}>运送到</p1>
                        </div>
                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <p1  style={{fontSize:13}}></p1>
                        </div>
                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <p1  style={{fontSize:13}}>首件数(件/重量/体积)</p1>
                        </div>
                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <p1  style={{fontSize:13}}>首费(¥)</p1>
                        </div>
                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <p1  style={{fontSize:13}}>续件数(件/重量/体积)</p1>
                        </div>
                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <p1  style={{fontSize:13}}>续费(¥)</p1>
                        </div>
                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <p1  style={{fontSize:13}}>操作</p1>
                        </div>
                    </div>
                    <Widget.Foreach
                        style={{display:'flex',flexDirection:'column',cursor: "pointer"}}
                        dataSource={this.state.freightCityBeans}
                        renderRow={(index)=>{
                            return(
                                <div>
                                    <div style={{flex:1,display:'flex',minHeight:40}}>
                                        <div  style={{display:'flex',flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                            <p1 style={{fontSize:13}}>{this.state.freightCityBeans[index].city_names}</p1>
                                        </div>
                                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}
                                            onClick={()=>{
                                                let a=JSON.stringify(this.state.cityBeans)
                                                let provinceShowBeans=JSON.parse(a);

                                                let city_ids=this.split(this.state.freightCityBeans[index].city_ids);

                                                let delId=[];

                                                for(let i=0;i<provinceShowBeans.length;i++){
                                                    let cityBeans=provinceShowBeans[i].cityBeans;
                                                    let count=0;
                                                    for(let j=0;j<cityBeans.length;j++){
                                                        for(let h=0;h<city_ids.length;h++){
                                                            if(cityBeans[j]["id"]+""===city_ids[h]+""){
                                                                count++;
                                                            }
                                                        }
                                                    }

                                                    provinceShowBeans[i].count=count;
                                                }
                                                this.setState({
                                                    province_layer_index:-1,
                                                    provinceShowBeans:provinceShowBeans,
                                                    province_ids:this.split(this.state.freightCityBeans[index].province_ids),
                                                    province_names:this.split(this.state.freightCityBeans[index].province_names),
                                                    city_ids:this.split(this.state.freightCityBeans[index].city_ids),
                                                    city_names:this.split(this.state.freightCityBeans[index].city_names),
                                                    freight_province_index:index,
                                                },()=>{
                                                    this.openHtml("#province","请选择省");
                                                })

                                            }}>
                                            <i className={"Hui-iconfont Hui-iconfont-edit"} title={"编辑"}></i>
                                        </div>
                                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                            <input className="input"
                                                   style={{height:20}}
                                                   value={this.state.freightCityBeans[index].freight_range}
                                                   onChange={(e)=>{
                                                       this.state.freightCityBeans[index].freight_range=e.target.value;
                                                       this.refresh();
                                                   }}/>
                                        </div>
                                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                            <input className="input"
                                                   style={{height:20}}
                                                   value={this.state.freightCityBeans[index].freight_price}
                                                   onChange={(e)=>{
                                                       this.state.freightCityBeans[index].freight_price=e.target.value;
                                                       this.refresh();
                                                   }}/>
                                        </div>
                                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                            <input className="input"
                                                   style={{height:20}}
                                                   value={this.state.freightCityBeans[index].freight_add_range}
                                                   onChange={(e)=>{
                                                       this.state.freightCityBeans[index].freight_add_range=e.target.value;
                                                       this.refresh();
                                                   }}/>
                                        </div>
                                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                            <input className="input"
                                                   style={{height:20}}
                                                   value={this.state.freightCityBeans[index].freight_add_price}
                                                   onChange={(e)=>{
                                                       this.state.freightCityBeans[index].freight_add_price=e.target.value;
                                                       this.refresh();
                                                   }}/>
                                        </div>
                                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                            <i className={"Hui-iconfont Hui-iconfont-add"}
                                               title={"添加"}
                                               onClick={()=>{
                                                   this.state.freightCityBeans.push({
                                                       province_ids:"",
                                                       province_names:"",
                                                       city_ids:"",
                                                       city_names:"",
                                                       freight_range:"",
                                                       freight_price:"",
                                                       freight_add_range:"",
                                                       freight_add_price:""
                                                   });
                                                   this.refresh();
                                               }}></i>
                                            <i className={"Hui-iconfont Hui-iconfont-jianhao"}
                                                      style={{display:"flex"}}
                                                      title={"删除"}
                                                       onClick={()=>{
                                                           this.state.freightCityBeans.splice(index,1);
                                                           this.refresh();
                                                       }}></i>
                                        </div>
                                    </div>
                                    <div style={{flex:1,display:'flex',minHeight:1,background:'#efefef'}}></div>
                                </div>
                            )
                        }}>
                    </Widget.Foreach>
                </Widget.Detail>
                <Widget.Detail
                    title="免邮设置"
                    baseData={[]}
                    data={{}}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center'}}>
                                <Widget.Button
                                    style={{display:"flex",marginLeft:20}}
                                    value="添加"
                                    onClick={()=>{
                                        this.state.freightFreeBeans.push({
                                            province_ids:"",
                                            province_names:"",
                                            city_ids:"",
                                            city_names:"",
                                            free_range:"",
                                        });
                                        this.refresh();
                                    }}/>
                            </div>
                        )
                    }}>
                    <div  style={{flex:1,display:'flex',height:40,background:'#efefef'}}>
                        <div  style={{display:'flex',flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <p1  style={{fontSize:13}}>免邮地区</p1>
                        </div>
                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <p1  style={{fontSize:13}}></p1>
                        </div>
                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <p1  style={{fontSize:13}}>满多少(件/重量/体积)包邮</p1>
                        </div>
                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <p1  style={{fontSize:13}}>操作</p1>
                        </div>
                    </div>
                    <Widget.Foreach
                        style={{display:'flex',flexDirection:'column',cursor: "pointer"}}
                        dataSource={this.state.freightFreeBeans}
                        renderRow={(index)=>{
                            return(
                                <div>
                                    <div style={{flex:1,display:'flex',minHeight:40}}>
                                        <div  style={{display:'flex',flex:3,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                            <p1 style={{fontSize:13}}>{this.state.freightFreeBeans[index].city_names}</p1>
                                        </div>
                                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}
                                              onClick={()=>{
                                                  let a=JSON.stringify(this.state.cityBeans)
                                                  let provinceShowBeans=JSON.parse(a);

                                                  let city_ids=this.split(this.state.freightFreeBeans[index].city_ids);

                                                  let delId=[];

                                                  for(let i=0;i<provinceShowBeans.length;i++){
                                                      let cityBeans=provinceShowBeans[i].cityBeans;
                                                      let count=0;
                                                      for(let j=0;j<cityBeans.length;j++){
                                                          for(let h=0;h<city_ids.length;h++){
                                                              if(cityBeans[j]["id"]+""===city_ids[h]+""){
                                                                  count++;
                                                              }
                                                          }
                                                      }

                                                      provinceShowBeans[i].count=count;
                                                  }
                                                  this.setState({
                                                      province_layer_index:-1,
                                                      provinceShowBeans:provinceShowBeans,
                                                      province_ids:this.split(this.state.freightFreeBeans[index].province_ids),
                                                      province_names:this.split(this.state.freightFreeBeans[index].province_names),
                                                      city_ids:this.split(this.state.freightFreeBeans[index].city_ids),
                                                      city_names:this.split(this.state.freightFreeBeans[index].city_names),
                                                      freight_province_index:index,
                                                  },()=>{
                                                      this.openHtml("#free_province","请选择省");
                                                  })

                                              }}>
                                            <i className={"Hui-iconfont Hui-iconfont-edit"} title={"编辑"}></i>
                                        </div>
                                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                            <input className="input"
                                                   style={{height:20}}
                                                   value={this.state.freightFreeBeans[index].free_range}
                                                   onChange={(e)=>{
                                                       this.state.freightFreeBeans[index].free_range=e.target.value;
                                                       this.refresh();
                                                   }}/>
                                        </div>
                                        <div  style={{display:'flex',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                            <i className={"Hui-iconfont Hui-iconfont-add"}
                                               title={"添加"}
                                               onClick={()=>{
                                                   this.state.freightFreeBeans.push({
                                                       province_ids:"",
                                                       province_names:"",
                                                       city_ids:"",
                                                       city_names:"",
                                                       free_range:"",
                                                   });
                                                   this.refresh();
                                               }}></i>
                                            <i className={"Hui-iconfont Hui-iconfont-jianhao"}
                                               style={{display:"flex"}}
                                               title={"删除"}
                                               onClick={()=>{
                                                   this.state.freightFreeBeans.splice(index,1);
                                                   this.refresh();
                                               }}></i>
                                        </div>
                                    </div>
                                    <div style={{flex:1,display:'flex',minHeight:1,background:'#efefef'}}></div>
                                </div>
                            )
                        }}>
                    </Widget.Foreach>
                </Widget.Detail>
                {this.renderProvince()}
                {this.renderCity()}
                {this.renderFreeProvince()}
                {this.renderFreeCity()}
            </div>
        )
    }
    renderFreeProvince(){
        return(
            <div id="free_province" style={{display:"none",flexDirection:'column'}}>
                <Widget.Foreach
                    count={4}
                    style={{display:'flex'}}
                    dataSource={this.state.provinceShowBeans}
                    renderRow={(index)=>{
                        return(
                            <div style={{display:'flex',alignItems:'center'}}>
                                <Widget.Check
                                    visible="true"
                                    title={this.state.provinceShowBeans[index].name}
                                    checked={this.state.province_ids.indexOf(this.state.provinceShowBeans[index].id+"")>=0?"1":"0"}
                                    onClick={(checked)=>{
                                        let a=JSON.stringify(this.state.provinceShowBeans[index].cityBeans)
                                        let cityShowBeans=JSON.parse(a);

                                        for(let i=0;i<this.state.freightFreeBeans.length;i++){
                                            if(i+""!==this.state.freight_province_index+""){
                                                let city_ids= this.split(this.state.freightFreeBeans[i].city_ids);
                                                for(let j=0;j<city_ids.length;j++){
                                                    this.removeArrayV2(cityShowBeans,"id",city_ids[j]);
                                                }
                                            }
                                        }

                                        if(checked==="1"){
                                            this.state.province_ids.push(this.state.provinceShowBeans[index].id+"");
                                            this.state.province_names.push(this.state.provinceShowBeans[index].name);
                                            this.state.provinceShowBeans[index].count=cityShowBeans.length;
                                        }else{
                                            this.removeArray(this.state.province_ids,this.state.provinceShowBeans[index].id);
                                            this.removeArray(this.state.province_names,this.state.provinceShowBeans[index].name);
                                            this.state.freightFreeBeans[index].count=0;
                                        }

                                        for(let i=0;i<cityShowBeans.length;i++){
                                            if(checked==="1") {
                                                this.state.city_ids.push(cityShowBeans[i].id + "");
                                                this.state.city_names.push(cityShowBeans[i].name);
                                            }else{
                                                this.state.city_ids="";
                                                this.state.city_names="";
                                            }
                                        }

                                        this.setState({
                                            cityShowBeans:cityShowBeans,
                                        })
                                    }}/>
                                <p1 style={{color:'red',fontSize:10}}>{this.state.provinceShowBeans[index].count<=0?"":("("+this.state.provinceShowBeans[index].count+")")}</p1>
                                <i className="Hui-iconfont Hui-iconfont-arrow2-bottom"
                                   onClick={()=>{
                                       let a=JSON.stringify(this.state.provinceShowBeans[index].cityBeans)
                                       let cityShowBeans=JSON.parse(a);

                                       for(let i=0;i<this.state.freightFreeBeans.length;i++){
                                           if(i+""!==this.state.freight_province_index+""){
                                               let city_ids= this.split(this.state.freightFreeBeans[i].city_ids);
                                               for(let j=0;j<city_ids.length;j++){
                                                   this.removeArrayV2(cityShowBeans,"id",city_ids[j]);
                                               }
                                           }
                                       }

                                       this.setState({
                                           province_layer_index:this.state.province_layer_index===-1?layui.layer.index:this.state.province_layer_index,
                                           province_city_index:index,
                                           cityShowBeans:cityShowBeans,
                                       },()=>{
                                           this.openHtml("#free_city","请选择市");
                                       })
                                   }}/>
                            </div>
                        )
                    }}/>
                <div style={{display:'flex',height:40,alignItems:'center',justifyContent:"center"}}>
                    <Widget.Button
                        value="保存"
                        onClick={()=>{
                            var layer = layui.layer;
                            layer.close(this.state.province_layer_index===-1?layer.index:this.state.province_layer_index)
                            this.state.freightFreeBeans[this.state.freight_province_index].city_ids=this.state.city_ids.toString();
                            this.state.freightFreeBeans[this.state.freight_province_index].city_names=this.state.city_names.toString();
                            this.state.freightFreeBeans[this.state.freight_province_index].province_ids=this.state.province_ids.toString();
                            this.state.freightFreeBeans[this.state.freight_province_index].province_names=this.state.province_names.toString();
                            this.refresh()
                        }}/>
                </div>
            </div>
        )
    }

    renderFreeCity(){
        return(
            <div id="free_city" style={{display:"none",flexDirection:'column'}}>
                <Widget.Foreach
                    count={5}
                    style={{display:'flex'}}
                    dataSource={this.state.cityShowBeans}
                    renderRow={(index)=>{
                        return(
                            <div style={{display:'flex',alignItems:'center'}}>
                                <Widget.Check
                                    visible="true"
                                    title={this.state.cityShowBeans[index].name}
                                    checked={this.state.city_ids.indexOf(this.state.cityShowBeans[index].id+"")>=0?"1":"0"}
                                    onClick={(checked)=>{
                                        if(checked==="1"){
                                            this.state.city_ids.push(this.state.cityShowBeans[index].id+"");
                                            this.state.city_names.push(this.state.cityShowBeans[index].name);
                                            var citys_ids="";

                                            let is_hava="1";
                                            let count=0;
                                            for(let h=0;h<this.state.cityShowBeans.length;h++){
                                                if(this.state.city_ids.indexOf(this.state.cityShowBeans[h].id+"")<0){
                                                    is_hava="0";
                                                }else{
                                                    count+=1;
                                                }
                                            }

                                            this.state.provinceShowBeans[this.state.province_city_index].count=count;

                                            if(is_hava==="1"){
                                                this.state.province_ids.push(this.state.provinceShowBeans[this.state.province_city_index].id+"");
                                                this.state.province_names.push(this.state.provinceShowBeans[this.state.province_city_index].name+"");
                                            }
                                        }else{
                                            this.state.provinceShowBeans[this.state.province_city_index].count=parseInt(this.state.provinceShowBeans[this.state.province_city_index].count)-1;

                                            this.removeArray(this.state.province_ids,this.state.provinceShowBeans[this.state.province_city_index].id);
                                            this.removeArray(this.state.province_names,this.state.provinceShowBeans[this.state.province_city_index].name);

                                            this.removeArray(this.state.city_ids,this.state.cityShowBeans[index].id);
                                            this.removeArray(this.state.city_names,this.state.cityShowBeans[index].name);
                                        }
                                        this.refresh()
                                    }}/>
                            </div>
                        )
                    }}/>
                <div style={{display:'flex',height:40,alignItems:'center',justifyContent:"center"}}>
                    <Widget.Button
                        value="保存"
                        onClick={()=>{
                            var layer = layui.layer;
                            layer.close(layer.index)
                            {/*this.state.freightFreeBeans[this.state.freight_province_index].city_ids=this.state.city_ids.toString();*/}
                            {/*this.state.freightFreeBeans[this.state.freight_province_index].city_names=this.state.city_names.toString();*/}
                            this.refresh()
                        }}/>
                </div>
            </div>
        )
    }

    renderProvince(){
       return(
           <div id="province" style={{display:"none",flexDirection:'column'}}>
               <Widget.Foreach
                   count={4}
                   style={{display:'flex'}}
                   dataSource={this.state.provinceShowBeans}
                   renderRow={(index)=>{
                       return(
                           <div style={{display:'flex',alignItems:'center'}}>
                               <Widget.Check
                                   visible="true"
                                   title={this.state.provinceShowBeans[index].name}
                                   checked={this.state.province_ids.indexOf(this.state.provinceShowBeans[index].id+"")>=0?"1":"0"}
                                   onClick={(checked)=>{
                                       let a=JSON.stringify(this.state.provinceShowBeans[index].cityBeans)
                                       let cityShowBeans=JSON.parse(a);

                                       for(let i=0;i<this.state.freightCityBeans.length;i++){
                                           if(i+""!==this.state.freight_province_index+""){
                                               let city_ids= this.split(this.state.freightCityBeans[i].city_ids);
                                               for(let j=0;j<city_ids.length;j++){
                                                   this.removeArrayV2(cityShowBeans,"id",city_ids[j]);
                                               }
                                           }
                                       }

                                       if(checked==="1"){
                                           this.state.province_ids.push(this.state.provinceShowBeans[index].id+"");
                                           this.state.province_names.push(this.state.provinceShowBeans[index].name);
                                           this.state.provinceShowBeans[index].count=cityShowBeans.length;
                                       }else{
                                           this.removeArray(this.state.province_ids,this.state.provinceShowBeans[index].id);
                                           this.removeArray(this.state.province_names,this.state.provinceShowBeans[index].name);
                                           this.state.freightCityBeans[index].count=0;
                                       }

                                       for(let i=0;i<cityShowBeans.length;i++){
                                           if(checked==="1") {
                                               this.state.city_ids.push(cityShowBeans[i].id + "");
                                               this.state.city_names.push(cityShowBeans[i].name);
                                           }else{
                                               this.state.city_ids="";
                                               this.state.city_names="";
                                           }
                                       }

                                       this.setState({
                                           cityShowBeans:cityShowBeans,
                                       })
                                   }}/>
                               <p1 style={{color:'red',fontSize:10}}>{this.state.provinceShowBeans[index].count<=0?"":("("+this.state.provinceShowBeans[index].count+")")}</p1>
                               <i className="Hui-iconfont Hui-iconfont-arrow2-bottom"
                                  onClick={()=>{
                                      let a=JSON.stringify(this.state.provinceShowBeans[index].cityBeans)
                                      let cityShowBeans=JSON.parse(a);

                                      for(let i=0;i<this.state.freightCityBeans.length;i++){
                                          if(i+""!==this.state.freight_province_index+""){
                                              let city_ids= this.split(this.state.freightCityBeans[i].city_ids);
                                              for(let j=0;j<city_ids.length;j++){
                                                  this.removeArrayV2(cityShowBeans,"id",city_ids[j]);
                                              }
                                          }
                                      }

                                      this.setState({
                                          province_layer_index:this.state.province_layer_index===-1?layui.layer.index:this.state.province_layer_index,
                                          province_city_index:index,
                                          cityShowBeans:cityShowBeans,
                                      },()=>{
                                          this.openHtml("#city","请选择市");
                                      })
                                  }}/>
                           </div>
                       )
                   }}/>
               <div style={{display:'flex',height:40,alignItems:'center',justifyContent:"center"}}>
                   <Widget.Button
                        value="保存"
                        onClick={()=>{
                            var layer = layui.layer;
                            layer.close(this.state.province_layer_index===-1?layer.index:this.state.province_layer_index)
                            this.state.freightCityBeans[this.state.freight_province_index].city_ids=this.state.city_ids.toString();
                            this.state.freightCityBeans[this.state.freight_province_index].city_names=this.state.city_names.toString();
                            this.state.freightCityBeans[this.state.freight_province_index].province_ids=this.state.province_ids.toString();
                            this.state.freightCityBeans[this.state.freight_province_index].province_names=this.state.province_names.toString();
                            this.refresh()
                        }}/>
               </div>
           </div>
       )
    }

    renderCity(){
        return(
            <div id="city" style={{display:"none",flexDirection:'column'}}>
                <Widget.Foreach
                    count={5}
                    style={{display:'flex'}}
                    dataSource={this.state.cityShowBeans}
                    renderRow={(index)=>{
                        return(
                            <div style={{display:'flex',alignItems:'center'}}>
                                <Widget.Check
                                    visible="true"
                                    title={this.state.cityShowBeans[index].name}
                                    checked={this.state.city_ids.indexOf(this.state.cityShowBeans[index].id+"")>=0?"1":"0"}
                                    onClick={(checked)=>{
                                        if(checked==="1"){
                                            this.state.city_ids.push(this.state.cityShowBeans[index].id+"");
                                            this.state.city_names.push(this.state.cityShowBeans[index].name);
                                            var citys_ids="";

                                            let is_hava="1";
                                            let count=0;
                                            for(let h=0;h<this.state.cityShowBeans.length;h++){
                                                if(this.state.city_ids.indexOf(this.state.cityShowBeans[h].id+"")<0){
                                                    is_hava="0";
                                                }else{
                                                    count+=1;
                                                }
                                            }

                                            this.state.provinceShowBeans[this.state.province_city_index].count=count;

                                            if(is_hava==="1"){
                                                this.state.province_ids.push(this.state.provinceShowBeans[this.state.province_city_index].id+"");
                                                this.state.province_names.push(this.state.provinceShowBeans[this.state.province_city_index].name+"");
                                            }
                                        }else{
                                            this.state.provinceShowBeans[this.state.province_city_index].count=parseInt(this.state.provinceShowBeans[this.state.province_city_index].count)-1;

                                            this.removeArray(this.state.province_ids,this.state.provinceShowBeans[this.state.province_city_index].id);
                                            this.removeArray(this.state.province_names,this.state.provinceShowBeans[this.state.province_city_index].name);

                                            this.removeArray(this.state.city_ids,this.state.cityShowBeans[index].id);
                                            this.removeArray(this.state.city_names,this.state.cityShowBeans[index].name);
                                        }
                                        this.refresh()
                                    }}/>
                            </div>
                        )
                    }}/>
                <div style={{display:'flex',height:40,alignItems:'center',justifyContent:"center"}}>
                    <Widget.Button
                        value="保存"
                        onClick={()=>{
                            var layer = layui.layer;
                            layer.close(layer.index)
                            {/*this.state.freightCityBeans[this.state.freight_province_index].city_ids=this.state.city_ids.toString();*/}
                            {/*this.state.freightCityBeans[this.state.freight_province_index].city_names=this.state.city_names.toString();*/}
                            this.refresh()
                        }}/>
                </div>
            </div>
        )
    }
}

module.exports=FreightEditor;