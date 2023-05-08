import { useEffect } from 'react'
import useNet from '../../../common/useNet'

const changeBackground = () => {
    const { net } = useNet()
    const netName = net?.name?.toLocaleLowerCase()

    useEffect(() => {
        function applyBackground() {
            if (netName === 'polygon' || netName === 'polygon mumbai') {
                document.body.style.background = 'linear-gradient(#e0e7ff, #ffffff)'
            } else if (netName === 'ethereum') {
                document.body.style.background = 'linear-gradient(#c8dcf4, #ffffff)'
            } else if (netName === 'optimism') {
                document.body.style.background = 'linear-gradient(#fffcf4, #ffffff)'
            }
        }

        applyBackground()
        document.body.style.height = '100%'
        document.body.style.backgroundSize = 'cover'
        document.body.style.backgroundRepeat = 'no-repeat'
    }, [netName])
}

export default changeBackground
