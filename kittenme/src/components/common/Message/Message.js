import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


class Message extends Component {
    render() {
        return (
            <ListItem >
                <ListItemText primary={this.props.data['message']} />
            </ListItem>
        );
    }

}

export { Message }