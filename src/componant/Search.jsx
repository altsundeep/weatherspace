import React from "react";
import { FiSearch } from "react-icons/fi";

const Search = (props) => {
  return (
    <div className="searchbar">
      {" "}
      <input
        placeholder="Search Your City Name..."
        type="text"
        value={props.search}
        onChange={props.onChange}
      />{" "}
      <button onClick={props.onClick}>
        <FiSearch />
      </button>{" "}
    </div>
  );
};

export default Search;
