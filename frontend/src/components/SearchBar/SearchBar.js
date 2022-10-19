import React from "react";
import "./SearchBar.css"

function SearchBar({placeholder, data}) {
  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} />
        <div className="searchIcon">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      <div className="dataResult">
        {data.map((value, key) => {
          return <a className="dataItem" href={`/properties/${value.id}`}> {value.name} </a>
        })}
      </div>
    </div>
  )
}

export default SearchBar;
