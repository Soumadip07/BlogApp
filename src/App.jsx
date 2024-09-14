import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import authService, { account } from "./appwrite/auth"
import { login, logout } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './contexts/theme'

function App() {
  const postData = useSelector((state) => state.posts?.posts || []);
  useEffect(() => {
    console.log(postData)

  }, [postData]);

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const authData = useSelector((state) => state.auth.userData)
  // const profile_pic = authData?.prefs.profile_picture ? authData.prefs.profile_picture : ""
  // console.log(authData)

  const [themeMode, setThemeMode] = useState(() => localStorage.getItem("themeMode") || "light");
  useEffect(() => {
    const savedThemeMode = localStorage.getItem("themeMode");
    if (savedThemeMode) {
      setThemeMode(savedThemeMode);
    }
  }, []);
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])
  const lightTheme = () => {
    setThemeMode("light")
  }
  const darkTheme = () => {
    setThemeMode("dark")
  }
  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(themeMode)
    localStorage.setItem("themeMode", themeMode);
  }, [themeMode])

  // account.updatePrefs({
  //   profile_picture: authData?.prefs.profile_picture ? authData?.prefs.profile_picture : "",
  //   theme: themeMode,
  // });
  return !loading ? (
    <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
      <div className='flex flex-wrap content-between min-h-screen bg-light-primary'>
        <div className='block w-full'>
          <Header />
          <main>
            TODO:  <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  ) : null
}

export default App