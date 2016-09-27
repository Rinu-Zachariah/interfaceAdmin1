import React, {Component} from 'react';
import ReactDataGrid from 'react-data-grid';

function randomDate(start, end) {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toLocaleDateString();
}

//helper to create a fixed number of rows
function createRows(numberOfRows){
  var _rows = [];
  for (var i = 1; i < numberOfRows; i++) {
    _rows.push({
      id: i,
      task: 'Task ' + i,
      complete: Math.min(100, Math.round(Math.random() * 110)),
      priority : ['Critical', 'High', 'Medium', 'Low'][Math.floor((Math.random() * 3) + 1)],
      issueType : ['Bug', 'Improvement', 'Epic', 'Story'][Math.floor((Math.random() * 3) + 1)],
      startDate: randomDate(new Date(2015, 3, 1), new Date()),
      completeDate: randomDate(new Date(), new Date(2016, 0, 1))
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
  key: 'task',
  name: 'Title',
  editable : true
},
{
  key: 'priority',
  name: 'Priority',
  editable : true
},
{
  key: 'issueType',
  name: 'Issue Type',
  editable : true
},
{
  key: 'complete',
  name: '% Complete',
  editable : true
},
{
  key: 'startDate',
  name: 'Start Date',
  editable : true
},
{
  key: 'completeDate',
  name: 'Expected Complete',
  editable : true
}
]


var Example = React.createClass({

  getInitialState : function(){
    return {rows : createRows(5)}
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
