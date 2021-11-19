import './App.css';
import {Routes, Route, Outlet, Switch } from 'react-router-dom';
import NewRestaurantForm from './NewRestaurantForm'
import RestaurantList from './RestaurantList';
import Restaurant from './Restaurant';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/new' element={ <NewRestaurantForm  /> }> </Route>
        <Route path='/restaurantslist' element={ <RestaurantList />} > </Route>
        <Route path='/restaurants/:id' element={<Restaurant /> } > </Route>
      </Routes>
      
      
    </div>
  );
}

export default App;