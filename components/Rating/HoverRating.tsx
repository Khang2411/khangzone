import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { voteStar } from '../../redux/features/comment/commentSlice';
import { RootState } from '../../redux/app/store';

export default function BasicRating() {
  const [value, setValue] = React.useState<number | null>(0);
  const dispatch = useAppDispatch()

  React.useEffect(() => {
    dispatch(voteStar(value))
  }, [dispatch, value])


  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Typography component="legend">Đánh giá của bạn về sản phẩm này:</Typography>
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        size="large"
      />

    </Box>
  );
}
