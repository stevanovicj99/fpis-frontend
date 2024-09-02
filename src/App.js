import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Subcontractor from "./pages/Subcontractor";
import SubcontractorOffer from "./pages/SubcontractorOffer";
import FormSubcontractorNew from "./pages/FormSubcontractorNew";
import FormSubcontractorEdit from "./pages/FormSubcontractorEdit";
import FormSubcontratorOfferNew from "./pages/FormSubcontractorOfferNew";
import FormSubcontractorOfferEdit from "./pages/FormSubcontractorOfferEdit";
import Home from "./pages/Home";
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/subcontractor" element={<Subcontractor />} />
        <Route path="/subcontractoroffer" element={<SubcontractorOffer />} />
        <Route
          path="/formsubcontractornew"
          element={<FormSubcontractorNew />}
        />
        <Route
          path="/formsubcontractoredit/:id"
          element={<FormSubcontractorEdit />}
        />
        <Route
          path="/formsubcontractoroffernew"
          element={<FormSubcontratorOfferNew />}
        />
        <Route
          path="/formsubcontractorofferedit/:id"
          element={<FormSubcontractorOfferEdit />}
        />
      </Routes>
    </div>
  );
}

export default App;
