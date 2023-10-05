"use client"

import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LoadingData from "@/app/components/LoadingData";

export default function ProductPage() {
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [loadingDeleteState, setLoadingDeleteState] = useState(false)
    useEffect(() => {
        axios.get('/api/products')
            .then(res => {
                setProducts(res.data)
            })
            .catch(({message}) => {
                toast.error(message)
            })
            .finally(() => setLoading(false))
    }, [])

    const onDeleteConfirmation = (product) => {
        const state = window.confirm(`Are you sure you wish to delete ${product.title}?`)
        if(state) {
            deleteProduct(product._id)
        }
    }

    const deleteProduct = (productId) => {
        setLoadingDeleteState(true)
        axios.delete('/api/products?id='+productId)
            .then(res => {
                toast.success(res.data.message)
                const newProducts = products.filter(product => product._id !== productId)
                setProducts(newProducts)
            })
            .catch(err => {
                console.log(err?.response?.data?.message ?? err?.message)
                toast.error(err?.response?.data?.message ?? err?.message)
            })
            .finally(() => setLoadingDeleteState(false))
    }

    return (
        <>
            <div className="mt-4 flex justify-between card">
                <h1 className="text-2xl font-bold">Product List</h1>
                <Link href={'/products/add'} className="bg-blue-900 text-white p-2 rounded-lg">Add New Product</Link>
            </div>

            <div className="card mt-4">
                <table className="border-collapse border border-slate-400 w-full">
                    <thead>
                    <tr>
                        <th className="border border-slate-300">SI</th>
                        <th className="border border-slate-300">name</th>
                        <th className="border border-slate-300">Price</th>
                        <th className="border border-slate-300 w-[30%]">Description</th>
                        <th className="border border-slate-300 w-[20%]">Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {loading
                        ? (
                            <tr>
                                <td colSpan="5" className="text-center h-60">
                                    <LoadingData/>
                                </td>
                            </tr>
                        ) :
                        !products ?
                            (<tr>
                                <td colSpan="5" className="text-center h-20">No Data Found</td>
                            </tr>) :
                            products.map((product, index) => {
                                return (
                                    <tr className="text-center" key={index}>
                                        <td className="border border-slate-300">{index + 1}</td>
                                        <td className="border border-slate-300">{product.title}</td>
                                        <td className="border border-slate-300">{product.price}</td>
                                        <td className="border border-slate-300">{product.description}</td>
                                        <td className="border border-slate-300">
                                            <Link href={'/products/edit/'+product._id} className="btn-primary mr-1">Edit</Link>
                                            <button
                                                className={loadingDeleteState ? 'opacity-20 btn-danger': 'btn-danger'}
                                                onClick={() => onDeleteConfirmation(product)}
                                                disabled={loadingDeleteState}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}