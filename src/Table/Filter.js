import React from "react";

const Filter = ({value, handleChange}) => {
 return(
     <div>
         Поиск пользователя: <input value={value} onChange={handleChange}></input>
     </div>
 )
}

export default Filter;