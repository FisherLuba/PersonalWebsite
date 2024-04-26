import {Title} from "./components/Title";
import {SocialLinks} from "./components/SocialLinks";
import {FakeConsole} from "./components/FakeConsole";

export const SkillsPage = () => {
    return (
        <div className="App">
            <Title title="Skills"/>
            <FakeConsole/>
            <SocialLinks/>
        </div>
    );
}