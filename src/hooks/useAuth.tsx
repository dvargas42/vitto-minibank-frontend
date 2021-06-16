import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import Router from 'next/router'
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { api } from '../services/axios/apiClient';

type User = {
  name: string;
  cpf: string;
  id: string;
  balance: number;
  created_at: Date;
  updated_at: Date;
}

type SignInCredentials = {
  cpf: string;
  password: string;
}

type AuthContexData = {
  isAuthenticated: boolean;
  user: User;
  handleBalanceUser: (balance: number) => void;
  signIn(credentials: SignInCredentials): Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContexData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const isAuthenticated = !!user

  useEffect(() => {
    const { 'vittoauth.token': token } = parseCookies()

    if (token) {
      api.get('/users').then(response => {
        const { id, name, balance, created_at, updated_at, cpf } = response.data

        setUser({ id, name, balance, created_at, updated_at, cpf })

      }).catch(error => {
        if (!process.browser) {
          destroyCookie(undefined, 'vittoauth.token')
        
          Router.push('/')
        }
      })
    }
  }, [])

  async function signIn({ cpf, password }: SignInCredentials) {
    try {
      const response = await api.post('sessions', {
        cpf,
        password
      })

      const { token, user } = response.data

      setCookie(undefined, 'vittoauth.token', token, {
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/'
      })
  
      setUser(user)

      api.defaults.headers['authorization'] = `Bearer ${token}`

      Router.push('/users')

    } catch (err) {
      console.log(err)
    }
  }
  function handleBalanceUser(balance: number) {
    setUser({...user, balance})
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user, handleBalanceUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
