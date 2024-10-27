import React, { useState } from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ThemeBtn from '../ThemeBtn'
import appwriteService from '../../appwrite/conifg'
import userFallback from '../../assets/profile-user.png';
import { logout } from '../../store/authSlice'
import authService from '../../appwrite/auth'
import SearchBox from '../SearchBox'
import Sidebar from '../Sidebar/Sidebar'
function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const authData = useSelector((state) => state.auth.userData)
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    setLoading(true); // Set loading to true when the process starts
    try {
      await authService.logout(); // Await the logout process
      dispatch(logout()); // Dispatch the logout action
    } catch (error) {
      console.error("Logout failed: ", error);
    }
    setLoading(false); // Set loading to false when the process is complete
  };
  // console.log(authData)
  return (
    <header className="py-3 header-main">
      <Container>
        <div className="d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link to="/" className="mr-4">
            <Logo width="100px" />
          </Link>

          {/* Search Box */}
          <div className="mx-4 flex-grow-1">
            <SearchBox />
          </div>

          {/* Profile and Theme Button */}
          <div className="d-flex align-items-center">
            {authData && (
              <div className="dropdown text-end d-flex align-items-center">
                <a
                  className="link-body-emphasis text-decoration-none dropdown-toggle ms-2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src={
                      authData?.prefs?.profile_picture
                        ? appwriteService.getFilePreview(authData.prefs.profile_picture)
                        : userFallback
                    }
                    alt="Profile"
                    className="object-cover w-10 h-10 rounded-full"
                  />
                </a>
                <ul className="dropdown-menu text-small">
                  {authData?.prefs?.nickname ? (
                    <p>Hi, {authData?.prefs?.nickname}</p>
                  ) : authData?.prefs?.name ? (
                    <p>Hi, {authData?.prefs?.name}</p>
                  ) : (
                    <p>Hi, {authData?.name}</p>
                  )}
                  <li>
                    <a className="dropdown-item" onClick={() => navigate('/profile')}>
                      Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={() => navigate('/userPost')}>
                      Post
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={logoutHandler}>
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
            <ThemeBtn className="ms-3" />
          </div>
        </div>
      </Container>
    </header>

  )
}

export default Header