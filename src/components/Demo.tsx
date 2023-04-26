import { useLazyGetSummaryQuery } from '@/api/article-api'
import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useLocalStorage } from 'usehooks-ts'
import Error from './Error'
import Form from './Form'
import LinkList from './LinkList'
import Loader from './Loader'

export interface IArticle {
  url: string
  summary: string
}

const Demo: FC = () => {
  const [getSummary, { isFetching, error }] = useLazyGetSummaryQuery()
  const [customError, setCustomError] = useState('')

  const [allArticles, setAllArticles] = useLocalStorage<IArticle[]>(
    'allArticles',
    [
      {
        url: '',
        summary: '',
      },
    ]
  )
  const [article, setArticle] = useLocalStorage<IArticle>('currentArticle', {
    url: '',
    summary: '',
  })

  useEffect(() => {
    if (error) {
      setCustomError(
        'Failed extracting text corpus from the page. Make sure you are trying to summarize a news article or another page with clearly defined blocks of text.'
      )
    }
  }, [error])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setCustomError('')

    try {
      const foundArticle = allArticles.find((el) => el.url === article.url)

      if (foundArticle) {
        setArticle({ ...article, summary: foundArticle.summary })

        return
      }

      const { data } = await getSummary({ url: article.url })

      if (data?.summary) {
        const newArticle = { ...article, summary: data.summary }

        setArticle(newArticle)
        setAllArticles([newArticle, ...allArticles])
      }
    } catch (error) {
      toast.error('Something went wrong!')
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (isFetching) {
      return
    }

    setArticle({
      ...article,
      url: event.target.value,
    })
  }

  const filteredArticles = allArticles.filter((el) => Boolean(el.url))

  return (
    <section className="mt-16 w-full max-w-xl">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-col w-full gap-2">
        <Form
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          articleUrl={article.url}
        />
        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {!!filteredArticles.length && (
            <LinkList
              isLoading={isFetching}
              articles={filteredArticles}
              setArticle={setArticle}
              setCustomError={setCustomError}
            />
          )}
        </div>
      </div>

      {isFetching && <Loader />}

      {!isFetching && !!customError && <Error errorText={customError} />}

      {article && article.summary && !isFetching && !customError && (
        <div className="flex flex-col gap-2 my-10">
          <h2 className="font-satoshi font-bold text-gray-600 text-xl">
            Article <span className="blue_gradient">Summary</span>
          </h2>
          <div className="summary_box">
            <p>{article.summary}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default Demo
