import { useEffect } from 'react'
import useNet from '../../../common/useNet'
import { useAppSelector } from '../../../redux/hooks'
import { selectDarkMode } from '../../../redux/appSlice'

const changeBackground = () => {
    const { net } = useNet()
    const netName = net?.name?.toLocaleLowerCase()
    const triggerDarkMode = useAppSelector(selectDarkMode)

    useEffect(() => {
        const body = document.body

        function applyBackground() {
            if (body && body.getAttribute('data-theme') === 'dark') {
                body.style.background = 'linear-gradient(#131726, #131726)'
            } else if (netName === 'polygon' || netName === 'polygon mumbai') {
                body.style.background = 'linear-gradient(#e0e7ff, #ffffff)'
            } else if (netName === 'ethereum') {
                body.style.background = 'linear-gradient(#c8dcf4, #ffffff)'
            } else if (netName === 'optimism') {
                body.style.background = 'linear-gradient(#fffcf4, #ffffff)'
            }
        }

        applyBackground()
        body.style.backgroundSize = 'cover'
        body.style.backgroundRepeat = 'no-repeat'
    }, [netName, triggerDarkMode])
}

export default changeBackground
