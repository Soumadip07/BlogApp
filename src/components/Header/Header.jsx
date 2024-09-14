import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ThemeBtn from '../ThemeBtn'
import appwriteService from '../../appwrite/conifg'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const authData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Latest",
      slug: "/latest",
      active: authStatus,
    },
    {
      name: "Category",
      slug: "/category",
      active: authStatus,
    },
    {
      name: "User Post",
      slug: "/userPost",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
    {
      name: "Profile",
      slug: "/profile",
      active: authStatus,
    },
  ]
  return (
    <header className='py-3 bg-light-primary" shadow'>
      <Container>
        <nav className='header-container'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='100px' />
            </Link>
          </div>
          <ul className='flex ml-auto'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      isActive
                        ? 'nav-items-active fs-700 px-6 py-2  inline-block text-primary-blue'
                        : 'nav-items-inactive fs-700 px-6 py-2  inline-block nav-items'
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {authData?.prefs?.nickname ? (
              <p>Hi,{authData?.prefs?.nickname}</p>
            ) : authData?.prefs?.name ? (
              <p>Hi,{authData?.prefs?.name}</p>
            ) : (
              <p>Hi,Guest</p>
            )}
            {authData?.prefs?.profile_picture && (
              <div>
                <img
                  src={appwriteService.getFilePreview(authData?.prefs?.profile_picture)}
                  alt="Profile"
                  className="object-cover w-16 h-16 rounded-full"
                />
              </div>
            )}

            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
          <ThemeBtn />
        </nav>
      </Container>
    </header>
  )
}

export default Header