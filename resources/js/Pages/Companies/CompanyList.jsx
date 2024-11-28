import { Head, Link, router } from "@inertiajs/react";
import React, { useMemo, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Breadcrumb from "@/Components/Breadcrumb";
import getPaginationRange from "@/hooks/getPaginationRange";

const CompanyList = ({ auth, companies }) => {
    console.log(auth);

    const pagination = useMemo(() => {
        return getPaginationRange(
            companies?.current_page,
            companies?.last_page
        );
    }, [companies?.current_page, companies?.last_page]);

    // Filter start //
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get("page");
    const limit = urlParams.get("limit");
    const search = urlParams.get("search");

    const [keyword, setKeyword] = useState(search);

    const handleChangeLimit = (e) => {
        router.get(
            "/companies",
            { limit: e?.target.value, page: page, search: search },
            { replace: true }
        );
    };

    const handleKeyword = (keyword) => {
        router.get(
            "/companies",
            { limit: limit, page: page, search: keyword },
            { replace: true }
        );
    };
    // Filter end //

    // Delete

    const handleDelete = (id) => {
        router.delete(`companies/delete/${id}`);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Companies
                </h2>
            }
        >
            <Head title="Companies" />
            <div>
                <div className="flex justify-between items-center pb-4  ">
                    <Breadcrumb page={"Companies"} action={"List"} />
                    <Link
                        href={route("companies.create")}
                        className="bg-indigo-500 rounded shadow-sm py-2 px-4 text-sm text-white hover:bg-indigo-700"
                    >
                        Add Company
                    </Link>
                </div>

                <div className="bg-white p-8 rounded-2xl">
                    <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-800">
                        <div className="flex items-center gap-2">
                            <p className="dark:text-white">Filters: </p>
                            <select
                                id="limit"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                onChange={handleChangeLimit}
                            >
                                <option value="15">15 Rows</option>
                                <option value="20">20 Rows</option>
                                <option value="50">50 Rows</option>
                                <option value="100">100 Rows</option>
                            </select>
                        </div>
                        <label for="table-search" className="sr-only">
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <input
                                id="myInput"
                                value={keyword}
                                type="text"
                                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                placeholder="Search for companies"
                                onChange={(e) => setKeyword(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        // Do code here
                                        e.preventDefault();

                                        handleKeyword(keyword);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div id="myTable">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="p-4">
                                        No
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Register Date
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies.data.length > 0 ? (
                                    companies.data.map((user, index) => {
                                        return (
                                            <tr
                                                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 border-b"
                                                key={index}
                                            >
                                                <td className="p-4">
                                                    <p>
                                                        {companies.from + index}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <p>{user.name}</p>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <p>{user.email}</p>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <p>{user.created_at}</p>
                                                </td>
                                                <td>
                                                    <div className="flex space-x-2 items-center">
                                                        <Link
                                                            href={route(
                                                                "companies.edit",
                                                                user.id
                                                            )}
                                                            className="text-green-500 underline"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <div>|</div>
                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    user.id
                                                                )
                                                            }
                                                            className="text-red-500 underline"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 border-b">
                                        <td colSpan={5}>
                                            <p className="text-center py-20">
                                                Nothing not found!
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <nav
                            aria-label="Page navigation example"
                            className="mt-4 flex justify-end"
                        >
                            <ul className="flex items-center -space-x-px h-8 text-sm">
                                <li>
                                    <Link
                                        href={companies.prev_page_url}
                                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        <span className="sr-only">
                                            Previous
                                        </span>
                                        <svg
                                            className="w-2.5 h-2.5 rtl:rotate-180"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M5 1 1 5l4 4"
                                            />
                                        </svg>
                                    </Link>
                                </li>
                                {pagination.map((page, index) => {
                                    if (page > 0)
                                        return (
                                            <li key={index}>
                                                <Link
                                                    href={`companies?page=${page}`}
                                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                                >
                                                    {page}
                                                </Link>
                                            </li>
                                        );
                                    else
                                        return (
                                            <li
                                                key={index}
                                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                ...
                                            </li>
                                        );
                                })}

                                <li>
                                    <Link
                                        href={companies.next_page_url}
                                        className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        <span className="sr-only">Next</span>
                                        <svg
                                            className="w-2.5 h-2.5 rtl:rotate-180"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 6 10"
                                        >
                                            <path
                                                stroke="currentColor"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="m1 9 4-4-4-4"
                                            />
                                        </svg>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default CompanyList;
