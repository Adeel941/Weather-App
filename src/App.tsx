import { Box } from "@chakra-ui/react";
import "./App.css";
import GetWeather from "./pages/weather";
import Saved from "./pages/saved";
import Header from "./components/header";
import Footer from "./components/footer";
import ContactForm from "./pages/contact";
import About from "./pages/About";
import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute";
import Signin from "./pages/signin";
import NotFound from "./pages/notFound";

function App() {
  return (
    <Box >
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/weather/Lahore" />} />
        <Route path="/weather/:city" element={<GetWeather />} />
        <Route path="/contact" element={<ContactForm/>} /> 
        <Route path="/about" element={<About />} />
        <Route
          path="/saved"
          element={
            <ProtectedRoute>
              <Saved />
            </ProtectedRoute>
          }
        />
        <Route path="/signin" element ={<Signin/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      <Footer />
    </Box>
  );
}

export default App;
