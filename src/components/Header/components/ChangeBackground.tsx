import { useEffect } from 'react'
import useNet from '../../../common/useNet'
import { useAppSelector } from '../../../redux/hooks'
import { selectDarkMode } from '../../../redux/appSlice'

const changeBackground = () => {
    const { net } = useNet()
    const netName = net?.name?.toLocaleLowerCase()
    const darkMode = useAppSelector(selectDarkMode)

    useEffect(() => {
        function applyBackground() {
            if (darkMode) {
                document.body.style.background = 'linear-gradient(#131726, #131726)'
            } else if (netName === 'polygon' || netName === 'polygon mumbai') {
                document.body.style.background = 'linear-gradient(#e0e7ff, #ffffff)'
            } else if (netName === 'ethereum') {
                document.body.style.background = 'linear-gradient(#c8dcf4, #ffffff)'
            } else if (netName === 'optimism') {
                document.body.style.background = 'linear-gradient(#fffcf4, #ffffff)'
            }
        }

        applyBackground()
        document.body.style.height = '100vh'
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundRepeat = 'no-repeat'
    }, [netName, darkMode])
}

export default changeBackground
