import React from "react";

interface myComProps {
  header: React.ReactNode;
  body: React.ReactNode;
};

export class MyComponent extends React.Component<myComProps, {}> {
  render() {
    return (
      <div>
        {this.props.header}
        {this.props.body}
      </div>
    );
  }
}