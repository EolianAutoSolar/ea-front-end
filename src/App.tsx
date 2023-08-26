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
  const [seriesState, setSeriesState] = useState({ series: [30, 15, 50, 60, 70] });
  const [legendSeries, setLegendSeries] = useState([30, 15, 50, 60, 70]);

  const [leftRpm, setLeftRpm] = useState(0);
  const [rightRpm, setRightRpm] = useState(0);
  const [power, setPower] = useState(0);
  const [soc, setSoc] = useState(30);

  console.log(socket);

  useEffect(() => {
    function onConnect() {
      console.log("connected to server");
    }

    function onDisconnect() {
      console.log("disconnected from server");
    }

    socket.on('bms', (bms: any) => {
      console.log("Received bms from bms");
      setSoc(Math.min(bms[41], 100));
      setPower(Math.min(bms[36] * bms[31], 100));
      console.log(bms);
      setAverageTemperature(bms[45]);
      setMinimumTemperature(bms[46]);
      setMaximumTemperature(bms[48]);
    });

    socket.on('kellyIzq', (kellyIzq: any) => {
      console.log("Received data from kellyIzq");
      setLeftRpm(Math.min(kellyIzq[17], 100));
      console.log(kellyIzq);
      setKellyIzqTemperature(kellyIzq[11]);

    });

    socket.on('kellyDer', (kellyDer: any) => {
      console.log("Received data from kellyDer");
      setRightRpm(Math.min(kellyDer[17], 100));
      setKellyDerTemperature(kellyDer[11]);
    });

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on("connect_error", (err: any) => {
      console.log(`connect_error due to ${err.message}`);
    });

    // this is for testing
    const intervalId = setInterval(() => {
      const newValues = new Array(5).fill(0).map(() => Math.random() * 200);
      setSeriesState({series: newValues.map(val => Math.min(val, 100))});
      setLegendSeries(newValues.map(val => val.toFixed(2) as any));
      console.log(newValues)
      setSoc((Math.random() * 100).toFixed(2) as any);
    }, 5000);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('bms');
      socket.off('kellyIzq');
      socket.off('kellyDer');
      socket.off('connect_error');
      // this is for testing
      clearInterval(intervalId);

    };
  }, []);

  return (
    <div className="App">
      <div className={`row`}>
        <div className="col-4 mb-1 mr-5"></div>
        <div className="col-1 d-flex justify-content-center mt-2 ml-5">
        <div className="temps">Temperaturas</div>
          <div className="temps">BMS promedio: {averageTemperature} °C</div>
          <div className="temps">BMS menor: {minimumTemperature} °C</div>
          <div className="temps">BMS mayor: {maximumTemperature} °C</div>
          <div className="temps">Kelly derecho: {kellyDerTemperature} °C</div>
          <div className="temps">Kelly izquierdo: {kellyIzqTemperature} °C</div>
        </div>
        <div className="col-1 d-flex justify-content-center mt-2 ml-5">
          <Chart
            options={{
              plotOptions: {
                radialBar: {
                  offsetY: 50,
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
                    background: '#222222'
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
              colors: ['#1ab7ea', 
              function (valueStatus: any) {
                const value = valueStatus.value;
                if (value < 30)
                  return '#0084ff'
                else {
                  const g = Math.floor(255 - (value - 30) * 255 / 70);
                  return `rgb(255, ${g}, 0)`;
                }
              }
              ,
              function (valueStatus: any) {
                const value = valueStatus.value;
                if (value < 30)
                  return '#39539E'
                else {
                  const g = Math.floor(255 - (value - 30) * 255 / 70);
                  return `rgb(255, ${g}, 0)`;
                }
              }, '#0077B5', '#990000'],
              labels: ['RPM', 'Temperatura del motor', 'Temperatura del inversor', 'Throttle', 'Reverse'],
              legend: {
                show: true,
                floating: true,
                fontSize: '30px',
                position: 'left',
                horizontalAlign: 'center',
                offsetX: 420,//-370,
                offsetY: 270,//-5,
                labels: {
                  useSeriesColors: true,
                },
                markers: {
                  width: 5,
                  height: 5,
                  radius: 10
                },
                formatter: function (seriesName: string, opts: { seriesIndex: string | number; }) {
                  let index = Number(opts.seriesIndex);
                  return seriesName + ":  " + legendSeries[index];
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
              }]
            }}
            series={seriesState.series.map(val => Math.min(val, 100))}
            type="radialBar"
            width="1220"
          />
        </div>
        <BarSOC soc={soc}/> 
      </div>
    </div>
  );
}

export default App;
