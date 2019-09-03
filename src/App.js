import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'
class App extends Component {

  state ={
    pizzas: [],
    pizzaToEdit: {}
  }
  componentDidMount(){
    this.fetchPizzas()
  }

  fetchPizzas = () => {
    fetch('http://localhost:3000/pizzas')
      .then(r => r.json())
      .then(pizzas => {
        this.setState({
          pizzas: pizzas
        })
      })
  }

  changeTopping = (newVal) => {
    this.setState({
      pizzaToEdit: {...this.state.pizzaToEdit, topping: newVal}
    })
  }

  changeSize = (newVal) => {
    this.setState({
      pizzaToEdit: {...this.state.pizzaToEdit, size: newVal}
    })
  }

  changeVeg = (newVal) => {
    this.setState({
      pizzaToEdit: {...this.state.pizzaToEdit, vegetarian: newVal}
    })
  }

  editPizza = (pizza) => {
    this.setState({
      pizzaToEdit: pizza
    })
  }

  updatePizza = (editedPizza) => {
   const editedPizzas = this.state.pizzas.map(pizza => {
    if(pizza.id === editedPizza.id) {
      return editedPizza
    } else {
      return pizza
    }
   })
   this.setState({
     pizzas: editedPizzas,
     pizzaToEdit: {}
   })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm pizzaToEdit={this.state.pizzaToEdit} changeTopping={this.changeTopping} changeSize={this.changeSize} changeVeg={this.changeVeg} updatePizza={this.updatePizza}/>
        <PizzaList pizzaList={this.state.pizzas} editPizza={this.editPizza}/>
      </Fragment>
    );
  }
}

export default App;
