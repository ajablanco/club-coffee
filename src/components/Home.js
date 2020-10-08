import React from 'react';
import img from "../images/mike-kenneally-tNALoIZhqVM-unsplash.jpg";
import styled from "styled-components";

const ImageBackground = styled.div`
    vertical-align: top;
    display: block;
    width: 100vw;
`

const Home = () => {
    return (
        <ImageBackground>
         <h1 style={{position: "fixed", color: "white", fontSize: '5rem', marginLeft: "20%", fontFamily: "Sansita Swashed"}}>Welcome to Club Coffee</h1>
         <h4 style={{position: "fixed", color: "white", fontSize: '2rem', marginLeft: "55%", marginTop: "20%", fontFamily: "Sansita Swashed"}}>Experience Love at First Sip!</h4>
         <img src={img} alt="coffee" style={{postion: "absolute", width: "100vw", height:"100vh"}}/>
        </ImageBackground>
    )
}

export default Home
