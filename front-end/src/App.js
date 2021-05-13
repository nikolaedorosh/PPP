import Item from "./components/Item/Item";

function App() {

  const foodEaten = [
    {text: "hi", id: 1},
    {text: "hi2", id: 2},
    {text: "hi3", id: 3},
    {text: "hi4", id: 4},
    {text: "hi5", id: 5},
    {text: "hi6", id: 6},
    {text: "hi7", id: 7},
    {text: "hi8", id: 8},
  ]

  return (
  <div className='App'>
    {foodEaten.map(el => 
    <Item text={el.text} id={el.id}/>
    )}
  </div>);
}

export default App;
