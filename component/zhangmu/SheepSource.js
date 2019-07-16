import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var Widget=require('./../../widget/widget');

class Percent extends Widget.Base{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
           path:'',
           visible:'1',
           bitch_sheep_id:'',
           bitchSheepBeans:[],
        };
    }
    componentDidMount() {
       this.getAllBitchs();
    }

    getAllBitchs(){   //xiazai
        this.getDataByPost(2,sheep_homeurl+"/sheepController/v1.0/getAllBitchs"
        ,{is_finish:'0'})
    }
   getAllBitchSheep(){//对所有未完成养殖的分期羊进行采集
    this.getDataByPost(1,sheep_homeurl+"/sheepController/v1.0/getAllSheepBitchs"
    ,{is_finish:'0',bitch_sheep_id:this.state.bitch_sheep_id})}

    doSuccess(index,data){
        switch(index){
            case 1:
            window.open(imgurl+data)
            this.setState(
                {
                    visible:'2'
                }
            )
            break; 
            case 2:
            this.setState({
                bitchSheepBeans:data,
                bitch_sheep_id:data[0].bitch_sheep_id
            })
           
            break       
            
           
            
        }
    }

    
    


    render(){
        return(
            <div>
                <Widget.Toolbar title="信息采集" history={this.props.history}></Widget.Toolbar>
                
                <Widget.View>
                <div style={{display:this.state.visible+""==="1"?'flex':'none',}}>
                <Widget.Select
                    title="分期ID"
                    dataSource={this.state.bitchSheepBeans}
                    selectWidth={80}
                    selectHeight={32}
                    select_value="bitch_sheep_id"
                    show_value="bitch_sheep_id"
                    is_must="false"
                    marginLeft={20}
                    onChange={
                        (index)=>{
                            this.setState({
                                bitch_sheep_id:this.state.bitchSheepBeans[index].bitch_sheep_id
                            })
                        }
                    }
                    />
                   <Widget.Button
                     style={{display:'flex',marginLeft:20,marginTop: 15}}
                     value="下载溯源信息表"
                     onClick={
                         ()=>{
                            this.getAllBitchSheep();
                         }      
                     }
                     />
                     </div>
                     <div style={{display:this.state.visible+""==="2"?'flex':'none'}}>
                     <Widget.ImgButton
                        marginLeft={20}
                        value1="excel导入"
                        url={sheep_homeurl + "/sheepController/v1.0/importSourceExcel"}
                        onSuccess={(data)=> {
                            this.showTip("导入成功");
                            this.props.history.push("/memberSheeps");
                     }}/>
                     </div>
                </Widget.View>
               
            </div>
              )
                
    }
}

module.exports=Percent;