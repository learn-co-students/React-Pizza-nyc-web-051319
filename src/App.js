import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'


class App extends Component {

  state = {
    pizzas: [],
    topping: '',
    size: '',
    vegetarian: false,
    pizzaId: null
  }

  componentDidMount(){
    fetch("http://localhost:3000/pizzas")
    .then(resp => resp.json())
    .then(json => this.setState({pizzas: json}))
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleToggle = (event) => {
    if (event.target.value === 'true'){
      this.setState({
        vegetarian: true
      })
    } else {
      this.setState({
        vegetarian: false
      })
    }

  }

  updatePizza = (event) => {
    const newTopping = event.target.querySelectorAll('.form-control')[0].value
    const newSize = event.target.querySelectorAll('.form-control')[1].value
    const newVeg = event.target.querySelectorAll('.form-control')[2].value

    fetch(`http://localhost:3000/pizzas/${this.state.pizzaId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        topping: newTopping,
        size: newSize,
        vegetarian: newVeg
      })
    })
    .then(resp => resp.json())
    .then(newPizza => {
      const newPizzas = this.state.pizzas.map(pizza => {
        if (pizza.id === newPizza.id) {
          return newPizza
        } else {
          return pizza
        }
      })

      this.setState({
        pizzas: newPizzas
      })
    })
  }

  handleEdit = (pizza) => {
    this.setState({
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian,
      pizzaId: pizza.id
    })
  }

  render() {

    return (
      <Fragment>
        <Header/>
        <PizzaForm updatePizza={this.updatePizza} handleChange={this.handleChange} topping={this.state.topping} size={this.state.size} vegetarian={this.state.vegetarian} handleToggle={this.handleToggle}/>
        <PizzaList pizzas={this.state.pizzas} handleEdit={this.handleEdit}/>
      </Fragment>
    );
  }
}

export default App;
