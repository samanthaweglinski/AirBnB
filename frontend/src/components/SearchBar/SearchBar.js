import React, { useState } from "react";
import "./SearchBar.css"

function SearchBar({ placeholder, data }) {
  const [filteredData, setFilteredData] = useState([])

  const handleFilter = (event) => {
    const searchWord = event.target.value
    const newFilter = data.filter((value) => {
      return value.name.includes(searchWord)
    })
    setFilteredData(newFilter)
  }

  return (
    <div className="search">
      <div className="searchInputs">
        <input type="text" placeholder={placeholder} onChange={handleFilter}/>
        <div className="searchIcon">
          <i class="fa-solid fa-magnifying-glass"></i>
        </div>
      </div>
      { (filteredData.length != 0) && (
      <div className="dataResult">
        {filteredData.map((value, key) => {
          return <a className="dataItem" href={`/properties/${value.id}`}>
            <p>{value.name}</p>
          </a>
        })}
      </div>
      )}
    </div>
  )
}

export default SearchBar;
