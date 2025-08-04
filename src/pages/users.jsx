import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { api } from '../config/apis'
import { addIcon, deleteIcon, searchIcon } from '../components/icons';
import { Link } from 'react-router-dom';

const Users = () => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [addName, setAddName] = useState("");
    const [addDescription, setAddDesription] = useState("");
    const [addModal, setAddModal] = useState(false);
    const filteredData = data.filter((e) => e.name?.toLowerCase().trim().includes(search.toLowerCase()));

    async function get() {
        try {
            const { data } = await axios.get(api);
            setData(data);
        } catch (error) {
            console.error(error);
        }
    }
    async function delUser(id) {
        try {
            await axios.delete(`${api}/${id}`);
            get();
        } catch (error) {
            console.error(error);
        }
    }
    async function addUser() {
        let obj = {
            name: addName,
            description: addDescription
        }
        try {
            await axios.post(api, obj);
            get();
            setAddModal(false)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        get()
    }, [])
    return (
        <div className='p-[20px] lg:w-[50%] dark:bg-gray-900 shadow-2xl transition-all duration-500 rounded-[12px] m-auto bg-gray-100'>
            <button onClick={() => setAddModal(true)}>{addIcon}</button>
            {addModal && (
                <div className='flex items-center justify-center fixed z-50 inset-0 gap-[10px] flex-col backdrop-blur-[5px]'>
                    <div className='flex flex-col gap-[10px] p-[20px] bg-gray-200 shadow-2xl rounded-[5px]'>
                        <input placeholder='Name' className='bg-white px-[10px] py-[5px] rounded-[5px] cursor-pointer border w-full  border-gray-100 focus:border focus:border-blue-500 transition-all duration-500 outline-none' type="text" value={addName} onChange={(e) => setAddName(e.target.value)} />
                        <input placeholder='Description' className='bg-white px-[10px] py-[5px] rounded-[5px] cursor-pointer border w-full  border-gray-100 focus:border focus:border-blue-500 transition-all duration-500 outline-none' type="text" value={addDescription} onChange={(e) => setAddDesription(e.target.value)} />
                        <button className='bg-blue-500 text-white py-[5px] px-[10px] border border-blue-500 w-full rounded-[5px]' onClick={() => addUser()}>Save</button>
                    </div>
                </div>
            )}
            <div className='flex items-center'>
                <button className='pl-[10px] absolute'>{searchIcon}</button>
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" placeholder='search' className='p-[10px] border-2 focus:border-2 focus:border-blue-500 dark:border-gray-900 border-gray-100 outline-none pl-[40px] rounded-[12px] w-full dark:bg-gray-950 bg-gray-200 transition-all duration-500 dark:text-white' />
            </div>
            <h1 className='font-bold py-[15px] text-[20px] text-gray-700 dark:text-gray-200 transition-all duration-500'>Users: {filteredData.length}</h1>
            <div className='flex flex-col gap-[10px] items-start rounded-[12px] dark:bg-gray-900 transition-all duration-500 bg-gray-100 overflow-scroll h-[200px] lg:h-[400px] w-full m-auto justify-start'>
                {data
                    .filter((e) => e.name.toLowerCase().trim().includes(search.toLowerCase()))
                    .map((e) => {
                        return (
                            <article className='bg-gray-200 flex justify-between dark:bg-gray-950 transition-all duration-500 rounded-[12px] p-[10px] w-full' key={e.id}>
                                <Link to={`/info/${e.id}`}>
                                    <span className='cursor-pointer font-bold text-blue-500'>{e.name}</span>
                                </Link>
                                <button className='cursor-pointer' onClick={() => delUser(e.id)}>{deleteIcon}</button>
                            </article>
                        )
                    })}
            </div>
        </div>
    )
}

export default Users