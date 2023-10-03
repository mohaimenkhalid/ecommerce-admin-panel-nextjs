"use client"
import {useState} from "react";

export default function AddProductPage() {
    const [productForm, setProductForm] = useState({
        title: '',
        description: '',
        price: '',
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setProductForm({
            ...productForm,
            [name]: value
        })
    }

    return (
        <div className="px-6">
            {JSON.stringify(productForm)}
            <div className="my-3 bg-gray-200 px-2 py-4 text-xl font-bold rounded-md">
                Add New Product
            </div>
            <form>
                <div className="mb-2">
                    <label>Product Name:</label>
                    <input name="title" type="text" value={productForm.title} onChange={handleChange} placeholder="product name"/>
                </div>
                <div className="mb-1">
                    <label>Description:</label>
                    <textarea name="description" value={productForm.description} onChange={handleChange} placeholder="description..." />
                </div>
                <div className="mb-2">
                    <label>Price:</label>
                    <input name="price" type="number" value={productForm.price} onChange={handleChange} placeholder="product price"/>
                </div>
                <div className="mt-4">
                    <button type="submit" className="btn-primary">Save product</button>
                </div>
            </form>
        </div>
    )
}