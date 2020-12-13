import React from "react";

const Table = (props) => {
  const handleDeleteUser = (id) => {
    return props.deleteUser(id);
  };
    
  return (
    <div>
      <table className="table">
        <caption>Список заявок</caption>
        <thead>
          <tr>
            <th onClick={() => props.sortData("id")}>№</th>
            <th onClick={() => props.sortData("name")}>ФИО</th>
            <th onClick={() => props.sortData("phone")}>Номер телефона</th>
            <th onClick={() => props.sortData("email")}>Email</th>
          </tr>
        </thead>
        <tbody>
          {props.user.map((info) => (
            <tr key={info.id}>
              <td>{info.id}</td>
              <td>{info.name}</td>
              <td>{info.phone}</td>
              <td>{info.email}</td>
              <td className="delete">
                <button onClick={() => handleDeleteUser(info.id)}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
