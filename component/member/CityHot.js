/**
 * Created by hwq on 2018/9/14.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class CityHot extends Widget.Base{
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            cityHotBean:{},
            cityHotBeans:{},
            page:1,
            total:0,

            cityBeans:[],


        };
    }

    componentDidMount() {
        this.getCityHots();
        this.getCityOutHots();
    }
    getCityHots(){
        this.getDataByPost(1,member_homeurl+"/settingController/v1.0/getCityHots"
            ,{page:this.state.page})
    }
    getCityOutHots(){
        this.getDataByPost(6,member_homeurl+"/settingController/v1.0/getCityOutHots")
    }
    insertCityHot(){
        var params={};
        if(this.isNull(this.state.cityHotBean.city_name)){
            params["city_name"] = this.state.cityBeans[0].cityBeans[0].name;
        }else{
            params["city_name"] = this.state.cityHotBean.city_name;
        }

        this.getDataByPost(7,member_homeurl+"/settingController/v1.0/insertCityHot", params)
    }

    deleteCityHot(){
        this.getDataByPost(2,member_homeurl+"/settingController/v1.0/deleteCityHot",
            {hot_city_id:this.state.hot_city_id})
    }



    doSuccess(index,data,total){
        switch (index){
            case 1:
                this.setState({
                    cityHotBeans:data,
                    total:total
                });
                break;
            case 2:
                this.showTip("删除成功");
                this.setState({
                    page:1,
                });
                this.getCityHots();
                this.getCityOutHots();
                break;


            case 6:
                this.setState({
                    cityBeans:data,
                })
                break;
            case 7:
                this.showTip("添加成功");
                this.getCityHots();
                this.getCityOutHots();
                break;
        }
    }

    render(){
        return(
            <div style={{background:'#ffffff',display:'flex',flexDirection:'column'}}>

                <Widget.Toolbar title={"热门城市"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="城市信息"
                    baseData={[
                        {name:"省市",flex:1,key1:'province',key2:'city_name',type:'city_hot',addressBeans:this.state.cityBeans},
                    ]}
                    data={this.state.cityHotBean}
                    onChange={(key,value,index)=>{
                        this.state.cityHotBean[key]=value;

                        this.refresh();
                    }}
                    renderButton={()=>{
                        return(
                            <div style={{display:"flex",flex:1,alignItems:'center',justifyContent:'flex-end'}}>
                                <Widget.Button
                                    style={{display:"flex",marginRight:20}}
                                    value="添加"
                                    onClick={()=>{
                                        this.insertCityHot();
                                    }}/>
                            </div>
                        )
                    }}
                />


                <Widget.List
                    data={[{name:"ID",flex:1,key:'hot_city_id'},
                        {name:"城市id",flex:1,key:'city_id'},
                        {name:"城市名称",flex:1,key:'city_name'},
                        {name:"创建时间",flex:1,key:'create_time'},
                        {name:"操作",flex:1,key:"-1"}]}
                    dataSource={this.state.cityHotBeans}
                    operationData={[{title:"删除"}]}
                    operationClick={(rowID,index)=>{
                        switch (index){
                            case 0:
                                this.openTip("确认删除?",()=>{
                                    this.setState({
                                        hot_city_id:this.state.cityHotBeans[rowID].hot_city_id
                                    },()=>{
                                        this.deleteCityHot();
                                    })
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
                            this.getCityHots()
                        })
                    }}>
                </Widget.List>
            </div>
        )
    }





}

module.exports=CityHot;