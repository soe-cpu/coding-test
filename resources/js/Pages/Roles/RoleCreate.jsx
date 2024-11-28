import Breadcrumb from "@/Components/Breadcrumb";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function RoleCreate({ auth, permissions }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        permission: [],
    });

    function submit(e) {
        e.preventDefault();
        post("/roles/save");
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    RoleCreate
                </h2>
            }
        >
            <Head title="Role Create" />

            <div>
                <div className="flex justify-between items-center pb-4  ">
                    <Breadcrumb page={"Roles"} action={"Create"} />
                    <Link
                        href={route("roles")}
                        className="bg-indigo-500 rounded shadow-sm py-2 px-4 text-sm text-white hover:bg-indigo-700"
                    >
                        Back
                    </Link>
                </div>

                <div className="bg-white p-8 rounded-2xl">
                    <form onSubmit={submit}>
                        <h1 className="text-black text-2xl">Create New Role</h1>
                        <div className="mb-3">
                            <InputLabel htmlFor="name" value="Name: " />

                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                isFocused={true}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />

                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                        <InputLabel
                            htmlFor="permission"
                            value="Permissions: "
                        />
                        {permissions.map((p) => {
                            return (
                                <div className="flex space-x-3 items-center">
                                    <TextInput
                                        type="checkbox"
                                        name="permission[]"
                                        value={p.id}
                                        className="mt-1 "
                                        onChange={(e) => {
                                            let newData = [...data.permission];
                                            if (
                                                data.permission.includes(
                                                    e.target.value
                                                )
                                            )
                                                newData =
                                                    data.permission.filter(
                                                        (t) =>
                                                            t != e.target.value
                                                    );
                                            else newData.push(e.target.value);
                                            setData("permission", newData);
                                        }}
                                    />
                                    <p>{p.name}</p>
                                </div>
                            );
                        })}
                        <button
                            className="ms-4 mt-4 bg-indigo-500 hover:bg-indigo-700 px-4 text-white rounded py-2"
                            disabled={processing}
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
