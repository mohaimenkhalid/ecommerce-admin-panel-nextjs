"use client"
import {useState} from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';

export default function CategoryPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [categoryForm, setCategoryForm] = useState({
        name: '',
        parent: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setCategoryForm({
            ...categoryForm,
            [name]: value
        })
    }

    const createCategory = async (e) => {
        e.preventDefault()
        setLoading(true)
        axios.post('/api/category', categoryForm)
            .then(res => {
                toast.success('Category added successfully!');
                router.push('/category')
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setLoading(false))
    }
    return (
        <div className="px-6 w-full">
            {/*<div className="border border-gray-200 shadow rounded-md p-4 w-full">*/}
            {/*    <div className="animate-pulse flex space-x-4">*/}
            {/*        <div className="flex-1 space-y-6 py-1">*/}
            {/*            <div className="space-y-3">*/}
            {/*                <div className="grid grid-cols-3 gap-4">*/}
            {/*                    <div className="h-2 bg-gray-400 rounded col-span-2"></div>*/}
            {/*                    <div className="h-2 bg-gray-400 rounded col-span-1"></div>*/}
            {/*                </div>*/}
            {/*                <div className="h-5 bg-gray-400 rounded"></div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="card my-3 bg-gray-200 px-2 py-4 text-xl font-bold rounded-md">
                Category
            </div>
            <form onSubmit={createCategory} className="card relative items-center">
                <div className="mb-2">
                    <label>Category Name:</label>
                    <input name="name" type="text" value={categoryForm.title} onChange={handleChange} placeholder="category name"/>
                </div>
                <div className="mb-2">
                    <label>Parent:</label>
                    <select name="parent" value={categoryForm.parent} onChange={handleChange}>
                        <option value="">Select parent category</option>
                        <option>test</option>
                    </select>
                </div>
                <div className="mt-4">
                    <button type="submit" className={loading ? 'btn-primary opacity-50' : 'btn-primary '}>
                        {loading ?
                            <>
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                                </svg>
                                processing...
                            </> :
                            <span>
                                {categoryForm?._id ? 'Update Product' : 'Add'}
                            </span>
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}