import React from "react"

class PizzaForm extends React.Component {
  
  render() {
    return(
      <form onSubmit={this.props.updatePizza}>
        <div className="form-row">
          <div className="col-5">
              <input type="text" onChange={this.props.handleChange} name="topping" className="form-control" placeholder="Pizza Topping" value={
                 this.props.topping
                }/>
          </div>
          <div className="col">
            <select value={this.props.size} onChange={this.props.handleChange} name="size" className="form-control">
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
          </div>
          <div className="col">
            <div className="form-check">
              <input className="form-check-input" type="radio" value="Vegetarian" onChange={this.props.toggleVegetarian} checked={!!this.props.vegetarian ? true : false}/>
              <label className="form-check-label">
                Vegetarian
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" value="Not Vegetarian" onChange={this.props.toggleVegetarian} checked={!!this.props.vegetarian ? false : true}/>
              <label className="form-check-label">
                Not Vegetarian
              </label>
            </div>
          </div>
          <div className="col">
            <button type="submit" className="btn btn-success" onClick={console.log}>Submit</button>
          </div>
        </div>
      </form>
    )
  }
}

export default PizzaForm
