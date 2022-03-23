import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import app from '../../providers/FireBase'
import { getDatabase, ref, set } from "firebase/database";
import './CreateBlog.css';
import Footer from '../Footer/Footer';
import LogOut from '../LogOut/LogOut';

const CreateBlog = () => {
    const [formValues, setFormValues] = useState({ title: "", author: "", coverimg: "", imgalter: "", slug: "", link: "", content: "" })
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)
    const { user } = useAuth0();
    console.log(user)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormValues({ ...formValues, [name]: value })
    }

    const getDate = () => {
        const date = new Date()
        const options = {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
        };

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        if (month < 10) {
            month = `0${month}`;
        }
        if (day < 10) {
            day = `0${day}`;
        }

        return {
            formatted: `${year}-${month}-${day}`,
            display: date.toLocaleDateString("en-US", options),
        }
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            saveData();
            alert("Form submitted")
            setFormValues({ title: "", author: "", coverimg: "", imgalter: "", slug: "", link: "", content: "" })
        }
        // eslint-disable-next-line
    }, [formErrors, isSubmit])

    const validate = (values) => {
        const errors = {}
        console.log(values)
        if (!values.title) {
            errors.title = "Title is required"
        }
        if (!values.author) {
            errors.author = "Author is required"
        }
        if (!values.coverimg) {
            errors.coverimg = "Cover image is required"
        }
        if (!values.imgalter) {
            errors.imgalter = "Image alter is required"
        }
        if (!values.slug) {
            errors.slug = "Slug is required"
        }
        if (!values.link) {
            errors.link = "Link is required"
        }
        if (!values.content) {
            errors.content = "Content is required"
        }
        return errors
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues))
        setIsSubmit(true)
    }

    const saveData = () => {
        const date = getDate()
        let slug = formValues.slug
        const db = getDatabase(app);
        const newPostRef = ref(db, `blogpost/${slug}`);
        set(newPostRef, {
            title: formValues.title,
            author: formValues.author,
            imageUrl: formValues.coverimg,
            imageName: formValues.imgalter,
            slug: slug,
            content: formValues.content,
            "timeCreated": date.formatted,
            "timeDisplay": date.display,
            "link": formValues.link,
        }).then(() => {
            alert("Data saved successfully!")
            document.getElementById("form-id").reset();
        }).catch((error) => {
            alert(error, "Data saving failed!")
        });
    }


    return (
        <div className="container">
            <LogOut />
            <h2>Share your blog here..</h2>
            <form name="createBlogForm" id="form-id" onSubmit={handleSubmit}>
                <div>
                    <label className="blog-header" htmlFor="title">Title</label>
                    <input type="text" className="blog-input" name="title" onChange={handleChange} />
                    <p className="form-errors">{formErrors.title}</p>
                </div>
                <div>
                    <label className="blog-header" htmlFor="author">Author Name</label>
                    <input type="text" className="blog-input" name="author" onChange={handleChange} />
                    <p className="form-errors">{formErrors.author}</p>
                </div>
                <div>
                    <label className="blog-header" htmlFor="coverimg">Cover Image</label>
                    <input type="text" className="blog-input" name="coverimg" onChange={handleChange} />
                    <p className="form-errors">{formErrors.coverimg}</p>
                </div>
                <div>
                    <label className="blog-header" htmlFor="imgalter">Cover Image Name</label>
                    <input type="text" className="blog-input" name="imgalter" onChange={handleChange} />
                    <p className="form-errors">{formErrors.imgalter}</p>
                </div>
                <div>
                    <label className="blog-header" htmlFor="slug">Slug</label>
                    <input type="text" className="blog-input" name="slug" onChange={handleChange} />
                    <p className="form-errors">{formErrors.slug}</p>
                </div>
                <div>
                    <label className="blog-header" htmlFor="link">Site Link</label>
                    <input type="text" className="blog-input" name="link" onChange={handleChange} />
                    <p className="form-errors">{formErrors.link}</p>
                </div>
                <div>
                    <label className="blog-header" htmlFor="content">Content</label>
                    <textarea type="text" className="blog-input blog-text" name="content" onChange={handleChange} />
                    <p className="form-errors">{formErrors.content}</p>
                </div>
                <div>
                    <button type="submit" className="create-btn">Create</button>
                </div>
            </form>
            <Footer />
        </div>
    )
}

export default CreateBlog