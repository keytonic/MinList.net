import React, { useState, useEffect } from "react";
import MenuOptions from './MenuOptions';
import MenuLists from './MenuLists';
import '../index.css'; 

export default function Header(props) 
{
    const [state, setState] = useState({
        menuOptionsOpen: false,
        menuListsOpen: false
    });

    useEffect(() => 
    {
        let menuOptionsWrapper = document.getElementById("menu-options-wrapper");

        if(menuOptionsWrapper != null)
        {
            menuOptionsWrapper.style.visibility = "visible";
            menuOptionsWrapper.style.opacity = "1";
        }

        let menuListsWrapper = document.getElementById("menu-lists-wrapper");

        if(menuListsWrapper != null)
        {
            menuListsWrapper.style.visibility = "visible";
            menuListsWrapper.style.opacity = "1";
        }

    }, [state.menuOptionsOpen,state.menuListsOpen]);

    function handleClick(event)
    {
        if(event.target.id == "header-left" || event.target.id == "lists-menu-icon" || event.target.id == "lists-menu-icon-path")
        {
            if(state.menuListsOpen == false)
                document.body.style.overflowY = "hidden";
            else
                document.body.style.overflowY = "unset";

            setState(previousState => { return { ...previousState, menuListsOpen: !state.menuListsOpen, menuOptionsOpen: false }});


        }
        else if(event.target.id == "header-right" || event.target.id == "options-menu-icon" || event.target.id == "options-menu-icon-path")
        {
            if(state.menuOptionsOpen == false)
                document.body.style.overflowY = "hidden";
            else
                document.body.style.overflowY = "unset";
            //document.getElementById("menu-options-wrapper").style.visibility = "visible";
            setState(previousState => { return { ...previousState, menuOptionsOpen: !state.menuOptionsOpen, menuListsOpen: false }});
        }
    }

    function handleState(args)
    {
        if (args.hasOwnProperty("menuListsOpen")) 
        {
            setState(previousState => { return { ...previousState, menuListsOpen: !state.menuListsOpen, menuOptionsOpen: false }});
        }
        else if (args.hasOwnProperty("menuOptionsOpen")) 
        {
            setState(previousState => { return { ...previousState, menuOptionsOpen: !state.menuOptionsOpen, menuListsOpen: false }});
        }
        if (args.hasOwnProperty("currentList")) 
        {
            props.handler({currentList: args.currentList});
        }
        else if (args.hasOwnProperty("loggedIn")) 
        {
            props.handler({loggedIn: props.loggedIn});
        }
        if (args.hasOwnProperty("showAll")) 
        {
            props.handler({showAll:args.showAll});
        }
        if (args.hasOwnProperty("lists")) 
        {
            props.handler({lists:args.lists});
        }
        if (args.hasOwnProperty("background")) 
        {
            props.handler({background:args.background});
        }
        if (args.hasOwnProperty("reRender")) 
        {
            props.handler({reRender: args.reRender});
        }
    }

    return (
        <>
            <div id="header-wrapper">
                <div id="header-left" onClick={handleClick}>
                    <svg className="nav-icon" id="lists-menu-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 16 16">
                        <path id="lists-menu-icon-path" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5zM3 3H2v1h1z"></path>
                        <path id="lists-menu-icon-path" d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1z"></path>
                        <path id="lists-menu-icon-path" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5zM2 7h1v1H2zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm1 .5H2v1h1z"></path>
                    </svg>
                </div>
                <div id="header-center">
                    {props.title}
                </div>
                <div id="header-right" onClick={handleClick}>
                    <svg className="nav-icon" id="options-menu-icon" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 16 16">
                        <path id="options-menu-icon-path" d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"></path>
                    </svg>
                </div>
            </div>
            <MenuLists   open={state.menuListsOpen}   handler={handleState} userid={props.userid} lists={props.lists}/>
            <MenuOptions open={state.menuOptionsOpen} handler={handleState} lists={props.lists} install={props.install}/>
        </>
    );
}