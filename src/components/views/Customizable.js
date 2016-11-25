import React from 'react';
import TextFilter from './TextFilter.js';

const Item = ({item}) => <li>{item}</li>;
Item.propTypes = {
  item: React.PropTypes.string.isRequired
};


const List = ({items}) => <ul>{items.map(item => <Item key={item} item={item} />)}</ul>;
List.propTypes = {
  items: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};


const fruits = [
  'apple',
  'orange',
  'banana',
  'kiwi',
  'pineapple',
  'golden kiwi',
  'green apple'
];


const fruitFilter = filter => fruit => fruit.toLowerCase().indexOf(filter.toLowerCase()) !== -1;


const Customizable = React.createClass({
  getInitialState() {
    return {
      filter: '',
      minLength: 0,
      debounceTimeout: 10
    };
  },


  onChangeDebounceTimeout({target: {value}}) {
    this.setState({debounceTimeout: parseInt(value, 10)});
  },


  onChangeMinLength({target: {value}}) {
    this.setState({minLength: parseInt(value, 10)});
  },


  onFilter({target: {value: filter}}) {
    this.setState({filter});
  },


  render() {
    const {minLength, indefinite, debounceTimeout, filter} = this.state;

    const filteredFruits = filter ?
      fruits.filter(fruitFilter(filter)) :
      fruits.slice(0);

    return (
      <div>
        <TextFilter
          filter={filter}
          minLength={minLength}
          debounceTimeout={debounceTimeout}
          onFilter={this.onFilter} />

        <List items={filteredFruits} />
      </div>
    );
  }
});


export default Customizable;
