import { useState, useEffect } from "react"
import axios from "axios"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
 } from "chart.js"
import { Bar } from "react-chartjs-2"
import { getTingkat } from "../utils/tools"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface ChartData {
    labels: string[],
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[]
        borderColor: string
        borderWidth: number
    }[]
}

const DashboardPage = () => {
    const [barChartData, setBarChartData] = useState<ChartData | null>(null)

    useEffect(() => {
        fetchData()

    }, [])

    const fetchData = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/quality`)
            const data = response.data.data

            const rendahColor: string = "#4bc0c0"
            const sedangColor: string = "#ffce56"
            const tinggiColor: string = "#ff6384"

            const assignColor = (value: number) => {
                return getTingkat(value) === 'Rendah' ? rendahColor :
                    getTingkat(value) === 'Sedang' ? sedangColor :
                        tinggiColor
            }
            console.log(data);
            
            //assign chart labels and data
            const labels = data.map ((item: {daerah:string}) => item.daerah)
            const values = data.map ((item: {value:string}) => item.value)

            setBarChartData({
                labels,
                datasets: [
                    {
                        label: "Value by Daerah",
                        data: values,
                        backgroundColor: values.map((value: number) => assignColor(value)),
                        borderColor: values.map((value: number) => assignColor(value)),
                        borderWidth: 1,
                    }
                ]
            })
        } catch (error) {
            console.error('Error Fetching Data', error);          
        }
    }
    
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 10
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const
            },
            title: {
                display: true,
                text: 'Air Quality Levels by Region'
            }
        },
        maxBarThickness: 100,
        minBarThickness: 10
    }

  return (
      <div>
          <h1 className="text-2xl">Dashboard page</h1>
          <div className="flex mt-5 flex-col border-2 rounded-lg p-6">
              <h2>Value by Daerah</h2>
              {barChartData ? <Bar data={barChartData} options={options}/> : <p>Loading data ...</p>}
              <div className="flex-col justify-between h-20 flex ">
                  <div className="flex bg-[#4bc0c0] w-6 h-5 border-2">
                      <span className="ml-10">Rendah</span>
                  </div>
                  <div className="flex bg-[#ffce56] w-6 h-5">
                      <span className="ml-10">Sedang</span>
                  </div>
                  <div className="flex bg-[#ff6384] w-6 h-5">
                      <span className="ml-10">Tinggi</span>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default DashboardPage