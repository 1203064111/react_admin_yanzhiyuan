import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class Percent extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            percentBeans:[],
        };
    }
    componentDidMount() {
        this.getPercents();
    }

    getPercents(){
        this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getPercents",{});
    }


    doSuccess(index,data){
        switch(index){
            case 1:
                this.setState({
                    percentBeans:data
                })
                break;
            case 2:
                this.showTip("设置成功");
                this.getPercents
                break;
        }
    }

    updatePercents(){
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/updatePercent",
            {json:JSON.stringify(this.state.percentBeans)});
    }


    


    render(){

        let view=[];
        if(this.state.percentBeans!=null&&this.state.percentBeans.length>0) {
            console.log("你好")
            for (let i = 0; i < this.state.percentBeans.length; i++) {
                view.push(
                          <Widget.Editor
                            style={{marginLeft:10}}
                            title={this.state.percentBeans[i].percent_name}
                            value={this.state.percentBeans[i].percent_value}
                            onChange={(value)=>{
                                this.setState({
                                    a:1
                                })
                            }}/>
                );
            }
        }



        return(
            <div>
                <Widget.Toolbar title="比例设置" history={this.props.history}></Widget.Toolbar>
                <Widget.Detail
                    baseData={[]}
                    data={{}}
                    renderButton={
                        ()=>{
                            return(
                                <div  style={{display:'flex',alignItems:'center',justifyContent:'flex-end',flex:1}} >
                                 <Widget.Button
                                 style={{marginRight:'30',width:'40',}}
                                 value="保存"
                                 onClick={()=>{
                                 this.updatePercents();
                                 }}/>
                                </div>
                            )
                        }
                    }
                    >
               
                
                    <Widget.Foreach
                        style={{display:'flex',overflow:'auto',flex:1}}
                        dataSource={this.state.percentBeans}
                        count='3'
                        renderRow={(rowID)=>{
                            return(
                            <div style={{display:'flex',flex:1}}>  
                            <div style={{marginTop:20}}>
                            <Widget.Editor
                           title_style={{width:150}}
                           title_p_style={{display:"flex"}}
                           input_style={{marginLeft:10,width:150}}
                            title={this.state.percentBeans[rowID].percent_name}
                            value={this.state.percentBeans[rowID].percent_value}
                            onChange={(value)=>{
                                this.state.percentBeans[rowID].percent_value=value;
                                this.refresh();
                                
                            }}/>

                             
                            </div>
                                    
                            </div>
                            )
                        }}/>
                        </Widget.Detail>
          
            </div>
        )
    }
}

module.exports=Percent;