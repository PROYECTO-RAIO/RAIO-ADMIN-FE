import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/loginPage/Home";
import CategoryPage from "../pages/CategoryPage";
import Create from "../pages/Create";
import Edit from "../pages/Edit";
import EditCategory from "../pages/EditCategory";

function Router() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/categorias" element={<CategoryPage />}/>
                <Route path="/crear" element={<Create />}/>
                <Route path="/editar" element={<Edit />}/>
                <Route path="/editar/:category" element={<EditCategory />} />
                <Route path="/ver" element={<CategoryPage />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;