import React from 'react';
import Queue from './queue-helper';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: this.props.people
    };
  }
  render() {
    let curr = this.state.people.first;
    let list = [
      <li
        key={curr.value}
        className="person"
      >
        {curr.value}
      </li>
    ];
    curr = curr.next;
    while (curr !== null) {
      list = [
        ...list,
        <li
          key={curr.value}
          className="person"
        >
          {curr.value}
        </li>
      ];
      curr = curr.next;
    }
    return (
      <div className="list">
        <ul className="people_list">
          {list}
        </ul>
      </div>
    );
  }
}
export default List;