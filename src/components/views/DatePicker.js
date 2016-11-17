import React from 'react';
import moment from 'moment';
import momentRange from 'moment-range';
import DateRangePicker from 'react-daterange-picker';
import DatePickerStyles from '../../css/react-calendar.css';

const stateDefinitions = {
  available: {
    color: null,
    label: 'Available',
  },
  enquire: {
    color: '#ffd200',
    label: 'Enquire',
  },
  unavailable: {
    selectable: false,
    color: '#78818b',
    label: 'Unavailable',
  },
};

const dateRanges = [
  // {
  //   state: 'enquire',
  //   range: moment.range(
  //     moment().add(2, 'weeks').subtract(5, 'days'),
  //     moment().add(2, 'weeks').add(6, 'days')
  //   ),
  // },
  {
    state: 'unavailable',
    range: moment.range(
      moment().add(1, 'days'),
      null
    ),
  },

];

const DatePicker = React.createClass({
  getInitialState() {
    return {
      value: null,
    };
  },
  handleSelect(range, states) {
    // range is a moment-range object
    this.setState({
      value: range,
      states: states,
    });
    this.props.getRange(range);
  },

  render() {
    return (
      <DateRangePicker
        firstOfWeek={1}
        numberOfCalendars={2}
        selectionType='range'
        minimumDate={new Date(this.props.minimumDate.created_at)}
        stateDefinitions={stateDefinitions}
        dateStates={dateRanges}
        defaultState="available"
        showLegend={true}
        value={this.state.value}
        onSelect={this.handleSelect} />
    );
  },
});


export default DatePicker;
