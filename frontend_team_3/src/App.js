import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/layout/navbar/Navbar'
import Footer from "./components/layout/footer/Footer";
import Routerl from "./router/router";


function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Routerl />
      {/* <Footer /> */}
    </div>
  );
}
export default App;