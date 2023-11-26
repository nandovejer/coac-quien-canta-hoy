import './App.css'
import DynamicTable from './components/DynamicTable'
import jsonData from './data/COAC_2024_ADULTOS_PRELIMINARES.json'
function App() {


  return (
    <>
      <header className="max-w-6xl mx-auto py-4 sm:py-8 px-4 sm:px-6  text-center">
        <hgroup className='text-center'>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4" >¿Quién canta hoy en el COAC 2024? <br />   <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 uppercase">adultos preliminares</span></h1>
        </hgroup>
      </header>

      <main>
        <DynamicTable data={jsonData} />
      </main>
    </>
  )
}

export default App
