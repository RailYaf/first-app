import React, { useState } from "react";
import Table from "./Table/Table";
import User from "./Table/User";

function App() {
  const data = [
    {
      id: 1,
      name: "Иванов Иван Иванович",
      phone: 89999999,
      email: "ivanov@mail.ru",
    },
    {
      id: 2,
      name: "Смирнов Пётр Игоревич",
      phone: 888888888,
      email: "smirnov@mail.ru",
    },
  ];

  const [users, setUsers] = useState(data);

  const [directionSort, setdirectionSort] = useState(true);

  // Функция для добавления пользователя
  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  // Функция для удаления пользователя
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  // Функция для сортировки таблицы
  const sortData = (field) => {
    const copyData = users.concat();

    let sortData;

    if (directionSort) {
      sortData = copyData.sort((a, b) => {
        return a[field] > b[field] ? 1 : -1;
      });
    }
    sortData = copyData.reverse((a, b) => {
      return a[field] > b[field] ? 1 : -1;
    });

    setUsers(sortData);
    setdirectionSort(!directionSort);
  };

  // Фунцкия для поиска
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
      </div>
      <div className="wrapper">
        <div>
          <Table user={users} deleteUser={deleteUser} sortData={sortData} />
        </div>
        <div>
          <User addUser={addUser} />
        </div>
      </div>
    </div>
  );
}

export default App;
