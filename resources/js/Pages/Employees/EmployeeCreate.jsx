import Breadcrumb from "@/Components/Breadcrumb";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function EmployeeCreate({ auth, companies }) {
    const { data, setData, post, progress, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        profile_pic: null,
        company_id: "",
    });

    const [selectedImage, setSelectedImage] = useState();
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedImage(e.target.files[0]);
            setData("profile_pic", e.target.files[0]);
        }
    };

    const removeSelectedImage = () => {
        setSelectedImage();
    };

    const submit = (e) => {
        e.preventDefault();

        post("/employees/save");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Employee Create
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div>
                <div className="flex justify-between items-center pb-4  ">
                    <Breadcrumb page={"Employees"} action={"List"} />
                    <Link
                        href={route("employees")}
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
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="phone" value="Phone" />

                        <TextInput
                            id="phone"
                            type="text"
                            name="phone"
                            value={data.phone}
                            className="mt-1 block w-full"
                            autoComplete="phone"
                            onChange={(e) => setData("phone", e.target.value)}
                            required
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="company" value="Company" />

                        <select
                            name="company_id"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            onChange={(e) =>
                                setData("company_id", e.target.value)
                            }
                        >
                            <option value="">Select Company</option>
                            {companies.map((c) => {
                                return <option value={c.id}>{c.name}</option>;
                            })}
                        </select>

                        <InputError
                            message={errors.company_id}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-2">
                        <InputLabel
                            htmlFor="profile_img"
                            value="Profile Picture"
                        />
                        <input
                            accept="image/*"
                            type="file"
                            onChange={imageChange}
                            className="mt-2"
                        />

                        {selectedImage && (
                            <div>
                                <img
                                    src={URL.createObjectURL(selectedImage)}
                                    alt="Thumb"
                                    className="w-60 h-60"
                                />
                                <button
                                    onClick={removeSelectedImage}
                                    className="underline text-red-500"
                                >
                                    Remove This Image
                                </button>
                            </div>
                        )}
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
