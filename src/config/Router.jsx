import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Categories from "../pages/categories/Categories";
import Create from "../pages/create/Create";
import Edit from "../pages/edit/Edit";

function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categorias" element={<Categories />}/>
                <Route path="/crear" element={<Create />}/>
                <Route path="/editar/:id" element={<Edit />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;