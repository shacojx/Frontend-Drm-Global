import useRouteElements from './useRouteElements';

export default function AppRouter() {
    const routerElements = useRouteElements()
    return <div className='debug-screens'>
        {routerElements}
    </div>
}