import Breadcrumb from "@/Components/Breadcrumb";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function CompanyEdit({ auth, company }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: company.name,
        email: company.email,
        logo: null,
        website: company.website,
    });

    const [selectedImage, setSelectedImage] = useState();
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            setData("logo", e.target.files[0]);
        }
    };

    const removeSelectedImage = () => {
        setSelectedImage();
    };

    const submit = (e) => {
        e.preventDefault();

        put(`/companies/update/${company.id}`);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Company Create
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div>
                <div className="flex justify-between items-center pb-4  ">
                    <Breadcrumb page={"Companies"} action={"List"} />
                    <Link
                        href={route("companies")}
                        className="bg-indigo-500 rounded shadow-sm py-2 px-4 text-sm text-white hover:bg-indigo-700"
                    >
                        Back
                    </Link>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl">
                <form onSubmit={submit} mul>
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="website" value="Website" />

                        <TextInput
                            id="website"
                            type="text"
                            name="website"
                            value={data.website}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("website", e.target.value)}
                            required
                        />

                        <InputError message={errors.website} className="mt-2" />
                    </div>
                    <div>
                        <InputLabel htmlFor="logo" value="Logo" />
                        <input
                            accept="image/*"
                            type="file"
                            onChange={imageChange}
                            className="mt-2"
                        />

                        <div>
                            <img
                                src={
                                    selectedImage
                                        ? URL.createObjectURL(selectedImage)
                                        : company.logo
                                }
                                alt="Thumb"
                                className="w-60 h-60"
                            />
                            {selectedImage && (
                                <div>
                                    <button
                                        onClick={removeSelectedImage}
                                        className="underline text-red-500"
                                    >
                                        Remove This Image
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-start mt-4">
                        <button className="ms-4 mt-4 bg-indigo-500 hover:bg-indigo-700 px-4 text-white rounded py-2">
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
