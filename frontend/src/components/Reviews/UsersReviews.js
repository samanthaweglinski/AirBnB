// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { getPropertyReviews } from "../../store/review";
// import "./UsersReviews";

// function UsersReviews() {
//   const dispatch = useDispatch();
//   const reviews = useSelector((state) => state);
//   console.log('reviews:', reviews)
//   const properties = useSelector((state) => state.properties.properties);
//   // console.log('properties:', properties)


//   useEffect(() => {
//     dispatch(getPropertyReviews());
//   }, [dispatch]);

//   return (
//     <div className='all-reviews-div'>
//         <h1>Your Reviews</h1>
//         {reviews.map((reviewState, i) => {
//           return (
//             <div>
//             <p className='stars'>{`${reviewState.User.firstName} ${reviewState.User.lastName}`}</p>
//             <p className='user'>{`${reviewState.stars} stars`}</p>
//             <p className='actual-review'>{`${reviewState.review}`}</p>
//             </div>
//           )
//         })
//         }
//       </div>
//   )
// }

// export default UsersReviews;
