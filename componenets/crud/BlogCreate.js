import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Router, { withRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { getCookie, isAuth } from '../../actions/auth'
import { getCategories } from '../../actions/category'
import { getTags } from '../../actions/tag'
import { createBlog } from '../../actions/blog'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import { QuillModules, QuillFormats } from '../../helpers/quill'
// import '../../node_modules/react-quill/dist/quill.snow.css';

const CreateBlog = ({ router }) => {

    const blogFromLS = () => {
        if (typeof window === 'undefined') {
            return false
        }
        if (localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'))
        } else {
            return false
        }
    }

    const [categories, setCategories] = useState([])
    const [tags, setTags] = useState([])

    const [checked, setChecked] = useState([])
    const [checkedTag, setCheckedTag] = useState([])

    const [body, setBody] = useState(blogFromLS())
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    })

    const { error, sizeError, success, formData, title, hidePublishButton } = values
    const token = getCookie('token')

    useEffect(() => {
        setValues({ ...values, formData: new FormData() })
        initCategories()
        initTags()
    }, [router])

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setCategories(data)
            }
        })
    }

    const initTags = () => {
        getTags().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setTags(data)
            }
        })
    }

    const publishBlog = (e) => {
        e.preventDefault()
        // console.log('ready to publishBlog')
        createBlog(formData, token).then(data => {
            // console.log("data", data)
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({ ...values, title: '', error: '', success: `A new blog titled "${data.title}" is created` });
                setBody('');
                setCategories([]);
                setTags([]);
            }
        });
    }

    const handleChange = name => e => {
        // console.log(e.target.value)
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({ ...values, [name]: value, formData, error: '' })
    }

    const handleBody = e => {
        // console.log(e)
        setBody(e)
        formData.set('body', e)
        if (typeof window !== 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e))
        }
    }

    const handleToggle = c => () => {
        setValues({ ...values, error: '' })
        const clickCategory = checked.indexOf(c)
        const all = [...checked]

        if (clickCategory === -1) {
            all.push(c)
        } else {
            all.splice(clickCategory, 1)
        }
        console.log(all)
        setChecked(all)
        formData.set('categories', all)
    }

    const handleTagsToggle = t => () => {
        setValues({ ...values, error: '' })
        const clickTag = checked.indexOf(t)
        const all = [...checkedTag]

        if (clickTag === -1) {
            all.push(t)
        } else {
            all.splice(clickTag, 1)
        }
        console.log(all)
        setCheckedTag(all)
        formData.set('tags', all)
    }

    const showCategories = () => {
        return (
            categories && categories.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input type="checkbox" onChange={handleToggle(c._id)} className="mr-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        )
    }

    const showTags = () => {
        return (
            tags && tags.map((t, i) => (
                <li key={i} className="list-unstyled">
                    <input type="checkbox" onChange={handleTagsToggle(t._id)} className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        );
    };

    const showError = () => {
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
    }

    const showSuccess = () => {
        <div className="alert alert-success" style={{ display: success ? '' : 'none' }}>{success}</div>
    }

    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" value={title} onChange={handleChange('title')} />
                </div>

                <div className="form-group">
                    <link rel="stylesheet" href="//cdn.quilljs.com/1.2.6/quill.snow.css" />
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder='Write something amazing...'
                        onChange={handleBody}
                    />
                </div>

                <div>
                    <button type="submit" className="btn btn-primary">
                        Publish
                    </button>
                </div>
            </form>
        )
    }

    return (
        <div className="container-fluid pb-5">
            <div className="row">
                <div className="col-md-8">
                    {createBlogForm()}
                    <div className="pt-3">
                        {showSuccess()}
                        {showError()}
                    </div>
                </div>
                <div className="col-md-4">
                    <div>
                        <div className="form-group pb-2">
                            <h5>Featured images</h5>
                            <hr />

                            <small className="text-muted">Max size: 1mb</small>
                            <br />
                            <label className="btn btn-outline-info">
                                Upload featured images
                                <input onChange={handleChange('photo')} type="file" accept="image/*" hidden />
                            </label>
                        </div>
                    </div>
                    <div>
                        <h5>Categories</h5>
                        <hr />
                        <ul style={{ maxHeight: '100px', overflowY: 'scroll' }}>{showCategories()}</ul>
                    </div>
                    <div>
                        <h5>Tags</h5>
                        <hr />
                        <ul style={{ maxHeight: '100px', overflowY: 'scroll' }}>{showTags()}</ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withRouter(CreateBlog)