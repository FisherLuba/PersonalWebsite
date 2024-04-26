import React from 'react';

export const SocialLinks = () => {
    return (
        <div className="social-links">
            <Links/>
        </div>
    );
};

const Links = () => {
    return (
        <div>
            <Link name="LinkedIn" link="https://www.linkedin.com/in/fisher-luba/"></Link>
            <Link name="GitHub" link="https://github.com/FisherLuba"></Link>
            <Link name="Grilled Cheese" link="https://www.grilledcheese.dev"></Link>
        </div>
    );
}

function openLink(link: string) {
    window.open(link, "_blank");
}

function Link(props: { name: string, link: string }) {
    const clickHandler = () => {
        openLink(props.link);
    }
    return (
        <button className="social-link" onClick={clickHandler}>{props.name}</button>
    );
}