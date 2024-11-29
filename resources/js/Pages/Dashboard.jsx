import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ auth, companies, employees }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            <div>
                <p className="flex items-center gap-2 font-semibold text-2xl">
                    Hi, Welcome back
                    <span>
                        <img
                            src="assets/img/hand.png"
                            alt=""
                            className="w-6 h-6"
                        />
                    </span>
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4 pt-4">
                    <div>
                        <div className="bg-green-100 rounded-xl py-10 flex justify-center items-center flex-col gap-4">
                            <svg
                                className="w-10 h-10 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <p className="text-3xl font-bold">1</p>
                            <p className="text-sm">Company</p>
                        </div>
                    </div>
                    <div>
                        <div className="bg-blue-100 rounded-xl py-10 flex justify-center items-center flex-col gap-4">
                            <svg
                                className="w-10 h-10 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-width="2"
                                    d="M16 19h4c.6 0 1-.4 1-1v-1a3 3 0 0 0-3-3h-2m-2.2-4A3 3 0 0 0 19 8a3 3 0 0 0-5.2-2M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                            <p className="text-3xl font-bold">1</p>
                            <p className="text-sm">Employees</p>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                        <h1 className="font-semibold text-xl">
                            Recently Companies
                        </h1>
                        <div class="relative overflow-x-auto mt-4">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Logo
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Website
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Created Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {companies.data.map((c) => {
                                        return (
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th td class="px-6 py-4">
                                                    <img
                                                        src={c.logo}
                                                        alt=""
                                                        className="w-10 h-10"
                                                    />
                                                </th>
                                                <td class="px-6 py-4">
                                                    {c.name}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {c.website}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {c.created_at}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl p-4">
                        <h1 className="font-semibold text-xl">
                            Recently Employees
                        </h1>
                        <div class="relative overflow-x-auto mt-4">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            Profile
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Email
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Phone
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            Created Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.data.map((c) => {
                                        return (
                                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th td class="px-6 py-4">
                                                    <img
                                                        src={c.profile_pic}
                                                        alt=""
                                                        className="w-10 h-10"
                                                    />
                                                </th>
                                                <td class="px-6 py-4">
                                                    {c.name}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {c.email}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {c.phone}
                                                </td>
                                                <td class="px-6 py-4">
                                                    {c.created_at}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
