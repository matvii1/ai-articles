import { copy, tick } from '@/assets'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { IArticle } from './Demo'

type Props = {
  articles: IArticle[]
  setArticle: Dispatch<SetStateAction<IArticle>>
  isLoading: boolean
  setCustomError: Dispatch<SetStateAction<string>>
}

const LinkList: FC<Props> = ({ articles, setArticle, isLoading, setCustomError }) => {
  const [copied, setCopied] = useState('')

  function handleCopy(url: string) {
    setCopied(url)
    navigator.clipboard.writeText(url)

    setTimeout(() => {
      setCopied('')
    }, 2000)
  }

  function handleSetArticle(article: IArticle) {
    if (isLoading) return

    setCustomError('')
    setArticle(article)
  }

  return (
    <>
      {articles.map((singleArticle, i) => (
        <div
          key={`item-${i}`}
          onClick={() => handleSetArticle(singleArticle)}
          className="link_card"
        >
          <div
            className="copy_btn"
            onClick={() => handleCopy(singleArticle.url)}
          >
            <img
              src={copied === singleArticle.url ? tick : copy}
              alt="copy icon"
              className="w-[40%] h-[40%] object-contain"
            />
          </div>
          <p className="flex-1 font-satoshi text-blu text-sm truncate">
            {singleArticle.url}
          </p>
        </div>
      ))}
    </>
  )
}

export default LinkList
