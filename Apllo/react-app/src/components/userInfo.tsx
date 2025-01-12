import React from 'react';

interface userInfoProps {
  name?:String,
  age?:Number,
  getName?:Function;
  children?:React.ReactNode
}
export class UserInfo extends React.Component<userInfoProps> {
  constructor(props:userInfoProps){
    super(props);
    console.log("this.props", props);
    // this.handleNameClick = this.handleNameClick.bind(this);
  }

  handleNameClick = (val:string) => {
    // @ts-ignore
    this.props.getName(val); 
  }

  render():React.ReactNode {
    return (
      <div>
        用户信息：{this.props.name}
        <button onClick={this.handleNameClick.bind(this, 'xijinping')}>猜猜我是谁</button>
        {this.props.children}
      </div>
    );
  }
}

