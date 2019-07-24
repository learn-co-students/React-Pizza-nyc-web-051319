import React, { Component, Fragment } from 'react'
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {
  state = {
    pizzas: [],
    selectedPizza: {},
    topping: '',
    size: '',
    vegetarian: null
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(resp => resp.json())
    .then(pizzas => {
      this.setState({ pizzas })
    })
  }

  populateEdit = (id) => {
    const pizza = [...this.state.pizzas].find(pizza => pizza.id === id)

    this.setState({
      selectedPizza: pizza,
      topping: pizza.topping,
      size: pizza.size,
      vegetarian: pizza.vegetarian
    })
  }

  handleEditTopping = (event) => {
    this.setState({
      topping: event.target.value
    })
  }

  handleEditSize = (event) => {
    this.setState({
      size: event.target.value
    })
  }

  handleEditVegetarian = (event) => {
    this.setState({
      vegetarian: true
    })
  }

  handleEditNotVegetarian = (event) => {
    this.setState({
      vegetarian: false
    })
  }

  handlePatch = (id) => {
    fetch(`http://localhost:3000/pizzas/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      },
      body: JSON.stringify({
        topping: this.state.topping,
        size: this.state.size,
        vegetarian: this.state.vegetarian
      })
    })
    .then(resp => resp.json())
    .then(newPizza => {
      this.setState({
        pizzas: this.state.pizzas.map(pizza => {
          if (pizza.id === newPizza.id) {
            return newPizza
          } else {
            return pizza
          }
        }),
        topping: '',
        size: '',
        vegetarian: null
    })
    })
  }

  render() {
    console.log(this.state.topping)
    const { pizzas, selectedPizza, topping, size, vegetarian } = this.state

    return (
      <Fragment>
        <Header/>
        <PizzaForm
        selectedPizza={selectedPizza} handleEditTopping={this.handleEditTopping}
        handleEditSize={this.handleEditSize}
        handleEditVegetarian={this.handleEditVegetarian}
        handlePatch={this.handlePatch}
        handleEditNotVegetarian={this.handleEditNotVegetarian}
        topping={topping}
        size={size}
        vegetarian={vegetarian} />
        <PizzaList pizzas={pizzas} populateEdit={this.populateEdit} />
      </Fragment>
    );
  }
}

export default App;
