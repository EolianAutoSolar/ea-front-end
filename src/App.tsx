import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";
import BarSOC from "./Components/SOCviewComponent";
import { socket } from './socket';
import './App.css';

const App: React.FC = () => {
  
  const [averageTemperature, setAverageTemperature] = useState(0);
  const [maximumTemperature, setMaximumTemperature] = useState(0);
  const [minimumTemperature, setMinimumTemperature] = useState(0);
  const [kellyIzqTemperature, setKellyIzqTemperature] = useState(0);
  const [kellyDerTemperature, setKellyDerTemperature] = useState(0);

  const [power, setPower] = useState(0);
  const [soc, setSoc] = useState(71);
  const [velocity, setVelocity] = useState(0);
  const [chartVelocity, setChartVelocity] = useState(chartValue(velocity, 100));
  const units = ["Km/h", "%"];

  console.log(socket);

  function chartValue(value : number, maximum : number) {
    return Number((value/maximum).toFixed(2)) * 100;
  }

  // function rpmToKmh(rpm : number) {
  //   let localVelocity = 2*3.6*Math.PI*0.3*rpm/60;
  //   return Number(localVelocity.toFixed(1));
  // }

  useEffect(() => {
    console.log("updated velocity ", velocity);
    setChartVelocity(chartValue(velocity, 100));
  }, [velocity])

  useEffect(() => {
    console.log("updated power ", power);
  }, [power])

  useEffect(() => {
    function onConnect() {
      console.log("connected to server");
    }

    function onDisconnect() {
      console.log("disconnected from server");
    }

    socket.on('bms', (bms:any) => {
      console.log("Received bms from bms");
      setSoc(bms[41]); // bms[41] -> SOC
      setPower(bms[36]*bms[31]); // bms[36] -> current, bms[31] -> pack voltage
      console.log(bms);
      setAverageTemperature(bms[45]);
      setMinimumTemperature(bms[46]);
      setMaximumTemperature(bms[48]);
    })

    socket.on('kellyIzq', (data: any) => {
      console.log("Received data from kelly_izq");
      console.log(data);
      //setVelocity(Math.max(rpmToKmh(data[6]), velocity));
      setKellyIzqTemperature(data[11]);
    })

    socket.on('kellyDer', (data : any) => {
      console.log("Received data from kelly_der");
      console.log(data);
      //setVelocity(Math.max(rpmToKmh(data[6]), velocity));
      setKellyDerTemperature(data[11]);
    })

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on("connect_error", (err: any) => {
      console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('bms');
      socket.off('kellyIzq');
      socket.off('kellyDer');
      socket.off('connect_error');
    };
  }, []);

  function changeValues() {
    setSoc(Number(Math.random().toFixed(2))*100);
    setPower(Number(Math.random().toFixed(3))*8000);
    setVelocity(Number(Math.random().toFixed(2))*100);
  }

  return (
    <div className="App">
      <div className="temps">Temperaturas</div>
      <div className="temps">BMS promedio: {averageTemperature} °C</div>
      <div className="temps">BMS menor: {minimumTemperature} °C</div>
      <div className="temps">BMS mayor: {maximumTemperature} °C</div>
      <div className="temps">Kelly derecho: {kellyDerTemperature} °C</div>
      <div className="temps">Kelly izquierdo: {kellyIzqTemperature} °C</div>
      <h1 style={{
        color: '#FF0000',
      }}>Potencia:  {power} W</h1>
      <button onClick={changeValues}></button>
      <Chart
              options={ {
                plotOptions: {
                  radialBar: {
                    offsetY: -50,
                    offsetX: 50,
                    startAngle: -90,
                    endAngle: 90,
                    hollow: {
                      margin: 0,
                      size: '60%',
                      background: 'transparent',
                      image: undefined,
                    },
                    track: {
                      background: '#333333'
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
  
  
                colors: ['#FFFF00', '#00FF00'],
                labels: ['Velocidad', 'SOC'],
                legend: {
                  show: true,
                  floating: true,
                  fontSize: '30px',
                  position: 'left',
                  horizontalAlign: 'center', 
                  
                  offsetX: 480,//-370,
                  offsetY: 270,//-5,
                  labels: {
                    useSeriesColors: true,
                  },
                  // aca van las unidades de medida
                  formatter: function(seriesName: string, opts: { w: { globals: { series: { [x: string]: string; }; }; }; seriesIndex:  number; }) {
                    return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + " "+ units[opts.seriesIndex]
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
              series={ [chartVelocity, soc] }
              type="radialBar"
              width= "1220"
      />
      <div>
        <BarSOC soc={soc}/> 
      </div>
    </div>
  );
}

export default App;
