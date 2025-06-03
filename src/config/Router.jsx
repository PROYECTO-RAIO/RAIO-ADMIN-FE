import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Create from "../pages/Create";
import Edit from "../pages/Edit";
import View from "../pages/View";

function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categorias" element={<Categories />}/>
                <Route path="/crear" element={<Create />}/>
                <Route path="/editar" element={<Edit />}/>
                <Route path="/ver" element={<View />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;