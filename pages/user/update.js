import Layout from '../../componenets/Layout'
import Private from '../../componenets/auth/Private'
import ProfileUpdate from '../../componenets/auth/ProfileUpdate'
import Link from 'next/link'

const UserProfileUpdate = () => {
    return (
        <Layout>
            <Private>
                <div className="container-fluid">
                    <div className="row">
                        <ProfileUpdate />
                    </div>
                </div>
            </Private>
        </Layout>
    )
}

export default UserProfileUpdate