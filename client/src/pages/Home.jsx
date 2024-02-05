import React from 'react'
import NewsList from '../component/NewsList'
import Announcement from '../component/Announcement'
import Navbar1 from '../component/Navbar1'


const Home = () => {
    return (
      <div>
        <Announcement/>
        <Navbar1/>
        <NewsList/>
        
      </div>
    )
  }
  
  export default Home