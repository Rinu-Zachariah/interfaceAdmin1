import React from 'react';
import ReactDataGrid from 'react-data-grid';

//helper to create a fixed number of rows
function createRows(numberOfRows){
  var _rows = [];
  for (var i = 1; i < numberOfRows; i++) {
    _rows.push({
      id: i,
      contentyear: ,
      contenthtml:
    });
  }
  return _rows;
}

//function to retrieve a row for a given index
var rowGetter = function(i){
  return _rows[i];
};

//Columns definition
var columns = [
{
  key: 'id',
  name: 'SNo.',
  width: 80
},
{
  key: 'contentyear',
  name: 'Year',
  width: 80
},
{
  key: 'contenthtml',
  name: 'Content',
  editable : true
}
]


class Example extends Component({

  getInitialState : function(){
    return {rows : createRows(9)}
  },

  rowGetter : function(rowIdx){
    return this.state.rows[rowIdx]
  },

  handleRowUpdated : function(e){
    //merge updated row with current row and rerender by setting state
    var rows = this.state.rows;
    Object.assign(rows[e.rowIdx], e.updated);
    this.setState({rows:rows});
  },

  render:function(){
    return(
      <ReactDataGrid
      enableCellSelect={true}
      columns={columns}
      rowGetter={this.rowGetter}
      rowsCount={this.state.rows.length}
      minHeight={500}
      onRowUpdated={this.handleRowUpdated} />
    )
  }

});

ReactDOM.render(<Example />, document.getElementById("table"));
