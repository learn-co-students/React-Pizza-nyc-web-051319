import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

class App extends Component {

  state = {
    pizzas: [],
    newPizza: {
      topping: '',
      size: '',
      vegetarian: null
    },
    editPizza: null
  }

  componentDidMount() {
    fetch('http://localhost:3000/pizzas')
    .then(resp => resp.json())
    .then(pizzas => {
      this.setState({
        pizzas: pizzas
      })
    })
  }

  vegetarianOrNot = (event) => {
    let value
    if (event.target.value === 'Vegetarian') {
      value = true
    } else {
      value = false
    }
    this.setState({
      newPizza: {
        ...this.state.newPizza,
        vegetarian: value
      }
    })
  }

  handleChange = (event) => {
    this.setState({
      newPizza: {
        ...this.state.newPizza,
        [event.target.name]: event.target.value
      }
    })
  }

  handleSubmit = () => {
    if (this.state.editPizza) {
      this.updatePizza()
    } else {
      fetch('http://localhost:3000/pizzas', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(this.state.newPizza)
      })
      .then(resp => resp.json())
      .then(newPizza => {
        this.setState({
          pizzas: [...this.state.pizzas, newPizza]
        })
      })
    }
  }

  editPizza = (id) => {
    const foundPizza = this.state.pizzas.find(pizza => pizza.id === id)
    this.setState({
      newPizza: {
        topping: foundPizza.topping,
        size: foundPizza.size,
        vegetarian: foundPizza.vegetarian
      },
      editPizza: foundPizza.id
    })
  }

  updatePizza = () => {
    fetch(`http://localhost:3000/pizzas/${this.state.editPizza}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state.newPizza)
    })
    .then(resp => resp.json())
    .then(newPizza => {
      const updatedPizzas = this.state.pizzas.map(pizza => {
        if (pizza.id === newPizza.id) {
          return newPizza
        } else {
          return pizza
        }
      })
      this.setState({
        pizzas: updatedPizzas
      })
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm handleChange={this.handleChange} newPizza={this.state.newPizza} vegetarianOrNot={this.vegetarianOrNot} handleSubmit={this.handleSubmit}/>
        <PizzaList pizzas={this.state.pizzas} editPizza={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
