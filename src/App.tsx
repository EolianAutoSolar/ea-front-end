import React ,{ useState, useEffect }from 'react';
import logo from './logo.svg';
import carga from './icons/Carga.png'
import descarga from './icons/Descarga.png'
import heat from './icons/Heat.png'

import Chart from "react-apexcharts";
import Icono from './Components/Icono';

import { socket } from './socket';

import './App.css';
import { appendFile } from 'fs';

const App= () => {

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [cargaState,setcargaState]=useState(true)
  const [descargaState,setdescargaState]=useState(true)
  const [heatState,setheatState]=useState(true)
  const [bms, setBms] = useState([0,0,0,0]);
  const [seriesState,setSeriesState]=useState({series: [30,40,50,60,70]})
 
  const [chartState,setchartState] =useState(
    
    {
      series: [76, 67, 61, 90],
            // options: {
            //   chart: {
            //     height: 390,
            //     type: 'radialBar',
            //   },
            //   plotOptions: {
            //     radialBar: {
            //       offsetY: 0,
            //       startAngle: 0,
            //       endAngle: 270,
            //       hollow: {
            //         margin: 5,
            //         size: '30%',
            //         background: 'transparent',
            //         image: undefined,
            //       },
            //       dataLabels: {
            //         name: {
            //           show: false,
            //         },
            //         value: {
            //           show: false,
            //         }
            //       }
            //     }
            //   },


            //   colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
            //   labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
            //   legend: {
            //     show: true,
            //     floating: true,
            //     fontSize: '16px',
            //     position: 'left',
            //     offsetX: 160,
            //     offsetY: 15,
            //     labels: {
            //       useSeriesColors: true,
            //     },
                
                 
            //     formatter: function(seriesName: string, opts: { w: { globals: { series: { [x: string]: string; }; }; }; seriesIndex: string | number; }) {
            //       return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
            //     },
            //     itemMargin: {
            //       vertical: 3
            //     }
            //   },
            //   responsive: [{
            //     breakpoint: 480,
            //     options: {
            //       legend: {
            //           show: false
            //       }
            //     }
            //   }]},





  })

  useEffect(() => {
    function onConnect() {
      console.log("connected to server");
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log("disconnected from server");
      setIsConnected(false);
    }

    socket.on('bms', (data) => {
      console.log("Received data from bms");
      setBms(data);
      console.log(data);
    })

    socket.on('kelly_izq', (data) => {

    })

    socket.on('kelly_der', (data) => {
      
    })

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('bms');
      socket.off('kelly_der');
      socket.off('kelly_izq');
    };
  }, []);

  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
{/*       
      <div className='row'>
      <div className="col-4 alertas ">
        
      <div className="vstack gap-1">
          <div ><Icono {...{show: cargaState, img: carga}}></Icono></div>
          <div ><Icono {...{show: heatState, img: heat}}></Icono></div>
          <div ><Icono {...{show: descargaState, img: descarga}}></Icono></div>
          
        </div>

        
        
      </div>
      <div className="col-8 filler-leyendas">Leyendas</div>
  

      </div> */}

      <div className={`row`}>
      <div className="col-4 mb-1 mr-5"></div>
      <div className="col-2 d-flex justify-content-center mt-2 ml-5">
      <Chart
      
              options={ {
                
                plotOptions: {
                  radialBar: {
                    offsetY: -50,
                    offsetX: 50,
                    startAngle: -90,
                    endAngle: 0,
                    hollow: {
                      margin: 0,
                      size: '60%',
                      background: 'transparent',
                      image: undefined,
                    },
                    dataLabels: {
                      name: {
                        show: false,
                      },
                      value: {
                        show: false,
                      }
                    }
                  }
                },
  
  
                colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
                labels: ['Velocidad', 'Soc', 'Corriente del Banco', 'Voltaje del Banco'],
                legend: {
                  show: true,
                  floating: true,
                  fontSize: '20px',
                  position: 'left',
                  horizontalAlign: 'left', 
                  
                  offsetX: 650,//-370,
                  offsetY: -20,//-5,
                  labels: {
                    useSeriesColors: true,
                  },
                  
                  formatter: function(seriesName: string, opts: { w: { globals: { series: { [x: string]: string; }; }; }; seriesIndex: string | number; }) {
                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                  },
                  itemMargin: {
                    vertical: 7,
                    horizontal: -10
                  }
                },
                responsive: [{
                  breakpoint: 480,
                  options: {
                    legend: {
                        show: false
                    }
                  }
                }]}}
              series={ bms }
              type="radialBar"
              width= "1220"
      
      
      />
      </div>
      <div className="col-1 d-flex justify-content-center mt-2 ml-5">
      <Chart
      
              options={ {
                
                plotOptions: {
                  radialBar: {
                    offsetY: 300,
                    offsetX: -80,
                    startAngle: -90,
                    endAngle: 0,
                    hollow: {
                      margin: 0,
                      size: '50%',
                      background: 'transparent',
                      image: undefined,
                    },
                    dataLabels: {
                      name: {
                        show: false,
                      },
                      value: {
                        show: false,
                      }
                    }
                  }
                },
  
  
                colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5', '#990000'],
                labels: ['RPM', 'Temperatura del motor', 'Temperatura del inversor', 'Throttle', 'Reverse'],
                legend: {
                  show: true,
                  floating: true,
                  fontSize: '10px',
                  position: 'left',
                  horizontalAlign: 'left', 
                  
                  offsetX: 210,//-370,
                  offsetY: 305,//-5,
                  labels: {
                    useSeriesColors: true,
                  },

                  markers: {
                    width:5,
                    height:5,
                    radius: 10
                  },
                  
                  formatter: function(seriesName: string, opts: { w: { globals: { series: { [x: string]: string; }; }; }; seriesIndex: string | number; }) {
                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                  },
                  itemMargin: {
                    vertical: -1,
                    horizontal: -10
                  }
                },
                responsive: [{
                  breakpoint: 480,
                  options: {
                    legend: {
                        show: false
                    }
                  }
                }]}}
              series={ seriesState.series}
              type="radialBar"
              width= "600"
      
      
      />
      </div>
      <div className="col-5 d-flex justify-content-center mt-2 ml-5">
      <Chart
      
              options={ {
                
                plotOptions: {
                  radialBar: {
                    offsetY: 300,
                    offsetX: 0,
                    startAngle: -90,
                    endAngle: 0,
                    hollow: {
                      margin: 0,
                      size: '50%',
                      background: 'transparent',
                      image: undefined,
                    },
                    dataLabels: {
                      name: {
                        show: false,
                      },
                      value: {
                        show: false,
                      }
                    }
                  }
                },
  
  
                colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5', '#990000'],
                labels: ['RPM', 'Temperatura del motor', 'Temperatura del inversor', 'Throttle', 'Reverse'],
                legend: {
                  show: true,
                  floating: true,
                  fontSize: '10px',
                  position: 'left',
                  horizontalAlign: 'left', 
                  
                  offsetX: 290,//-370,
                  offsetY: 305,//-5,
                  labels: {
                    useSeriesColors: true,
                  },

                  markers: {
                    width:5,
                    height:5,
                    radius: 10
                  },
                  
                  formatter: function(seriesName: string, opts: { w: { globals: { series: { [x: string]: string; }; }; }; seriesIndex: string | number; }) {
                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
                  },
                  itemMargin: {
                    vertical: -1,
                    horizontal: -10
                  }
                },
                responsive: [{
                  breakpoint: 480,
                  options: {
                    legend: {
                        show: false
                    }
                  }
                }]}}
              series={ seriesState.series}
              type="radialBar"
              width= "600"
      
      
      />
      </div>
         
</div>    
    </div>
  );
}

export default App;
