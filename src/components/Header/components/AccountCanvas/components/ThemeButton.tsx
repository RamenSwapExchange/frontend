import './themeButton.scss'
import { useEffect, useState } from 'react'
import { BsSun } from 'react-icons/bs'
import { BsMoon } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { selectDarkMode, triggerDarkMode } from '../../../../../redux/appSlice'

const ThemeButton = () => {
    const darkMode = useAppSelector(selectDarkMode);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(darkMode)
    const dispatch = useAppDispatch()

    function setDarkMode() {
        document.querySelector('body')?.setAttribute('data-theme', 'dark')
        setIsDarkMode(true)
        dispatch(triggerDarkMode(true))
    }

    function setLightMode() {
        document.querySelector('body')?.setAttribute('data-theme', 'light')
        setIsDarkMode(false)
        dispatch(triggerDarkMode(false))
    }

    useEffect(() => setIsDarkMode(darkMode), [darkMode])

    return (
        <div className="theme-div">
            <div className="theme-buttons">
                <div
                    className={!isDarkMode ? 'active-theme' : ''}
                    onClick={() => setLightMode()}
                >
                    <BsSun />
                </div>
                <div
                    className={isDarkMode ? 'active-theme' : ''}
                    onClick={() => setDarkMode()}
                >
                    <BsMoon />
                </div>
            </div>
        </div>
    )
}

export default ThemeButton
