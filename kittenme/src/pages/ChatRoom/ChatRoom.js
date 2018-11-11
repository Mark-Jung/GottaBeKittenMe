import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from "socket.io-client"

import APIConfig from '../../config/api';

import yao from '../../assets/yao.jpg';

let socket;
class ChatRoomComponent extends Component {
  
  constructor(props)
  {
	  super(props)
    socket = io.connect(APIConfig + '/cheese')
    console.log(socket);
  }

  componentWillUnmount()
  {
    socket.disconnect()
	  alert("Disconnecting Socket as component will unmount")
  }
  render() {
    return (
      <div>
          <h1> I'm ChatRoom </h1>
          <img src={yao} alt="Yao is ripped"/>
      </div>
    );
  }
}

export { ChatRoomComponent };

const mapStateToProps = (state, ownProps) => {
    return {
      ...ownProps
    };
};
const mapDispatchToProps = dispatch => {
  return {

  };
};

export const ChatRoom = connect(mapStateToProps, mapDispatchToProps)(ChatRoomComponent);