import React, { useState, useEffect } from "react";
import styled from "styled-components";
import img from "../images/nordwood-themes-ivP3TYdLvw0-unsplash.jpg";
import "../App.css";
import * as yup from "yup";
import Orders from "./Orders";
import axios from "axios";

const schema = yup.object().shape({
    name: yup.string().required('Please enter a valid name').min(2, 'That\'s not a valid input'),
    phone: yup.string().required('Please enter a valid phone number').matches(/^[0-9]{10}$/, "Please enter a valid phone number")
})

const CoffeeDiv = styled.div`
  width: 400px;
  background: green;
  color: white;
  padding: 2%;
  position: fixed;
  margin: 2% 15% 15% 30%;
  border-radius: 10px;
  overflow: hidden;
`;

const CoffeeForm = props => {
    console.log("props", props)
  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    type: {
      regular: false,
      latte: false,
      americano: false,
      flatWhite: false,
      espresso: false,
      cappucino: false,
    },
    temp: {
      iced: false,
      hot: false,
    },
    milk: {
      none: false,
      soy: false,
      almond: false,
      oat: false,
      regular: false,
      nonFat: false,
      skim: false,
    },
    additions: {
      noFoam: false,
      cinnamon: false,
      caramel: false,
      whippedCream: false,
    },
    instructions: "",
  });

  const [errors, setErrors] = useState({
      name: '',
      phone: ''
  });

  const [isDisabled, setIsDisabled] = useState(true);


  useEffect(() => {
      schema.isValid(formState).then(valid => setIsDisabled(!valid));
  }, [formState, schema])

  const validate = e => {
      e.persist();
      yup.reach(schema, e.target.name).validate(e.target.value)
      .then(valid => setErrors({...errors, [e.target.name]: ''}))
      .catch(err => setErrors({...errors, [e.target.name]: err.errors[0]}))
  }

  const handleChanges = (e) => {
    if (e.target.type === 'checkbox') { 
        setFormState({ ...formState, additions: {
            ...formState.additions, [e.target.value]: e.target.checked }});
  
    } else {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    } if (e.target.name === 'name' || e.target.name === "phone") {
            validate(e)
    }} ;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://reqres.in/api/users", formState)
    .then(res => props.addOrder(res.data))
    .catch(err => console.log(err));

  };

  const handleEdit = (e) => {
      e.preventDefault();
      props.saveOrder(formState);
      setFormState({
        name: "",
        phone: "",
        type: {
          regular: false,
          latte: false,
          americano: false,
          flatWhite: false,
          espresso: false,
          cappucino: false,
        },
        temp: {
          iced: false,
          hot: false,
        },
        milk: {
          none: false,
          soy: false,
          almond: false,
          oat: false,
          regular: false,
          nonFat: false,
          skim: false,
        },
        additions: {
          noFoam: false,
          cinnamon: false,
          caramel: false,
          whippedCream: false,
        },
        instructions: "",
      })
  }
  return (
    <div>
      <CoffeeDiv>
        <h1>Customize your Order</h1>
        <form
          onSubmit={(e) => {
            if (props.orderToEdit) handleEdit(e); else handleSubmit(e)}}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <label>
            {" "}
            Name:
            <input
              name="name"
              value={formState.name}
              placeholder="Enter Name..."
              onChange={handleChanges}
              data-cy="name"
            />
            {errors.name.length > 0 && <p style={{color:"red"}}>{errors.name}</p>}
          </label>

          <label>
            {" "}
            Phone Number:
            <input
              name="phone"
              value={formState.phone}
              placeholder="Enter Phone number..."
              onChange={handleChanges}
              data-cy="phone"
            />
             {errors.phone.length > 0 && <p style={{color:"red"}}>{errors.phone}</p>}
          </label>
          <label>
            {" "}
            Type of Coffee:
            <select
              name="type"
              data-cy="type"
              defaultValue="Regular"
              onChange={handleChanges}
            >
              <option data-cy="regular" value="regular">Regular</option>
              <option data-cy="latte" value="latte">Latte</option>
              <option data-cy="espresso" value="espresso">Espresso</option>
              <option data-cy="americano" value="americano">Americano</option>
              <option data-cy="flatWhite" value="flatWhite">Flat White</option>
              <option data-cy="cappucino" value="cappucino">Cappucino</option>
            </select>
          </label>
          <label>
            {" "}
            Temperature:
            <select name="temp" data-cy="temp" defaultValue="hot" value={formState.temp} onChange={handleChanges}>
              <option data-cy="hot" value="hot">Hot</option>
              <option data-cy="iced" value="iced">Iced</option>
            </select>
          </label>
          <label>
            {" "}
            Choice of Milk:
            <select name="milk" data-cy="milk" defaultValue="none" value={formState.milk} onChange={handleChanges}>
              <option data-cy="none" value="none">None</option>
              <option data-cy="soy" value="soy">Soy</option>
              <option data-cy="almond" value="almond">Almond</option>
              <option data-cy="oat" value="oat">Oat</option>
              <option data-cy="regular" value="regular">Regular</option>
              <option data-cy="nonFat" value="nonFat">Non-Fat</option>
              <option data-cy="skim" value="skim">Skim</option>
            </select>
          </label>
          <fieldset style={{border:"none"}}>
            <label>Additions: </label> <br />
            <label>
              {" "}
              <input type="checkbox" data-cy="noFoam" name="noFoam" onChange={handleChanges} value="noFoam" />
              No Foam
            </label>
            <label>
              {" "}
              <input type="checkbox" data-cy="cinnamon" name="cinnamon" onChange={handleChanges} value="cinnamon"/>
              Cinnamon
            </label>
            <br/>
            <label>
              {" "}
              <input type="checkbox" data-cy="caramel" name="caramel" onChange={handleChanges} value="caramel"/>
              Caramel
            </label>
            <label>
              {" "}
              <input type="checkbox" data-cy="whippedCream" name="whippedCream" onChange={handleChanges} value="whippedCream"/>
              Whipped Cream
            </label>
          </fieldset>

          <label>
            {" "}
            Special Instructions <br />
            <textarea placeholder="Start Typing..." name="instructions" data-cy="instructions" onChange={handleChanges} value={formState.instructions}/>
          </label>

          <button
            style={{
              background: "black",
              color: "white",
              borderRadius: "8px",
              width: "150px",
              height: "40px",
              fontSize: "1.2rem",
              border: "none",
              marginTop: "2%"
            }}
            type="submit"
            disabled={isDisabled}
            className="order-button"
            data-cy="submit"
          >
            Order Now
          </button>
        </form>
        <div style={{background: "white", color: "black"}}>
        {props.orders.map((order, i) => <Orders key={i} order={order} cancelOrder={props.cancelOrder} editOrder={props.editOrder} />)}
        </div>
      </CoffeeDiv>
      
      <img
        src={img}
        alt="coffee"
        style={{
          postion: "absolute",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      />

    </div>
  );
};

export default CoffeeForm;
