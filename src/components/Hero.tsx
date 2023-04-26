import { logo } from '@/assets'
import { FC } from 'react'

const Hero: FC = () => {
  return (
    <header className="w-full flex flex-col justify-center items-center">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        <img src={logo} alt="logo" className="w-28 object-contain" />
        <a
          className="black_btn"
          href="https://github.com/matvii1"
          target="_blank"
        >
          GitHub
        </a>
      </nav>

      <h1 className="head_text">
        Summarize Article with <br className="max-md:hidden" />
        <span className="orange_gradient">Open AI GPT-4</span>
      </h1>

      <h2 className="desc">
        Simplify your reading with Summize, an open-source article summarizer
        that transforms lenghty articles into clear and concise summaries
      </h2>
    </header>
  )
}

export default Hero
