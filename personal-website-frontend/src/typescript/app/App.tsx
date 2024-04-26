import React from 'react';
import '../../css/App.css';
import '../../css/theme.css';
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import {Navbar} from "./components/Navbar"
import {HomePage} from "./HomePage";
import {SkillsPage} from "./SkillsPage";
import {SocialLinks} from "./components/SocialLinks";

function App() {
    return (
        <Router>
            <Navbar/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/skills" element={<SkillsPage/>}/>
            </Routes>
            <SocialLinks/>
        </Router>
    );
}


export default App;
