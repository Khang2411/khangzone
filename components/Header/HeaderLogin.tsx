/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import { GoogleLogin, GoogleLogout } from 'react-google-login';


import styles from '../../styles/header.module.scss';


import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Link from "next/link";
import { fetchAddThirdParty, fetchLogout, fetchMe, fetchThirdPartyLogin } from "../../redux/features/login/loginSlice";
import { RootState } from "../../redux/app/store";

import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

import DropDown from "../DropDown";

import 'tippy.js/dist/tippy.css'; // optional





export default function Header() {
    const dispatch = useAppDispatch()

    const access_token = useAppSelector((state: RootState) => state.login.access_token)
    const data: any = useAppSelector((state: RootState) => state.login.data)

    const responseGoogle = (response: any) => {
        console.log(response);
        const dataSend = {
            name: response.profileObj.name,
            email: response.profileObj.email,
            social_id: response.googleId,
            type: 1
        }
        dispatch(fetchThirdPartyLogin(dataSend)).unwrap().then().catch((error: any) => {
            console.log("eeeerorrr")
            dispatch(fetchAddThirdParty(dataSend)).unwrap().then(
                () => {
                    dispatch(fetchThirdPartyLogin(dataSend))
                }


            )
        })
    }
    const responseFail = () => {
        console.log("LoginFail");
    }
    const logout = () => {
        const access_token: any = localStorage.getItem("access_token");
        console.log("LogoutSucccess");
        dispatch(fetchLogout(access_token))
    }
    const logoutFail = () => {
        console.log("LogoutFail");
    }

    useEffect(() => {
        if (access_token != "") {
            localStorage.setItem("access_token", access_token);
        }
    }, [access_token])

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        dispatch(fetchMe(access_token))
    }, [dispatch, access_token])

    useEffect(() => {
        console.log(data)
    }, [data])

    const notLogin = [
        <GoogleLogin
            key={1}
            clientId="793645233892-e17sodpfhffos8qdsh3rr2ghljaa6vk7.apps.googleusercontent.com"
            buttonText="Đăng nhập với Google"
            onSuccess={responseGoogle}
            onFailure={responseFail}
            cookiePolicy={'single_host_origin'}
            theme="dark"
        />, "Facebook", "Tài khoản KhangZone"]

    const onLogin = [
        <Link href={"/account"} key={1}>
            <a>
                Thông tin cá nhân
            </a>
        </Link>,
        <Link href={"/account"} key={2}>
            <a>
                Đơn hàng
            </a>
        </Link>,
        <GoogleLogout key={3}
            clientId="793645233892-e17sodpfhffos8qdsh3rr2ghljaa6vk7.apps.googleusercontent.com"
            buttonText="Thoát tài khoản"
            onLogoutSuccess={logout}
            onFailure={logoutFail}
        >
        </GoogleLogout>
    ]
    const renderLogin = () => {
        if (data === "") {
            return (
                <>
                    <DropDown login={notLogin}></DropDown>

                </>
            )
        } else {
            return (
                <>
                    <DropDown login={onLogin} name={data.name}></DropDown>
                </>
            )
        }
    }
    return (

        <div className={cx('login')} >
            {renderLogin()}
        </div>

    );

}
