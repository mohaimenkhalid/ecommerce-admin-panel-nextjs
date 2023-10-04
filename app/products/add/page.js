"use client"
import {useState} from "react";
import axios from "axios";
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import ProductForm from "@/app/components/product/ProductForm";


export default function AddProductPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [productForm, setProductForm] = useState({
        title: '',
        description: '',
        price: '',
    })



    const createProduct = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await axios.post('/api/products', productForm)
        if(res.status === 200) {
            toast.success('Product added successfully!');
            router.push('/products')
            setLoading(false)
        }
    }
    return (
        <div className="px-6">
            <div className="card my-3 bg-gray-200 px-2 py-4 text-xl font-bold rounded-md">
                Add New Product
            </div>
            <ProductForm
                productForm={productForm}
                submitAction={createProduct}
                loading={loading}
                setProductForm={setProductForm}
            />
        </div>
    )
}