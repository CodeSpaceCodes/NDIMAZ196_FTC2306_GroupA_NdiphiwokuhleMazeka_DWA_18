import { useState } from 'react';
import { supabase } from './client';
import {Routes, Route } from 'react-router-dom';


import ShowList from '../src/Components/ShowList';
import ShowPreview from '../src/Components/ShowPreview'
import FavoritesPage from '../src/Components/FavoritesPage'
import Signup from './Components/SignUp';
import Login from './Components/login';
function App() {

  return (
    <>
    <Routes>
      <Route path={'/'} element={< Login/>} />
      <Route path='/signup' element={ <Signup />} />
      <Route path={'/showlist'} element={ <ShowList />} />
      <Route path={'/showpreview/:id'} element={< ShowPreview />} />
      <Route path={'/favorites'} element={< FavoritesPage/>} />
    </Routes>
    </>
  )
}
export default App
