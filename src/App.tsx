import './App.css'
import jsonData from './data/COAC_2024_ADULTOS_PRELIMINARES.json'
import { DATE_PRELIMINARES, MIN_HOUR_SESSION, MAX_HOUR_SESSION, LIVE_URL_COAC } from './data/ConstantsCoac2024';

import DynamicTable from './components/DynamicTable'
import CountdownTimer from './components/CountdownTimer'
import MenuHeader from './components/MenuHeader'
import SearchAuthor from './components/SearchAuthor'

import Footer from './components/Footer'
import formatAppData from './utils/formatAppData'


import { getCurrentSessionDate } from './utils/handleDate';

function App() {

  const currentJsonData = formatAppData(jsonData);
  const lastDateSession = getCurrentSessionDate(MIN_HOUR_SESSION, MAX_HOUR_SESSION);
  const preventLastDateSession = lastDateSession === "08/01/2024" ? "09/01/2024" : lastDateSession; // TODO fix this hardcode
  document.body.classList.add('bg-slate-50');


  return (
    <>
      <MenuHeader menuData={{
        liveUrl: LIVE_URL_COAC,
        lastDateSession: preventLastDateSession 
      }} />
      <header id="siteHeader" className="text-center bg-gray-800">
        <hgroup className='flex justify-center items-center max-w-6xl mx-auto p-6  '>
          <h1 className="text-2xl font-extrabold leading-tighter tracking-tighter mb-4 text-white" >¿Quién canta hoy en el COAC 2024? <br />   <strong className="text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 uppercase">adultos preliminares</strong></h1>
        </hgroup>
      </header>

      <main id="siteMain">
        <CountdownTimer targetDate={DATE_PRELIMINARES} />
        <SearchAuthor SearchAuthorData={currentJsonData} />
        <DynamicTable currentSession={preventLastDateSession} data={currentJsonData} />
      </main>
      <Footer />
    </>
  )
}

export default App
