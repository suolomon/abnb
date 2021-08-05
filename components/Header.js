import Image from 'next/Image'
import headImg from './images/header.png'

function Header() {
    return (
        <header className="sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10">

            {/* left */}
            <div className="relative flex h-10 cursor-pointer my-auto">
                <Image 
                    src={headImg}
                    layout="fill"
                    objectFit="contain"
                    objectPosition="left"
                />
            </div>

            {/* Middle */}
            <div>
            </div>

            {/* Right */}
            <div>
            </div>

        </header>
    )
}

export default Header
