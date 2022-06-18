import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';


const ITEM_HEIGHT = 48;

export default function LongMenu(props: any) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onMouseOver={handleClick}
            >
                <PersonIcon sx={{ color: ' #fff' }} fontSize="large" />
                <span style={{color:'#fff',fontSize:"14px"}}>{props.name}</span>
            </IconButton> 
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{ onMouseLeave: handleClose }}
                PaperProps={{
                    style: {
                        margin: 'auto',
                        maxHeight: ITEM_HEIGHT * 8,
                        width: '27ch',
                    },
                }}
            >
                { props.login.map((option:any,index: React.Key | null | undefined) => (
                    <MenuItem key={index} onClick={handleClose}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}
