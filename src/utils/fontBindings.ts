import { Ubuntu, Anton, Play, Permanent_Marker } from 'next/font/google';


const ubuntu = Ubuntu({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const play = Play({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const bindings: Record<string, string> =  {
  'ubuntu': ubuntu.className,
  'anton':  anton.className,
  'play': play.className
}

export default bindings;
