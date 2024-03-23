import { RoutePaths } from 'src/constants/routerPaths';
import LLCMyService from 'src/pages/LLCMyService';
import NotFoundPage from 'src/pages/NotFoundPage';
import RegisterPage from 'src/pages/RegisterPage';
import ResetPasswordPage from 'src/pages/ResetPasswordPage';
import { SupportContent } from "../pages/SupportContent";
import { RequiredLoggedIn } from './RequiredLoggedIn';
import { useRoutes } from 'react-router-dom';
import MainLayout from 'src/layouts/MainLayout';
import LoginPage from 'src/pages/LoginPage';
import ServicesContent from 'src/pages/ServicesContent';
import MyAccountContent from 'src/pages/MyAccountContent';
import { MyCompanyDetailPage } from 'src/pages/my-company/MyCompanyDetailPage';
import KYCUploadContent from 'src/pages/KYCUploadContent';

export default function useRouteElements() {
    const routeElements = useRoutes([
        {
            path: RoutePaths.login,
            element: <LoginPage />
        },
        {
            path: RoutePaths.resetPassword,
            element: <ResetPasswordPage />
        },
        {
            path: RoutePaths.register,
            element: <RegisterPage />
        },
        {
            path: '',
            element: <RequiredLoggedIn />,
            children: [
                {
                    path: '',
                    element: <MainLayout />,
                    children: [
                        {
                            path: RoutePaths.home,
                            element: <ServicesContent />,
                        },
                        {
                            path: RoutePaths.myAccount,
                            element: <MyAccountContent />,
                        },
                        {
                            path: RoutePaths.KYCUpload,
                            element: <KYCUploadContent />,
                        },
                        {
                            path: RoutePaths.services,
                            index:true,
                            element: <ServicesContent />,
                        },
                        {
                            path: RoutePaths.myServicesItem,
                            element: <LLCMyService />,
                        },
                        {
                            path: RoutePaths.myCompany,
                            element: <MyCompanyDetailPage />,
                        },
                        {
                            path: RoutePaths.support,
                            element: <SupportContent />,
                        },

                    ]
                },
            ]
        },
        {
            path: '*',
            element: <NotFoundPage />
        }
    ])
    return routeElements
}
