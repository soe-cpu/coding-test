import { Head } from "@inertiajs/react";
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Breadcrumb from "@/Components/Breadcrumb";
const UserList = ({ auth, users }) => {
    console.log(users);
    const Pagination = ({
        postsPerPage,
        totalPosts,
        setCurrentPage,
        currentPage,
      }) => {
        const pageNumbers = [];

        for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
          pageNumbers.push(i);
        }

        const paginate = (pageNumber, e) => {
          e.preventDefault();
          setCurrentPage(pageNumber);
        };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="Users" />
            <div>
                <div className="flex justify-between items-center pb-4  ">
                    <Breadcrumb page={"Users"} action={"List"} />
                    <button className="bg-blue-500 rounded shadow-sm py-2 px-4 text-sm text-white hover:bg-blue-700">
                        Add User
                    </button>
                </div>

                <div className="bg-white p-8 rounded-2xl">
                    <div className="flex items-center justify-between pb-4 bg-white dark:bg-gray-800">
                        <div className="flex items-center gap-2">
                            <p className="dark:text-white">Filters: </p>
                            <select
                                id="limit"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
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
                                type="text"
                                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500"
                                placeholder="Search for users"
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
                                {users.data.map((user, index) => {
                                    return (
                                        <tr
                                            className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600 border-b"
                                            key={index}
                                        >
                                            <td className="p-4">
                                                <p>{users.from + index}</p>
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
                                                    <h1>Edit</h1>
                                                    <div>|</div>
                                                    <h1>Delete</h1>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <nav
                            aria-label="Page navigation example"
                            className="flex justify-end mt-4"
                        >
                            <ul class="flex items-center -space-x-px h-8 text-sm">
                                <li>
                                    <a
                                        href="#"
                                        class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        <span class="sr-only">Previous</span>
                                        <svg
                                            class="w-2.5 h-2.5 rtl:rotate-180"
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
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        1
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        2
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        aria-current="page"
                                        class="z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                                    >
                                        3
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        4
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        5
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    >
                                        <span class="sr-only">Next</span>
                                        <svg
                                            class="w-2.5 h-2.5 rtl:rotate-180"
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
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default UserList;
