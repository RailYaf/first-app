import React, { useState } from "react";

const User = (props) => {
  const initialFormState = { id: null, name: "", phone: "", email: "" };
  // используем useState и передаем в качестве начального значения объект - initialFormState
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.currentTarget;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user.name || !user.phone || !user.email) return;

    // вызываем addUser из хука из App
    props.addUser(user);
    // обнуляем форму, с помощью setUser функции
    // которая у нас взята из хука в данном компоненте [1]
    setUser(initialFormState);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="block">
        <label>Введите данные</label>
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Введите ФИО"
          value={user.name}
          onChange={handleInputChange}
          required
        ></input>
        <input
          className="input"
          type="tel"
          name="phone"
          placeholder="Введите номер телефона"
          value={user.phone}
          onChange={handleInputChange}
          required
        ></input>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Введите адрес электронной почты"
          value={user.email}
          onChange={handleInputChange}
          required
        ></input>
      </div>
      <input type="submit" value="Добавить" />
    </form>
  );
};

export default User;
