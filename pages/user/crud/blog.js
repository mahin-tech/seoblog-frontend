import Layout from '../../../componenets/Layout'
import Private from '../../../componenets/auth/Private'
import BlogCreate from '../../../componenets/crud/BlogCreate'
import Link from 'next/link'

const CreateBlog = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h2>Create a new blog</h2>
                        </div>
                        <div className="col-md-12">
                            <BlogCreate />
                        </div>
                    </div>
                </div>
            </Private>
        </Layout>
    )
}

export default CreateBlog