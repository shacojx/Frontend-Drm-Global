import React, { memo } from 'react'
import { Outlet } from 'react-router-dom'

function MainLayoutInner() {
    return (
        <div>
            
            <Outlet/>
        </div>
    )
}
const MainLayout = memo(MainLayoutInner)
export default MainLayout