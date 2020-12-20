import React, { useState } from "react";
import Table from "./Table/Table";
import User from "./Table/User";
import Filter from "./Table/Filter";

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

  // слово будет отслеживать любые изменения ввода в поле фильтра
  const [word, setWord] = useState("");
  const [users, setUsers] = useState(data);

  /* const [directionSort, setdirectionSort] = useState(true); */

  // Функция для добавления пользователя
  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

  // Функция для удаления пользователя
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const sortData = (sortedField) => {
    const copyData = users.concat();

    const sortData = copyData.sort((a, b) => {
      if (a[sortedField] < b[sortedField]) {
        return -1;
      }
      if (a[sortedField] > b[sortedField]) {
        return 1;
      }
      return 0;
    });
    setUsers(sortData);
  };
  // Функция для сортировки таблицы
  /*  const sortData = (field) => {
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
  }; */

  // фильтр отобразит обновленный список на основе поиска
  // это состояние по умолчанию - это список людей 
  const [filterDisplay, setFilterDisplay] = useState("");

  // handleChange запускается каждый раз при изменении поля ввода
  const handleChange = e => {
    setWord(e);
    if (word !== "") {
      let newList = [];
      newList = users.filter(info => info.name.toLowerCase().includes(word))
      setFilterDisplay(newList);
      }
      else {
        setFilterDisplay(users);
    }
  }

  return (
    <div>
      {/* <div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleChange}
        />
      </div> */}
      <Filter value={word} handleChange={(e) => handleChange(e.target.value)} />
      <div className="wrapper">
        <div>
          <Table
            user={word.length < 1 ? users : filterDisplay}
            deleteUser={deleteUser}
            sortData={sortData}
          />
        </div>
        <div>
          <User addUser={addUser} />
        </div>
      </div>
    </div>
  );
}

export default App;
