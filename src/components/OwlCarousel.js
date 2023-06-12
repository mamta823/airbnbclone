import React from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
const OwlCarouselForCountries = (props) => {
    console.log(props.handleCountry, "props")
    return (
        <>
            <div className="container">
                <div className="row mt-5">
                    <OwlCarousel className='owl-theme' items={6} loop margin={10} nav>
                        {props?.countries?.map((con, i) => (
                            <div class='item' style={{ cursor: "pointer" }} onClick={() => props?.handleCountry(con)}>
                                <h4>{con}</h4>
                            </div>
                        ))}

                    </OwlCarousel>

                </div>
            </div></>
    )
}

export default OwlCarouselForCountries