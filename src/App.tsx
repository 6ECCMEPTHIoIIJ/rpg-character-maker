import {FC} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MyCharacters from "./MyCharacters";

const App: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MyCharacters/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
