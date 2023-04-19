import React ,{ useState }from 'react';

interface IconoProps {
    show: boolean;
    img: string;
  
  }
  
const Icono= ({show,img}: IconoProps) => {

    if(show==true){
        return (

            <img src={img} width="50px"/>
        )
    }

    else{
        return (
            <></>
        )
    }

}

export default Icono
