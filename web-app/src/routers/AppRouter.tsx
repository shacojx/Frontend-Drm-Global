import useRouteElements from './useRouteElements';

export default function AppRouter() {
    const routerElements = useRouteElements()
    return <div >
        {routerElements}
    </div>
}