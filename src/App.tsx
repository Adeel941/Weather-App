import { Heading } from "@chakra-ui/react";
import "./App.css";
import GetWeather from "./pages/weather";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  SignOutButton,
} from "@clerk/clerk-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <header>
      <SignedOut>
        <Heading padding={15}>
          Welcome! Please Sign in to check Weather Details
        </Heading>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <BrowserRouter>
          <Routes>
            <Route path="/weather" element={<GetWeather />} />
            <Route path="/weather/:city" element={<GetWeather />} />
          </Routes>
        </BrowserRouter>
        <SignOutButton />
      </SignedIn>
    </header>
  );
}

export default App;
