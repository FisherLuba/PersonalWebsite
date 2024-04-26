import React from 'react';

export const Navbar = () => {
    return (<div className="navbar">
        <NavbarEntry name="Home" route=""/>
        <NavbarEntry name="Skills" route="skills"/>

    </div>)
}

function NavbarEntry(props: { name: string, route: string }) {
    const clickHandler = () => {
        window.location.href = `/${props.route}`
    }
    return (
        <button className="navbar-entry" onClick={clickHandler}>{props.name}</button>
    );
}