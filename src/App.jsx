import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import authService, { account } from "./appwrite/auth"
import { login, logout, updateUserData } from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import { ThemeProvider } from './contexts/theme'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorHandlerPage from './components/ErrorHandle/ErrorBoundary'
import Sidebar from './components/Sidebar/Sidebar'
import AnnouncementBar from './components/Announcements/AnnouncementBar'
function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const authData = useSelector((state) => state.auth.userData)

  const currentPrefs = authData?.prefs || {};

  // const profile_pic = authData?.prefs.profile_picture ? authData.prefs.profile_picture : ""

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
    <ErrorBoundary
      FallbackComponent={ErrorHandlerPage}
      onError={() => console.log("Error happened!")}
    >
      <ThemeProvider value={{ themeMode, darkTheme, lightTheme }}>
        <div className='flex flex-wrap content-between min-h-screen bg-light-primary'>
          <div className='block w-full'>
            <AnnouncementBar />
            <Header />
            <Sidebar />
            <main>
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  ) : null
}

export default App