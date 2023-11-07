import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import ToasterProvider from "./Providers/ToasterProvider";
import Routers from "./Common/Routers";
import supabase from "./supabaseClient";

function App() {
  return (
    <BrowserRouter>
      <Routers />
      <ToasterProvider />
    </BrowserRouter>
  );
}

export default App;
