import './themeButton.scss'
import { useState } from 'react'
import { BsSun } from 'react-icons/bs'
import { BsMoon } from 'react-icons/bs'
import { useAppDispatch } from '../../../../../redux/hooks'
import { triggerDarkMode } from '../../../../../redux/appSlice'

const ThemeButton = () => {
    enum ETheme {
        light,
        dark,
    }
    const [theme, setTheme] = useState<ETheme>(ETheme.light)
    const dispatch = useAppDispatch()

    function setDarkMode() {
        document.querySelector('body')?.setAttribute('data-theme', 'dark')
    }

    function setLightMode() {
        document.querySelector('body')?.setAttribute('data-theme', 'light')
    }

    return (
        <div className="theme-div">
            <div className="theme-buttons">
                <div
                    className={theme == ETheme.light ? 'active-theme' : ''}
                    onClick={() => {
                        setTheme(ETheme.light)
                        setLightMode()
                        dispatch(triggerDarkMode(false))
                    }}
                >
                    <BsSun />
                </div>
                <div
                    className={theme == ETheme.dark ? 'active-theme' : ''}
                    onClick={() => {
                        setTheme(ETheme.dark)
                        setDarkMode()
                        dispatch(triggerDarkMode(true))
                    }}
                >
                    <BsMoon />
                </div>
            </div>
        </div>
    )
}

export default ThemeButton
