import React from 'react';
import './App.css';
import { UserInfo } from './components/userInfo';
import Person from './components/person';

function App() {
  const state = {
    name:"franklin"
  };
  function getName(val:any):void{
    alert(val)
  }
  function showPersonInfo(personInfo:Object) {
    console.log("personInfo", personInfo);
  }
  return (
    <div className="App">
      <UserInfo name={state.name} getName={getName}>
        <div>我也是子组件</div>
        <div>没错我也是我也是子组件</div>
      </UserInfo>
      <hr></hr>
      <Person name={'我是个人，不是神'} showPersonInfo={showPersonInfo}>
        <p>第一行</p>
        <div>第二行</div>
      </Person>
    </div>
  );
}

export default App;
