import { useState, useEffect } from 'react'
import './App.css'
import SearchBar from './SearchBar'
import SearchResults from './SearchResults'
import User from './User'
import {Routes, Route, BrowserRouter} from 'react-router-dom'

export default function App() {
  const [imageList, setImageList] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setSearchQuery] = useState('')
  
  const api_key = '34k0v7zAAU1jHWUJ4ZIiyZQClidhjXNxZawR-8QNZaI'

  const fetchArticleList = async () => {    
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&page=${page}&client_id=${api_key}`);
    const data = await response.json();
    setImageList(data.results);
  };
  useEffect(() => {
    fetchArticleList();
  }, [page, query]);
  return (
    
     <>
     <BrowserRouter>
      <Routes>
        <Route path="/user/:username" element={<User />} />
      </Routes>
      </BrowserRouter>
    
      <h1>React Image Search</h1>
      <SearchBar setSearchQuery={setSearchQuery}/>

      {imageList.length!= 0?
      <SearchResults imageList={imageList} page={page} setPage={setPage} />
        :null
      }
    </> 
  )
}
