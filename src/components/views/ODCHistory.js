import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as historyActions from '../../actions/historyActions';

class ODCHistory extends Component{
  constructor(props, context) {
    super(props, context);
    this.onTitleChange=this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.state = {
      history: {contenthtml: ''}
    };
  }

  onTitleChange(event){
    const history = this.state.history;
    history.contenthtml = event.target.value;
    this.setState({history: history});
  }

  onClickSave(){
    this.props.dispatch(historyActions.createHistory(this.state.history));
  }

  historyRow(history, index){
    return <div key={index}> {history.contenthtml} </div>;
  }

  render(){
    return (

      <div>
        <h1>ODC History</h1>
        {this.props.histories.map(this.historyRow)}

        <h2>Add history</h2>
        <input type="text" onChange={this.onTitleChange} value={this.state.history.contenthtml}/>
        <input type="submit" onClick={this.onClickSave} value="save" />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps){
  return{
    histories: state.histories
  };

}
export default connect(mapStateToProps)(ODCHistory);
