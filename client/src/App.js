import './App.css';
import {Routes, Route } from 'react-router-dom';
import NewRestaurantForm from './NewRestaurantForm'
import RestaurantList from './RestaurantList';
import RestaurantDetails from './RestaurantDetails';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/new' element={ <NewRestaurantForm  /> }> </Route>
        <Route path='restaurants' element={ <RestaurantList />} > </Route>
        <Route path='restaurants/:id' element={<RestaurantDetails /> } > </Route>
      </Routes>
      
      
    </div>
  );
}

export default App;