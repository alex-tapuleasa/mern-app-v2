import {Routes, Route } from 'react-router-dom';
import NewRestaurantForm from './NewRestaurantForm'
import RestaurantList from './RestaurantList';
import RestaurantDetails from './RestaurantDetails';
import Navbar from './Navbar';
import Footer from './Footer';

function App() {
  console.log("App rendering")
  return (
    <div className="App">
      <Navbar />
      <Footer />
      <Routes>
        <Route path='/new' element={ <NewRestaurantForm  /> }> </Route>
        <Route path='restaurants' element={ <RestaurantList />} > </Route>
        <Route path='restaurants/:id' element={<RestaurantDetails /> } > </Route>
      </Routes>
      
      
    </div>
  );
}

export default App;