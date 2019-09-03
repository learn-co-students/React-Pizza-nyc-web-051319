import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  pizzaUrl = 'http://localhost:3000/pizzas'

  state = {
    pizzas: [],
    topping: "",
    size: "",
    vegetarian: null,
    id: null
  }

  editPizza = (pizza) => {
    this.setState({
      id: pizza.id,
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian
    })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  toggleVegetarian = () => {
    this.setState({
      vegetarian: !this.state.vegetarian
    })
  }

  updatePizza = (e) => {
    const newTopping = e.target.querySelectorAll('.form-control')[0].value
    const newSize = e.target.querySelectorAll('.form-control')[1].value
    let newVegetarian = null
    
    if (e.target.querySelectorAll('.form-check')[0].children[0].checked) {
      newVegetarian = true
    }
    else {
      newVegetarian = false
    }

    fetch(`http://localhost:3000/pizzas/${this.state.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "topping": newTopping,
        "size": newSize,
        "vegetarian": newVegetarian
      })
    })
  }

  componentDidMount() {
    fetch(this.pizzaUrl)
    .then(resp => resp.json())
    .then(allPizzas => {
      this.setState({
        pizzas: allPizzas
      })
    })
  }

  render() {
    const { pizzas, topping, size, vegetarian } = this.state
    return (
      <Fragment>
        <Header/>
        <PizzaForm topping={topping} 
                    size={size} 
                    vegetarian={vegetarian} 
                    toggleVegetarian={this.toggleVegetarian}
                    handleChange={this.handleChange}
                    updatePizza={this.updatePizza}
                    />
        <PizzaList pizzas={pizzas} editPizza={this.editPizza}  />
      </Fragment>
    );
  }
}
 
export default App;
