import Layout from '../../../componenets/Layout'
import Admin from '../../../componenets/auth/Admin'
import BlogRead from '../../../componenets/crud/BlogRead'
import Tag from '../../../componenets/crud/Tag'
import Link from 'next/link'

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h1>Manage blogs</h1>
                        </div>
                        <div className="col-md-12">
                            <BlogRead />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default Blog