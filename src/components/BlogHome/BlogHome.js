import React, { useState } from 'react'
import { getDatabase, ref, get, child } from "firebase/database";
import './BlogHome.css';
// import heroImg from '../../images/cover-img.jpeg'    
const BlogHome = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true)

    if (loading) {
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
    return (
        <div>
            {/* <img src={heroImg} alt="cover"></img> */}
            {
                data.map((item) => {
                    return (
                        <div className="home-container" key={item.slug}>
                            <div className="image-container">
                                <img className="home-image" src={item.imageUrl} alt={item.imageName} />
                            </div>
                            <div className="text-container">
                                <h1>{item.title}</h1>
                                <p>{item.content.slice(0, 60)}...<span>Read More</span></p>
                                <p className="text"><em>{item.timeDisplay}</em></p>
                                <p className="text"><em>Created by {item.author}</em></p>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default BlogHome