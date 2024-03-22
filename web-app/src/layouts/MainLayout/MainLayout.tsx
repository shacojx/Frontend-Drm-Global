import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Header from 'src/components/Header'
import Sidebar from 'src/components/Sidebar'

function MainLayoutInner() {
    return (
        <div className="w-screen h-screen bg-cover overflow-hidden relative">
            <Header />
            <div className='flex h-full'>
                <Sidebar />
                <div className={"w-full h-full bg-surface flex flex-row overflow-auto"}>
                    <Outlet />
                </div>
            </div>
        </div >
    )
}
const MainLayout = memo(MainLayoutInner)
export default MainLayout