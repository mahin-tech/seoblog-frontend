import Layout from '../componenets/Layout'
import Link from 'next/link'

const Index = () => {
    return (
        <Layout>
            <h1>Index page</h1>
            <Link href="/signup">
                <a>Signup</a>
            </Link>
        </Layout>
    )
}

export default Index