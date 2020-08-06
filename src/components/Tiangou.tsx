import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './tiangou.scss'
import LoadingIcon from './Loading'
import lickGif from '../static/lick.gif'

export default function Tiangou() {
  const [idol, setIdol] = useState([{ shit: '', weather: '' }])
  const [borderN, setBorderN] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTiangou()

    // eslint-disable-next-line
  }, [])

  async function getTiangou() {
    setLoading(true)
    const result = await Promise.all([getShit(), getWeather()])
    setBorderN(Math.ceil(Math.random() * 4))
    setIdol([{ shit: result[0], weather: result[1] }])
    setLoading(false)
  }
  async function getShit() {
    const result = await axios.get('https://v1.alapi.cn/api/dog')
    return result.data.data.content
  }
  async function getWeather() {
    const result = await axios.get('https://v1.alapi.cn/api/tianqi/now')
    const { city, wea, tem } = result.data.data
    return `${city}·${wea}·${tem}`
  }

  return (
    <div className="tiangou">
      <header>
        <h2>舔狗日记</h2>
      </header>
      {loading ? (
        <LoadingIcon></LoadingIcon>
      ) : (
        <article className={`shit border-${borderN}`}>
          <p>{idol[0].weather}</p>
          <br />
          <p>{idol[0].shit}</p>
        </article>
      )}
      <button
        title="舔"
        className="throw-shit"
        onClick={() => {
          getTiangou()
        }}
      >
        <img src={lickGif} alt="舔狗" />
      </button>
    </div>
  )
}
