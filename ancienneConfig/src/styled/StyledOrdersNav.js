import Styled from 'styled-components';


export const StyledNavigation = Styled.nav`
    display:flex;
    height:40px;
    padding:5px;
    background:black;
`
export const StyledMenuIcon = Styled.span`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%); 

    display: block;
    width: 22px;
    height: 2px;

    background-color: #FFF;

    transition: background 0.5s;
    & :after{
        transform: translateY(6px);
    },
    & :before & :after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        transform: translateY(-6px);

        display: block;
        width: 22px;
        height: 2px;

        background-color: #FFF;

        transition: transform 0.5s;
    }
`

export const StyledMenuIconSvg = Styled.svg`
    position: relative;
    z-index: 1;
    fill: #052b23;
    stroke-width: 1px;
    stroke: #FFF;
    stroke-dashoffset: 170;
    stroke-dasharray: 170;
    transition: stroke-dashoffset 0.5s; 
`
export const StyledMenuBox = Styled.div`
    position: relative; 
    width: 54px;
    height: 54px; 
    transition: transform 0.5s;
    
     
    .menu-icon.is-opened { 
        transform: rotate(180deg);
        stroke-dashoffset: 0;
    },
    .menu-icon.is-opened{
        & span{
           background: transparent; 
            & :before{
                transform: translateY(0) rotate(45deg);
            },
            & :after{
                transform: translateY(0) rotate(-45deg);
            }
        } 
    },
`