import React from "react";
import BComp from "./bComp";

class AComp extends React.Component {
  // @ts-ignore
  constructor(props) {
    super(props);
    this.state = {
      showAge: false
    }
  }
  showName = (val?:string)=>{
    this.setState({
      // @ts-ignore
      showAge:!this.state.showAge
    });
    console.log(`aaa-${val}`);
  }
  render(): React.ReactNode {
    return (
      <>
       <BComp 
        // @ts-ignore
        showAge={this.state.showAge}
        // @ts-ignore
        showName={this.showName}
       ></BComp>
      </>
    );
    
  }
}

export default AComp;