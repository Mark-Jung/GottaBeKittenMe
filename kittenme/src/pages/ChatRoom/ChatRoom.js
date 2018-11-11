import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import io from "socket.io-client";
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';

import APIConfig from '../../config/api';
import './styles.css';

import {
  Message
} from '../../components/common'

import {
  join_room,
  joined_room,
  got_new_message,
  send_message,
} from '../../ducks/chatroom';

let socket;
var ScrollArea = require('react-scrollbar');
class ChatRoomComponent extends Component {
  
  constructor(props) {
	  super(props)
    socket = io.connect(APIConfig.apiroot);
    this.props.join_room(socket, "kitten");
    socket.on('joined_room',(res)=>{
      this.props.joined_room(res);
    })
    socket.on('new_message',(res)=>{
      this.props.got_new_message(res);
    });
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }
  state = {
    send_text: ""
  };

  componentWillUnmount() {
    socket.disconnect()
	  alert("Disconnecting Socket as component will unmount")
  }

  loadMessages() {
    return (
      <List>
        {
          _.map(this.props.messages, (item, index)=> {
            return (
              <Message data={item} key={index}/>
            )
          })
        }
      </List>
    )
  }
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  sendMessage(e) {
    if (e.keyCode === 13) {
      // trigger
      this.props.send_message(socket, this.state.send_text);
      this.setState({
        ['send_text']: "",
      })
    }
  }

  render() {
    return (
      <div>
          <h1> I'm ChatRoom Kitten</h1>
          <h3> You are {this.props.username} </h3>
          <div className="messageContainer">
            {this.loadMessages()}
          </div>
          <TextField
            id="inputbox"
            value={this.state.send_text}
            onChange={this.handleChange('send_text')}
            margin="normal"
            onKeyDown={this.sendMessage}
          />
      </div>
    );
  }
}

export { ChatRoomComponent };

const mapStateToProps = (state, ownProps) => {
    const { chatroom } = state;
    const { messages, username, } = chatroom;
    return {
      ...ownProps,
      messages,
      username,
    };
};
const mapDispatchToProps = dispatch => {
  return {
    join_room: (socket, room_name) => {
      dispatch(join_room(socket, room_name));
    },
    joined_room: (messages) => {
      dispatch(joined_room(messages));
    },
    got_new_message: (message) => {
      dispatch(got_new_message(message));
    },
    send_message: (socket, message) => {
      dispatch(send_message(socket, message));
    }
  };
};

export const ChatRoom = connect(mapStateToProps, mapDispatchToProps)(ChatRoomComponent);