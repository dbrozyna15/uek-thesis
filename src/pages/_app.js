import '@/styles/globals.css'
import Head from "next/head";

export default function App({Component, pageProps}) {
    return (
        <>
            <Head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <meta name="apple-mobile-web-app-capable" content="yes"/>
                <link rel="manifest" href="/manifest.json"/>
                <link rel="apple-touch-icon" href="/logo.png" />
                <link rel="apple-touch-icon" sizes="152x152" href="/logo.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
                <link rel="apple-touch-icon" sizes="167x167" href="/logo.png" />
                    
                    
            </Head>
            <Component {...pageProps} />
        </>
    )
}
