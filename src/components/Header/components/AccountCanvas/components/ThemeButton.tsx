import './themeButton.scss'
import { BsSun } from 'react-icons/bs'
import { BsMoon } from 'react-icons/bs'
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks'
import { selectDarkMode, triggerDarkMode } from '../../../../../redux/appSlice'

const ThemeButton = () => {
    const dispatch = useAppDispatch()
    const darkMode = useAppSelector(selectDarkMode)

    function changeMode(setDark: boolean) {
        dispatch(triggerDarkMode(setDark))
    }

    return (
        <div className="theme-div">
            <div className="theme-buttons">
                <div className={!darkMode ? 'active-theme' : ''} onClick={() => changeMode(false)}>
                    <BsSun className='sun-icon' />
                </div>
                <div className={darkMode ? 'active-theme' : ''} onClick={() => changeMode(true)}>
                    <BsMoon />
                </div>
            </div>
        </div>
    )
}

export default ThemeButton
