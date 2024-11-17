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
import Modal from "../component/Modal"
import { handleToastError, handleToastSuccess } from "../utils/toast"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

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

interface QualityData {
    id: number
    daerah: string
    value: number
    tingkat: string
}


const DashboardPage = () => {

    const [barChartData, setBarChartData] = useState<ChartData | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState<"create" | "edit" | "delete">("create")
    const [qualityData, setQualityData] = useState<QualityData[]>([])
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const [currentEditData, setCurrentEditData] = useState<any | null>(null)
    const [searchId, setSearchId] = useState<string>("")

    useEffect(() => {
        fetchData()

    }, [])
    const navigate = useNavigate()
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
            
            //assign chart labels and data
            const labels = data.map ((item: {daerah:string}) => item.daerah)
            const values = data.map ((item: {value:string}) => item.value)
            const qualityDataList: QualityData[] = data.map((item: any) => ({
                id: item.id,
                daerah: item.daerah,
                value: item.value,
                tingkat: item.tingkat
            }))

            setQualityData(qualityDataList)
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
    
    const checkExistingDaerah = (daerah: string, type: 'create' | 'edit') => {
        
        if (barChartData && type === 'create') {
            return barChartData.labels.some((item) => {
              return  item.toLowerCase() === daerah.toLowerCase()
            })
        } else if (barChartData && type === "edit") {
            return barChartData.labels.some((item, index) => {
                return barChartData.labels.some((item, index) => {
                    const dataItem = barChartData.datasets[0].data[index]
                    return item.toLowerCase() === daerah.toLowerCase() && dataItem !== selectedId
                })
            })
        }
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 10,
                ticks: {
                    stepSize: 1
                }
            }
        },
        plugins: {
            
        },
        maxBarThickness: 60,
        minBarThickness: 10
    }
    const closeModal = () => {
        setShowModal(false)
    }

    const handleOpenModal = (type: "create" | "edit" | "delete", item: QualityData) => {
        setModalType(type)
        setShowModal(true)

        if (item) {
            setSelectedId(item.id)
            setCurrentEditData(item)
        } else {
            setSelectedId(null)
            setCurrentEditData(null)
        }
        
    }
    const handleSearchById = () => {
        if (searchId.trim()) {
            navigate(`/details/${searchId}`)
        }
    }
    const handleCreateSubmit = async (newData: { daerah: string, value: number, tingkat: string }) => {
        let token = Cookies.get('token')

        if (checkExistingDaerah(newData.daerah)) {
            handleToastError('Daerah already exists!')
        } else {
            try {
                await axios.post(`${import.meta.env.VITE_API_BASE_URL}/quality/create`, {
                    daerah: newData.daerah,
                    value: newData.value,
                    tingkat: newData.tingkat
                },{headers: {'authorization' : token}})
    
                fetchData()
                handleToastSuccess('Created new data Sucess!!')
                setShowModal(false)
            } catch (error: any) {
                if (error.response.data.message === "Token is required" || error.response.data.message === "Invalid token") {
                    console.error('Token is required')
                    handleToastError('Please Login again')
                    navigate('/login')
                } else {
                    console.error('Error posting data', error)
                    handleToastError('Something went wrong, please try again later')
                }
                
            }
        }

    }

    const handleEditSubmit = async (updatedData: { daerah: string, values: number }) => {
        
        if (checkExistingDaerah(updatedData.daerah, "edit")) {
                handleToastError('Daerah already exists!')
        } else {
            try {
        let token = Cookies.get('token')

        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/quality/${selectedId}`, updatedData,{headers: {'authorization' : token}})
        setSelectedId(null)
        setCurrentEditData(null)
        fetchData()
        setShowModal(false)
        handleToastSuccess('Data updated successfully')
    } catch (error: any) {
        if (error.response.data.message === "Token is required" || error.response.data.message === "Invalid token") {
            console.error("Token is required")
            handleToastError("Please login")
            navigate("/login")
        } else {
            console.error(`Error updating data: ${selectedId}`, error)
            handleToastError('Failed to update data, please try again')
        }
    }
            }
            }

    const handleDelete = async () => {
        try {
            let token = Cookies.get('token')
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/quality/${selectedId}`, {headers: {'authorization' : token}})
            fetchData()
            setShowModal(false)
            handleToastSuccess("Data deleted Successfully")
        } catch (error: any) {
            if (error.response.data.message === "Token is required" || error.response.data.message === "Invalid token") {
                console.error('Token is required')
                handleToastError('Please Login again')
                navigate('/login')
            } else {
                console.error("Error Deleting data", error)
                handleToastError('Failed to delete data, please try again')
            }
        }
    }

  return (
    <div className="flex flex-col items-center w-full">
        <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 flex flex-col items-center">
            <h1 className="text-3xl text-center">Dashboard Page</h1>
            <div className="flex mt-5 flex-col border-2 rounded-lg p-6 w-[600px]">
                <h2 className="text-xl text-center mb-4">Value by Daerah</h2>
                {barChartData ? (
                    <div className="mx-auto">
                        <Bar data={barChartData} options={options} />
                    </div>
                ) : (
                    <p>Loading data ...</p>
                )}
                <div className="mt-10">
                    <div className="flex flex-col justify-start mb-2">
                        <div className="flex bg-[#4bc0c0] w-6 h-5 border-2">
                            <span className="ml-8 text-sm">Rendah</span>
                        </div>
                        <div className="flex bg-[#ffce56] w-6 h-5 border-2">
                            <span className="ml-8 text-sm">Sedang</span>
                        </div>
                        <div className="flex bg-[#ff6384] w-6 h-5 border-2">
                            <span className="ml-8 text-sm">Tinggi</span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="container mx-auto p-6">
          <input
          type="number"
                  placeholder="Search by ID"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
          className="mb-4 p-2 border rounded hide-arrow text-gray-700"
              />
              <button
        onClick={handleSearchById}
        className="bg-green-700 text-white px-5 py-2.5 rounded-lg ml-4"
      >
        Search data by id
      </button>
      {/* Button to open modal */}
      
              <Modal
                  modalType={modalType}
                  isOpen={showModal}
                  onClose={closeModal}
                  onSubmit={modalType === "create"? handleCreateSubmit : modalType === "edit" ? handleEditSubmit : handleDelete}
                  initialData={modalType !== "create" && currentEditData}
              />
      
          </div>
          <button
        onClick={() => handleOpenModal("create")}
        className="bg-blue-700 text-white px-5 py-2.5 rounded-lg"
      >
        Add New Data
      </button>
          {qualityData.length>0 ? (
              <div className="mt-6 w-4/5 border rounded-lg p-4 bg-g1">
              <h2 className="text-xl mb-4">Data List</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2">ID</th>
                    <th className="border p-2">Daerah</th>
                    <th className="border p-2">Value</th>
                    <th className="border p-2">Tingkat</th>
                    <th className="border p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                          {qualityData.map((item) => (
                        <tr key={item.id} className="text-center">
                          <td className="border p-2">{item.id}</td>
                          <td className="border p-2">{item.daerah}</td>
                          <td className="border p-2">{item.value}</td>
                          <td className="border p-2">{item.tingkat}</td>
                          <td className="border p-2 space-x-2">
                            <button
                              onClick={() => handleOpenModal("edit", item)}
                              className="bg-blue-500 text-white px-3 py-1 rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleOpenModal("delete", item)}
                              className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>

                  ) )}
                </tbody>
              </table>
            </div>
        ): null }  
</div>
  )
}

export default DashboardPage