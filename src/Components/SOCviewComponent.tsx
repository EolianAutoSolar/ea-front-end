import React, { useState} from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from 'apexcharts';

import '../style-sheets/SOCviewComponent.css';
import batteryIcon from "../icons/battery.svg";

/*
const series = [{ soc }];
    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
            borderRadius: 4,
            horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['SOC'],
        }
    };
*/
export interface Props {
    soc: number;
}

const BarSOC: React.FC<Props> = props => {
    const series: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined = [{ data: [props.soc] }];
    const options: ApexOptions | undefined = {
        chart: {
            toolbar: {
                show: false
            },
            selection: {
                enabled: false
            }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
                dataLabels: {
                    position: 'bottom',
                }
            }
        },
        colors: ["#00FF00"],
        dataLabels: {
            enabled: true,
            offsetX: 520,
            formatter: function(val, opts) {
                return `${val} %`
            },
            style: {
                colors: ['#000']
            }
        },
        labels: ["SOC"],
        xaxis: {
            axisBorder: {
                show: false
            },
            labels: {
                show: false,
            }
        },
        yaxis: {
            min: 0,
            max: 100,
            show: false,
            axisBorder: {
                show: false
            }
        },
        tooltip: {
            enabled: false
        },
        grid: {
            show: false,
            xaxis: {
                lines: {
                    show: false
                }
            },
            yaxis: {
                lines: {
                    show: false
                }
            }
        }
    };
    return (
        <div className="SOC_barChart_container">
            <img className="Battery_icon" src={batteryIcon}/>
            <div className="chart_container">
                <ReactApexChart className="Battery_graph" options={options} series={series} type="bar" height={180} width={1170}/>
            </div>
        </div>

    );
};

export default BarSOC;