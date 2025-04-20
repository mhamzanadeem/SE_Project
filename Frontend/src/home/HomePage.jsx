
// import React, { useState, useEffect } from "react";
// import Homes from "../components/homes/Homes";
// import Trending from "../components/trending/Trending";
// import Upcomming from "../components/upcoming/Upcomming";
// import { latest, recommended, upcome } from "../dummyData";
// import { fetchComments } from "../components/api/commentService"; // Import API function

// const HomePage = () => {
//   const [items, setItems] = useState(upcome);
//   const [item, setItem] = useState(latest);
//   const [rec, setRec] = useState(recommended);
//   const [comments, setComments] = useState([]); // State for movie comments
//   const movieId = 1; // Example movie ID

//   // Fetch comments when the component mounts
//   useEffect(() => {
//     const loadComments = async () => {
//       try {
//         const data = await fetchComments(movieId); // Fetch comments for the movie
//         setComments(data);
//       } catch (error) {
//         console.error("Error fetching comments:", error);
//       }
//     };

//     loadComments();
//   }, [movieId]); // Runs only when movieId changes

//   return (
//     <>
//       <Homes />
//       <Upcomming items={items} title="Upcomming Movies" />
//       <Upcomming items={item} title="Latest Movies" />
//       <Trending />
//       <Upcomming items={rec} title="Recommended Movies" />

//       {/* Movie Comments Section */}
//       <div>
//         <h2>Movie Comments</h2>
//         <ul>
//           {comments.map((comment) => (
//             <li key={comment.id}>
//               <p>{comment.text}</p>
//               <small>{comment.author}</small>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default HomePage;


import React, { useState, useEffect } from "react";
import Homes from "../components/homes/Homes";
import Trending from "../components/trending/Trending";
import Upcomming from "../components/upcoming/Upcomming";
import { latest, recommended, upcome } from "../dummyData";
import { fetchComments } from "../components/api/commentService"; // Import API function

const HomePage = () => {
  const [items, setItems] = useState(upcome);
  const [item, setItem] = useState(latest);
  const [rec, setRec] = useState(recommended);
  const [comments, setComments] = useState([]); // State for movie comments
  const movieId = 1; // Example movie ID

  // Fetch comments when the component mounts
  useEffect(() => {
    const loadComments = async () => {
      try {
        const data = await fetchComments(movieId); // Fetch comments for the movie
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    loadComments();
  }, [movieId]); // Runs only when movieId changes

  return (
    <>
      <Homes />
      <Upcomming items={items} title="Upcomming Movies" />
      <Upcomming items={item} title="Latest Movies" />
      <Trending />
      <Upcomming items={rec} title="Recommended Movies" />

      {/* Movie Comments Section */}
      <div>
        <h2>Movie Comments</h2>
        <ul>
          {comments.map((comment) => (
            <li key={comment.id}>
              <p>{comment.text}</p>
              <small>{comment.author}</small>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default HomePage;
