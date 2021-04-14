import Layout from '../../../componenets/Layout'
import Admin from '../../../componenets/auth/Admin'
import Category from '../../../componenets/crud/Category'
import Tag from '../../../componenets/crud/Tag'
import Link from 'next/link'

const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12 pt-5 pb-5">
                            <h1>Manage Categories and Tags</h1>
                        </div>
                        <div className="col-md-6">
                            <Category />
                        </div>
                        <div className="col-md-6">
                            <Tag />
                        </div>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default AdminIndex