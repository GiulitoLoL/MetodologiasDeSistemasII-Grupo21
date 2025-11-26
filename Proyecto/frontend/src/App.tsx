import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext"; 
import HomePage from "./pages/HomePage";
import ProductManagementPage from "./pages/ProductManagementPage";
import './stylesheets/input.css'; 

const App = () => {
    return (
        <ProductProvider> 
            <BrowserRouter>
                <div className='app'>
                    <header className="header-nav">
                        <Link to="/"><button>🏠 Stock Principal</button></Link>
                        <Link to="/gestion-productos">
                            <button className="manage-button">⚙️ Administrar Productos</button>
                        </Link>
                    </header>

                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route 
                            path="/gestion-productos/:productId?" 
                            element={<ProductManagementPage />} 
                        />
                    </Routes>
                </div>
            </BrowserRouter>
        </ProductProvider>
    );
};

export default App;