import Link from "next/link";

export default function ProductPage() {
    return (
        <div className="mt-4">
            <Link href={'/products/add'} className="bg-blue-900 text-white p-2 rounded-lg">Add New Product</Link>
        </div>
    )
}