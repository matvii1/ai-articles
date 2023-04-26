import { loader } from '@/assets'
import { FC } from 'react'

const Loader: FC = () => {
  return (
    <div className="my-10 max-w-full flex justify-center items-center">
      <img src={loader} alt="loader" className="object-contain w-20 h-20" />
    </div>
  )
}

export default Loader
