import React from "react"

const Filter = ({newFilter, handleFilter}) => {
    return (
      <>
        <div>
          <p>
            filter shown with <input value={newFilter} onChange={handleFilter}/>
          </p>
        </div>
      </>
    )
  }

  export default Filter