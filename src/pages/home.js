import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import "../pages/index.css"
import axios from 'axios'
import './index.css';
// import { data } from '../data.js';
// import ReactFlagsSelect from 'react-flags-select';
import Carousel from 'react-bootstrap/Carousel';
import data from '../../src/data.json'
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import ContentLoaderr from '../components/ContentLoaderr';
import convertCurrency from '../util/util';
import OwlCarouselForCountries from '../components/OwlCarousel';
// import { testingdata } from '../testingdata';
// import Calendar from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';
// import dayjs from 'dayjs';

const Home = () => {
    // const [value, onChange] = useState(new Date());
    const [loading, setLoading] = useState(false)
    const emptyArray = new Array(10).fill({});
    const [result, setResult] = useState(emptyArray)
    const [query, setQuery] = useState("india")
    const [morePage, setMorePage] = useState(true);
    const [page, setPage] = useState(1);
    const [nodata, setNodata] = useState('');


    const getLocations = () => {
        setLoading(true)
        if (query) {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_URL}/search-location`,
                params: {
                    location: query,
                    checkin: '2023-09-16',
                    checkout: '2023-09-17',
                    adults: '1',
                    page: page,
                },
                headers: {
                    'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                    'X-RapidAPI-Host': process.env.REACT_APP_API_HOST
                }
            })
                .then(function (response) {
                    setNodata("")
                    setLoading(false)
                    if (response?.data?.results?.length > 0 && response?.data?.results?.length < 120 && page <= 3) {
                        if (result[result?.length - 1].images) {
                            setResult((prev) => [...prev, ...response.data?.results]);
                            setPage((prev) => prev + 1)
                        } else if (response?.data?.results.length > 0) {
                            setResult(response?.data?.results)

                        } else {
                            setNodata("No more data")
                        }
                    } else {
                        setNodata("No more data")

                    }

                })
                .catch(function (error) {
                    console.log(error, "error occured ")
                    setNodata(error.message)
                    setLoading(false)
                    setResult([])
                })
        }


    }

    useEffect(() => {
        getLocations()
    }, [query])

    const handleCountry = (value) => {
        setQuery(value)
        setResult(emptyArray)
        setPage(1)
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
            <OwlCarouselForCountries countries={data?.countries}
                handleCountry={handleCountry}
            />

            <InfiniteScroll
                dataLength={result?.length}
                hasMore={morePage}
                next={() => {
                    !nodata &&
                        getLocations()
                }

                }
                endMessage={
                    // new
                    <div className="ind-card col-md-12">
                        <center>
                            <span className="text-primary">

                            </span>
                        </center>
                    </div>
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