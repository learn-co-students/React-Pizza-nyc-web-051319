import React from "react"

class PizzaForm extends React.Component {

  render(){
    return(
      <form onSubmit={this.props.updatePizza} className="form-row">
        <div className="col-5">
            <input onChange={this.props.handleChange} name="topping" type="text" className="form-control" placeholder="Pizza Topping" value={this.props.topping}/>
        </div>
        <div className="col">
          <select onChange={this.props.handleChange} value={this.props.size} name="size" className="form-control">
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input onChange={this.props.handleToggle} className="form-check-input" type="radio" value={true} name="vegetarian" checked={this.props.vegetarian ? true : false} className="form-control"/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input onChange={this.props.handleToggle} className="form-check-input" type="radio" value={false} name="vegetarian" checked={this.props.vegetarian ? false : true}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={console.log}>Submit</button>
        </div>
      </form>

  )
}
}

export default PizzaForm
