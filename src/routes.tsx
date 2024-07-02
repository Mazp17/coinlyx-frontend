import { BrowserRouter, Route, Router } from "react-router-dom";
import Login from "./pages/auth/Login";

const Routes = () => {
  return (
    <BrowserRouter>
        <Route path="login" element={<Login></Login>} />
    </BrowserRouter>
  );
};

export default Routes;
