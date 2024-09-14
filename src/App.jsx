import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import authService, { account } from "./appwrite/auth"
import { login, logout, updateUserData } from "./store/authSlice"
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
  console.log(authData)
  const currentPrefs = authData?.prefs || {};

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
          // dispatch(updateUserData(userData))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])
  const lightTheme = async () => {
    setThemeMode("light")
    const response = await account.updatePrefs({
      ...currentPrefs,
      theme: "light"
    });
    dispatch(updateUserData(response))
  }
  const darkTheme = async () => {
    setThemeMode("dark")
    const response = await account.updatePrefs({
      ...currentPrefs,
      theme: "dark"
    });
    dispatch(updateUserData(response))
  }
  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(themeMode)
    localStorage.setItem("themeMode", themeMode);
    // account.updatePrefs({
    //   ...currentPrefs,
    //   theme: themeMode,
    // })
  }, [themeMode])


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