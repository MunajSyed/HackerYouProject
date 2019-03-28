import React, { PureComponent } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
} from '@material-ui/core';

import { debounce } from 'lodash';

class AddPortfolioModal extends PureComponent {
  state = {
    portfolioName: '',
  };

  save = (name) => {
    this.setState({
      portfolioName: name,
    });
  }

  componentDidMount () {
    this.delayedSave = debounce(this.save, 300);
  }

  render () {
    const { isOpen } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={this.props.handleClose}
      >
        <DialogTitle>Add Portfolio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the name of your new profile.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Portfolio Name'
            type='text'
            onChange={(event) => this.delayedSave(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.props.handleClose();
              this.props.onAddPortfolio(this.state.portfolioName);
            }}
            color='primary'
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default AddPortfolioModal;
