import React, { Component } from "react";

import "./search-panel.css";

export default class SearchPanel extends Component {
  onTermChange = e => {
    const { onSearchChange } = this.props;
    console.log(e.target.value);

    onSearchChange(e.target.value);
  };

  render() {
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="type to search"
        onChange={this.onTermChange}
      />
    );
  }
}
