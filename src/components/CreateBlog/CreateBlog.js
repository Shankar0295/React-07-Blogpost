import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import app from '../../providers/FireBase'
import { getDatabase, ref, set } from "firebase/database";
import './CreateBlog.css';
import Footer from '../Footer/Footer';
import LogOut from '../LogOut/LogOut';

const CreateBlog = () => {
    const { user } = useAuth0();
    console.log(user)

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


    const handleSubmit = (e) => {
        e.preventDefault();
        const date = getDate()
        console.log(e)
        let slug = e.target.elements.slug.value
        if (e.target.elements.title.value && e.target.elements.author.value && e.target.elements.coverimg.value && e.target.elements.imgalter.value && slug && e.target.elements.content.value && e.target.elements.link.value) {
            const db = getDatabase(app);
            const newPostRef = ref(db, `blogpost/${slug}`);
            set(newPostRef, {
                title: e.target.elements.title.value,
                author: e.target.elements.author.value,
                imageUrl: e.target.elements.coverimg.value,
                imageName: e.target.elements.imgalter.value,
                slug: slug,
                content: e.target.elements.content.value,
                "timeCreated": date.formatted,
                "timeDisplay": date.display,
                "link": e.target.elements.link.value,
            }).then(() => {
                alert("Data saved successfully!")
                e.target.reset();
            }).catch((error) => {
                alert(error, "Data saving failed!")
            });
        } else {
            alert("please fill all the fields")
        }




    }


    return (
        <div className="container">
            <LogOut />
            <h2>Share your blog here..</h2>
            <form name="createBlogForm" onSubmit={handleSubmit}>
                <div>
                    <label className="blog-header" htmlFor="title">Title</label>
                    <input type="text" className="blog-input" name="title" />
                </div>
                <div>
                    <label className="blog-header" htmlFor="author">Author Name</label>
                    <input type="text" className="blog-input" name="author" />
                </div>
                <div>
                    <label className="blog-header" htmlFor="coverimg">Cover Image</label>
                    <input type="text" className="blog-input" name="coverimg" />
                </div>
                <div>
                    <label className="blog-header" htmlFor="imgalter">Cover Image Name</label>
                    <input type="text" className="blog-input" name="imgalter" />
                </div>
                <div>
                    <label className="blog-header" htmlFor="slug">Slug</label>
                    <input type="text" className="blog-input" name="slug" />
                </div>
                <div>
                    <label className="blog-header" htmlFor="link">Site Link</label>
                    <input type="text" className="blog-input" name="link" />
                </div>
                <div>
                    <label className="blog-header" htmlFor="content">Content</label>
                    <textarea type="text" className="blog-input blog-text" name="content" />
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