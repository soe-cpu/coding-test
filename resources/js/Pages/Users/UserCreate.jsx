import Breadcrumb from "@/Components/Breadcrumb";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function UserCreate({ auth, roles }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        roles: [],
    });
    console.log(roles);

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post("/users/save");
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    User Create
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div>
                <div className="flex justify-between items-center pb-4  ">
                    <Breadcrumb page={"Users"} action={"List"} />
                    <Link
                        href={route("users")}
                        className="bg-indigo-500 rounded shadow-sm py-2 px-4 text-sm text-white hover:bg-indigo-700"
                    >
                        Back
                    </Link>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl">
                <form onSubmit={submit}>
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
                        <InputLabel htmlFor="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.password_confirmation}
                            className="mt-2"
                        />
                    </div>
                    <div className="mt-4">
                        <InputLabel htmlFor="roles" value="Roles " />
                        {roles.map((role) => {
                            return (
                                <div className="flex space-x-3 items-center">
                                    <TextInput
                                        type="checkbox"
                                        name="roles[]"
                                        value={role.id}
                                        className="mt-1 "
                                        onChange={(e) => {
                                            let newData = [...data.roles];
                                            if (
                                                data.roles.includes(
                                                    e.target.value
                                                )
                                            )
                                                newData = data.roles.filter(
                                                    (t) => t != e.target.value
                                                );
                                            else newData.push(e.target.value);
                                            setData("roles", newData);
                                        }}
                                    />
                                    <p>{role.name}</p>
                                </div>
                            );
                        })}
                        <InputError message={errors.roles} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-start mt-4">
                        <button
                            className="ms-4 mt-4 bg-indigo-500 hover:bg-indigo-700 px-4 text-white rounded py-2"
                            disabled={processing}
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
