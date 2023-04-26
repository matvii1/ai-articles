import { linkIcon } from '@/assets'
import { ChangeEvent, FC } from 'react'

type Props = {
  handleSubmit: (e: ChangeEvent<HTMLFormElement>) => void
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  articleUrl: string
}

const Form: FC<Props> = ({ handleSubmit, handleChange, articleUrl }) => {
  return (
    <form
      action=""
      className="relative flex justify-center items-center"
      onSubmit={handleSubmit}
    >
      <img
        src={linkIcon}
        alt="icon"
        className="absolute left-0 my-2 ml-3 w-5"
      />
      <input
        type="url"
        placeholder="Enter an url"
        value={articleUrl}
        onChange={handleChange}
        required
        className="url_input peer"
      />
      <button
        type="submit"
        className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
      >
        ⏎
      </button>
    </form>
  )
}

export default Form
