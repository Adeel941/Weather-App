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
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<GetWeather location="Lahore" />} />
          </Routes>
        </BrowserRouter>
        <SignOutButton />
      </SignedIn>
    </header>
  );
}

export default App;
