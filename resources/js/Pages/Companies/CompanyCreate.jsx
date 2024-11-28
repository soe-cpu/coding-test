import Breadcrumb from "@/Components/Breadcrumb";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";

export default function CompanyCreate({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        logo: "",
        website: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post("/companies/save");
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
