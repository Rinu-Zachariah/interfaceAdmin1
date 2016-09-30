import React from 'react';

const styles = {
  active: {
    display: 'inherit'
  },
  inactive:{
    display: 'none'
  }
}

class Accordion extends React.Component {

  constructor() {
  super();
  this.state = {
    active: false
  };
  this.toggle = this.toggle.bind(this);
  }

    toggle() {
      this.setState({
        active: !this.state.active
      });
    }

  render(){
  const stateStyle = this.state.active ? styles.active : styles.inactive;
  return (
      <section>
        <a onClick={this.toggle}>
        {this.props.year}
        </a>
        <div style={stateStyle}>
        <p  dangerouslySetInnerHTML={{__html: this.props.summary}} />
        <p>{this.props.data} </p>
        <button className="btn btn-danger">Remove</button> &nbsp;
        <button className="btn btn-warning">Edit</button>
        </div>
      </section>
      );
  }

}

Accordion.propTypes ={
  summary: React.PropTypes.string.isRequired,
  year: React.PropTypes.string.isRequired,
  data: React.PropTypes.string.isRequired
};

export default Accordion;
