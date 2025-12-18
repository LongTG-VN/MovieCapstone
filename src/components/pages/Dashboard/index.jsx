import React from 'react'
import { NavLink } from 'react-router-dom'

const DashboardComponent = () => {
    return (




        <ul class="flex-column space-y-4 text-sm font-medium text-body md:w-64 w-full md:me-4 mb-4 md:mb-0 bg-white p-4 md:rounded-base shadow-sm">
            <li>
                <NavLink to="user" className={({ isActive }) =>
                    isActive
                        ? "inline-flex items-center px-4 py-2.5 text-white bg-brand rounded-base active w-full"
                        : "inline-flex items-center px-4 py-3 rounded-base hover:text-heading hover:bg-neutral-secondary-soft w-full"} aria-current="page">
                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a8.949 8.949 0 0 0 4.951-1.488A3.987 3.987 0 0 0 13 16h-2a3.987 3.987 0 0 0-3.951 3.512A8.948 8.948 0 0 0 12 21Zm3-11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    user
                </NavLink>
            </li>
            <li>
                <NavLink to="phim" class="inline-flex items-center px-4 py-3 rounded-base hover:text-heading hover:bg-neutral-secondary-soft w-full" className={({ isActive }) =>
                    isActive
                        ? "inline-flex items-center px-4 py-2.5 text-white bg-brand rounded-base active w-full"
                        : "inline-flex items-center px-4 py-3 rounded-base hover:text-heading hover:bg-neutral-secondary-soft w-full"
                }>
                    <svg class="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m4 10v-2m3 2v-6m3 6v-3m4-11v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1Z" /></svg>
                    phim
                </NavLink>
            </li>
        </ul>




    )
}

export default DashboardComponent