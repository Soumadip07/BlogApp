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
  const navigate = useNavigate();
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
    <header className="py-1 header-main">
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
              <div className="mr-4 dropdown d-flex align-items-center">
                <a
                  className="mb-3 "
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
                    className="object-cover w-8 h-8 cursor-pointer rounded-2 profile img-fluid"
                  />
                </a>
                <ul className="mt-2 dropdown-menu profile-card text-small">
                  <div className="profile-header">
                    <img
                      src={
                        authData?.prefs?.profile_picture
                          ? appwriteService.getFilePreview(authData.prefs.profile_picture)
                          : userFallback
                      }
                      alt="Profile"
                      className="object-cover w-8 h-8 mt-3 profile-image img-fluid"
                    />
                    <p className="profile-greeting">
                      Hey {authData?.prefs?.nickname || authData?.prefs?.name || authData?.name} !!
                    </p>
                  </div>

                  <li className="dropdown-item profile-option" onClick={() => navigate('/profile')}>
                    Profile
                  </li>
                  <li className="dropdown-item profile-option" onClick={() => navigate('/userPost')}>
                    Post
                  </li>
                  <li className="dropdown-divider profile-divider"></li>
                  <li className="dropdown-item profile-option" onClick={logoutHandler}>
                    Sign out
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