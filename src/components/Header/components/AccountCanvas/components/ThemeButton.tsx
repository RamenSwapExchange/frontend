import './themeButton.scss'
import { useEffect, useState } from 'react'
import { BsSun } from 'react-icons/bs'
import { BsMoon } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { selectDarkMode, triggerDarkMode } from '../../../../../redux/appSlice'

const ThemeButton = () => {
    const dispatch = useAppDispatch()
    const darkMode = useAppSelector(selectDarkMode)
    const [isDarkMode, setIsDarkMode] = useState<boolean>(darkMode)
    const body = document.body

    function changeMode(setDark: boolean) {
        body.setAttribute('data-theme', setDark ? 'dark' : 'light')
        setIsDarkMode(setDark)
        dispatch(triggerDarkMode(setDark))
    }

    useEffect(() => setIsDarkMode(darkMode), [darkMode])

    return (
        <div className="theme-div">
            <div className="theme-buttons">
                <div className={!isDarkMode ? 'active-theme' : ''} onClick={() => changeMode(false)}>
                    <BsSun />
                </div>
                <div className={isDarkMode ? 'active-theme' : ''} onClick={() => changeMode(true)}>
                    <BsMoon />
                </div>
            </div>
        </div>
    )
}

export default ThemeButton
