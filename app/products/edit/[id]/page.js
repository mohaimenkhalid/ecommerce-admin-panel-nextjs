"use client"
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter, useParams} from 'next/navigation'
import toast from 'react-hot-toast';
import ProductForm from "@/app/components/product/ProductForm";
import LoadingData from "@/app/components/LoadingData";


export default function EditProductPage() {
    const router = useRouter()
    const {id} = useParams()
    const [loading, setLoading] = useState(true)
    const [productForm, setProductForm] = useState({
        title: '',
        description: '',
        price: '',
    })

    useEffect(() => {
        axios.get('/api/products?id=' + id)
            .then(res => {
                setProductForm({
                    ...productForm,
                    title: res.data.title,
                    description: res.data.description,
                    price: res.data.price,
                    _id: res.data._id,

                })
            })
            .finally(() => setLoading(false))
    }, [])

    const updateProduct = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await axios.put('/api/products', productForm)
        if (res.status === 200) {
            toast.success('Product updated successfully!');
            router.push('/products')
            setLoading(false)
        }
    }
    return (
        <div className="px-6">
            <div className="card my-3 bg-gray-200 px-2 py-4 text-xl font-bold rounded-md">
                Edit Product
            </div>
            {
                productForm?._id ?
                    <ProductForm
                        productForm={productForm}
                        submitAction={updateProduct}
                        setProductForm={setProductForm}
                        loading={loading}
                    />
                    :
                    <LoadingData className={'text-white my-6'} />
            }

        </div>
    )
}