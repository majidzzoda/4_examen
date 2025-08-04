import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { api } from '../config/apis';
import { checkIcon, editIcon } from '../components/icons';

const Info = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [editName, setEditName] = useState("");
    const [editDescription, setEditDesription] = useState("");
    const [editModal, setEditModal] = useState(false);
    function showEdit() {
        setEditModal(true);
        setEditName(data.name)
        setEditDesription(data.description)
    }
    async function get() {
        try {
            const { data } = await axios.get(`${api}/${id}`);
            setData(data);
        } catch (error) {
            console.error(error);
        }
    }
    async function checkStatus(data) {
        let obj = {
            ...data,
            isCompleted: !data.isCompleted
        }
        try {
            await axios.put(`${api}/${id}`, obj);
            get();
        } catch (error) {
            console.error(error);
        }
    }
    async function editUser() {
        let obj = {
            name: editName,
            description: editDescription
        }
        try {
            await axios.put(`${api}/${id}`, obj);
            get();
            setEditModal(false);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        get()
    }, [])
    return (
        <div className='flex flex-col items-center gap-[20px] justify-center'>
            {editModal && (
                <div className='flex items-center justify-center fixed z-50 inset-0 gap-[10px] flex-col backdrop-blur-[5px]'>
                    <div className='flex flex-col gap-[10px] p-[20px] bg-gray-200 shadow-2xl rounded-[5px]'>
                        <input className='bg-white px-[10px] py-[5px] rounded-[5px] cursor-pointer border w-full  border-gray-100 focus:border focus:border-blue-500 transition-all duration-500 outline-none' type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />
                        <input className='bg-white px-[10px] py-[5px] rounded-[5px] cursor-pointer border w-full  border-gray-100 focus:border focus:border-blue-500 transition-all duration-500 outline-none' type="text" value={editDescription} onChange={(e) => setEditDesription(e.target.value)} />
                        <button className='bg-blue-500 text-white py-[5px] px-[10px] border border-blue-500 w-full rounded-[5px]' onClick={() => editUser()}>Save</button>
                    </div>
                </div>
            )}
            <div className='flex flex-col bg-gray-100 shadow-2xl p-[20px] rounded-[12px] dark:bg-gray-900 transition-all duration-500 items-center gap-[20px] justify-center'>
                <div className='flex items-center gap-[20px]'>
                    <img className='w-[100px] h-[100px] rounded-[50%]' src={data.images} alt="" />
                    <div>
                        <h1 className='text-[20px] font-bold'>{data.name}</h1>
                        <h1>{data.description}</h1>
                        <h1 className={data.isCompleted ? 'text-green-500 font-bold transition-all duration-500' : 'text-red-500 font-bold transition-all duration-500'}>{data.isCompleted ? "Active" : "Inactive"}</h1>
                    </div>
                </div>
                <div className='flex items-center gap-[10px]'>
                    <button onClick={() => checkStatus(data)}>{checkIcon}</button>
                    <button onClick={() => showEdit()}>{editIcon}</button>
                </div>
            </div>
        </div>
    )
}

export default Info