import React, { useState, useEffect } from "react";
import Table from "./Table/Table";
import User from "./Table/User";
import Filter from "./Table/Filter";

function App() {
  const [users, setUsers] = useState([]);
  const [word, setWord] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((users) => setUsers(users));
  };

  // Функция для добавления пользователя
  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
    fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.name,
        phone: user.phone,
        email: user.email,
      }),
    })
      .then((response) => response.json())
      .then((users) => fetchUsers());
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

  // фильтр отобразит обновленный список на основе поиска
  // это состояние по умолчанию - это список людей
  const [filterDisplay, setFilterDisplay] = useState("");

  const handleChange = (e) => {
    setWord(e);
    if (word !== "") {
      let newList = [];
      newList = users.filter((info) =>
        info["name"].toLowerCase().includes(word)
      );
      setFilterDisplay(newList);
    } else {
      setFilterDisplay(users);
    }
  };

  return (
    <div>
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
