import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardComponent from '../../components/pages/Dashboard'
const AdminComponent = () => {
    return (
        <>

            <div class="md:flex w-full h-screen bg-gray-50 p-0 md:p-4">
                <DashboardComponent />
                <div class="flex-1 p-8 bg-white text-medium text-body rounded-base shadow-sm overflow-y-auto">
                    <Outlet/>
                </div>
            </div>

        </>
    )
}

export default AdminComponent