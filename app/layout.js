import { inter } from './fonts';
import ClientLayout from './layout.client';
import './globals.css'

export const metadata = {
  title: 'titel',
  description: 'tekst',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5"></link>
      </head>
      <body className={inter.className}>
        <ClientLayout navn={metadata.title}>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
