import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';

//helper to create a fixed number of rows
function createRows(numberOfRows){
  var _rows = [];
  for (var i = 1; i < numberOfRows; i++) {
    _rows.push({
      id: i,
      contentyear: [1992, 2002, 2004, 2006, 2008, 2009, 2010, 2012, 2015],
      contenthtml : ""
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
  name: 'ID',
  width: 80
},
{
  key: 'contentyear',
  name: 'Year',
  editable : true
},
{
  key: 'contenthtml',
  name: 'Content',
  editable : true
}
]


var Example = React.createClass({

  getInitialState : function(){
    return {rows : createRows(10)}
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

// ReactDOM.render(<Example />, mountNode);

export default Example;


//
// //helper to create a fixed number of rows
// function createRows(numberOfRows){
//   var _rows = [];
//   for (var i = 1; i < numberOfRows; i++) {
//     _rows.push({
//       id: i,
//       contentyear:1992,
//       contenthtml:'Hi'
//     });
//   }
//   return _rows;
// }
//
// //function to retrieve a row for a given index
// var rowGetter = function(i){
//   return _rows[i];
// };
//
// //Columns definition
// var columns = [
// {
//   key: 'id',
//   name: 'SNo.',
//   width: 80
// },
// {
//   key: 'contentyear',
//   name: 'Year',
//   width: 80
// },
// {
//   key: 'contenthtml',
//   name: 'Content',
//   editable : true
// }
// ]
//
//
// class Example extends Component{
//
//   constructor(props, context) {
//     super(props, context);
//     this.getInitialState=this.getInitialState.bind(this);
//     this.rowGetter = this.rowGetter.bind(this);
//     this.handleRowUpdated = this.handleRowUpdated.bind(this);
//     this.state = {
//       rows : {
//         id:'',
//         contentyear:'',
//         contenthtml:''
//       }
//     }
//
//   }
//
//   getInitialState(){
//     return {rows : createRows(9)};
//   }
//
//   rowGetter(rowIdx){
//     return this.state.rows[rowIdx];
//   }
//
//   handleRowUpdated(e){
//     //merge updated row with current row and rerender by setting state
//     var rows = this.state.rows;
//     Object.assign(rows[e.rowIdx], e.updated);
//     this.setState({rows:rows});
//   }
//
//   render(){
//     return(
//       <ReactDataGrid
//       enableCellSelect={true}
//       columns={columns}
//       rowGetter={this.rowGetter}
//       rowsCount={this.state.rows.length}
//       minHeight={500}
//       onRowUpdated={this.handleRowUpdated} />
//     );
//   }
//
// }
//
// export default Example;
