import React, {useState} from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import CoffeeForm from "./components/CoffeeForm";

function App() {
  const [orders, setOrders] = useState([]);
  const [orderToEdit, setOrderToEdit] = useState('');

  const addOrder = order => {
    setOrders([...orders, order])
  }

  const cancelOrder = index => {
    const originalOrders = [...orders]
    originalOrders.splice(index, 1)
    setOrders(originalOrders)
  }

  const editOrder = orderToUpdate => {
    document.querySelector('.order-button').textContent = "Update"
    const editButtons = document.querySelectorAll(".edit");

    editButtons.forEach((button) => {
      button.disabled = true;
    });

    setOrderToEdit(orderToUpdate);

    let allOrders = [...orders];
    allOrders = orders.map((order) => {
      if (orderToUpdate.name === order.name) {
        return orderToUpdate;
      } else return order;
    })
    setOrders(allOrders)
  }

  const saveOrder = orderToUpdate => {
    let allOrders = [...orders];
    allOrders = orders.map((order) => {
      if (order.isEditing === 1) {
        return orderToUpdate;
      } else return order;
    });
    setOrders(allOrders);
    setOrderToEdit("");
    document.querySelector(".order-button").textContent = "Order Now"
    document.querySelector(".edit-button").disabled = false
  }

  return (
    <div className="App">
      <Navigation/>
      <Switch>
        <Route path="/order-coffee" render={() => <CoffeeForm addOrder={addOrder} orders={orders} cancelOrder={cancelOrder} orderToEdit={orderToEdit} editOrder={editOrder} saveOrder={saveOrder}/>} />
        <Route exact path="/" render={() => <Home />} />
      </Switch>
    </div>
  );
}

export default App;
