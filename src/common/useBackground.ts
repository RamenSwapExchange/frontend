import { useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import useNet from './useNet'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { selectDarkMode, triggerDarkMode } from '../redux/appSlice'

const useBackground = () => {
    const dispatch = useAppDispatch()
    const isReduxDarkMode = useAppSelector(selectDarkMode)
    const { net } = useNet()
    const netName = net?.name?.toLocaleLowerCase()

    //Check if browser is dark mode
    const isSystemDark = useMediaQuery({ query: '(prefers-color-scheme: dark)' }, undefined, (isSystemDark) =>
        dispatch(triggerDarkMode(isSystemDark))
    )
    useEffect(() => {
        dispatch(triggerDarkMode(isSystemDark))
    }, [isSystemDark])

    //Set body attribute when redux state is changed
    useEffect(() => {
        document.body.setAttribute('data-theme', isReduxDarkMode ? 'dark' : 'light')
    }, [isReduxDarkMode])

    useEffect(() => {
        const body = document.body

        if (body.getAttribute('data-theme') === 'dark') body.style.background = 'linear-gradient(#131726, #131726)'
        else if (netName === 'polygon') body.style.background = 'linear-gradient(#e0e7ff, #ffffff)'
        else if (netName === 'optimism') body.style.background = 'linear-gradient(#fffcf4, #ffffff)'
        else body.style.background = 'linear-gradient(#c8dcf4, #ffffff)'
    }, [netName, isReduxDarkMode])
}

export default useBackground
