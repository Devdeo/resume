import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';

export const metadata: Metadata = {
  title: 'ResumeForge AI',
  description: 'Build your professional resume with AI-powered tools.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Open+Sans:wght@400;700&family=Lato:wght@400;700&family=Montserrat:wght@400;700&family=Oswald:wght@400;700&family=Raleway:wght@400;700&family=Merriweather:wght@400;700&family=PT+Sans:wght@400;700&family=Playfair+Display:wght@400;700&family=Nunito:wght@400;700&family=Poppins:wght@400;700&family=Source+Sans+Pro:wght@400;700&family=Noto+Sans:wght@400;700&family=Ubuntu:wght@400;700&family=Inter:wght@400;700&family=Work+Sans:wght@400;700&family=Space+Grotesk:wght@400;700&family=Libre+Baskerville:wght@400;700&family=Fira+Sans:wght@400;700&family=Exo+2:wght@400;700&family=Arvo:wght@400;700&family=Bitter:wght@400;700&family=Cabin:wght@400;700&family=Crimson+Text:wght@400;700&family=Dosis:wght@400;700&family=Droid+Sans:wght@400;700&family=Droid+Serif:wght@400;700&family=Josefin+Sans:wght@400;700&family=Lobster&family=Lora:wght@400;700&family=Muli:wght@400;700&family=Nunito+Sans:wght@400;700&family=Overpass:wght@400;700&family=Oxygen:wght@400;700&family=Pacifico&family=Quicksand:wght@400;700&family=Rubik:wght@400;700&family=Slabo+27px&family=Titillium+Web:wght@400;700&family=Varela+Round&family=Alegreya:wght@400;700&family=Anton&family=Archivo:wght@400;700&family=Asap:wght@400;700&family=BioRhyme:wght@400;700&family=Catamaran:wght@400;700&family=Comfortaa:wght@400;700&family=EB+Garamond:wght@400;700&family=Fjalla+One&family=IBM+Plex+Sans:wght@400;700&family=Inconsolata:wght@400;700&family=Karla:wght@400;700&family=Libre+Franklin:wght@400;700&family=Maven+Pro:wght@400;700&family=Merriweather+Sans:wght@400;700&family=Noto+Serif:wght@400;700&family=PT+Mono&family=PT+Serif:wght@400;700&family=Questrial&family=Rajdhani:wght@400;700&family=Signika:wght@400;700&family=Source+Code+Pro:wght@400;700&family=Teko:wght@400;700&family=Yanone+Kaffeesatz:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
