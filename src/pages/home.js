import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import "../pages/index.css"
import axios from 'axios'
import './index.css';
// import { data } from '../data.js';
// import ReactFlagsSelect from 'react-flags-select';
import Carousel from 'react-bootstrap/Carousel';
import data from '../../src/data.json'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ContentLoaderr from '../components/ContentLoaderr';
// import { testingdata } from '../testingdata';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import dayjs from 'dayjs';

const Home = () => {
    // const [value, onChange] = useState(new Date());
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState([])
    const [query, setQuery] = useState("india")
    const [morePage, setMorePage] = useState(true);
    const [page, setPage] = useState(1);
    const [nodata, setNodata] = useState('');
    const [countrylist, setCountrylist] = useState();
    const [isShown, setIsShown] = useState(false);
    const handleClick = () => {
        setIsShown(current => !current);
        // setIsShown(true);
    };
    useEffect(() => {
        if (data)
            setCountrylist(data.countries
            )
    }, [data])

    const getLocations = () => {
        // const checkIn = dayjs(value[0]).format("YYYY-MM-DD")
        // const checkOut = dayjs(value[1]).format("YYYY-MM-DD")

        setLoading(true)
        if (query) {
            axios({
                method: "GET",
                url: 'https://airbnb13.p.rapidapi.com/search-location',
                params: {
                    location: query,
                    checkin: '2023-09-16',
                    checkout: '2023-09-17',
                    adults: '1',
                    page: page,
                },
                headers: {
                    'X-RapidAPI-Key': 'e35541e7d2mshfdc27b83131cba2p10a51fjsn0559e6199edd',
                    'X-RapidAPI-Host': 'airbnb13.p.rapidapi.com'
                }
            })
                .then(function (response) {
                    console.log(response.data.results, "response for locationss")
                    setLoading(false)
                    // setResult(response.data.results)
                    if (page <= 3) {
                        setResult((prev) => [...prev, ...response.data.results]);
                        setPage((prev) => prev + 1)
                        setLoading(false)

                    } else {
                        setNodata("No more data")
                    }

                })
                .catch(function (error) {
                    console.log(error, "error occured ")
                    setLoading(false)
                })
        }


    }

    useEffect(() => {
        getLocations()

    }, [query])

    const handleCountry = (value) => {
        setQuery(value)
    }

    const convertCurrency = (rate) => {
        const sign = rate
        let USDollar = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
        });
        const formatedValue = USDollar.format(sign)
        return formatedValue

    }
    return (
        <>

            {/* <div className="container">
                <div className="row">
                    <div className='w-50 mt-5'>
                        <ReactFlagsSelect
                            searchable={true}
                            selected={country}
                            searchPlaceholder="Search for country"
                            autoFocus
                            onSelect={(code) => selectCountry(code)}
                        />
                    </div>
                </div>
            </div> */}
            <div className="container">
                <div className="row">
                    <div className="stays d-flex">
                        <div onClick={handleClick} style={{ cursor: "pointer" }} >Checkin-Checkout </div>
                        <div className="guests ms-2">
                            Who
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className='container'>
                <div className='row'>
                    {isShown && <Calendar onChange={onChange}
                        allowPartialRange={true}
                        selectRange={true}
                        value={value} />}
                </div>
            </div> */}



            <div className="container">
                <div className="row mt-5">
                    <OwlCarousel className='owl-theme' items={6} loop margin={10} nav>
                        {data.countries.map((con, i) => (
                            <div class='item' style={{ cursor: "pointer" }} onClick={() => handleCountry(con)}>
                                <h4>{con}</h4>
                            </div>
                        ))}

                    </OwlCarousel>

                </div>
            </div>

            <InfiniteScroll
                dataLength={result?.length}
                hasMore={morePage}
                next={() => getLocations()}
                endMessage={
                    // new
                    page < 3 ?
                        <div className="ind-card col-md-12">
                            <center>
                                <span className="text-primary">
                                    Congratulations! You’ve reached the
                                    end. Check back later for more
                                    Prosals.
                                </span>
                            </center>
                        </div> : ""
                }
            >
                <div className="container">
                    <div className="row mt-5">

                        {/* {data && data[0].results?.map((data, index) => ( */}

                        {
                            result?.map((data, index) => (
                                // testingdata && testingdata[0].results?.map((data, index) => (
                                < div key={index} className="col-md-3" >
                                    {loading ? <ContentLoaderr /> :
                                        <>
                                            <div className="card card mb-3 me-3" style={{ width: "18rem" }}>
                                                <Carousel>
                                                    {data?.images?.map((image, index) => {
                                                        return (
                                                            <Carousel.Item key={index}>
                                                                <div className="card-img-top">
                                                                    <img key={index} className="mx-auto d-block" loading="lazy" src={image} alt="..." />
                                                                </div>
                                                            </Carousel.Item>
                                                        )
                                                    })}
                                                </Carousel>
                                            </div>
                                            <div className="card-body">
                                                <h5 className="card-title">{data?.city}</h5>
                                                <p> <span className="address text-gray-900">{data?.address}</span></p>
                                                <p className="price text-muted">{convertCurrency(data?.price?.rate)} night</p>
                                            </div>
                                        </>
                                    }
                                </div>
                            ))
                        }
                        {/*  ))} */}
                        <h1 style={{ color: "red" }}>{nodata}</h1>
                    </div>
                </div>

            </InfiniteScroll>

        </>
    )
}

export default Home