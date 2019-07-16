/**
 * Created by shenjiabo on 16/7/21.
 */
import React,{Component} from 'react'
import ReactDOM from 'react-dom'
var storage = require('key-storage');

class Toolbar extends Component{
    render(){
        let title=this.props.title;
        var titleBeans=JSON.parse(storage.get("titleInfo"));

        titleBeans=titleBeans?titleBeans:[];

        let index=titleBeans.indexOf(title);
        if(index<0){
            titleBeans=titleBeans.concat([title]);
            storage.set("titleInfo",JSON.stringify(titleBeans));
        }else{
            if(titleBeans.length-index-1>0){
                titleBeans.splice(index+1,titleBeans.length-index-1);
                storage.set("titleInfo",JSON.stringify(titleBeans));
            }
        }

        let titleView=[];
        for(let i=0;i<titleBeans.length;i++){
            if(i!==0){
                titleView.push(<div  key={uuid(10)}><p1 style={{fontSize:15,marginLeft:10,color:'#000000'}}> > </p1></div>);
            }
            titleView.push(<p1  key={uuid(10)} style={{fontSize:15,marginLeft:10,color:'blue',cursor:"pointer"}}
                        onClick={()=>{
                            for(let k=0;k<titleBeans.length-i-1;k++){
                               this.props.history.goBack();
                            }
                        }}>{titleBeans[i]}</p1>);
        }
        return(
            <div  style={{height:35,background:'RGB(245,250,254)',display:'flex',alignItems:'center',flexWrap:'wrap'}}>
                {titleView}
            </div>
        )
    }

    addTitle(title){
        var titleBeans=JSON.parse(storage.get("titleInfo"));
        let index=titleBeans.indexOf(title);
        if(index<0){
            titleBeans=titleBeans.concat([title]);
            storage.set("titleInfo",JSON.stringify(titleBeans));
        }else{
            titleBeans=titleBeans.splice(index,titleBeans.length-index-1);
            storage.set("titleInfo",JSON.stringify(titleBeans));
        }
    }
}

module.exports=Toolbar;