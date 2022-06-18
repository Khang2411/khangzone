import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from 'react';

export default function CommentRating(props: any) {
  const [value, setValue]: any = useState(0)

  useEffect(() => {
    // Xét rating của mọi product home,category,...
    
    if (props.star[0]) { // có rating 
      var totalStar = 0
      var totalTimes = 0 // số lần votes
      for (var i = 0; i < props.star.length; i++) {
        if (props.star[i]?.Count_Star !== undefined) {
          console.log(props.star[i]?.Count_Star)
          totalStar += props.star[i]?.Count_Star * props.star[i].rating
          totalTimes += props.star[i]?.Count_Star
        }
      }
      console.log(totalStar)
      let average = totalStar / totalTimes

      setValue(average)

    } else if (props.star.length === 0) {
      setValue(0)
    } else { // Comment by Product page Product
      setValue(props.star)
    }


  }, [props, props.star, value])


  return (
    <Box
      sx={{
        width: 250,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {value === 0 || value === "NaN" ? "" :
        <Rating
          name="text-feedback"
          value={value}
          readOnly
          precision={0.1}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />}
    </Box>
  )
}