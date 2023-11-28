import './App.css'
import DynamicTable from './components/DynamicTable'
import CountdownTimer from './components/CountdownTimer'
// import AuthorCloud from './components/AuthorCloud'
import ScrollToTop from './components/OnTop'
import Footer from './components/Footer'
import formatAppData from './utils/formatAppData'

import jsonData from './data/COAC_2024_ADULTOS_PRELIMINARES.json'
import { DATE_PRELIMINARES } from './data/ConstantsCoac2024';
import SearchAuthor from './components/SearchAuthor'

function App() {

  const currentJsonData = formatAppData(jsonData);
  console.log(currentJsonData);

  return (
    <>
      <header id="siteHeader" className="text-center bg-gray-800">
        <hgroup className='flex justify-center items-center max-w-6xl mx-auto p-6  '>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4 text-white" >¿Quién canta hoy en el COAC 2024? <br />   <strong className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 uppercase">adultos preliminares</strong></h1>
        </hgroup>
      </header>

      <main id="siteMain">
        <CountdownTimer targetDate={DATE_PRELIMINARES} />
        <SearchAuthor SearchAuthorData={currentJsonData} />
        {/* <AuthorCloud AuthorCloudData={currentJsonData} /> */}
        <DynamicTable data={currentJsonData} />
        <ScrollToTop />
      </main>
      <Footer />
    </>
  )
}

export default App
