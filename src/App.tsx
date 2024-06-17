import {FC} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MyCharacters from "./MyCharacters";
import TestView from "./test/TestView.tsx";

const App: FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<TestView/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
