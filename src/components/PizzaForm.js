import React from "react"

const PizzaForm = (props) => {
  const {topping, size, vegetarian} = props.pizzaToEdit
  console.log(topping);
  
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" className="form-control" placeholder="Pizza Topping" value={topping || ""} onChange={(e) => props.changeTopping(e.target.value)}/>
        </div>
        <div className="col">
        <select value={size} className="form-control" onChange={(e) => props.changeSize(e.target.value)}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
          <input className="form-check-input" type="radio" value="Vegetarian" checked={vegetarian} onChange={(e) => props.changeVeg(e.target.value)}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
          <input className="form-check-input" type="radio" value="Not Vegetarian" checked={!vegetarian} onChange={(e) => props.changeVeg(e.target.value)}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
        <button type="submit" className="btn btn-success" onClick={() => {props.updatePizza(props.pizzaToEdit)}}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
