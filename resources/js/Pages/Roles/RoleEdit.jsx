import Breadcrumb from "@/Components/Breadcrumb";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";

export default function RoleEdit({ auth, role, permissions, rolePermissions }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: role.name,
        permission: rolePermissions,
    });

    function submit(e) {
        e.preventDefault();
        put(`/roles/update/${role.id}`);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    RoleEdit
                </h2>
            }
        >
            <Head title="Role Edit" />

            <div>
                <div className="flex justify-between items-center pb-4  ">
                    <Breadcrumb page={"Roles"} action={"Edit"} />
                    <Link
                        href={route("roles")}
                        className="bg-indigo-500 rounded shadow-sm py-2 px-4 text-sm text-white hover:bg-indigo-700"
                    >
                        Back
                    </Link>
                </div>

                <div className="bg-white p-8 rounded-2xl">
                    <form onSubmit={submit}>
                        <h1 className="text-black text-2xl">Edit Role</h1>
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
                                        checked={data.permission.find(
                                            (a) => a == p.id
                                        )}
                                        onChange={(e) => {
                                            let newData = [...data.permission];
                                            if (
                                                data.permission.includes(
                                                    parseInt(e.target.value)
                                                )
                                            )
                                                newData =
                                                    data.permission.filter(
                                                        (t) =>
                                                            t !=
                                                            parseInt(
                                                                e.target.value
                                                            )
                                                    );
                                            else
                                                newData.push(
                                                    parseInt(e.target.value)
                                                );
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
