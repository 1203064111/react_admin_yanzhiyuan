/**
 * Created by sjb on 18/5/15.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class Specification extends Widget.Base{

    constructor(props) {
        super(props);
        this.state = {
            specificationBeans:[],
        };
    }

    componentDidMount() {
        this.getSpecifications();
    }

    getSpecifications(){
        this.getDataByPost(1,shop_homeurl+"/goodsController/v1.0/getSpecifications"
            ,{})
    }

    doSuccess(index,data){
        switch (index){
            case 1:
                this.setState({
                    specificationBeans:data,
                });
                break;
            case 2:
                this.showTip("保存成功");
                this.getSpecifications();
                break;
        }
    }

    insertSpecifications(){
        this.getDataByPost(2,shop_homeurl+"/goodsController/v1.0/insertSpecifications"
            ,{specifications:JSON.stringify(this.state.specificationBeans)})
    }
    render(){
        return(
            <div>
                <Widget.Toolbar title={"规格管理"} history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    title="规格信息"
                    baseData={[]}
                    data={{}}
                    renderButton={()=>{
                        return(
                            <div style={{display:'flex',flex:1,alignItems:'center'}}>
                                <input
                                    className="input"
                                    style={{width:80,marginLeft:20}}
                                    value={this.state.specification_value}
                                    onChange={(e)=>{
                                        this.setState({
                                            specification_value:e.target.value
                                        })
                                    }}/>
                                <Widget.Button
                                    style={{marginLeft:20}}
                                    value="添加"
                                    onClick={()=>{
                                        if(this.isNull(this.state.specification_value)){
                                            this.showTip("内容不可为空");
                                            return;
                                        }
                                        this.state.specificationBeans.push({specification_value:this.state.specification_value,specificationBeans:[]})
                                        this.setState({
                                            specification_value:""
                                        })
                                    }}/>

                                <Widget.Button
                                    style={{marginLeft:100}}
                                    value="保存"
                                    onClick={()=>{
                                        this.insertSpecifications();
                                    }}/>
                            </div>
                        )
                    }}>
                    <Widget.Foreach
                        style={{display:'flex',flexDirection:'column',overflow:'auto'}}
                        dataSource={this.state.specificationBeans}
                        renderRow={(rowID)=>{
                            return(
                                <div>
                                    <div style={{height:20,display:'flex',alignItems:"center",padding:10,fontSize:12}}>
                                        {this.state.specificationBeans[rowID].specification_value}
                                        <input className="input"
                                               style={{width:80,marginLeft:20}}
                                               value={this.state.specificationBeans[rowID].specification_value1}
                                               onChange={(e)=>{
                                                   this.state.specificationBeans[rowID].specification_value1=e.target.value;
                                                   this.refresh();
                                               }}/>

                                        <Widget.Button
                                            style={{marginLeft:20}}
                                            value="添加"
                                            onClick={()=>{
                                                if(this.isNull(this.state.specificationBeans[rowID].specification_value1)){
                                                    this.showTip("内容不可为空");
                                                    return;
                                                }

                                                for(let i=0;i<this.state.specificationBeans.length;i++){
                                                    let specificationBeans=this.state.specificationBeans[i].specificationBeans;
                                                    for(let j=0;j<specificationBeans.length;j++){
                                                        let specificationBean=specificationBeans[j];
                                                        if(specificationBean.specification_value===this.state.specificationBeans[rowID].specification_value1){
                                                            this.showTip("规格名不可重复");
                                                            return;
                                                        }
                                                    }
                                                }

                                                this.state.specificationBeans[rowID].specificationBeans.push({specification_value:this.state.specificationBeans[rowID].specification_value1})
                                                this.state.specificationBeans[rowID].specification_value1="";
                                                this.refresh();
                                            }}/>
                                    </div>
                                    <div style={{display:'flex',alignItems:"center"}}>
                                        <Widget.Foreach
                                            style={{display:'flex',overflow:'auto'}}
                                            dataSource={this.state.specificationBeans[rowID].specificationBeans}
                                            renderRow={(index)=>{
                                                return(
                                                    <div style={{height:20,display:'flex',alignItems:"center",padding:10,fontSize:10}}>
                                                        {this.state.specificationBeans[rowID].specificationBeans[index].specification_value}
                                                        <div className={"Hui-iconfont Hui-iconfont-close2"}
                                                             onClick={()=>{
                                                                 this.state.specificationBeans[rowID].specificationBeans.splice(index,1);
                                                                 this.refresh();
                                                             }}></div>

                                                    </div>

                                                )
                                            }}>

                                        </Widget.Foreach>

                                    </div>
                                </div>
                            )
                        }}/>

                </Widget.Detail>
            </div>

        )
    }
}

module.exports=Specification;