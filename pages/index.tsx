import Layout from '../components/Layout'
import styles from '../styles/Home.module.scss'

const IndexPage = () => (
  <Layout title="Home">
    <div className='container'>
      <h1 className={`mt-4 mb-4 ${styles.title}`}>Test Case 👋</h1>
    </div>
  </Layout>
)

export default IndexPage