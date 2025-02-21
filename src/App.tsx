import "./App.css";
import jsonData from "./data/COAC_2025_SEMI.json";
import {
  DATE_SEMIFINALES,
  MAX_HOUR_SESSION,
  LIVE_URL_COAC,
} from "./data/CONSTANT_COAC_2025";
import DynamicTable from "./components/DynamicTable";
import CountdownTimer from "./components/CountdownTimer";
import MenuHeader from "./components/MenuHeader";
import SearchAuthor from "./components/SearchAuthor";
import Footer from "./components/Footer";
import formatAppData from "./utils/formatAppData";
import { getCurrentSessionDate } from "./utils/handleDate";

function App() {
  const currentJsonData = formatAppData(jsonData);
  const lastDateSession = getCurrentSessionDate(
    new Date().toLocaleDateString(),
    MAX_HOUR_SESSION
  );

  document.body.classList.add("bg-slate-50");

  return (
    <>
      <MenuHeader
        menuData={{
          liveUrl: LIVE_URL_COAC,
          lastDateSession: lastDateSession,
        }}
      />
      <header id="siteHeader" className="text-center bg-gray-800">
        <hgroup className="flex justify-center items-center max-w-6xl mx-auto p-6  ">
          <h1 className="text-2xl font-extrabold leading-tighter tracking-tighter mb-4 text-white">
            ¿Quién canta hoy en el COAC 2025? <br />{" "}
            <strong className="text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 uppercase">
              Adultos Semifinales
            </strong>
          </h1>
        </hgroup>
      </header>

      <main id="siteMain">
        <CountdownTimer targetDate={DATE_SEMIFINALES} />
        <SearchAuthor SearchAuthorData={currentJsonData} />
        <DynamicTable currentSession={lastDateSession} data={currentJsonData} />
      </main>
      <Footer />
    </>
  );
}

export default App;
