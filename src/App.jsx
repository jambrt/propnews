import React, {useState, useEffect} from 'react';
let images = [
    'images/placeholder-1.jpg',
    'images/placeholder-2.jpg',
    'images/placeholder-3.jpg'
]
let greetings = [
    'Good Morning',
    'Good Afternoon',
    'Good Evening'
]

function App() {
    const d = new Date();
    const hours = d.getHours();
    
    let greeting = greetings[2];

    if(hours >= 3 && hours < 12){
        greeting = greetings[0];
    }else if(hours >= 12 && hours < 18){
        greeting = greetings[1];
    }

    function random3() {
        let rand = Math.random();
        rand = Math.floor( rand * 3);
        return rand;
    }

    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('https://dummyjson.com/posts?limit=9')
           .then((response) => response.json())
           .then((data) => {
              console.log(data);
              setPosts(data.posts);
           })
           .catch((err) => {
              console.log(err.message);
           });
     }, []);
    return (
        <div className="app">
            <header className="app_header">
                <h1>{greeting}</h1>
            </header>
            <div className="news">
                <h2 className="news_title">Latest news</h2>
                <div className="cards">
                    {posts.map((post) => {
                        return (
                            <a className="card" key={post.id} href="#">
                                <div className="card_image">
                                    <img src={images[random3()]}></img>
                                </div>
                                <h4 className="card_title">{post.title}</h4>
                                <p className="card_body">
                                    { post.body.length > 150 ?
                                        `${post.body.substring(0,150)}...` : post.body
                                    }
                                </p>
                            </a>
                        )
                    })}
                </div>
            </div>
            
        </div>
    );
}

export default App;
