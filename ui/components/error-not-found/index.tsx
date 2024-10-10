import itemStyle from '../item-article/style.module.css'
import style from './style.module.css'

import Link from 'next/link'

import { ItemArticleMedia } from '../item-article-media'

/**
 * ErrorNotFound
 * ---
 * This is our 404 error when the user hits a route that does not exist
 * We use this to escort them to safer waters
 */
export function ErrorNotFound({ locale = 'en' }: { locale: string }) {
  return (
    <div className={style.base} data-columns="4" data-testid="error-four">
      <div className={style.copy}>
        <h2>Oops! This page does not exist.</h2>
        <p>
          You can always discover interesting things on <Link href="/">Home</Link>
        </p>
      </div>
      <div className={`${style.container} grid`}>
        <article className={itemStyle.base}>
          <div>
            <figure>
              <ItemArticleMedia id="1" />
            </figure>
            <div className={itemStyle.contentContainer}>
              <div className="copy">
                <cite>Oops</cite>
                <h3>404: Page Not Found</h3>
                <p>This is probably not the page you were looking for.</p>
              </div>
              <footer>
                <cite>Pocket</cite>
              </footer>
            </div>
          </div>
        </article>
        <article className={itemStyle.base}>
          <div>
            <figure>
              <ItemArticleMedia id="2" />
            </figure>
            <div className={itemStyle.contentContainer}>
              <div className="copy">
                <cite>How did I get here</cite>
                <h3>What to do when you can’t find your way</h3>
                <p>Sometime things just can’t be found.</p>
              </div>
              <footer>
                <cite>Pocket</cite>
              </footer>
            </div>
          </div>
        </article>
        <article className={itemStyle.base}>
          <div>
            <figure>
              <ItemArticleMedia id="3" />
            </figure>
            <div className={itemStyle.contentContainer}>
              <div className="copy">
                <cite>Lost Pages Monthly</cite>
                <h3>404 ways to tell you are lost.</h3>
                <p>Is this a sign of the times, or is it a typo?</p>
              </div>
              <footer>
                <cite>Pocket</cite>
              </footer>
            </div>
          </div>
        </article>
        <article className={itemStyle.base} data-testid="item">
          <div>
            <figure>
              <ItemArticleMedia id="4" />
            </figure>
            <div className={itemStyle.contentContainer}>
              <div className="copy">
                <cite>Finding Things</cite>
                <h3>Nope. Not today</h3>
                <p>Finding things used to be easy. What happened?</p>
              </div>
              <footer>
                <cite>Pocket</cite>
              </footer>
            </div>
          </div>
        </article>
      </div>
      <div className={style.copy}>
        <p>
          If you think this is an error, please{' '}
          <a href="https://help.getpocket.com/?src=page_404">contact support</a>.
        </p>
      </div>
    </div>
  )
}
