import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";
import { socket } from './socket';
import './App.css';

const App: React.FC = () => {
  const [seriesState, setSeriesState] = useState({ series: [30, 40, 50, 60, 70] });

  const [leftRpm, setLeftRpm] = useState(0);
  const [rightRpm, setRightRpm] = useState(0);
  const [power, setPower] = useState(0);
  const [soc, setSoc] = useState(0);

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
    });

    socket.on('kellyIzq', (kellyIzq: any) => {
      console.log("Received data from kellyIzq");
      setLeftRpm(Math.min(kellyIzq[17], 100));
      console.log(kellyIzq);
    });

    socket.on('kellyDer', (kellyDer: any) => {
      console.log("Received data from kellyDer");
      setRightRpm(Math.min(kellyDer[17], 100));
    });

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

  return (
    <div className="App">
      <div className={`row`}>
        <div className="col-4 mb-1 mr-5"></div>
        <div className="col-2 d-flex justify-content-center mt-2 ml-5">
          <Chart
            options={{
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
              labels: ['RPM Izq', 'RPM Der', 'SOC', 'Potencia'],
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
                formatter: function (seriesName: string, opts: { w: { globals: { series: { [x: string]: string; }; }; }; seriesIndex: string | number; }) {
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
              }]
            }}
            series={[
              Math.min(leftRpm, 100),
              Math.min(rightRpm, 100),
              Math.min(soc, 100),
              Math.min(power, 100)
            ]}
            type="radialBar"
            width="1220"
          />
        </div>
        <div className="col-1 d-flex justify-content-center mt-2 ml-5">
          <Chart
            options={{
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
                  width: 5,
                  height: 5,
                  radius: 10
                },
                formatter: function (seriesName: string, opts: { w: { globals: { series: { [x: string]: string; }; }; }; seriesIndex: string | number; }) {
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
              }]
            }}
            series={seriesState.series.map(val => Math.min(val, 100))}
            type="radialBar"
            width="600"
          />
        </div>
        <div className="col-5 d-flex justify-content-center mt-2 ml-5">
          <Chart
            options={{
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
                  width: 5,
                  height: 5,
                  radius: 10
                },
                formatter: function (seriesName: string, opts: { w: { globals: { series: { [x: string]: string; }; }; }; seriesIndex: string | number; }) {
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
              }]
            }}
            series={seriesState.series.map(val => Math.min(val, 100))}
            type="radialBar"
            width="600"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
