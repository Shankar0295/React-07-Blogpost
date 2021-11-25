import React, { useState, useRef, useEffect } from 'react'
import { getDatabase, ref, get, child } from "firebase/database";
import './BlogHome.css';
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import Loading from '../Loading/Loading'

const BlogHome = () => {
    const [data, setData] = useState([]);// for data
    const [dataloading, setLoading] = useState(true)// for loading
    const [style, setStyle] = useState({ display: 'none' });// for readmore button styling
    const [editIndex, setEditIndex] = useState(null);// for readmore button hide and show
    // added for memory leak but not working
    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        };
    }, []);
    // added for memory leak but not working
    // if(dataloading && mounted) // added for memory leak but not working
    if (dataloading) {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `/blogpost`)).then((snapshot) => {
            if (snapshot.exists()) {
                const jsonData = snapshot.val();
                let JsonArr = []
                for (let i in jsonData) {
                    JsonArr.push(jsonData[i])
                }
                console.log(JsonArr)
                setData(JsonArr)
                setLoading(false)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    if (dataloading) {
        return (
            <Loading />
        )
    }

    return (
        <div className="home-container">
            <div className="blog-container ">
                {
                    data.map((item, index) => {
                        return (
                            <Link className="read-link" key={item.slug} to={{ pathname: `${item.slug}`, state: { ...item } }} onMouseEnter={e => { setEditIndex(index) }} onMouseLeave={e => { setStyle({ display: 'none' }) }}>
                                <div onMouseEnter={e => { setStyle({ display: 'block' }); }}>
                                    <div className="image-container">
                                        <img className="home-image" src={item.imageUrl} alt={item.imageName} />
                                    </div>
                                    <div className="text-container">
                                        <h2 className="text-title">{item.title}</h2>
                                        <p className="created-text"><em>{item.timeDisplay}</em></p>
                                        <p className="created-text"><em>Created by {item.author}</em></p>
                                        {editIndex === index ? <div className="read-more">
                                            <p className="read-padding" style={style}>Read More</p>
                                            <p style={style}><FaArrowRight /></p>
                                        </div> : null}
                                    </div>
                                </div>
                            </Link>

                        )
                    })
                }

            </div>
        </div>
    )
}

export default BlogHome