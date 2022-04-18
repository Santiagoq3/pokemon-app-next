import Head from "next/head"
import React, { FC } from "react"
import { Navbar } from '../ui/Navbar';

interface props{
    children: React.ReactNode,
    title: string
}

export const Layout: FC<props> = ({children,title}) => {
  return (
    <>
        <Head>
            <title>{title}</title>
            <meta name="author" content="Santiago"></meta>
            <meta name="description" content="Informacion sobre el pokemon XXXX"></meta>
            <meta name="keywords" content="XXXX,pokemon,pokedex"></meta>
        </Head>

        <Navbar />

        <main>
            {children}
        </main>
    </>
  )
}
