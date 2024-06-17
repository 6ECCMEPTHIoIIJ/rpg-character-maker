import {FC} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Main} from "./main/Main.tsx";

const App: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
