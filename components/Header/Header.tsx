import * as React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router'

import styles from '../../styles/header.module.scss';
import Tippy from "@tippyjs/react/headless";
import 'tippy.js/dist/tippy.css'; // optional

import classNames from 'classnames/bind';
let cx = classNames.bind(styles);



import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import HeaderLogin from './HeaderLogin';
import { useEffect, useState } from 'react';
import { hideAll } from 'tippy.js';
import SearchItem from '../Search/SearchItem';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/app/store';
import { fetchSearchProduct, notInputSearch } from '../../redux/features/search/searchSlice';
import useDebounce from '../../custom-hook/Debounce';

const drawerWidth = 240;

interface Props {
    window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const searchData = useAppSelector((state: RootState) => state.search)

    const [searchResult, setsearchResult] = useState([]) //Tippy
    const [input, setInput] = useState({ search: "" });// Tippy

    const debouncedSearchTerm = useDebounce(input.search, 500);

    const { window } = props; // Sidebar Mui
    const [mobileOpen, setMobileOpen] = React.useState(false); // Sidebar Mui

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => { // Tippy
        const target = e.target;

        const value: string = target.value;
        const name = target.name;

        setInput({
            ...input,
            [name]: value
        });
    };

    // Fetch Search
    useEffect(() => {
        if (debouncedSearchTerm) {
            let data = {
                search: encodeURIComponent(debouncedSearchTerm)
            }
            dispatch(fetchSearchProduct(data))
        } else {
            dispatch(notInputSearch())
        }
        console.log(debouncedSearchTerm.trim())
    }, [debouncedSearchTerm, dispatch]) // khi nào dừng gõ thì debouncedSearchTerm mới thay đổi 




    const ref = React.useRef(null)
    const [openSlide, setopenSlide] = useState(true);


    useEffect(() => {
        console.log(searchData.length)
    }, [searchData])


    const drawer = (
        <div>
            <Toolbar />
            <CloseIcon onClick={() => handleDrawerToggle()} style={{
                top: "14px",
                position: 'absolute',
                right: 0,
                fontSize: '32px',
                cursor: 'pointer'
            }}></CloseIcon>
            <List>
                {['Laptop', 'PC', 'Màn hình', 'Card Màn hình'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton >
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Tai nghe', 'Chuột', 'Bàn phím'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'block' }}>
            <CssBaseline />
            <AppBar
                position="relative"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>


                    <Typography noWrap component="div" style={{ width: "100%", overflow: "unset" }}>
                        <div className={cx('header')}>
                            <Image
                                alt="logo"
                                src={"/image/logo.png"}
                                width="115"
                                height="70"
                                layout="fixed"
                                className={cx("logo")}

                            />
                            <Link href="/"><a className={cx("header__title")}><span>KhangZone</span></a></Link>


                            <div className={cx("search")}>
                                <Tippy visible={openSlide && searchData.length >= 1} onClickOutside={() => { setopenSlide(false) }} interactive render={attrs => (

                                    <div ref={ref} className={cx("result-wrapper")} >
                                        {searchData.map((item, index) =>
                                            <div key={index} className={cx('result-line')}>
                                                <SearchItem searchItem={item}></SearchItem>
                                            </div>
                                        )}
                                    </div>
                                )} >
                                    <div className={cx("search__form")}>

                                        <input type="text" name="search" className="form-control" id="specificSizeInputName" autoComplete="off" placeholder="Search"
                                            onFocus={() => { setopenSlide(true) }}
                                            onChange={(e) => handleChangeSearch(e)} />

                                        <div>
                                            <button type="submit" className={cx("search__submit")}><FontAwesomeIcon icon={faSearch} /></button>
                                        </div>

                                    </div>
                                </Tippy>

                            </div>

                            <HeaderLogin></HeaderLogin>
                            <Link href={"/cart"}><a><FontAwesomeIcon icon={faShoppingCart} className={cx('fa-cart')} /></a></Link>

                        </div>

                    </Typography>
                </Toolbar>
            </AppBar>

            {router.pathname === "/" ? <Typography component="div">
                <div className={cx("sidebar-category")}>
                    <div>Laptop</div>
                    <div>PC</div>
                    <div>Màn hình</div>
                    <div>Card Màn hình</div>
                    <div>Tai nghe</div>
                    <div>Chuột</div>
                    <div>Bàn phím</div>
                </div>
            </Typography> : ""}

            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>

            </Box>

        </Box>
    );
}
