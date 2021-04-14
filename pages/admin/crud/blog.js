import Layout from '../../../componenets/Layout'
import Admin from '../../../componenets/auth/Admin'
import BlogCreate from '../../../componenets/crud/BlogCreate'
import Tag from '../../../componenets/crud/Tag'
import Link from 'next/link'

const Blog = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h1>Create a new blog</h1>
                        </div>
                        <div className="col-md-12">
                            <BlogCreate />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default Blog