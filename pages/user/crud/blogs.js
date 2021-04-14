import Layout from '../../../componenets/Layout'
import Private from '../../../componenets/auth/Private'
import BlogRead from '../../../componenets/crud/BlogRead'
import Tag from '../../../componenets/crud/Tag'
import Link from 'next/link'
import { isAuth } from '../../../actions/auth'

const Blog = () => {
    const username = isAuth() && isAuth().username
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h1>Manage blogs</h1>
                        </div>
                        <div className="col-md-12">
                            <BlogRead username={username} />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    )
}

export default Blog