import type { NextPage } from 'next'
import Banner from '../components/HomePage/Banner';
import HomeCategory from '../components/HomePage/HomeCategory';
import PromoBanner from '../components/HomePage/PromoBanner';
import HomeComputer from '../components/HomePage/HomeComputer';
import HomeMonitor from '../components/HomePage/HomeMonitor';
import HomeLaptop from '../components/HomePage/HomeLaptop';
import HomeCheap from '../components/HomePage/HomeCheap';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchHomeProduct } from '../redux/features/home product/homeProductSlice';
import { useEffect } from 'react';
import CommentRating from '../components/Rating/CommentRating';
import Header from '../components/Header/Header';
import ProductDetailThumbnail from '../components/Product/ProductDetailThumbnail';

const Home: NextPage = () => {
  const homeProduct = useAppSelector((state) => state.homeProduct)

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchHomeProduct());
  }, [dispatch])
  useEffect(() => {
    console.log(homeProduct)
  }, [homeProduct])

  return (
    <>
      <Header></Header>
      <main>
        <Banner></Banner>
        <HomeCategory></HomeCategory>
        <PromoBanner></PromoBanner>
        <HomeCheap items={homeProduct.homeLaptop}></HomeCheap>
        <HomeLaptop items={homeProduct.homeLaptop}></HomeLaptop>
        <HomeComputer items={homeProduct.homeComputer}></HomeComputer>
        <HomeMonitor></HomeMonitor>

      </main>
    </>
  )
}

export default Home
