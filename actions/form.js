import fetch from 'isomorphic-fetch'
import { API } from '../config'

export const emailContactForm = (data) => {
    let emailBlogEndpoint

    if (data.authorEmail) {
        emailBlogEndpoint = `${API}/contact-blog-author`
    } else {
        emailBlogEndpoint = `${API}/contact`
    }

    return fetch(`${emailBlogEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}