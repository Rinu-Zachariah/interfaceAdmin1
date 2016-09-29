import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as historyActions from '../../actions/historyActions';
import Example from './TableView.js';
import Accordion from './Accordion.js';

class ODCHistory extends Component{
  constructor(props, context) {
    super(props, context);
    this.onTitleChange=this.onTitleChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.state = {
      history: {contenthtml: '',
      contentyear: ''}
    };
  }

  onTitleChange(event){
    console.log(event.target.value);
    const history = this.state.history;
    history.contenthtml = event.target.value;
    this.setState({history: history});
  }

  onClickSave(){
    this.props.dispatch(historyActions.createHistory(this.state.history));
  }

  historyRow(history, index){
    return (
      <div key={index}>
      <Accordion summary={history.contenthtml} year={history.contentyear} />
      </div>
      //   <p dangerouslySetInnerHTML={{__html: history.contenthtml}} />
      //   <p>{history.contentyear}</p>
      // </Accordion>
      // <div key={index}>
      // <p dangerouslySetInnerHTML={{__html: history.contenthtml}} />
      // <p>{history.contentyear}</p><hr /></div>
);

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
  console.log(state.histories);
  return{
    histories: state.histories
  };

}
export default connect(mapStateToProps)(ODCHistory);
