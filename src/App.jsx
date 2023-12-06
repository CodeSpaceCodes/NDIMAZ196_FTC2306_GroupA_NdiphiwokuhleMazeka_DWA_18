import { useState } from 'react';
import {Routes, Route } from 'react-router-dom';


import ShowList from '../src/Components/ShowList';
import ShowPreview from '../src/Components/ShowPreview'
import FavoritesPage from '../src/Components/FavoritesPage'
function App() {

  return (
    <>
    <Routes>
      <Route path={'/'} element={< ShowList/>} />
      <Route path={'/showpreview/:id'} element={< ShowPreview />} />
      <Route path={'/favorites'} element={< FavoritesPage/>} />
    </Routes>
    </>
  )
}
export default App
