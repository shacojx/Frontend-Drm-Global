import { memo, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from 'src/components/Header'
import Sidebar from 'src/components/Sidebar'

function MainLayoutInner() {
    const [isOpenOnSmallScreen, setIsOpenOnSmallScreen] = useState<boolean>(false)


    return (
        <div className="w-screen h-screen bg-cover overflow-hidden relative">
            <div className='flex h-full w-full'>
                <Sidebar
                    isOpenOnSmallScreen={isOpenOnSmallScreen}
                    setIsOpenOnSmallScreen={setIsOpenOnSmallScreen}
                />
                <div className='flex-grow'>
                    <div className='flex flex-col h-full'>
                        <div>
                            <Header
                                setIsOpenOnSmallScreen={setIsOpenOnSmallScreen}
                            />
                        </div>
                        <div className={"flex-grow bg-surface flex flex-row overflow-auto"}>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
const MainLayout = memo(MainLayoutInner)
export default MainLayout
