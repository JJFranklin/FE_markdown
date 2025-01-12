import React from "react";

interface IPersonProps {
  name?:String,
  showPersonInfo?:(val:string)=>void;
  children?: React.ReactNode
}

const Person:React.FC<IPersonProps> = (props)=>{
  const showPersonInfoClick = (val: Object) =>{
    // @ts-ignore
    props.showPersonInfo(val);
  }
  return (
    <>
     <div>个人信息：{props.name}</div>
     <button onClick={()=>showPersonInfoClick(props)}>测试按钮</button>
     {props.children}
    </>
  );
}

export default Person;