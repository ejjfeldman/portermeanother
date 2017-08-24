import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const box = (props) => (
  <MuiThemeProvider>
    <DialogBox handleClose={props.handleClose} open={props.open}/>
  </MuiThemeProvider>
);
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
class DialogBox extends Component {

  handleClose = () => {
    this.props.handleClose();
  };

  render() {
    const actions = [
      <FlatButton
        label="Okay"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <Dialog
          title="I'm sorry but your beer doesn't exist..."
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose}
        >
          Just kidding. It probably does...But I don't have it. Try again!
        </Dialog>
      </div>
    );
  }
}

export default box;