import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'

/**
 * AboutUs page
 * Fetches content from the back-end /about route (JSON) and displays it.
 * Expects the JSON shape:
 * {
 *   name: string,
 *   bio: string[],
 *   imageUrl: string
 * }
 */
const AboutUs = () => {
  const [about, setAbout] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/about`)
      .then(response => {
        setAbout(response.data)
      })
      .catch(err => {
        // The axios error object can be large; keep a short message
        const msg = err?.response?.data?.error || err.message || 'Failed to load about data'
        setError(msg)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="AboutUs-loading">Loading...</div>
  if (error) return <div className="AboutUs-error">Error: {error}</div>
  if (!about) return null

  return (
    <div className="AboutUs">
      <h1>About Me</h1>

      <div className="AboutUs-content">
        <div className="AboutUs-image">
          <img src={about.imageUrl} alt={about.name || 'Profile'} />
        </div>

        <div className="AboutUs-text">
          {about.name && <h2>{about.name}</h2>}
          {about.bio &&
            about.bio.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
        </div>
      </div>
    </div>
  )
}

export default AboutUs
