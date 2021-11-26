import React, { useState, useEffect } from 'react'
import './BlogDescription.css'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer';

const BlogDescription = (props) => {

    let Data = props.location.state
    // console.log(Data)
    const [visible, setVisible] = useState(false)

    // https://dev.to/prnvbirajdar/react-hooks-component-to-smooth-scroll-to-the-top-35fd
    // Top: 0 takes us all the way back to the top of the page
    // Behavior: smooth keeps it smooth!
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        // Button is displayed after scrolling for 500 pixels
        const toggleVisibility = () => {
            if (window.pageYOffset > 200) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };
        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);



    return (
        <div className="des-container">
            <Link className="goBack" to="/">Go back</Link>
            <h2>{Data.title}</h2>
            <p className="des-time"><em>{Data.timeDisplay}</em></p>
            <p className="des-text">{Data.content}</p>
            <p className="blog-link">Link : <a target="_blank" rel="noopener noreferrer" href={Data.link}>{Data.link}</a></p>
            <div style={{ textAlign: "right" }}>
                <button onClick={scrollToTop} className="top-btn" style={{ display: visible ? 'inline' : 'none' }}>Go to Top</button>
            </div>
            <Footer />
        </div>
    )
}

export default BlogDescription