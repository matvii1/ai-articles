import { FC } from 'react'

type Props = {
  errorText: string
}

const Error: FC<Props> = ({ errorText }) => {
  return (
    <p className="text-center font-bold text-black font-inter mt-5">
      Well, that was't supposed to happen
      <br />
      <span>{errorText}</span>
    </p>
  )
}

export default Error
