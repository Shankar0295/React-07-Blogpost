import React, { useState, useRef, useEffect } from 'react'
import './BlogDescription.css'
import { Link } from 'react-router-dom'

const BlogDescription = (props) => {

    // let Data = props.location.state
    // console.log(Data)
    const [visible, setVisible] = useState(false)
    const [details, setDetails] = useState([])
    // const [loading, setLoading] = useState(true)

    // Added for
    // Warning: Can't perform a React state update on an unmounted component.
    //  This is a no-op, but it indicates a memory leak in your application. 
    // To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    // https://jasonwatmore.com/post/2021/08/27/react-how-to-check-if-a-component-is-mounted-or-unmounted
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
        if (mounted.current) {
            let data = props.location.state
            setDetails([data])
        }
        return () => {
            mounted.current = false;
        };
    }, []);


    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 150) {
            setVisible(true)
        }
        else if (scrolled <= 150) {
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
            /* you can also use 'auto' behaviour
               in place of 'smooth' */
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <div className="des-container">
            <Link className="goBack" to="/">Go back</Link>{details.map((item) => {
                return (
                    <div key={item.slug}>
                        <h2>{item.title}</h2>
                        <p className="des-time"><em>{item.timeDisplay}</em></p>
                        <p className="des-text">{item.content}</p>
                        <p className="blog-link">Link : <a target="_blank" rel="noopener noreferrer" href={item.link}>{item.link}</a></p>
                    </div>
                )
            })}
            <div style={{ textAlign: "right" }}>
                <button onClick={scrollToTop} className="top-btn" style={{ display: visible ? 'inline' : 'none' }}>Go to Top</button></div>
        </div>
    )
}

export default BlogDescription