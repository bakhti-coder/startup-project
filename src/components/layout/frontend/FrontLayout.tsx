import { Outlet } from "react-router-dom";

import Footer from "../Footer";
import Header from "../Header";

function FrontLayout() {
  return (
    <main>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}

export default FrontLayout;
