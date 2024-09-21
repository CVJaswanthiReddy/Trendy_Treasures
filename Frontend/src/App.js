import React from "react";
import Header from "./Components/Header";

const App = () => {
  return (
    <div>
      <Header />
      {/* You can add some placeholder content to see if the header is functioning */}
      <div style={{ padding: "20px" }}>
        <h1>Check if the Header is Working</h1>
        <p>If you can see the header links, it is working correctly!</p>
      </div>
    </div>
  );
};

export default App;
