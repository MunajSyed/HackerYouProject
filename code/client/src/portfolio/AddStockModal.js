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

class AddStockModal extends PureComponent {
  state = {
    stockSymbol: '',
  };

  save = (stock) => {
    this.setState({
      stockSymbol: stock,
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
        <DialogTitle>Add Stock</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the stock symbol.
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='stock'
            label='Stock Symbol'
            type='text'
            onChange={(event) => this.delayedSave(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              this.props.handleClose();
              // this.props.onAddStock(this.state.stockSymbol);
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

export default AddStockModal;
