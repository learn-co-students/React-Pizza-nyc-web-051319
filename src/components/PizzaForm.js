import React from "react"

const PizzaForm = (props) => {

  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" className="form-control" name='topping' onChange={props.handleChange} placeholder="Pizza Topping" value={
                //Pizza Topping Should Go Here
                props.newPizza.topping
              }/>
        </div>
        <div className="col">
          <select value={props.newPizza.size} className="form-control" name='size' onChange={props.handleChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" onChange={props.vegetarianOrNot} name="vege" value="Vegetarian" checked={props.newPizza.vegetarian === null ? null : props.newPizza.vegetarian}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" onChange={props.vegetarianOrNot} name="vege" value="Not Vegetarian" checked={props.newPizza.vegetarian === null ? null : !props.newPizza.vegetarian}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={props.handleSubmit}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
