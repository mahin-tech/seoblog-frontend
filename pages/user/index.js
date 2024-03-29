import Layout from '../../componenets/Layout'
import Private from '../../componenets/auth/Private'
import Link from 'next/link'

const UserIndex = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h1>User Dashboard</h1>
                        </div>
                        <div className="col-md-4">
                            <div className="list-group">
                                <li className="list-group-item">
                                    <a href="/user/crud/blog">Create Blog</a>
                                </li>
                                <li className="list-group-item">
                                    <Link href="/user/crud/blogs">
                                        <a>Update/Delete Blogs</a>
                                    </Link>
                                </li>
                                <li className="list-group-item">
                                    <a href="/user/update">Update Profile</a>
                                </li>
                            </div>
                        </div>
                        <div className="col-md-8">right</div>
                    </div>
                </div>
            </Private>
        </Layout>
    )
}

export default UserIndex