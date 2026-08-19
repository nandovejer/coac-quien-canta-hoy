import "./App.css";
import { SEASON, sessions } from "./config/season";
import DynamicTable from "./components/DynamicTable";
import MenuHeader from "./components/MenuHeader";
import SearchAuthor from "./components/SearchAuthor";
import Footer from "./components/Footer";
import formatAppData from "./utils/formatAppData";
import { getCurrentSessionDate } from "./utils/handleDate";

function App() {
  const currentSessionData = formatAppData(sessions, SEASON.year);
  const lastDateSession = getCurrentSessionDate(SEASON.sessionEndTime);

  return (
    <>
      <MenuHeader
        menuData={{
          liveUrl: SEASON.liveUrl,
          lastDateSession: lastDateSession,
        }}
      />
      <header id="siteHeader" className="text-center bg-gray-800">
        <hgroup className="flex justify-center items-center max-w-6xl mx-auto p-6  ">
          <h1 className="text-2xl font-extrabold leading-tighter tracking-tighter mb-4 text-white">
            ¿Quién canta hoy en el COAC {SEASON.year}? <br />{" "}
            <strong className="text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 uppercase">
              {SEASON.phaseTitle}
            </strong>
          </h1>
        </hgroup>
      </header>

      <main id="siteMain">
        <SearchAuthor SearchAuthorData={currentSessionData} />
        <DynamicTable
          currentSession={lastDateSession}
          data={currentSessionData}
          previousYearKey={String(SEASON.previousYear)}
          sessionStartTime={SEASON.sessionStartTime}
          minutesPerGroup={SEASON.minutesPerGroup}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;
