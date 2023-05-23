import './themeButton.scss'
import { useState } from 'react'
import { BsSun } from 'react-icons/bs'
import { BsMoon } from 'react-icons/bs'
import { useAppDispatch } from '../../../../../redux/hooks'
import { changeDarkMode } from '../../../../../redux/appSlice'

const ThemeButton = () => {
    const dispatch = useAppDispatch()

    enum ETheme {
        light,
        dark,
    }
    const [theme, setTheme] = useState<ETheme>(ETheme.light)

    return (
        <div className="theme-div">
            <div className="theme-buttons">
                <div
                    className={theme == ETheme.light ? 'active-theme' : ''}
                    onClick={() => {
                        setTheme(ETheme.light)
                        dispatch(changeDarkMode(false))
                    }}
                >
                    <BsSun />
                </div>
                <div
                    className={theme == ETheme.dark ? 'active-theme' : ''}
                    onClick={() => {
                        setTheme(ETheme.dark)
                        dispatch(changeDarkMode(true))
                    }}
                >
                    <BsMoon />
                </div>
            </div>
        </div>
    )
}

export default ThemeButton
